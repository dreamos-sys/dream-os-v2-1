/**
 * ════════════════════════════════════════════
 * SHELL.JS - DREAM OS v2.1 (FINAL VERSION)
 * Actually Loads Module Files!
 * ════════════════════════════════════════════ */

'use strict';

// 19 MODULES
const MODULES = {
    'home': { icon: 'fa-home', color: '#10b981', label: 'Home', subtitle: 'Dashboard' },
    'ai-panel': { icon: 'fa-brain', color: '#8b5cf6', label: 'AI Panel', subtitle: 'Neural Control' },
    'ai-speak': { icon: 'fa-microchip', color: '#06b6d4', label: 'AI Speak', subtitle: 'Voice Synthesis' },
    'prediction': { icon: 'fa-chart-line', color: '#10b981', label: 'Prediction', subtitle: 'Forecast Analytics' },
    'booking': { icon: 'fa-calendar-check', color: '#3b82f6', label: 'Booking', subtitle: 'Pemesanan Ruangan' },
    'asset': { icon: 'fa-cubes', color: '#f59e0b', label: 'Asset', subtitle: 'Inventaris & Gudang' },
    'stok': { icon: 'fa-boxes', color: '#ef4444', label: 'Stok', subtitle: 'Peralatan & Inventaris' },
    'maintenance': { icon: 'fa-wrench', color: '#64748b', label: 'Maintenance', subtitle: 'Perbaikan & Kerusakan' },
    'sekuriti': { icon: 'fa-shield-halved', color: '#0ea5e9', label: 'Sekuriti', subtitle: 'Keamanan & Kehilangan' },
    'k3': { icon: 'fa-triangle-exclamation', color: '#eab308', label: 'K3', subtitle: 'Keselamatan & Kesehatan' },
    'k3-officer': { icon: 'fa-user-shield', color: '#059669', label: 'K3 Officer', subtitle: 'Safety Personnel' },
    'janitor-indoor': { icon: 'fa-broom', color: '#84cc16', label: 'Janitor In', subtitle: 'Kebersihan Indoor' },
    'janitor-outdoor': { icon: 'fa-leaf', color: '#22c55e', label: 'Janitor Out', subtitle: 'Kebersihan Outdoor' },
    'weather': { icon: 'fa-cloud-sun', color: '#f97316', label: 'Weather', subtitle: 'Climate Monitor' },
    'command-center': { icon: 'fa-chess-queen', color: '#a855f7', label: 'Command Center', subtitle: 'Pusat Kendali' },
    'settings': { icon: 'fa-sliders', color: '#64748b', label: 'Settings', subtitle: 'System Config' },
    'profile': { icon: 'fa-user', color: '#ec4899', label: 'Profile', subtitle: 'User Account' },
    'qr': { icon: 'fa-qrcode', color: '#14b8a6', label: 'QR Scanner', subtitle: 'Scan & Generate' },
    'reports': { icon: 'fa-file-lines', color: '#3b82f6', label: 'Reports', subtitle: 'Laporan Terpusat' },
    'ghost': { icon: 'fa-ghost', color: '#8b5cf6', label: 'Ghost Core', subtitle: 'Developer Access', hidden: true }
};

window.MODULES = MODULES;
window.currentModule = 'home';

// SLIDER
let currentSlide = 0;
let slideInterval = null;
const ANNOUNCEMENTS = [
    { id: 1, title: '📢 Pengumuman Admin', content: 'Sanlat hari ke-2 SMP', icon: '📢', color: '#10b981' },
    { id: 2, title: '🔒 Security Update', content: 'Sistem keamanan ditingkatkan', icon: '🔒', color: '#3b82f6' },
    { id: 3, title: '📊 Booking System', content: 'Anti-double booking', icon: '📊', color: '#8b5cf6' },
    { id: 4, title: '⚠️ K3 Alert', content: 'Laporan otomatis ke Maintenance', icon: '⚠️', color: '#f59e0b' },
    { id: 5, title: '🧹 Janitor Schedule', content: 'Jadwal kebersihan updated', icon: '🧹', color: '#22c55e' },
    { id: 6, title: '📦 Inventory', content: 'Stok menipis auto notif', icon: '📦', color: '#ef4444' },
    { id: 7, title: '🎉 Dream OS v2.1', content: 'Built with 💚 Bi idznillah', icon: '🎉', color: '#10b981' }
];

