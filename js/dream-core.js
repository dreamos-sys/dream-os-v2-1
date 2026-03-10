/**
 * DREAM CORE ENGINE 2026 - ENTERPRISE EDITION
 * Main Application Core & Module Orchestrator
 * 
 * Features:
 * - Dynamic module loading
 * - State management
 * - Navigation system
 * - Error handling
 * - Performance monitoring
 * 
 * Bi idznillah 💚
 */

'use strict';

// ============================================================================
// GLOBAL DREAM OBJECT - Main API
// ============================================================================

window.DREAM = {
    version: '2026.1.0',
    env: 'production', // tambahkan properti env
    state: {
        currentModule: 'home',
        user: null,
        config: {},
        modules: new Map(),
        history: []
    },
    
    // Module loading
    load: null,
    
    // Utilities
    utils: {
        showToast: null,
        showModal: null,
        escapeHTML: null
    },
    
    // Config
    config: {
        modules: {
            home: { path: './modules/home/module.js', title: 'Home' },
            sekuriti: { path: './modules/sekuriti/module.js', title: 'Sekuriti' },
            qr: { path: './modules/qr-scanner/module.js', title: 'QR Scanner' },
            settings: { path: './modules/settings/module.js', title: 'Settings' }
        }
    }
};

// ============================================================================
// LOGGING SYSTEM (untuk Ghost Module)
// ============================================================================

// Override console untuk menyimpan log ke localStorage
const originalError = console.error;
const originalWarn = console.warn;
const originalLog = console.log;

function saveLog(level, args) {
    try {
        const logs = JSON.parse(localStorage.getItem('dreamos-logs') || '[]');
        logs.push({
            timestamp: new Date().toLocaleTimeString(),
            level,
            message: args.map(a => String(a)).join(' ')
        });
        if (logs.length > 100) logs.shift();
        localStorage.setItem('dreamos-logs', JSON.stringify(logs));
    } catch (e) {}
}

console.error = (...args) => {
    saveLog('ERROR', args);
    originalError.apply(console, args);
};

console.warn = (...args) => {
    saveLog('WARN', args);
    originalWarn.apply(console, args);
};

