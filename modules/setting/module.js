/**
 * modules/setting/module.js
 * Dream OS v2.1 - Settings Module
 */

export async function render({ container, user, supabase }) {
    const currentTheme = localStorage.getItem('dreamos-theme') || 'dark-glass';
    
    return `
        <div class="module-container active" id="module-settings">
            <header class="glass-header">
                <div class="status-bar">
                    <span>📍 DEPOK CORE</span>
                    <span>ISO 27001 ✅</span>
                </div>
                <div class="islamic-header">
                    <h1 class="bismillah">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
                    <p class="shalawat">اَللهم صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</p>
                </div>
            </header>

            <main style="padding:16px;padding-bottom:140px;">
                <h2 class="text-2xl font-bold text-emerald-400 mb-6">⚙️ Settings</h2>
                
                <div class="glass-card p-6 mb-6">
                    <h3 class="text-lg font-semibold mb-4">🎨 Theme</h3>
                    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;">
                        <div class="glass-card p-4" style="cursor:pointer;border:2px solid ${currentTheme === 'dark-glass' ? 'var(--color-primary)' : 'transparent'}" onclick="setTheme('dark-glass')">
                            <div style="font-size:2rem;margin-bottom:8px;">🌙</div>
                            <div style="font-size:0.875rem;font-weight:600;">Dark Glass</div>
                        </div>
                        <div class="glass-card p-4" style="cursor:pointer;border:2px solid ${currentTheme === 'light-minimal' ? 'var(--color-primary)' : 'transparent'}" onclick="setTheme('light-minimal')">
                            <div style="font-size:2rem;margin-bottom:8px;">☀️</div>
                            <div style="font-size:0.875rem;font-weight:600;">Light Minimal</div>
                        </div>
                        <div class="glass-card p-4" style="cursor:pointer;border:2px solid ${currentTheme === 'cyberpunk' ? 'var(--color-primary)' : 'transparent'}" onclick="setTheme('cyberpunk')">
                            <div style="font-size:2rem;margin-bottom:8px;">🤖</div>
                            <div style="font-size:0.875rem;font-weight:600;">Cyberpunk</div>
                        </div>
                        <div class="glass-card p-4" style="cursor:pointer;border:2px solid ${currentTheme === 'islamic-modern' ? 'var(--color-primary)' : 'transparent'}" onclick="setTheme('islamic-modern')">
                            <div style="font-size:2rem;margin-bottom:8px;">🕌</div>
                            <div style="font-size:0.875rem;font-weight:600;">Islamic Modern</div>
                        </div>
                    </div>
                </div>

                <div class="glass-card p-6 mb-6">
                    <h3 class="text-lg font-semibold mb-4">🔧 System</h3>
                    <div class="space-y-4">
                        <button onclick="clearCache()" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-left hover:bg-slate-700 transition">                            🗑️ Clear Cache
                        </button>
                        <button onclick="exportData()" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-left hover:bg-slate-700 transition">
                            📤 Export Data
                        </button>
                        <button onclick="showSystemInfo()" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-left hover:bg-slate-700 transition">
                            ℹ️ System Info
                        </button>
                    </div>
                </div>

                <div class="glass-card p-6">
                    <h3 class="text-lg font-semibold mb-4">📊 About</h3>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-slate-400">Version</span>
                            <span class="text-white">v2.1 Sovereign Enterprise</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-slate-400">Build</span>
                            <span class="text-white">2026.1.0</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-slate-400">Modules</span>
                            <span class="text-white">19</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-slate-400">Storage</span>
                            <span class="text-white">${localStorage.length} items</span>
                        </div>
                    </div>
                </div>
            </main>

            <nav class="bottom-nav">
                <div class="nav-container">
                    <button class="nav-item" data-nav="home" onclick="window.loadModule('home')">
                        <i class="fas fa-home"></i><span>Home</span>
                    </button>
                    <button class="nav-item" data-nav="booking" onclick="window.loadModule('booking')">
                        <i class="fas fa-calendar-check"></i><span>Booking</span>
                    </button>
                    <button class="nav-item active" data-nav="settings" onclick="window.loadModule('settings')">
                        <i class="fas fa-sliders"></i><span>Settings</span>
                    </button>
                    <button class="nav-item" data-nav="profile" onclick="window.loadModule('profile')">
                        <i class="fas fa-user"></i><span>Profile</span>
                    </button>
                </div>
            </nav>        </div>
    `;
}

export async function afterRender() {
    console.log('⚙️ [SETTINGS] Module loaded');
    
    window.setTheme = function(theme) {
        localStorage.setItem('dreamos-theme', theme);
        if (window.ThemeManager) {
            window.ThemeManager.set?.(theme);
        }
        if (window.toast) {
            window.toast(`🎨 Theme changed to ${theme}`, 'success');
        }
        window.loadModule('settings');
    };
    
    window.clearCache = function() {
        localStorage.clear();
        if (window.toast) {
            window.toast('✅ Cache cleared! Reload...', 'success');
        }
        setTimeout(() => location.reload(), 1000);
    };
    
    window.exportData = function() {
        const data = {
            theme: localStorage.getItem('dreamos-theme'),
            bookings: localStorage.getItem('dreamos-bookings'),
            reports: localStorage.getItem('dreamos-security-reports')
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dreamos-backup-${Date.now()}.json`;
        a.click();
        if (window.toast) {
            window.toast('📤 Data exported!', 'success');
        }
    };
    
    window.showSystemInfo = function() {
        const info = {
            version: 'v2.1',
            modules: Object.keys(window.MODULES || {}).length,
            platform: navigator.platform,
            online: navigator.onLine,
            storage: localStorage.length        };
        alert('System Info:\n' + JSON.stringify(info, null, 2));
    };
}

export function cleanup() {
    console.log('⚙️ [SETTINGS] Module cleanup');
    delete window.setTheme;
    delete window.clearCache;
    delete window.exportData;
    delete window.showSystemInfo;
}