window.goToSlide = function(index) {
    currentSlide = index;    document.querySelectorAll('[data-slide]').forEach((s,i) => s.style.display = i===index ? 'block' : 'none');
    document.querySelectorAll('[data-slide]').forEach((s,i) => {
        const btn = document.querySelectorAll('[data-slide]')[i]?.parentNode?.querySelectorAll('button')?.[i];
        if(btn) btn.style.background = i===index ? 'var(--color-primary)' : 'var(--text-subtle)';
    });
};

function startSlideShow() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % ANNOUNCEMENTS.length;
        window.goToSlide(currentSlide);
    }, 7000);
}

// GHOST TRIGGER
let ghostTaps = 0;
let ghostTimeout = null;

function setupGhostTrigger() {
    const zone = document.getElementById('ghost-trigger-zone');
    if (!zone) return;
    
    const newZone = zone.cloneNode(true);
    zone.parentNode.replaceChild(newZone, zone);
    
    newZone.addEventListener('click', () => {
        ghostTaps++;
        if ('vibrate' in navigator) navigator.vibrate(30);
        
        if (ghostTimeout) clearTimeout(ghostTimeout);
        
        if (ghostTaps === 5) {
            ghostTaps = 0;
            setTimeout(() => {
                const code = prompt('🔑 GHOST ACCESS CODE:');
                if (code === 'dreamos2026') {
                    if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
                    toast('👻 Ghost Mode Activated!', 'success');
                    loadModule('ghost');
                } else if (code !== null) {
                    toast('❌ Access Denied', 'error');
                }
            }, 200);
            return;
        }
        
        ghostTimeout = setTimeout(() => ghostTaps = 0, 2000);
    });
}
// RENDER HOME - HARDCODED
function renderHome() {
    const categories = {
        'ai': { label: '🧠 Neural Intelligence', modules: ['ai-panel', 'ai-speak', 'prediction'] },
        'ops': { label: '⚙️ Operations', modules: ['booking', 'asset', 'stok', 'maintenance'] },
        'security': { label: '🛡️ Security & Safety', modules: ['sekuriti', 'k3', 'k3-officer'] },
        'facility': { label: '🏢 Facility', modules: ['janitor-indoor', 'janitor-outdoor', 'weather'] },
        'system': { label: '🔧 System', modules: ['command-center', 'settings', 'profile', 'qr', 'reports'] }
    };

    return `
        <div class="module-container active" id="module-home">
            <header class="glass-header" id="ghost-trigger-zone" style="cursor:pointer;">
                <div class="status-bar">
                    <span>📍 DEPOK CORE | <span id="clock">${new Date().toLocaleTimeString('id-ID', {hour:'2-digit',minute:'2-digit'})}</span></span>
                    <span>ISO 27001-55001 ✅</span>
                </div>
                <div class="islamic-header">
                    <h1 class="bismillah">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
                    <p class="shalawat">اَللهم صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ</p>
                    <p style="font-size:10px;color:var(--text-muted);margin-top:8px;letter-spacing:2px;">THE POWER SOUL OF SHALAWAT</p>
                </div>
            </header>

            <main style="padding:16px;padding-bottom:140px;">
                <div class="glass-card" style="margin-bottom:16px;overflow:hidden;">
                    <div id="slide-container">
                        ${ANNOUNCEMENTS.map((slide, i) => `
                            <div data-slide="${i}" style="padding:20px;text-align:center;${i===0?'':'display:none;'}">
                                <div style="font-size:3rem;margin-bottom:12px;">${slide.icon}</div>
                                <h3 style="color:${slide.color};font-size:1.1rem;margin-bottom:8px;">${slide.title}</h3>
                                <p style="color:var(--text-muted);font-size:0.875rem;line-height:1.6;">${slide.content}</p>
                            </div>
                        `).join('')}
                    </div>
                    <div style="display:flex;justify-content:center;gap:8px;margin-top:16px;">
                        ${ANNOUNCEMENTS.map((_,i) => `<button onclick="window.goToSlide(${i})" style="width:10px;height:10px;border-radius:50%;border:none;background:${i===0?'var(--color-primary)':'var(--text-subtle)'};cursor:pointer;"></button>`).join('')}
                    </div>
                </div>

                <div class="neural-status">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                        <h3 style="color:var(--color-primary);font-size:0.9rem;font-weight:600;">
                            <i class="fas fa-network-wired" style="margin-right:6px;"></i> NEURAL CORE ACTIVE
                        </h3>
                        <span style="color:var(--color-primary);font-size:10px;">SECURE</span>
                    </div>
                </div>
                <div class="stats-grid">
                    <div class="stat-card"><div class="stat-label">Total Modules</div><div class="stat-value" style="color:var(--color-primary);">19</div></div>
                    <div class="stat-card"><div class="stat-label">Active Users</div><div class="stat-value" style="color:var(--color-secondary);">24</div></div>
                    <div class="stat-card"><div class="stat-label">Pending</div><div class="stat-value" style="color:#f59e0b;">3</div></div>
                </div>

                ${Object.entries(categories).map(([cat,data]) => `
                    <div class="category-section">
                        <h4 class="category-title">${data.label}</h4>
                        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;">
                            ${data.modules.map(key => MODULES[key] ? `
                                <div class="glass-card" onclick="window.loadModule('${key}')" style="cursor:pointer;">
                                    <div style="width:70px;height:70px;background:${MODULES[key].color};border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;box-shadow:0 8px 20px rgba(0,0,0,0.3);">
                                        <i class="fas ${MODULES[key].icon}" style="color:#ffffff;font-size:2rem;"></i>
                                    </div>
                                    <div style="font-size:13px;font-weight:700;color:var(--text-primary);text-align:center;">${MODULES[key].label}</div>
                                    <div style="font-size:10px;color:var(--text-muted);text-align:center;">${MODULES[key].subtitle}</div>
                                </div>
                            ` : '').join('')}
                        </div>
                    </div>
                `).join('')}
            </main>

            <nav class="bottom-nav">
                <div class="nav-container">
                    <button class="nav-item active" data-nav="home" onclick="window.loadModule('home')">
                        <i class="fas fa-home"></i><span>Home</span>
                    </button>
                    <button class="nav-item" data-nav="booking" onclick="window.loadModule('booking')">
                        <i class="fas fa-calendar-check"></i><span>Booking</span>
                    </button>
                    <button class="nav-item" data-nav="sekuriti" onclick="window.loadModule('sekuriti')">
                        <i class="fas fa-shield-halved"></i><span>Security</span>
                    </button>
                    <button class="nav-item" data-nav="settings" onclick="window.loadModule('settings')">
                        <i class="fas fa-sliders"></i><span>Settings</span>
                    </button>
                </div>
            </nav>
        </div>
    `;
}

