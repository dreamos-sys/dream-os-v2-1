/**
 * ════════════════════════════════════════════
 * SHELL.JS - DREAM OS v2.1 COMPLETE
 * All Modules + Islamic Header + 7 Slides + Ghost
 * ════════════════════════════════════════════ */

'use strict';

// ════════════════════════════════════════════
// 19 MODULES COMPLETE LIST
// ════════════════════════════════════════════

const MODULES = {
    // AI & Intelligence (3)
    'ai-panel': { icon: 'fa-brain', color: '#8b5cf6', label: 'AI Panel', subtitle: 'Neural Control', category: 'ai' },
    'ai-speak': { icon: 'fa-microchip', color: '#06b6d4', label: 'AI Speak', subtitle: 'Voice Synthesis', category: 'ai' },
    'prediction': { icon: 'fa-chart-line', color: '#10b981', label: 'Prediction', subtitle: 'Forecast Analytics', category: 'ai' },
    
    // Operations (4)
    'booking': { icon: 'fa-calendar-check', color: '#3b82f6', label: 'Booking', subtitle: 'Pemesanan Ruangan', category: 'ops' },
    'asset': { icon: 'fa-cubes', color: '#f59e0b', label: 'Asset', subtitle: 'Inventaris & Gudang', category: 'ops' },
    'stok': { icon: 'fa-boxes', color: '#ef4444', label: 'Stok', subtitle: 'Peralatan & Inventaris', category: 'ops' },
    'maintenance': { icon: 'fa-wrench', color: '#64748b', label: 'Maintenance', subtitle: 'Perbaikan & Kerusakan', category: 'ops' },
    
    // Security & Safety (3)
    'sekuriti': { icon: 'fa-shield-halved', color: '#0ea5e9', label: 'Sekuriti', subtitle: 'Keamanan & Kehilangan', category: 'security' },
    'k3': { icon: 'fa-triangle-exclamation', color: '#eab308', label: 'K3', subtitle: 'Keselamatan & Kesehatan', category: 'security' },
    'k3-officer': { icon: 'fa-user-shield', color: '#059669', label: 'K3 Officer', subtitle: 'Safety Personnel', category: 'security' },
    
    // Facility (3)
    'janitor-indoor': { icon: 'fa-broom', color: '#84cc16', label: 'Janitor In', subtitle: 'Kebersihan Indoor', category: 'facility' },
    'janitor-outdoor': { icon: 'fa-leaf', color: '#22c55e', label: 'Janitor Out', subtitle: 'Kebersihan Outdoor', category: 'facility' },
    'weather': { icon: 'fa-cloud-sun', color: '#f97316', label: 'Weather', subtitle: 'Climate Monitor', category: 'facility' },
    
    // System (5)
    'command-center': { icon: 'fa-chess-queen', color: '#a855f7', label: 'Command Center', subtitle: 'Pusat Kendali', category: 'system' },
    'settings': { icon: 'fa-sliders', color: '#64748b', label: 'Settings', subtitle: 'System Config', category: 'system' },
    'profile': { icon: 'fa-user', color: '#ec4899', label: 'Profile', subtitle: 'User Account', category: 'system' },
    'qr': { icon: 'fa-qrcode', color: '#14b8a6', label: 'QR Scanner', subtitle: 'Scan & Generate', category: 'system' },
    'reports': { icon: 'fa-file-lines', color: '#3b82f6', label: 'Reports', subtitle: 'Laporan Terpusat', category: 'system' },
    
    // Special (1)
    'ghost': { icon: 'fa-ghost', color: '#8b5cf6', label: 'Ghost Core', subtitle: 'Developer Access', category: 'special', hidden: true }
};

// ════════════════════════════════════════════
// 7 SLIDE ANNOUNCEMENTS (7 DETIK EACH)
// ════════════════════════════════════════════

