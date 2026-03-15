/**
 * modules/home/module.js
 * Dream OS v2.1 - Home Dashboard Module
 * Main landing page with all module access
 */

export async function render({ container, user }) {
    const MODULES = window.MODULES || {};
    
    const categories = {
        'ai': { label: '🧠 Neural Intelligence', modules: ['ai-panel', 'ai-speak', 'prediction'] },
        'ops': { label: '⚙️ Operations', modules: ['booking', 'asset', 'stok', 'maintenance'] },
        'security': { label: '🛡️ Security & Safety', modules: ['sekuriti', 'k3', 'k3-officer'] },
        'facility': { label: '🏢 Facility', modules: ['janitor-indoor', 'janitor-outdoor', 'weather'] },
        'system': { label: '🔧 System', modules: ['command-center', 'settings', 'profile', 'qr', 'reports'] }
    };

    const ANNOUNCEMENTS = [
        { id: 1, title: '📢 Pengumuman Admin', content: '*Jum\'at 6 Maret 2026* Sanlat hari ke-2 SMP Siswa masuk: 10.30 Guru masuk: 09.30 Siswa pulang: 21.00 Guru pulang: 21.15', icon: '📢', color: '#10b981' },
        { id: 2, title: '🔒 Security Update', content: 'Sistem keamanan telah ditingkatkan.', icon: '🔒', color: '#3b82f6' },
        { id: 3, title: '📊 Booking System', content: 'Sistem booking anti-double booking.', icon: '📊', color: '#8b5cf6' },
        { id: 4, title: '⚠️ K3 Alert', content: 'Laporan kerusakan otomatis ke Maintenance.', icon: '⚠️', color: '#f59e0b' },
        { id: 5, title: '🧹 Janitor Schedule', content: 'Jadwal kebersihan telah diupdate.', icon: '🧹', color: '#22c55e' },
        { id: 6, title: '📦 Inventory Update', content: 'Stok menipis auto notifikasi Admin.', icon: '📦', color: '#ef4444' },
        { id: 7, title: '🎉 Dream OS v2.1', content: 'Built with 💚 Bi idznillah - Dream Team 2026', icon: '🎉', color: '#10b981' }
    ];

    return `
        <div class="module-container active" id="module-home">
            <!-- Islamic Header -->
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
                <div style="font-size:9px;text-align:center;color:var(--text-subtle);margin-top:6px;">
                    ${navigator.platform || 'Device'} | ${navigator.onLine ? 'Online' : 'Offline'}
                </div>
            </header>

            <!-- Main Content -->
            <main style="padding:16px;padding-bottom:140px;">
                <!-- Announcement Slider -->
                <div class="glass-card" style="margin-bottom:16px;overflow:hidden;">
                    <div id="slide-container">                        ${ANNOUNCEMENTS.map((slide, i) => `
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

                <!-- Neural Status -->
                <div class="neural-status">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                        <h3 style="color:var(--color-primary);font-size:0.9rem;font-weight:600;">
                            <i class="fas fa-network-wired" style="margin-right:6px;"></i> NEURAL CORE ACTIVE
                        </h3>
                        <span style="color:var(--color-primary);font-size:10px;">SECURE</span>
                    </div>
                    <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:10px;">
                        <span>🧠 AI: <span style="color:var(--color-primary);">ONLINE</span></span>
                        <span>🔮 PREDICTION: <span style="color:var(--color-primary);">ACTIVE</span></span>
                        <span>👻 GHOST: <span style="color:var(--text-subtle);">STANDBY</span></span>
                    </div>
                </div>

                <!-- Stats -->
                <div class="stats-grid">
                    <div class="stat-card"><div class="stat-label">Total Modules</div><div class="stat-value" style="color:var(--color-primary);">19</div></div>
                    <div class="stat-card"><div class="stat-label">Active Users</div><div class="stat-value" style="color:var(--color-secondary);">24</div></div>
                    <div class="stat-card"><div class="stat-label">Pending</div><div class="stat-value" style="color:#f59e0b;">3</div></div>
                </div>

                <!-- All Modules -->
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
                        </div>                    </div>
                `).join('')}
            </main>

            <!-- Bottom Navigation -->
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

export async function afterRender() {
    console.log('🏠 [HOME] Module rendered');
    
    // Start slide show
    let currentSlide = 0;
    const ANNOUNCEMENTS = 7;
    
    window.goToSlide = function(index) {
        currentSlide = index;
        document.querySelectorAll('[data-slide]').forEach((s,i) => s.style.display = i===index ? 'block' : 'none');
        document.querySelectorAll('[data-slide]').forEach((s,i) => {
            const btn = s.parentNode.nextElementSibling?.children[i];
            if(btn) btn.style.background = i===index ? 'var(--color-primary)' : 'var(--text-subtle)';
        });
    };
    
    // Auto-slide every 7 seconds
    if (window.slideInterval) clearInterval(window.slideInterval);
    window.slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % ANNOUNCEMENTS;
        window.goToSlide(currentSlide);
    }, 7000);
    
    // Setup ghost trigger
    const zone = document.getElementById('ghost-trigger-zone');    if (zone) {
        let ghostTaps = 0;
        let ghostTimeout = null;
        
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
                        window.toast?.('👻 Ghost Mode Activated!', 'success');
                        setTimeout(() => window.loadModule?.('ghost'), 500);
                    } else if (code !== null) {
                        window.toast?.('❌ Access Denied', 'error');
                    }
                }, 200);
                return;
            }
            
            ghostTimeout = setTimeout(() => ghostTaps = 0, 2000);
        });
    }
    
    // Update clock every second
    setInterval(() => {
        const clock = document.getElementById('clock');
        if (clock) clock.textContent = new Date().toLocaleTimeString('id-ID', {hour:'2-digit',minute:'2-digit'});
    }, 1000);
}

export function cleanup() {
    console.log('🏠 [HOME] Module cleanup');
    if (window.slideInterval) clearInterval(window.slideInterval);
}
