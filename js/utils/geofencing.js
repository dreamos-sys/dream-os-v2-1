/**
 * Geofencing & Location Security
 * Dream OS 2026 - Enterprise Location-Based Access Control
 * ISO 27001 Compliant
 */

(function() {
    'use strict';
    
    console.log('🌍 [GEOFENCING] Initializing...');
    
    // ════════════════════════════════════════════
    // GEOFENCE CONFIGURATION
    // ════════════════════════════════════════════
    
    const GEOFENCE_CONFIG = {
        // Authorized zones (add your facility coordinates)
        zones: [
            {
                id: 'headquarters',
                name: 'Kantor Pusat',
                latitude: -6.402154,  // Example: Depok coordinates
                longitude: 106.794296,
                radius: 100,  // meters
                type: 'primary'  // primary, secondary, restricted
            },
            {
                id: 'branch_office',
                name: 'Kantor Cabang',
                latitude: -6.208763,  // Example: Jakarta coordinates
                longitude: 106.845599,
                radius: 150,
                type: 'secondary'
            },
            {
                id: 'restricted_area',
                name: 'Area Terbatas',
                latitude: -6.375000,
                longitude: 106.825000,
                radius: 50,
                type: 'restricted'  // Requires special permission
            }
        ],
        
        // Security settings
        security: {
            requireLocationForLogin: false,  // Block login outside zones
            requireLocationForSensitiveOps: true,  // Block sensitive ops outside zones
            alertOnZoneExit: true,
            alertOnZoneEntry: true,            trackingInterval: 30000,  // Update location every 30 seconds
            accuracyThreshold: 50  // Max accuracy in meters
        }
    };
    
    // ════════════════════════════════════════════
    // GEOFENCING MANAGER
    // ════════════════════════════════════════════
    
    class GeofencingManager {
        constructor() {
            this.currentPosition = null;
            this.currentZone = null;
            this.watchId = null;
            this.isTracking = false;
            this.permissionGranted = false;
            this.locationHistory = [];
        }
        
        // Check if geolocation is supported
        isSupported() {
            return 'geolocation' in navigator;
        }
        
        // Request location permission
        async requestPermission() {
            if (!this.isSupported()) {
                return {
                    granted: false,
                    reason: 'Geolocation not supported'
                };
            }
            
            try {
                // Request permission
                const result = await navigator.permissions.query({
                    name: 'geolocation'
                });
                
                this.permissionGranted = result.state === 'granted';
                
                return {
                    granted: this.permissionGranted,
                    state: result.state
                };
                
            } catch(e) {
                console.error('[GEOFENCE] Permission error:', e);
                return {
                    granted: false,                    reason: e.message
                };
            }
        }
        
        // Get current position
        async getCurrentPosition() {
            return new Promise((resolve, reject) => {
                if (!this.isSupported()) {
                    reject(new Error('Geolocation not supported'));
                    return;
                }
                
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.currentPosition = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy,
                            altitude: position.coords.altitude,
                            heading: position.coords.heading,
                            speed: position.coords.speed,
                            timestamp: new Date(position.timestamp).toISOString()
                        };
                        
                        // Check which zone we're in
                        this.currentZone = this.checkZone(this.currentPosition);
                        
                        // Add to history
                        this.addToHistory(this.currentPosition);
                        
                        resolve(this.currentPosition);
                    },
                    (error) => {
                        reject(error);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0
                    }
                );
            });
        }
        
        // Start continuous tracking
        startTracking() {
            if (!this.isSupported()) {
                console.warn('[GEOFENCE] Not supported');
                return false;            }
            
            if (this.isTracking) {
                console.log('[GEOFENCE] Already tracking');
                return true;
            }
            
            this.watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const newPosition = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        timestamp: new Date(position.timestamp).toISOString()
                    };
                    
                    const previousZone = this.currentZone;
                    this.currentPosition = newPosition;
                    this.currentZone = this.checkZone(newPosition);
                    this.addToHistory(newPosition);
                    
                    // Check zone changes
                    if (previousZone !== this.currentZone) {
                        this.onZoneChange(previousZone, this.currentZone);
                    }
                    
                    // Check accuracy threshold
                    if (newPosition.accuracy > GEOFENCE_CONFIG.security.accuracyThreshold) {
                        console.warn('[GEOFENCE] Low accuracy:', newPosition.accuracy + 'm');
                    }
                    
                },
                (error) => {
                    console.error('[GEOFENCE] Tracking error:', error);
                    
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            window.DREAM?.showToast('🌍 Location permission denied', 'error');
                            break;
                        case error.POSITION_UNAVAILABLE:
                            window.DREAM?.showToast('🌍 Location unavailable', 'warning');
                            break;
                        case error.TIMEOUT:
                            window.DREAM?.showToast('🌍 Location timeout', 'warning');
                            break;
                    }
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,                    maximumAge: 5000
                }
            );
            
            this.isTracking = true;
            console.log('✅ [GEOFENCE] Tracking started');
            
            return true;
        }
        
        // Stop tracking
        stopTracking() {
            if (this.watchId !== null) {
                navigator.geolocation.clearWatch(this.watchId);
                this.watchId = null;
                this.isTracking = false;
                console.log('⏹️ [GEOFENCE] Tracking stopped');
            }
        }
        
        // Check if position is inside any zone
        checkZone(position) {
            if (!position) return null;
            
            for (const zone of GEOFENCE_CONFIG.zones) {
                const distance = this.calculateDistance(
                    position.latitude,
                    position.longitude,
                    zone.latitude,
                    zone.longitude
                );
                
                if (distance <= zone.radius) {
                    return {
                        ...zone,
                        distance: distance,
                        inside: true
                    };
                }
            }
            
            return {
                inside: false,
                distance: null
            };
        }
        
        // Calculate distance between two points (Haversine formula)
        calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 6371e3; // Earth's radius in meters            const φ1 = lat1 * Math.PI / 180;
            const φ2 = lat2 * Math.PI / 180;
            const Δφ = (lat2 - lat1) * Math.PI / 180;
            const Δλ = (lon2 - lon1) * Math.PI / 180;
            
            const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                      Math.cos(φ1) * Math.cos(φ2) *
                      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            
            return R * c; // Distance in meters
        }
        
        // Handle zone change events
        async onZoneChange(previousZone, newZone) {
            console.log('[GEOFENCE] Zone change:', previousZone?.name || 'Outside', '→', newZone?.name || 'Outside');
            
            // Entry alert
            if (newZone?.inside && GEOFENCE_CONFIG.security.alertOnZoneEntry) {
                const message = `📍 Entered ${newZone.name}`;
                console.log('[GEOFENCE]', message);
                
                if (window.DREAM) {
                    window.DREAM.showToast(message, 'success');
                }
                
                // Log to audit trail
                await this.logZoneEvent('entry', newZone);
            }
            
            // Exit alert
            if (previousZone?.inside && !newZone?.inside && GEOFENCE_CONFIG.security.alertOnZoneExit) {
                const message = `📍 Exited ${previousZone.name}`;
                console.log('[GEOFENCE]', message);
                
                if (window.DREAM) {
                    window.DREAM.showToast(message, 'info');
                }
                
                // Log to audit trail
                await this.logZoneEvent('exit', previousZone);
            }
            
            // Restricted zone alert
            if (newZone?.type === 'restricted') {
                const message = `⚠️ Entering restricted area: ${newZone.name}`;
                console.warn('[GEOFENCE]', message);
                
                if (window.DREAM) {
                    window.DREAM.showToast(message, 'warning');                }
                
                // Log to audit trail (high priority)
                await this.logZoneEvent('restricted_entry', newZone);
            }
        }
        
        // Add location to history
        addToHistory(position) {
            this.locationHistory.push(position);
            
            // Keep last 100 positions
            if (this.locationHistory.length > 100) {
                this.locationHistory.shift();
            }
            
            // Store in localStorage (persist across sessions)
            try {
                localStorage.setItem('dreamos_location_history', JSON.stringify(this.locationHistory));
            } catch(e) {
                console.warn('[GEOFENCE] Storage failed:', e);
            }
        }
        
        // Log zone event to audit trail
        async logZoneEvent(eventType, zone) {
            const logEntry = {
                event_type: eventType,
                zone_id: zone.id,
                zone_name: zone.name,
                zone_type: zone.type,
                latitude: this.currentPosition?.latitude,
                longitude: this.currentPosition?.longitude,
                accuracy: this.currentPosition?.accuracy,
                timestamp: new Date().toISOString(),
                deviceId: window.DREAM?.state?.deviceId || 'unknown',
                userId: window.DREAM?.state?.user?.name || 'unknown'
            };
            
            console.log('[GEOFENCE AUDIT]', logEntry);
            
            // Track event
            if (window.DREAM && window.DREAM.trackEvent) {
                window.DREAM.trackEvent('geofence_' + eventType, logEntry);
            }
            
            // Store in Supabase if available
            if (window.DREAM && window.DREAM.state && window.DREAM.state.supabase) {
                try {
                    await window.DREAM.state.supabase                        .from('location_audit_logs')
                        .insert([logEntry]);
                } catch(e) {
                    console.warn('[GEOFENCE] Audit log failed:', e);
                }
            }
        }
        
        // Check if user can perform sensitive operation
        canPerformSensitiveOperation() {
            if (!GEOFENCE_CONFIG.security.requireLocationForSensitiveOps) {
                return { allowed: true, reason: 'Location check disabled' };
            }
            
            if (!this.currentZone) {
                return {
                    allowed: false,
                    reason: 'Location unknown'
                };
            }
            
            if (!this.currentZone.inside) {
                return {
                    allowed: false,
                    reason: 'Outside authorized zone',
                    suggestion: 'Please move to an authorized location'
                };
            }
            
            if (this.currentZone.accuracy > GEOFENCE_CONFIG.security.accuracyThreshold) {
                return {
                    allowed: false,
                    reason: 'Location accuracy too low',
                    suggestion: 'Please enable high accuracy GPS'
                };
            }
            
            return {
                allowed: true,
                zone: this.currentZone.name,
                reason: 'Inside authorized zone'
            };
        }
        
        // Get location status
        getStatus() {
            return {
                supported: this.isSupported(),
                permissionGranted: this.permissionGranted,
                isTracking: this.isTracking,                currentPosition: this.currentPosition,
                currentZone: this.currentZone,
                zonesConfigured: GEOFENCE_CONFIG.zones.length,
                historySize: this.locationHistory.length
            };
        }
        
        // Load location history from storage
        loadHistory() {
            try {
                const stored = localStorage.getItem('dreamos_location_history');
                if (stored) {
                    this.locationHistory = JSON.parse(stored);
                }
            } catch(e) {
                console.warn('[GEOFENCE] Load history failed:', e);
            }
        }
        
        // Export location history (for compliance)
        exportHistory() {
            return {
                exported_at: new Date().toISOString(),
                total_records: this.locationHistory.length,
                data: this.locationHistory
            };
        }
    }
    
    // ════════════════════════════════════════════
    // LOCATION-BASED ACCESS CONTROL
    // ════════════════════════════════════════════
    
    class LocationAccessControl {
        constructor(geofencing) {
            this.geofencing = geofencing;
            this.restrictedOperations = [
                'approve_budget',
                'delete_records',
                'export_data',
                'change_permissions',
                'system_config'
            ];
        }
        
        // Check if operation is allowed based on location
        async checkAccess(operation) {
            const isRestricted = this.restrictedOperations.includes(operation);
            
            if (!isRestricted) {                return {
                    allowed: true,
                    reason: 'Operation not restricted'
                };
            }
            
            // Get location status
            const locationCheck = this.geofencing.canPerformSensitiveOperation();
            
            if (!locationCheck.allowed) {
                // Log unauthorized access attempt
                await this.logAccessAttempt(operation, false, locationCheck.reason);
                
                return {
                    allowed: false,
                    reason: locationCheck.reason,
                    suggestion: locationCheck.suggestion,
                    requireBiometric: true  // Require additional auth
                };
            }
            
            // Log successful access
            await this.logAccessAttempt(operation, true, locationCheck.reason);
            
            return {
                allowed: true,
                reason: locationCheck.reason,
                zone: locationCheck.zone
            };
        }
        
        // Log access attempt
        async logAccessAttempt(operation, allowed, reason) {
            const logEntry = {
                operation: operation,
                allowed: allowed,
                reason: reason,
                timestamp: new Date().toISOString(),
                deviceId: window.DREAM?.state?.deviceId || 'unknown',
                userId: window.DREAM?.state?.user?.name || 'unknown',
                location: this.geofencing.currentPosition
            };
            
            console.log('[ACCESS CONTROL]', logEntry);
            
            if (window.DREAM && window.DREAM.trackEvent) {
                window.DREAM.trackEvent('access_control_' + (allowed ? 'allowed' : 'denied'), logEntry);
            }
        }
                // Wrapper for sensitive operations
        async performSensitiveOperation(operation, callback) {
            const access = await this.checkAccess(operation);
            
            if (!access.allowed) {
                if (window.DREAM) {
                    window.DREAM.showToast(`🔒 ${access.reason}`, 'error');
                }
                
                // Offer biometric override
                if (access.requireBiometric && window.BiometricAuth) {
                    const confirm = await window.confirm(`${access.reason}\n\nUse biometric authentication to override?`);
                    
                    if (confirm) {
                        const auth = await window.BiometricAuth.authenticate();
                        
                        if (auth.success) {
                            window.DREAM?.showToast('✅ Biometric override successful', 'success');
                            return await callback();
                        } else {
                            window.DREAM?.showToast('❌ Biometric override failed', 'error');
                            return null;
                        }
                    }
                }
                
                return null;
            }
            
            // Proceed with operation
            return await callback();
        }
    }
    
    // ════════════════════════════════════════════
    // INITIALIZE & EXPORT
    // ════════════════════════════════════════════
    
    // Create global instances
    window.Geofencing = new GeofencingManager();
    window.LocationAccessControl = new LocationAccessControl(window.Geofencing);
    
    // Auto-initialize
    (async function init() {
        try {
            // Load history
            window.Geofencing.loadHistory();
            
            // Check permission
            const permission = await window.Geofencing.requestPermission();            console.log('🌍 [GEOFENCE] Permission:', permission);
            
            if (permission.granted) {
                // Get initial position
                await window.Geofencing.getCurrentPosition();
                
                // Start tracking
                window.Geofencing.startTracking();
                
                console.log('✅ [GEOFENCE] Active - Tracking:', window.Geofencing.currentZone?.name || 'Outside all zones');
                
            } else {
                console.warn('⚠️ [GEOFENCE] Permission not granted:', permission.reason);
            }
            
            // Periodic status check
            setInterval(() => {
                const status = window.Geofencing.getStatus();
                if (window.DREAM && window.DREAM.state) {
                    window.DREAM.state.locationStatus = status;
                }
            }, GEOFENCE_CONFIG.security.trackingInterval);
            
        } catch(e) {
            console.error('❌ [GEOFENCE] Init failed:', e);
        }
    })();
    
    console.log('✅ [GEOFENCING] Module loaded');
    
})();
