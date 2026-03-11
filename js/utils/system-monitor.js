/**
 * System Monitor - Real-time Data
 * Dream OS 2026 - Battery, Network, Time
 */

(function() {
    'use strict';
    
    console.log('✅ [SYSTEM MONITOR] Initializing...');
    
    // ════════════════════════════════════════════
    // CLOCK (Real-time)
    // ════════════════════════════════════════════
    
    function updateClock() {
        const clockEl = document.getElementById('clock');
        if (!clockEl) return;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        clockEl.textContent = timeString;
    }
    
    // Update immediately, then every second
    updateClock();
    setInterval(updateClock, 1000);
    
    // ════════════════════════════════════════════
    // BATTERY (Real API)
    // ════════════════════════════════════════════
    
    async function initBattery() {
        const batteryLevelEl = document.getElementById('battery-level');
        const batteryIconEl = document.querySelector('#battery-indicator i');
        
        if (!batteryLevelEl || !batteryIconEl) {
            console.warn('[BATTERY] Elements not found');
            return;
        }
        
        // Check browser support
        if (!navigator.getBattery) {
            batteryLevelEl.textContent = 'N/A';
            batteryIconEl.className = 'fas fa-battery-slash';
            console.warn('[BATTERY] API not supported');            return;
        }
        
        try {
            const battery = await navigator.getBattery();
            
            function updateBatteryUI() {
                const level = Math.round(battery.level * 100);
                const isCharging = battery.charging;
                
                // Update percentage
                batteryLevelEl.textContent = `${level}%`;
                
                // Update icon based on level & charging status
                let iconClass = 'fa-battery-';
                let iconColor = '#10b981'; // Default green
                
                if (isCharging) {
                    iconClass = 'fa-bolt';
                    iconColor = '#10b981';
                } else if (level >= 75) {
                    iconClass = 'battery-full';
                    iconColor = '#10b981';
                } else if (level >= 50) {
                    iconClass = 'battery-three-quarters';
                    iconColor = '#10b981';
                } else if (level >= 25) {
                    iconClass = 'battery-half';
                    iconColor = '#f59e0b'; // Yellow
                } else if (level >= 10) {
                    iconClass = 'battery-quarter';
                    iconColor = '#f59e0b';
                } else {
                    iconClass = 'battery-empty';
                    iconColor = '#ef4444'; // Red
                }
                
                batteryIconEl.className = `fas fa-${iconClass}`;
                batteryIconEl.style.color = iconColor;
                batteryLevelEl.style.color = level < 20 ? '#ef4444' : 'var(--color-text-muted)';
                
                // Low battery warning
                if (level < 15 && !isCharging) {
                    if (window.DREAM) {
                        window.DREAM.showToast('🔋 Battery low! Charge soon', 'warning');
                    }
                }
            }
            
            // Initial update            updateBatteryUI();
            
            // Listen for changes
            battery.addEventListener('levelchange', updateBatteryUI);
            battery.addEventListener('chargingchange', updateBatteryUI);
            
            console.log('[BATTERY] Monitoring active');
            
        } catch (error) {
            console.error('[BATTERY] Error:', error);
            batteryLevelEl.textContent = 'Error';
        }
    }
    
    // Initialize battery monitor
    initBattery();
    
    // ════════════════════════════════════════════
    // NETWORK STATUS (Real API)
    // ════════════════════════════════════════════
    
    function updateNetworkStatus() {
        const networkStatusEl = document.getElementById('network-status');
        const networkTypeEl = document.getElementById('network-type');
        
        if (!networkStatusEl || !networkTypeEl) return;
        
        const isOnline = navigator.onLine;
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        if (isOnline) {
            // Online status
            networkStatusEl.classList.remove('offline');
            networkStatusEl.classList.add('online');
            
            if (connection) {
                const type = connection.effectiveType || '4G';
                const speed = connection.downlink || 0;
                const rtt = connection.rtt || 0;
                
                networkTypeEl.textContent = `${type.toUpperCase()} ${speed > 0 ? `(${speed} Mbps)` : ''}`;
                
                // Color code based on speed
                if (speed >= 5) {
                    networkStatusEl.style.color = '#10b981'; // Green - Fast
                } else if (speed >= 1) {
                    networkStatusEl.style.color = '#f59e0b'; // Yellow - Medium
                } else {
                    networkStatusEl.style.color = '#ef4444'; // Red - Slow
                }            } else {
                networkTypeEl.textContent = 'WiFi';
                networkStatusEl.style.color = '#10b981';
            }
        } else {
            // Offline status
            networkStatusEl.classList.remove('online');
            networkStatusEl.classList.add('offline');
            networkTypeEl.textContent = 'Offline';
            networkStatusEl.style.color = '#ef4444';
            
            if (window.DREAM) {
                window.DREAM.showToast('📡 You are offline', 'error');
            }
        }
    }
    
    // Initial update
    updateNetworkStatus();
    
    // Listen for network changes
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    
    if (navigator.connection) {
        navigator.connection.addEventListener('change', updateNetworkStatus);
    }
    
    console.log('[NETWORK] Monitoring active');
    
    // ════════════════════════════════════════════
    // PRAYER TIME (Auto-update based on time)
    // ════════════════════════════════════════════
    
    function updatePrayerTime() {
        const prayerDisplayEl = document.getElementById('prayer-time-display');
        const prayerMonitorEl = document.getElementById('prayer-monitor');
        
        if (!prayerDisplayEl || !prayerMonitorEl) return;
        
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const currentTime = hours * 60 + minutes;
        
        // Prayer times (approximate - can be enhanced with API)
        const prayers = [
            { name: 'Subuh', start: 330, end: 420, icon: 'fa-sun' },      // 5:30 - 7:00
            { name: 'Dzuhur', start: 720, end: 870, icon: 'fa-sun' },     // 12:00 - 14:30
            { name: 'Ashar', start: 871, end: 1050, icon: 'fa-cloud-sun' }, // 14:31 - 17:30            { name: 'Maghrib', start: 1051, end: 1110, icon: 'fa-moon' },  // 17:31 - 18:30
            { name: 'Isya', start: 1111, end: 1439, icon: 'fa-moon' }      // 18:31 - 23:59
        ];
        
        // Handle night hours (0:00 - 5:29)
        if (currentTime < 330) {
            prayers.unshift({ name: 'Isya', start: 0, end: 330, icon: 'fa-moon' });
        }
        
        // Find current prayer
        let currentPrayer = prayers.find(p => currentTime >= p.start && currentTime < p.end);
        
        if (!currentPrayer) {
            currentPrayer = prayers[prayers.length - 1]; // Default to Isya
        }
        
        // Calculate next prayer time (approximate)
        const nextPrayerTime = `${Math.floor(currentPrayer.start / 60)}:${String(currentPrayer.start % 60).padStart(2, '0')}`;
        
        // Update UI
        prayerDisplayEl.textContent = `${currentPrayer.name} ${nextPrayerTime}`;
        
        // Update icon
        const iconEl = prayerMonitorEl.querySelector('i');
        if (iconEl) {
            iconEl.className = `fas ${currentPrayer.icon}`;
        }
        
        // Pulse animation for current prayer
        prayerMonitorEl.style.animation = 'pulse 2s infinite';
    }
    
    // Add pulse animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
    `;
    document.head.appendChild(style);
    
    // Initial update
    updatePrayerTime();
    
    // Update every minute
    setInterval(updatePrayerTime, 60000);
    
    console.log('[PRAYER TIME] Monitoring active');
        // ════════════════════════════════════════════
    // PERFORMANCE MONITOR (Optional - Dev only)
    // ════════════════════════════════════════════
    
    function updatePerformanceMonitor() {
        const fpsEl = document.getElementById('fps-counter');
        const memoryEl = document.getElementById('memory-usage');
        const modulesEl = document.getElementById('module-count');
        
        if (!fpsEl || !memoryEl || !modulesEl) return;
        
        // FPS (approximate)
        let frames = 0;
        let prevTime = performance.now();
        
        function countFPS() {
            frames++;
            const time = performance.now();
            
            if (time >= prevTime + 1000) {
                const fps = Math.round((frames * 1000) / (time - prevTime));
                fpsEl.textContent = fps;
                fpsEl.style.color = fps >= 55 ? '#10b981' : fps >= 30 ? '#f59e0b' : '#ef4444';
                
                prevTime = time;
                frames = 0;
            }
            
            requestAnimationFrame(countFPS);
        }
        
        countFPS();
        
        // Memory (Chrome only)
        if (performance.memory) {
            setInterval(() => {
                const memoryMB = Math.round(performance.memory.usedJSHeapSize / 1048576);
                memoryEl.textContent = memoryMB;
            }, 2000);
        } else {
            memoryEl.textContent = 'N/A';
        }
        
        // Modules count
        setInterval(() => {
            if (window.DREAM && window.DREAM.modules) {
                modulesEl.textContent = window.DREAM.modules.size;
            }
        }, 1000);
    }    
    // Initialize performance monitor (hidden by default)
    updatePerformanceMonitor();
    
    console.log('✅ [SYSTEM MONITOR] All systems active');
    
})();