console.log = (...args) => {
    saveLog('INFO', args);
    originalLog.apply(console, args);
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Show toast notification
 */
function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) {
        console.warn('[DREAM] Toast container not found');
        return;
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    toast.innerHTML = `
        <div style="display:flex;align-items:center;gap:0.75rem;padding:1rem;background:rgba(15,23,42,0.95);border-radius:12px;border-left:4px solid ${
            type === 'error' ? '#ef4444' : 
            type === 'warning' ? '#f59e0b' : 
            type === 'success' ? '#10b981' : '#3b82f6'
        };backdrop-filter:blur(10px);box-shadow:0 10px 40px rgba(0,0,0,0.3);max-width:350px;">
            <span style="font-size:1.5rem;">${icons[type] || icons.info}</span>
            <div style="flex:1;">
                <div style="font-weight:700;font-size:0.75rem;text-transform:uppercase;color:${
                    type === 'error' ? '#ef4444' : 
                    type === 'warning' ? '#f59e0b' : 
                    type === 'success' ? '#10b981' : '#3b82f6'
                };margin-bottom:0.25rem;">${type}</div>
                <div style="color:#e2e8f0;font-size:0.875rem;">${message}</div>
            </div>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease-out';
    }, 10);
    
    // Remove after duration
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Show modal (placeholder)
 */
function showModal(title, content, options = {}) {
    console.log('[DREAM] Modal:', title, content, options);
    // TODO: Implement modal UI
}

// Expose utilities
window.DREAM.utils.showToast = showToast;
window.DREAM.utils.escapeHTML = escapeHTML;
window.DREAM.utils.showModal = showModal;

// ============================================================================
// MODULE LOADER
// ============================================================================

/**
 * Load a module dynamically
 * @param {string} moduleName - Name of the module to load
 */
async function loadModule(moduleName) {
    console.log(`[DREAM] Loading module: ${moduleName}`);
    
    const container = document.getElementById('dynamic-stage');
    const breadcrumb = document.getElementById('breadcrumb-container');
    const currentModuleName = document.getElementById('current-module-name');
    
    if (!container) {
        console.error('[DREAM] Container #dynamic-stage not found');
        showToast('Error: Container not found', 'error');
        return;
    }
    
    try {
        // Show loading state
        container.innerHTML = `
            <div style="text-align:center;padding:4rem 1rem;">
                <div style="width:50px;height:50px;margin:0 auto 1rem;border:4px solid rgba(16,185,129,0.2);border-top-color:#10b981;border-radius:50%;animation:spin 1s linear infinite;"></div>
                <p style="color:#94a3b8;font-size:0.875rem;">Loading module...</p>
            </div>
        `;
        
        // Update navigation active state
        updateNavigationState(moduleName);
        
        // Get module config
        const moduleConfig = window.DREAM.config.modules[moduleName];
        
        if (!moduleConfig) {
            throw new Error(`Module "${moduleName}" not found in config`);
        }
        
        // Try to load module
        let module;
        
        try {
            module = await import(moduleConfig.path);
        } catch (importError) {
            console.warn(`[DREAM] Failed to load from ${moduleConfig.path}, trying fallback...`);
            
            // Fallback: Try to load from different paths
            const fallbackPaths = [
                `./modules/${moduleName}/module.js`,
                `/modules/${moduleName}/module.js`,
                `../modules/${moduleName}/module.js`
            ];
            
            for (const fallbackPath of fallbackPaths) {
                try {
                    module = await import(fallbackPath);
                    console.log(`[DREAM] Loaded from fallback: ${fallbackPath}`);
                    break;
                } catch (e) {
                    console.warn(`[DREAM] Fallback failed: ${fallbackPath}`);
                }
            }
            
            if (!module) {
                throw new Error(`Could not load module from any path`);
            }
        }
        
        // Get module content
        let content;
        
        if (module.default) {
            // Module has default export (function)
            if (typeof module.default === 'function') {
                content = await module.default({
                    container,
                    utils: window.DREAM.utils,
                    state: window.DREAM.state
                });
            } else {
                content = module.default;
            }
        } else if (module.render) {
            // Module has render function
            content = await module.render({
                container,
                utils: window.DREAM.utils,
                state: window.DREAM.state
            });
        } else {
            throw new Error('Module must export default function or render function');
        }
        
        // Inject content
        if (typeof content === 'string') {
            container.innerHTML = content;
        }
        
        // Update breadcrumb
        if (breadcrumb && currentModuleName) {
            breadcrumb.classList.remove('hidden');
            currentModuleName.textContent = moduleConfig.title || moduleName;
        }
        
        // Update state
        window.DREAM.state.currentModule = moduleName;
        window.DREAM.state.history.push({
            module: moduleName,
            timestamp: Date.now()
        });
        
        // Cache module
        window.DREAM.state.modules.set(moduleName, module);
        
        // Animate in
        setTimeout(() => {
            container.style.opacity = '1';
        }, 50);
        
        console.log(`[DREAM] Module "${moduleName}" loaded successfully`);
        
    } catch (error) {
        console.error('[DREAM] Module load error:', error);
        
        // Show error UI
        container.innerHTML = `
            <div style="max-width:400px;margin:4rem auto;text-align:center;">
                <div style="font-size:3rem;margin-bottom:1rem;">⚠️</div>
                <h3 style="font-size:1.25rem;font-weight:700;color:#ef4444;margin-bottom:0.5rem;">
                    Module Load Error
                </h3>
                <p style="font-size:0.875rem;color:#94a3b8;margin-bottom:1.5rem;">
                    Could not load module: <strong>${moduleName}</strong>
                </p>
                <div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:12px;padding:1rem;margin-bottom:1.5rem;text-align:left;">
                    <code style="font-size:0.75rem;color:#ef4444;word-break:break-all;">
                        ${escapeHTML(error.message)}
                    </code>
                </div>
                <button 
                    onclick="DREAM.load('home')" 
                    style="background:#10b981;color:#020617;padding:0.75rem 1.5rem;border:none;border-radius:8px;font-weight:700;cursor:pointer;">
                    Back to Home
                </button>
            </div>
        `;
        
        showToast(`Failed to load ${moduleName}`, 'error');
    }
}

/**
 * Update navigation active state
 */
function updateNavigationState(activeModule) {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const itemModule = item.getAttribute('data-module');
        
        if (itemModule === activeModule) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Expose load function
window.DREAM.load = loadModule;

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize DREAM Core
 */
async function initDreamCore() {
    console.log('[DREAM] Initializing Core Engine v' + window.DREAM.version);
    
    try {
        // Load default module (home)
        await loadModule('home');
        
        // Setup event listeners
        setupEventListeners();
        
        // Ghost mode activation (5 taps on header)
        let ghostTapCount = 0;
        const header = document.getElementById('app-header');
        if (header) {
            header.addEventListener('click', () => {
                ghostTapCount++;
                if (ghostTapCount === 5) {
                    ghostTapCount = 0;
                    const pwd = prompt('👻 Developer access:');
                    if (pwd === 'dreamos2026') {
                        if (!DREAM.config.modules.ghost) {
                            DREAM.config.modules.ghost = { 
                                path: '../modules/ghost/module.js', 
                                title: 'Ghost' 
                            };
                        }
                        DREAM.load('ghost');
                        DREAM.utils.showToast('Ghost mode activated', 'info');
                    } else {
                        alert('Access denied');
                    }
                }
                setTimeout(() => ghostTapCount = 0, 3000);
            });
        }
        
        // Initialize features
        initBatteryMonitor();
        initNetworkMonitor();
        initPrayerTimeMonitor();
        
        console.log('[DREAM] ✅ Core Engine initialized successfully');
        
    } catch (error) {
        console.error('[DREAM] Initialization error:', error);
        showToast('System initialization failed', 'error');
    }
}

/**
 * Setup global event listeners
 */
function setupEventListeners() {
    // AI Button
    const aiButton = document.getElementById('btn-magic-ai');
    if (aiButton) {
        aiButton.addEventListener('click', () => {
            showToast('AI Assistant coming soon! 🤖', 'info');
        });
    }
    
    // Back button (browser)
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.module) {
            loadModule(event.state.module);
        }
    });
}

/**
 * Initialize battery monitor
 */
async function initBatteryMonitor() {
    const batteryLevel = document.getElementById('battery-level');
    
    if (!batteryLevel) return;
    
    try {
        if ('getBattery' in navigator) {
            const battery = await navigator.getBattery();
            
            const updateBattery = () => {
                const level = Math.round(battery.level * 100);
                batteryLevel.textContent = `${level}%`;
                
                // Update icon based on level
                const batteryIcon = document.querySelector('#battery-indicator i');
                if (batteryIcon) {
                    if (level > 80) batteryIcon.className = 'fas fa-battery-full';
                    else if (level > 50) batteryIcon.className = 'fas fa-battery-three-quarters';
                    else if (level > 20) batteryIcon.className = 'fas fa-battery-half';
                    else batteryIcon.className = 'fas fa-battery-quarter';
                }
            };
            
            updateBattery();
            battery.addEventListener('levelchange', updateBattery);
            battery.addEventListener('chargingchange', updateBattery);
        }
    } catch (error) {
        console.warn('[DREAM] Battery API not available:', error);
    }
}

/**
 * Initialize network monitor
 */
function initNetworkMonitor() {
    const networkType = document.getElementById('network-type');
    
    if (!networkType) return;
    
    const updateNetwork = () => {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        if (connection) {
            const type = connection.effectiveType || connection.type;
            networkType.textContent = type ? type.toUpperCase() : 'WiFi';
        } else {
            networkType.textContent = navigator.onLine ? 'WiFi' : 'Offline';
        }
    };
    
    updateNetwork();
    
    window.addEventListener('online', updateNetwork);
    window.addEventListener('offline', updateNetwork);
    
    if (navigator.connection) {
        navigator.connection.addEventListener('change', updateNetwork);
    }
}

/**
 * Initialize prayer time monitor
 */
function initPrayerTimeMonitor() {
    const prayerDisplay = document.getElementById('prayer-time-display');
    
    if (!prayerDisplay) return;
    
    const updatePrayerTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        
        let prayerName;
        if (hours >= 4 && hours < 6) prayerName = 'Subuh';
        else if (hours >= 6 && hours < 12) prayerName = 'Dhuha';
        else if (hours >= 12 && hours < 15) prayerName = 'Dzuhur';
        else if (hours >= 15 && hours < 18) prayerName = 'Ashar';
        else if (hours >= 18 && hours < 19) prayerName = 'Maghrib';
        else if (hours >= 19 && hours < 21) prayerName = "Isya'";
        else prayerName = 'Tahajud';
        
        prayerDisplay.textContent = `${prayerName} ${hours}:${minutes}`;
    };
    
    updatePrayerTime();
    setInterval(updatePrayerTime, 60000); // Update every minute
}

// ============================================================================
// AUTO-INITIALIZE ON DOM READY
// ============================================================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDreamCore);
} else {
    // DOM already loaded
    initDreamCore();
}

// ============================================================================
// EXPORT FOR MODULES
// ============================================================================

export default window.DREAM;