const ANNOUNCEMENTS = [    {
        id: 1,
        title: '📢 Pengumuman Admin',
        content: '*Jum\'at 6 Maret 2026* Sanlat hari ke-2 SMP Siswa masuk: 10.30 Guru masuk: 09.30 Siswa pulang: 21.00 Guru pulang: 21.15',
        icon: '📢',
        color: '#10b981'
    },
    {
        id: 2,
        title: '🔒 Security Update',
        content: 'Sistem keamanan telah ditingkatkan. Ghost Mode sekarang dengan proteksi biometrik.',
        icon: '🔒',
        color: '#3b82f6'
    },
    {
        id: 3,
        title: '📊 Booking System',
        content: 'Sistem booking ruangan sekarang anti-double booking. Cek ketersediaan real-time.',
        icon: '📊',
        color: '#8b5cf6'
    },
    {
        id: 4,
        title: '⚠️ K3 Alert',
        content: 'Laporan kerusakan fasilitas akan otomatis diteruskan ke tim Maintenance.',
        icon: '⚠️',
        color: '#f59e0b'
    },
    {
        id: 5,
        title: '🧹 Janitor Schedule',
        content: 'Jadwal kebersihan minggu ini telah diupdate. Cek modul Janitor Indoor/Outdoor.',
        icon: '🧹',
        color: '#22c55e'
    },
    {
        id: 6,
        title: '📦 Inventory Update',
        content: 'Stok barang menipis akan otomatis mengirim notifikasi ke Admin.',
        icon: '📦',
        color: '#ef4444'
    },
    {
        id: 7,
        title: '🎉 Dream OS v2.1',
        content: 'Terima kasih telah menggunakan Dream OS. Built with 💚 Bi idznillah - Dream Team 2026',
        icon: '🎉',
        color: '#10b981'
    }
];
// ════════════════════════════════════════════
// GLOBAL STATE
// ════════════════════════════════════════════

let currentModule = 'home';
let currentSlide = 0;
let slideInterval = null;

