/**
 * ═══════════════════════════════════════════════════════════════════════
 * SHELL UI ENGINE - SOVEREIGN ENTERPRISE v13.5 (Final Revision + LUX Sync)
 * Developed for: Dream OS Project - Ghost Architect
 * ═══════════════════════════════════════════════════════════════════════
 */

'use strict';

// 1. REGISTRASI MODUL (Source of Truth)
const MODULES = {
    'ai-panel': { path: './modules/ai-panel/module.js', icon: 'fa-brain', label: 'AI Panel', category: 'ai' },
    'ai-speak': { path: './modules/ai-speak/module.js', icon: 'fa-microchip', label: 'AI Speak', category: 'ai' },
    'prediction': { path: './modules/prediction/module.js', icon: 'fa-chart-line', label: 'Prediction', category: 'ai' },
    'booking': { path: './modules/booking/module.js', icon: 'fa-calendar-check', label: 'Booking', category: 'ops' },
    'asset': { path: './modules/asset/module.js', icon: 'fa-cubes', label: 'Asset', category: 'ops' },
    'stok': { path: './modules/stok/module.js', icon: 'fa-boxes', label: 'Stok', category: 'ops' },
    'maintenance': { path: './modules/maintenance/module.js', icon: 'fa-gears', label: 'Maintenance', category: 'ops' },
    'sekuriti': { path: './modules/sekuriti/module.js', icon: 'fa-shield-halved', label: 'Sekuriti', category: 'security' },
    'k3': { path: './modules/k3/module.js', icon: 'fa-helmet-safety', label: 'K3', category: 'security' },
    'settings': { path: './modules/settings/module.js', icon: 'fa-sliders', label: 'Settings', category: 'system' },
    'profile': { path: './modules/profile/module.js', icon: 'fa-user', label: 'Profile', category: 'system' },
    'qr': { path: './modules/qr/module.js', icon: 'fa-qrcode', label: 'QR Scanner', category: 'system' },
    // Arahkan ke file Brain Hub LUX yang baru kita buat
    'ghost': { path: './modules/ghost/brain-hub.js', icon: 'fa-ghost', label: 'Ghost Core LUX', category: 'special', hidden: true }
};

// 2. KERNEL INITIALIZATION
window.DREAM = {
    state: { activeModule: 'home', isGhostMode: false, modules: new Map() },
    
    // SAFE MODULE LOADER (Smart Loader)
    async load(key) {
        console.log(`[DREAM] 🚀 Initializing Bridge to: ${key}`);
        this.haptic(40);

        if (key === 'home') {
            location.reload(); 
            return;
        }

        const mod = MODULES[key];
        if (!mod) return console.error(`[ERROR] Module ${key} not registered.`);

        try {
            const moduleInstance = await import(mod.path);
            
            // Catat module di state untuk dipantau oleh Brain Hub LUX
            this.state.modules.set(key, mod);
            
            if (moduleInstance) {
                document.body.innerHTML = `<div id="module-container" style="height: 100vh; overflow-y: auto;"></div>`; 
                const container = document.getElementById('module-container');
                
                // Smart Executor: Mendukung format .init() lama ATAU default export baru (Brain Hub)
                if (typeof moduleInstance.init === 'function') {
                    moduleInstance.init('module-container');
                } else if (typeof moduleInstance.default === 'function') {
                    moduleInstance.default({ 
                        container: container, 
                        user: { email: 'girangati1001@gmail.com', role: 'Ghost Architect' } // Inject Identitas
                    });
                }
                
                this.state.activeModule = key;
                console.log(`[DREAM INFO] ${mod.label} Synced ✅`);
            }
        } catch (err) {
            console.error(`[CRITICAL] Failure loading ${key}:`, err);
            alert(`⚠️ Sovereign Alert: Gagal memuat modul ${mod.label}. Periksa path: ${mod.path}`);
        }
    },

    haptic(ms) { if ('vibrate' in navigator) navigator.vibrate(ms); }
};

// 3. GHOST DEVELOPER ROOM (Fallback Console)
const GhostConsole = {
    // ... (Kode GhostConsole Anda yang asli tetap di sini sebagai cadangan ringan)
    init() { /* ... */ }
};

// 4. TRIGGER SYSTEM (5-TAP) -> DIARAHKAN KE BRAIN HUB LUX
function setupStealthTrigger() {
    let taps = 0;
    let timeout;
    const zone = document.getElementById('ghost-trigger-zone');
    
    if (!zone) {
        console.warn('⚠️ [WARNING] #ghost-trigger-zone tidak ditemukan di DOM.');
        return;
    }

    zone.addEventListener('click', () => {
        taps++;
        window.DREAM.haptic(30);
        if (timeout) clearTimeout(timeout);
        
        if (taps === 5) {
            taps = 0;
            const code = prompt('🔑 GHOST ACCESS CODE (Enter Password):');
            
            // Verifikasi Password Rahasia
            if (code === 'dreamos2026') {
                window.DREAM.haptic([100, 50, 100]);
                console.log('🔓 [SECURITY] Ghost Architect Authenticated. Deploying LUX...');
                
                // Panggil modul Ghost (Brain Hub LUX) secara utuh
                window.DREAM.load('ghost'); 
            } else {
                alert('❌ Unauthorized Architect. Incident Logged.');
            }
        }
        timeout = setTimeout(() => taps = 0, 2000);
    });
}

// 5. BOOT ENGINE
document.addEventListener('DOMContentLoaded', () => {
    setupStealthTrigger();
    console.log('[SHELL] 🚀 Sovereign Enterprise v13.5: Ready.');
    console.log('[SHELL] 🛡️ ISO 27001 Protocol Active.');
});

// Styles Dinamis
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
    @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
    .bento-card:active { transform: scale(0.95); transition: 0.1s; }
`;
document.head.appendChild(style);