// MODULE LOADER - ACTUALLY LOADS FILES!
async function loadModule(moduleName) {
    const app = document.getElementById('app-shell');
    if (!app) {
        console.error('❌ app-shell not found!');
        return;    }

    console.log(`🔄 Loading module: ${moduleName}`);
    
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navItem = document.querySelector(`[data-nav="${moduleName}"]`);
    if (navItem) navItem.classList.add('active');
    
    if ('vibrate' in navigator) navigator.vibrate(30);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Home module - HARDCODED
    if (moduleName === 'home') {
        app.innerHTML = renderHome();
        setTimeout(() => { startSlideShow(); setupGhostTrigger(); }, 500);
        window.currentModule = 'home';
        return;
    }
    
    // Show loading
    app.innerHTML = `
        <div class="module-container active">
            <div style="text-align:center;padding:60px 20px;">
                <div class="loader"></div>
                <p style="margin-top:1rem;color:var(--color-primary);">Loading ${moduleName}...</p>
            </div>
        </div>
    `;
    
    try {
        const mod = MODULES[moduleName];
        if (!mod) throw new Error(`Module "${moduleName}" not found`);
        
        // LOAD MODULE FILE!
        const modulePath = `./modules/${moduleName}/module.js?t=${Date.now()}`;
        console.log(`📂 Loading: ${modulePath}`);
        
        const module = await import(modulePath);
        console.log(`✅ Module loaded: ${moduleName}`, module);
        
        if (!module.render) {
            throw new Error(`Module "${moduleName}" missing render() function`);
        }
        
        // Render module
        const html = await module.render({
            container: app,
            user: window.DREAM?.state?.user,
            supabase: window.supabase
        });        
        app.innerHTML = html;
        console.log(`✅ Module rendered: ${moduleName}`);
        
        // Call afterRender if exists
        if (module.afterRender) {
            await module.afterRender({
                container: app,
                user: window.DREAM?.state?.user,
                supabase: window.supabase
            });
            console.log(`✅ afterRender called: ${moduleName}`);
        }
        
        window.currentModule = moduleName;
        
    } catch (error) {
        console.error(`❌ Module load error: ${moduleName}`, error);
        
        // Show error with fallback to placeholder
        const mod = MODULES[moduleName];
        app.innerHTML = `
            <div class="module-container active">
                <div style="text-align:center;padding:60px 20px;">
                    <div style="width:80px;height:80px;background:linear-gradient(135deg,${mod?.color||'#10b981'},var(--color-secondary));border-radius:20px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
                        <i class="fas ${mod?.icon||'fa-circle'}" style="color:white;font-size:2.5rem;"></i>
                    </div>
                    <h2 style="color:var(--text-primary);font-size:1.5rem;margin-bottom:10px;">${mod?.label||moduleName}</h2>
                    <p style="color:var(--text-muted);margin-bottom:20px;">${mod?.subtitle||'Module'}</p>
                    <div style="background:rgba(239,68,68,0.1);padding:1rem;border-radius:8px;margin-bottom:20px;text-align:left;font-size:0.75rem;color:var(--color-error);max-width:400px;margin-left:auto;margin-right:auto;">
                        <strong>⚠️ Module Load Error:</strong><br>
                        ${error.message}<br><br>
                        <strong>Path:</strong><br>
                        ./modules/${moduleName}/module.js<br><br>
                        <strong>Possible fixes:</strong><br>
                        1. Check file exists on GitHub<br>
                        2. Check file has export render()<br>
                        3. Check browser console for details
                    </div>
                    <button class="btn-back" onclick="window.loadModule('home')">← Back to Home</button>
                </div>
            </div>
        `;
    }
}