// ════════════════════════════════════════════
// RENDER HOME DASHBOARD
// ════════════════════════════════════════════

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
            <!-- Islamic Header -->
            <header class="glass-header" id="ghost-trigger-zone" style="cursor:default;">
                <div class="status-bar">
                    <span>📍 DEPOK CORE | <span id="clock">--:--</span></span>
                    <span>ISO 27001-55001 ✅</span>
                </div>
                <div class="islamic-header">
                    <h1 class="bismillah">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
                    <p class="shalawat">اَللهم صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ</p>
                    <p style="font-size:10px;color:var(--text-muted);margin-top:8px;letter-spacing:2px;">THE POWER SOUL OF SHALAWAT</p>
                </div>
                <div style="font-size:9px;text-align:center;color:var(--text-subtle);margin-top:6px;">
                    ${navigator.platform || 'Device'} | ${navigator.onLine ? 'Online' : 'Offline'}
                </div>
            </header>

            <!-- Main Content -->
            <main style="padding:16px;padding-bottom:140px;">
                <!-- Announcement Slider (7 Slides) -->
                <div class="glass-card" style="margin-bottom:16px;overflow:hidden;position:relative;">
                    <div id="slide-container" style="transition:transform 0.5s ease;">
                        ${ANNOUNCEMENTS.map((slide, index) => `
                            <div class="slide" data-slide="${index}" style="padding:20px;text-align:center;${index === 0 ? '' : 'display:none;'}">
                                <div style="font-size:3rem;margin-bottom:12px;">${slide.icon}</div>
                                <h3 style="color:${slide.color};font-size:1.1rem;margin-bottom:8px;">${slide.title}</h3>
                                <p style="color:var(--text-muted);font-size:0.875rem;line-height:1.6;">${slide.content}</p>                            </div>
                        `).join('')}
                    </div>
                    <!-- Slide Indicators -->
                    <div style="display:flex;justify-content:center;gap:8px;margin-top:16px;">
                        ${ANNOUNCEMENTS.map((_, index) => `
                            <button class="slide-indicator ${index === 0 ? 'active' : ''}" 
                                    onclick="goToSlide(${index})"
                                    style="width:10px;height:10px;border-radius:50%;border:none;background:var(--text-subtle);cursor:pointer;transition:all 0.3s;">
                            </button>
                        `).join('')}
                    </div>
                </div>

                <!-- Neural Status -->
                <div class="neural-status">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                        <h3 style="color:var(--color-primary);font-size:0.9rem;font-weight:600;">
                            <i class="fas fa-network-wired" style="margin-right:6px;"></i> NEURAL CORE ACTIVE
                        </h3>
                        <span style="color:var(--color-primary);font-size:10px;font-family:var(--font-mono);">SECURE</span>
                    </div>
                    <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:10px;">
                        <span>🧠 AI: <span style="color:var(--color-primary);">ONLINE</span></span>
                        <span>🔮 PREDICTION: <span style="color:var(--color-primary);">ACTIVE</span></span>
                        <span>👻 GHOST: <span style="color:var(--text-subtle);">STANDBY</span></span>
                    </div>
                </div>

                <!-- Stats -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-label">Total Modules</div>
                        <div class="stat-value" style="color:var(--color-primary);">19</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Active Users</div>
                        <div class="stat-value" style="color:var(--color-secondary);">24</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Pending</div>
                        <div class="stat-value" style="color:#f59e0b;">3</div>
                    </div>
                </div>

                <!-- All 19 Modules by Category -->
                ${Object.entries(categories).map(([cat, data]) => `
                    <div class="category-section">
                        <h4 class="category-title">${data.label}</h4>
                        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;">                            ${data.modules.map(key => MODULES[key] ? `
                                <div class="glass-card" onclick="loadModule('${key}')" style="cursor:pointer;">
                                    <div class="module-icon" style="width:70px;height:70px;background:${MODULES[key].color};border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;box-shadow:0 8px 20px rgba(0,0,0,0.3);">
                                        <i class="fas ${MODULES[key].icon}" style="color:white;font-size:2rem;"></i>
                                    </div>
                                    <div style="font-size:13px;font-weight:700;color:var(--text-primary);text-align:center;">${MODULES[key].label}</div>
                                    <div style="font-size:10px;color:var(--text-muted);text-align:center;">${MODULES[key].subtitle}</div>
                                </div>
                            ` : '').join('')}
                        </div>
                    </div>
                `).join('')}
            </main>

            <!-- Bottom Navigation -->
            <nav class="bottom-nav">
                <div class="nav-container">
                    <button class="nav-item active" data-nav="home" onclick="loadModule('home')">
                        <i class="fas fa-grid-2"></i><span>Home</span>
                    </button>
                    <button class="nav-item" data-nav="booking" onclick="loadModule('booking')">
                        <i class="fas fa-calendar-check"></i><span>Booking</span>
                    </button>
                    <button class="nav-item" data-nav="sekuriti" onclick="loadModule('sekuriti')">
                        <i class="fas fa-shield-halved"></i><span>Security</span>
                    </button>
                    <button class="nav-item" data-nav="settings" onclick="loadModule('settings')">
                        <i class="fas fa-sliders"></i><span>Settings</span>
                    </button>
                </div>
            </nav>
        </div>
    `;
}

// ════════════════════════════════════════════
// SLIDER FUNCTIONS (7 SLIDES, 7 DETIK)
// ════════════════════════════════════════════

function startSlideShow() {
    // Clear existing interval
    if (slideInterval) clearInterval(slideInterval);
    
    // Start new interval (7 seconds)
    slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % ANNOUNCEMENTS.length;
        goToSlide(currentSlide);
    }, 7000); // 7 detik
    
    console.log('📢 [SLIDES] Started:', ANNOUNCEMENTS.length, 'slides');}

function goToSlide(index) {
    currentSlide = index;
    
    // Hide all slides
    document.querySelectorAll('.slide').forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
    
    // Update indicators
    document.querySelectorAll('.slide-indicator').forEach((ind, i) => {
        ind.classList.toggle('active', i === index);
        ind.style.background = i === index ? 'var(--color-primary)' : 'var(--text-subtle)';
    });
    
    console.log('📢 [SLIDES] Slide', index + 1, '/', ANNOUNCEMENTS.length);
}

// ════════════════════════════════════════════
// MODULE RENDERERS
// ════════════════════════════════════════════

function renderBooking() {
    return `
        <div class="module-container active" id="module-booking">
            <div style="margin-bottom:24px;">
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
                    <div style="width:48px;height:48px;background:linear-gradient(135deg,#3b82f6,#06b6d4);border-radius:14px;display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-calendar-check" style="color:white;font-size:1.5rem;"></i>
                    </div>
                    <div>
                        <h1 style="color:var(--text-primary);font-size:1.5rem;">Booking</h1>
                        <p style="color:var(--text-muted);font-size:0.875rem;">Pemesanan Ruangan</p>
                    </div>
                </div>
            </div>
            <div class="stats-grid">
                <div class="stat-card"><div class="stat-label">Total Rooms</div><div class="stat-value" style="color:var(--color-primary);">4</div></div>
                <div class="stat-card"><div class="stat-label">Today</div><div class="stat-value" style="color:var(--color-secondary);">2</div></div>
                <div class="stat-card"><div class="stat-label">Pending</div><div class="stat-value" style="color:#f59e0b;">1</div></div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;">
                <div class="glass-card">
                    <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
                        <div><h3 style="color:var(--text-primary);">Board Room A</h3><p style="color:var(--text-muted);font-size:0.75rem;">Floor 3</p></div>
                        <div style="background:rgba(16,185,129,0.15);color:var(--color-primary);padding:4px 10px;border-radius:8px;font-size:10px;">20 ppl</div>
                    </div>
                    <button class="btn-primary" onclick="toast('Booking feature coming soon!', 'info')">Book Now</button>
                </div>            </div>
            <button class="btn-back" onclick="loadModule('home')">← Back to Home</button>
        </div>
    `;
}

function renderSettings() {
    const themes = window.ThemeManager?.getAvailable() || [];
    return `
        <div class="module-container active" id="module-settings">
            <div style="margin-bottom:24px;">
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
                    <div style="width:48px;height:48px;background:linear-gradient(135deg,#10b981,#06b6d4);border-radius:14px;display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-sliders" style="color:white;font-size:1.5rem;"></i>
                    </div>
                    <div>
                        <h1 style="color:var(--text-primary);font-size:1.5rem;">Settings</h1>
                        <p style="color:var(--text-muted);font-size:0.875rem;">System Configuration</p>
                    </div>
                </div>
            </div>
            <div class="glass-card" style="margin-bottom:16px;">
                <h2 style="color:var(--text-primary);font-size:1.1rem;margin-bottom:16px;">🎨 Theme</h2>
                <div class="theme-grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;">
                    ${themes.map(t => `
                        <div class="theme-card ${window.ThemeManager?.getCurrent() === t.id ? 'active' : ''}" onclick="changeTheme('${t.id}')" style="background:var(--bg-secondary);border:2px solid ${window.ThemeManager?.getCurrent() === t.id ? 'var(--color-primary)' : 'transparent'};border-radius:var(--radius-lg);padding:16px;cursor:pointer;">
                            <div class="theme-preview" style="width:100%;height:80px;border-radius:var(--radius-md);margin-bottom:12px;background:linear-gradient(135deg,${t.colors['--bg-primary']},${t.colors['--bg-secondary']});"></div>
                            <div style="color:var(--text-primary);font-size:12px;text-align:center;">${t.name}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <button class="btn-primary" onclick="clearCache()">Clear Cache</button>
            <button class="btn-back" onclick="loadModule('home')">← Back to Home</button>
        </div>
    `;
}

function renderGenericModule(key) {
    const mod = MODULES[key];
    if (!mod) return renderHome();
    
    return `
        <div class="module-container active" id="module-${key}">
            <div style="text-align:center;padding:60px 20px;">
                <div style="width:80px;height:80px;background:linear-gradient(135deg,${mod.color},var(--color-secondary));border-radius:20px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;box-shadow:0 8px 20px ${mod.color}66;">
                    <i class="fas ${mod.icon}" style="color:white;font-size:2.5rem;"></i>
                </div>
                <h2 style="color:var(--text-primary);font-size:1.5rem;margin-bottom:10px;">${mod.label}</h2>
                <p style="color:var(--text-muted);">${mod.subtitle} - Coming Soon</p>            </div>
            <button class="btn-back" onclick="loadModule('home')">← Back to Home</button>
        </div>
    `;
}

// ════════════════════════════════════════════
// MODULE LOADER
// ════════════════════════════════════════════

function loadModule(moduleName) {
    const app = document.getElementById('app-shell');
    if (!app) return;

    // Stop slide show when leaving home
    if (currentModule === 'home' && moduleName !== 'home') {
        if (slideInterval) clearInterval(slideInterval);
    }

    // Clear all modules
    document.querySelectorAll('.module-container').forEach(m => m.remove());
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    // Render module
    let content = '';
    switch(moduleName) {
        case 'home': content = renderHome(); break;
        case 'booking': content = renderBooking(); break;
        case 'settings': content = renderSettings(); break;
        case 'sekuriti': content = renderGenericModule('sekuriti'); break;
        default: content = renderGenericModule(moduleName);
    }

    app.innerHTML = content;
    currentModule = moduleName;

    // Update nav
    const navItem = document.querySelector(`[data-nav="${moduleName}"]`);
    if (navItem) navItem.classList.add('active');

    // Haptic
    if ('vibrate' in navigator) navigator.vibrate(30);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Start slide show on home
    if (moduleName === 'home') {
        setTimeout(() => {
            startSlideShow();
            setupGhostTrigger();
        }, 500);    }

    // Update clock
    updateClock();
    
    console.log('📦 [MODULE] Loaded:', moduleName);
}

// ════════════════════════════════════════════
// THEME CHANGER
// ════════════════════════════════════════════

function changeTheme(themeId) {
    window.ThemeManager?.set(themeId);
    document.querySelectorAll('.theme-card').forEach(c => {
        c.style.borderColor = 'transparent';
    });
    event.currentTarget.style.borderColor = 'var(--color-primary)';
}

// ════════════════════════════════════════════
// CLEAR CACHE
// ════════════════════════════════════════════

function clearCache() {
    if (confirm('Clear all cache and local data?')) {
        localStorage.clear();
        sessionStorage.clear();
        toast('Cache cleared! Reload...', 'success');
        setTimeout(() => location.reload(), 1000);
    }
}

// ════════════════════════════════════════════
// GHOST TRIGGER (INTEGRATED)
// ════════════════════════════════════════════

function setupGhostTrigger() {
    let taps = 0;
    let timeout;
    const zone = document.getElementById('ghost-trigger-zone');
    
    if (!zone) {
        console.warn('⚠️ [GHOST] Trigger zone not found!');
        return;
    }

    // Remove old listeners
    const newZone = zone.cloneNode(true);
    zone.parentNode.replaceChild(newZone, zone);    
    newZone.addEventListener('click', () => {
        taps++;
        console.log('👻 [GHOST] Tap', taps + '/5');
        
        if ('vibrate' in navigator) navigator.vibrate(30);
        
        if (timeout) clearTimeout(timeout);

        if (taps === 5) {
            taps = 0;
            setTimeout(() => {
                const code = prompt('🔑 GHOST ACCESS CODE:');
                if (code === 'dreamos2026') {
                    if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
                    toast('👻 Ghost Mode Activated!', 'success');
                    setTimeout(() => {
                        loadModule('ghost');
                    }, 500);
                } else if (code !== null) {
                    toast('❌ Access Denied', 'error');
                }
            }, 200);
            return;
        }
        
        timeout = setTimeout(() => { taps = 0; }, 2000);
    });
    
    console.log('✅ [GHOST] Trigger setup complete');
}

// ════════════════════════════════════════════
// CLOCK
// ════════════════════════════════════════════

function updateClock() {
    const clock = document.getElementById('clock');
    if (clock) {
        const now = new Date();
        clock.textContent = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    }
}

// ════════════════════════════════════════════
// TOAST
// ════════════════════════════════════════════

function toast(msg, type = 'success') {
    const icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️' };    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
    const container = document.getElementById('toast-container');
    if (container) {
        container.appendChild(el);
        setTimeout(() => { el.style.opacity='0'; setTimeout(() => el.remove(), 350); }, 3500);
    }
    if ('vibrate' in navigator) navigator.vibrate(50);
}

// ════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════

function init() {
    console.log('🚀 [DREAM OS] v2.1 Initializing...');

    // Init Theme
    window.ThemeManager?.init();

    // Render Home
    loadModule('home');

    // Hide Loading
    setTimeout(() => {
        const loading = document.getElementById('loading-screen');
        if (loading) loading.classList.add('hide');
        console.log('✅ [LOADING] Screen hidden');
    }, 1500);

    // Clock
    updateClock();
    setInterval(updateClock, 1000);

    console.log('✅ [DREAM OS] Ready!');
    console.log('📦 19 Modules Loaded');
    console.log('📢 7 Slides (7 detik each)');
    console.log('👻 Ghost Mode Ready');
}

// Run
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
