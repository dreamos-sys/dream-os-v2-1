/* ============================================
   🕌 DREAM OS 2026 - GLOBAL OBJECT (ENHANCED)
   MUST LOAD BEFORE ANY OTHER SCRIPT
   Version: 2026.1.0-FINAL
   ============================================ */

(function() {
    // Create global DREAM object
    window.DREAM = {
        version: '2026.1.0',
        env: 'production',
        
        // Module Path Mapping (Fix QR Scanner Issue)
        modulePaths: {
            'home': './modules/home/module.js',
            'sekuriti': './modules/sekuriti/module.js',
            'security': './modules/sekuriti/module.js',
            'qr': './modules/qr/module.js',
            'qr-scanner': './modules/qr/module.js',
            'scanner': './modules/qr/module.js',
            'settings': './modules/settings/module.js',
            'ghost': './modules/ghost/module.js',
            'developer': './modules/ghost/module.js'
        },
        
        state: {
            currentModule: 'home',
            user: null,
            session: null,
            prayerTimes: null,
            networkStatus: navigator.onLine,
            batteryLevel: null,
            lastSync: null,
            theme: localStorage.getItem('dream-theme') || 'emerald-dark',
            language: 'id',
            isInitialized: false
        },
        
        config: {
            supabase: {
                url: 'https://your-project.supabase.co',
                key: 'your-anon-key'
            },
            cloudflare: {
                workerUrl: 'https://your-worker.workers.dev'
            },
            api: {
                prayerTime: 'https://api.aladhan.com/v1/timingsByCity',
                quran: 'https://api.alquran.cloud/v1'
            }        },
        
        modules: new Map(),
        cache: new Map(),
        utils: {},
        
        // ============================================================
        // INITIALIZATION
        // ============================================================
        
        init: function() {
            console.log('🕌 [DREAM] Initializing Core Engine v' + this.version);
            this.initTheme();
            this.checkSession();
            this.setupErrorBoundary();
            this.handleDeepLink(); // ✅ ADDED: Handle PWA shortcuts
            this.state.isInitialized = true;
            console.log('✅ [DREAM] Core Engine initialized successfully');
        },
        
        // ============================================================
        // DEEP LINKING (Handle PWA Shortcuts & URL Params)
        // ============================================================
        
        handleDeepLink: function() {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const moduleParam = urlParams.get('module');
                
                if (moduleParam) {
                    console.log('[DEEP LINK] Loading module from URL:', moduleParam);
                    
                    // Wait for app to be ready
                    setTimeout(() => {
                        if (window.app && typeof window.app.loadModule === 'function') {
                            window.app.loadModule(moduleParam);
                        } else {
                            this.load(moduleParam);
                        }
                        
                        // Clean URL (remove query param)
                        if (window.history && typeof window.history.replaceState === 'function') {
                            window.history.replaceState({}, document.title, window.location.pathname);
                        }
                    }, 500);
                }
            } catch (err) {
                console.warn('[DEEP LINK] Error handling URL params:', err);
            }
        },        
        // ============================================================
        // THEME MANAGEMENT
        // ============================================================
        
        initTheme: function() {
            const savedTheme = localStorage.getItem('dream-theme') || 'emerald-dark';
            document.documentElement.setAttribute('data-theme', savedTheme);
            this.state.theme = savedTheme;
            console.log('[THEME] Loaded:', savedTheme);
        },
        
        setTheme: function(themeName) {
            document.documentElement.setAttribute('data-theme', themeName);
            localStorage.setItem('dream-theme', themeName);
            this.state.theme = themeName;
            console.log('[THEME] Changed to:', themeName);
            this.showToast(`Tema diubah ke ${themeName}`, 'success');
            this.trackEvent('theme_change', { theme: themeName });
        },
        
        toggleTheme: function() {
            const current = this.state.theme;
            const isDark = current.includes('dark');
            const newTheme = isDark ? current.replace('dark', 'light') : current.replace('light', 'dark');
            this.setTheme(newTheme);
        },
        
        // ============================================================
        // SESSION MANAGEMENT
        // ============================================================
        
        checkSession: function() {
            const session = localStorage.getItem('dream-session');
            if (session) {
                try {
                    this.state.user = JSON.parse(session);
                    this.state.session = session;
                    console.log('[SESSION] User logged in:', this.state.user?.name || 'Guest');
                } catch (err) {
                    console.warn('[SESSION] Invalid session, clearing...');
                    localStorage.removeItem('dream-session');
                }
            }
            return this.state.user;
        },
        
        login: function(userData) {
            this.state.user = userData;
            this.state.session = JSON.stringify(userData);            localStorage.setItem('dream-session', JSON.stringify(userData));
            this.showToast(`Selamat datang, ${userData.name || 'User'}!`, 'success');
            this.hapticFeedback('success');
            this.trackEvent('user_login', { userId: userData.id });
        },
        
        logout: function() {
            this.state.user = null;
            this.state.session = null;
            localStorage.removeItem('dream-session');
            this.showToast('Berhasil logout', 'info');
            this.hapticFeedback('medium');
            this.trackEvent('user_logout');
            setTimeout(() => location.reload(), 1000);
        },
        
        // ============================================================
        // MODULE LOADING (ENHANCED WITH PATH MAPPING)
        // ============================================================
        
        load: async function(moduleName, params) {
            console.log('[DREAM.load]', moduleName);
            
            // Resolve module alias (fix QR Scanner issue)
            const resolvedPath = this.modulePaths[moduleName] || `./modules/${moduleName}/module.js`;
            const resolvedName = Object.keys(this.modulePaths).find(key => 
                this.modulePaths[key] === resolvedPath
            ) || moduleName;
            
            console.log('[DREAM.load] Resolved:', resolvedName, '->', resolvedPath);
            
            try {
                // Check cache first
                if (this.cache.has(resolvedName)) {
                    console.log('[DREAM] Loading from cache:', resolvedName);
                    const cached = this.cache.get(resolvedName);
                    if (window.app && typeof window.app.loadModule === 'function') {
                        return window.app.loadModule(resolvedName, params, cached);
                    }
                }
                
                // Load module
                const module = await import(resolvedPath);
                this.cache.set(resolvedName, module);
                this.modules.set(resolvedName, module);
                
                console.log('[DREAM] Module loaded:', resolvedName);
                this.showToast(`Module ${resolvedName} loaded`, 'success');
                
                if (window.app && typeof window.app.loadModule === 'function') {                    return window.app.loadModule(resolvedName, params, module);
                }
                
            } catch (err) {
                console.error('[DREAM] Module load error:', moduleName, err);
                this.showToast(`Gagal memuat modul ${moduleName}`, 'error');
                this.hapticFeedback('error');
                this.trackEvent('module_error', { 
                    module: moduleName, 
                    error: err.message 
                });
                
                // Fallback to home
                if (moduleName !== 'home') {
                    console.log('[DREAM] Fallback to home module');
                    setTimeout(() => this.load('home'), 1000);
                }
            }
        },
        
        // ============================================================
        // TOAST NOTIFICATIONS
        // ============================================================
        
        showToast: function(message, type = 'info', duration = 3000) {
            const container = document.getElementById('toast-container');
            if (!container) {
                console.log('[TOAST]', message, type);
                return;
            }
            
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.style.cssText = `
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(16, 185, 129, 0.3);
                border-radius: 12px;
                padding: 1rem 1.5rem;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
                margin-bottom: 8px;
                color: #e2e8f0;
                font-size: 0.875rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                opacity: 1;
                transform: translateX(0);
                transition: all 0.3s ease-in-out;
            `;            
            // Icon based on type
            const icons = {
                success: '✓',
                error: '✕',
                warning: '⚠',
                info: 'ℹ'
            };
            
            toast.innerHTML = `
                <span style="color: ${this.getTypeColor(type)}">${icons[type] || icons.info}</span>
                <span>${message}</span>
            `;
            
            container.appendChild(toast);
            
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(100%)';
                setTimeout(() => toast.remove(), 300);
            }, duration);
        },
        
        getTypeColor: function(type) {
            const colors = {
                success: '#10b981',
                error: '#ef4444',
                warning: '#f59e0b',
                info: '#3b82f6'
            };
            return colors[type] || colors.info;
        },
        
        // ============================================================
        // HAPTIC FEEDBACK (Mobile)
        // ============================================================
        
        hapticFeedback: function(pattern = 'light') {
            if ('vibrate' in navigator) {
                const patterns = {
                    light: 10,
                    medium: 20,
                    heavy: [30, 50, 30],
                    success: [50, 100, 50],
                    error: [100, 50, 100],
                    warning: [50, 50, 50]
                };
                navigator.vibrate(patterns[pattern] || patterns.light);
            }
        },        
        // ============================================================
        // ANALYTICS
        // ============================================================
        
        trackEvent: function(eventName, data = {}) {
            const payload = {
                event: eventName,
                data: data,
                userId: this.state.user?.id || 'guest',
                sessionId: this.state.session || 'none',
                timestamp: new Date().toISOString(),
                url: window.location.href,
                module: this.state.currentModule
            };
            
            console.log('[ANALYTICS]', payload);
            
            if (window.ANALYTICS) {
                window.ANALYTICS.track(eventName, payload);
            }
        },
        
        // ============================================================
        // ERROR BOUNDARY
        // ============================================================
        
        setupErrorBoundary: function() {
            window.addEventListener('error', (event) => {
                console.error('[GLOBAL ERROR]', event.error);
                this.showToast('Terjadi kesalahan sistem', 'error');
                this.trackEvent('error', {
                    message: event.error?.message,
                    stack: event.error?.stack,
                    url: window.location.href
                });
            });
            
            window.addEventListener('unhandledrejection', (event) => {
                console.error('[UNHANDLED REJECTION]', event.reason);
                this.showToast('Gagal memuat data', 'warning');
            });
        },
        
        // ============================================================
        // UTILITY FUNCTIONS
        // ============================================================
        
        isOnline: function() {
            return navigator.onLine;        },
        
        getNetworkInfo: function() {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (connection) {
                return {
                    type: connection.effectiveType || 'unknown',
                    downlink: connection.downlink || 0,
                    rtt: connection.rtt || 0
                };
            }
            return { type: this.isOnline() ? 'online' : 'offline' };
        },
        
        async getBatteryInfo: function() {
            if ('getBattery' in navigator) {
                try {
                    const battery = await navigator.getBattery();
                    return {
                        level: battery.level,
                        charging: battery.charging
                    };
                } catch (err) {
                    console.warn('[BATTERY] Not available');
                }
            }
            return null;
        },
        
        clearCache: function() {
            this.cache.clear();
            this.modules.clear();
            console.log('[DREAM] Cache cleared');
            this.showToast('Cache dibersihkan', 'info');
        },
        
        // ============================================================
        // KEYBOARD SHORTCUTS
        // ============================================================
        
        setupKeyboardShortcuts: function() {
            document.addEventListener('keydown', (e) => {
                // Ctrl+T - Toggle Theme
                if (e.ctrlKey && e.key === 't') {
                    e.preventDefault();
                    this.toggleTheme();
                }
                
                // Escape - Close current module (if app exists)
                if (e.key === 'Escape' && window.app?.state?.currentModule) {                    if (window.app.closeCurrentModule) {
                        window.app.closeCurrentModule();
                    }
                    this.showToast('Kembali ke Dashboard', 'info');
                }
                
                // F12 - Toggle Performance Monitor (Dev)
                if (e.key === 'F12') {
                    e.preventDefault();
                    const monitor = document.getElementById('performance-monitor');
                    if (monitor) {
                        monitor.classList.toggle('hidden');
                    }
                }
            });
        }
    };
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.DREAM.init();
            window.DREAM.setupKeyboardShortcuts();
        });
    } else {
        window.DREAM.init();
        window.DREAM.setupKeyboardShortcuts();
    }
    
    console.log('✅ [DREAM] Global object initialized');
    console.log('🕌 Dream OS 2026 Version:', window.DREAM.version);
    console.log('💚 Built with Bismillah by Dream OS Team');
    
})();