// TOAST
function toast(msg, type = 'success') {
    const icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️' };
    const el = document.createElement('div');    el.className = `toast toast-${type}`;
    el.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
    const container = document.getElementById('toast-container');
    if (container) {
        container.appendChild(el);
        setTimeout(() => { el.style.opacity='0'; setTimeout(() => el.remove(), 350); }, 3500);
    }
}

window.toast = toast;
window.loadModule = loadModule;

// INIT
function init() {
    try {
        console.log('🚀 [DREAM OS] v2.1 Initializing...');
        console.log('📦 Modules:', Object.keys(MODULES).length);
        
        loadModule('home');
        
        setTimeout(() => {
            const loading = document.getElementById('loading-screen');
            if (loading) {
                loading.classList.add('hide');
                console.log('✅ Loading screen hidden');
            }
        }, 1500);
        
        console.log('✅ [DREAM OS] Ready!');
        console.log('💡 Tip: Open console to see module load logs');
        
    } catch (error) {
        console.error('❌ Init error:', error);
        document.getElementById('loading-screen').innerHTML = `
            <div style="text-align:center;padding:20px;">
                <h2 style="color:#ef4444;">Error Loading</h2>
                <p style="color:#94a3b8;">${error.message}</p>
                <button onclick="location.reload()" style="margin-top:20px;padding:10px 20px;background:#10b981;color:white;border:none;border-radius:8px;">Reload</button>
            </div>
        `;
    }
}

// Run
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
