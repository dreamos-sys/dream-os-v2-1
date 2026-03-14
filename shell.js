/**
 * ═══════════════════════════════════════════════════════════════════════
 * SHELL UI ENGINE - SOVEREIGN ENTERPRISE v3.5
 * Integrated with BrainCore & GhostAntibody
 * 
 * Features:
 * - Full 19 Modules (ai-panel, ai-speak, asset, booking, ghost, home, 
 *   janitor-indoor, janitor-outdoor, k3-officer, k3, login, maintenance, 
 *   prediction, profile, qr, sekuriti, settings, stok, weather)
 * - Command Center (dashboard, dana, spj, approval, slides, files, backup)
 * - Bento Grid Layout (Luxury Design)
 * - Neural AI Status Display
 * - 5-Tap Stealth Activation + Kode Akses
 * - Real-time System Metrics
 * - Enterprise Navigation
 * 
 * Ghost Architect: Hidden Developer Access (kode: dreamos2026)
 * ═══════════════════════════════════════════════════════════════════════
 */

'use strict';

// ============================================================
// DAFTAR MODUL
// ============================================================
const MODULES = {
    // AI & Intelligence
    'ai-panel': { path: './modules/ai-panel/module.js', icon: 'fa-brain', label: 'AI Panel', desc: 'Neural Control Center', category: 'ai' },
    'ai-speak': { path: './modules/ai-speak/module.js', icon: 'fa-microchip', label: 'AI Speak', desc: 'Voice Synthesis', category: 'ai' },
    'prediction': { path: './modules/prediction/module.js', icon: 'fa-chart-line', label: 'Prediction', desc: 'Forecast Analytics', category: 'ai' },
    
    // Operations
    'booking': { path: './modules/booking/module.js', icon: 'fa-calendar-check', label: 'Booking', desc: 'Resource Scheduling', category: 'ops' },
    'asset': { path: './modules/asset/module.js', icon: 'fa-cubes', label: 'Asset', desc: 'Equipment Tracking', category: 'ops' },
    'stok': { path: './modules/stok/module.js', icon: 'fa-boxes', label: 'Stok', desc: 'Inventory Management', category: 'ops' },
    'maintenance': { path: './modules/maintenance/module.js', icon: 'fa-gears', label: 'Maintenance', desc: 'Work Orders', category: 'ops' },
    
    // Security & Safety
    'sekuriti': { path: './modules/sekuriti/module.js', icon: 'fa-shield-halved', label: 'Sekuriti', desc: 'Security Patrol', category: 'security' },
    'k3': { path: './modules/k3/module.js', icon: 'fa-helmet-safety', label: 'K3', desc: 'Safety System', category: 'security' },
    'k3-officer': { path: './modules/k3-officer/module.js', icon: 'fa-user-shield', label: 'K3 Officer', desc: 'Safety Personnel', category: 'security' },
    
    // Facilities
    'janitor-indoor': { path: './modules/janitor-indoor/module.js', icon: 'fa-broom', label: 'Janitor Indoor', desc: 'Interior Cleaning', category: 'facility' },
    'janitor-outdoor': { path: './modules/janitor-outdoor/module.js', icon: 'fa-leaf', label: 'Janitor Outdoor', desc: 'Exterior Maintenance', category: 'facility' },
    'weather': { path: './modules/weather/module.js', icon: 'fa-cloud-sun', label: 'Weather', desc: 'Climate Monitor', category: 'facility' },
    
    // System
    'home': { path: null, icon: 'fa-grid-2', label: 'Home', desc: 'System Dashboard', category: 'system' }, // home di-render langsung oleh shell
    'settings': { path: './modules/settings/module.js', icon: 'fa-sliders', label: 'Settings', desc: 'System Config', category: 'system' },
    'profile': { path: './modules/profile/module.js', icon: 'fa-user', label: 'Profile', desc: 'User Account', category: 'system' },
    'login': { path: './modules/login/module.js', icon: 'fa-right-to-bracket', label: 'Login', desc: 'Authentication', category: 'system' },
    'qr': { path: './modules/qr/module.js', icon: 'fa-qrcode', label: 'QR', desc: 'QR Scanner/Generator', category: 'system' },
    
    // Command Center (khusus)
    'command-center': { path: './modules/command-center/module.js', icon: 'fa-chess-queen', label: 'Command Center', desc: 'Manajemen Internal', category: 'special' },
    
    // Special (Ghost tidak muncul di grid)
    'ghost': { path: './modules/ghost/module.js', icon: 'fa-ghost', label: 'Ghost', desc: 'Hidden Access', category: 'special', hidden: true }
};

// Category order
const CATEGORY_ORDER = ['ai', 'ops', 'security', 'facility', 'system', 'special'];
const CATEGORY_LABELS = {
    'ai': '🧠 Neural Intelligence',
    'ops': '⚙️ Operations',
    'security': '🛡️ Security & Safety',
    'facility': '🏢 Facility Management',
    'system': '🔧 System',
    'special': '👻 Special Access'
};

// ============================================================
// INITIALISASI MODUL DI DREAM
// ============================================================
Object.entries(MODULES).forEach(([key, mod]) => {
    if (mod.path) {
        window.DREAM.modules.set(key, () => import(mod.path));
    }
});

// ============================================================
// RENDER SHELL UTAMA (HOME)
// ============================================================
function renderShell() {
    const app = document.getElementById('app-shell');
    if (!app) return;

    // Get system diagnostic (jika ada)
    const diagnostic = window.Sovereign?.getSystemDiagnostic?.() || {};
    const { environment = {}, neural = {} } = diagnostic;

    // Kelompokkan modul per kategori (kecuali yang hidden)
    const grouped = {};
    Object.entries(MODULES).forEach(([key, mod]) => {
        if (mod.hidden) return;
        if (!grouped[mod.category]) grouped[mod.category] = [];
        grouped[mod.category].push({ key, ...mod });
    });

    app.innerHTML = `
        <!-- Header dengan Stealth Trigger -->
        <header class="glass-header" id="ghost-trigger-zone" style="cursor:default;">
            <div style="display:flex;justify-content:space-between;font-family:var(--font-mono, monospace);font-size:10px;color:var(--color-primary, #10b981);opacity:0.7;margin-bottom:6px;">
                <span>📍 DEPOK CORE | ${new Date().toLocaleTimeString('id-ID')}</span>
                <span>ISO 27001-55001 ✅</span>
            </div>
            <div style="text-align:center;padding:8px 0;">
                <h1 style="font-family:'Amiri',serif;font-size:1.6rem;color:#10b981;text-shadow:0 0 10px rgba(16,185,129,0.5);margin-bottom:4px;">
                    بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                </h1>
                <p style="font-family:'Amiri',serif;font-size:0.95rem;color:#94a3b8;letter-spacing:1px;">
                    اَللهم صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ
                </p>
            </div>
            <div style="font-size:9px;text-align:center;color:#64748b;margin-top:6px;">
                ${environment.device || 'Device'} | ${environment.browser || 'Browser'} | ${environment.network?.toUpperCase() || 'Network'}
            </div>
        </header>

        <!-- Main Content -->
        <main style="padding:16px;padding-bottom:140px;animation:fadeIn 0.5s ease;">
            <!-- Neural Status -->
            <div class="neural-status" style="background:linear-gradient(135deg,rgba(16,185,129,0.1),transparent);border:1px solid rgba(16,185,129,0.2);border-radius:16px;padding:16px;margin-bottom:16px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <h3 style="color:#10b981;font-size:0.9rem;font-weight:600;">
                        <i class="fas fa-network-wired" style="margin-right:6px;"></i> NEURAL CORE ACTIVE
                    </h3>
                    <span style="color:#10b981;font-size:10px;font-family:monospace;">${diagnostic.fingerprint?.substring(0,8) || 'SECURE'}</span>
                </div>
                <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:10px;">
                    <span>🧠 AI: <span style="color:#10b981;">ONLINE</span></span>
                    <span>🔮 PREDICTION: <span style="color:#10b981;">ACTIVE</span></span>
                    <span>👻 GHOST: <span style="color:#64748b;">STANDBY</span></span>
                </div>
            </div>

            <!-- Bento Grid per Kategori -->
            ${CATEGORY_ORDER.map(cat => {
                const modules = grouped[cat] || [];
                if (modules.length === 0) return '';
                return `
                    <div style="margin-bottom:24px;">
                        <h4 style="color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">
                            ${CATEGORY_LABELS[cat]}
                        </h4>
                        <div class="bento-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;">
                            ${modules.map(mod => `
                                <div class="bento-card" data-module="${mod.key}" 
                                     onclick="window.DREAM.load('${mod.key}')"
                                     style="background:rgba(15,23,42,0.8);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:16px 8px;cursor:pointer;transition:all 0.2s;display:flex;flex-direction:column;align-items:center;text-align:center;">
                                    <i class="fas ${mod.icon}" style="color:#10b981;font-size:1.8rem;margin-bottom:8px;"></i>
                                    <span style="font-size:12px;font-weight:600;color:#e2e8f0;">${mod.label}</span>
                                    <span style="font-size:9px;color:#64748b;margin-top:4px;">${mod.desc}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }).join('')}
        </main>

        <!-- Bottom Navigation -->
        <nav class="glass-footer" style="position:fixed;bottom:0;left:0;right:0;background:rgba(15,23,42,0.95);backdrop-filter:blur(20px);border-top:1px solid rgba(16,185,129,0.2);padding:8px 12px;z-index:40;">
            <div style="display:flex;justify-content:space-around;align-items:center;max-width:500px;margin:0 auto;">
                ${[
                    { key: 'home', icon: 'fa-grid-2', label: 'Home' },
                    { key: 'command-center', icon: 'fa-chess-queen', label: 'CMD' },
                    { key: 'sekuriti', icon: 'fa-shield-halved', label: 'Security' },
                    { key: 'settings', icon: 'fa-sliders', label: 'Settings' }
                ].map(item => `
                    <button class="nav-item" data-nav="${item.key}" 
                            onclick="window.DREAM.load('${item.key}')"
                            style="display:flex;flex-direction:column;align-items:center;gap:2px;background:none;border:none;color:#64748b;cursor:pointer;padding:6px 8px;border-radius:8px;transition:all 0.2s;">
                        <i class="fas ${item.icon}" style="font-size:1.2rem;"></i>
                        <span style="font-size:8px;font-weight:600;">${item.label}</span>
                    </button>
                `).join('')}
                
                <!-- Shalawat Center Button (Ghost Trigger) -->
                <div style="margin-top:-40px;cursor:pointer;" id="ghost-trigger-btn">
                    <div style="width:60px;height:60px;background:linear-gradient(135deg,#10b981,#059669);border-radius:18px;transform:rotate(45deg);display:flex;align-items:center;justify-content:center;border:3px solid #020617;box-shadow:0 0 30px rgba(16,185,129,0.4);">
                        <div style="transform:rotate(-45deg);font-family:'Amiri',serif;color:white;font-size:10px;text-align:center;font-weight:700;">
                            صلوات
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    `;

    // Setup ghost activation
    setupGhostActivation();
    addHoverEffects();
}

// ============================================================
// GHOST ACTIVATION (5 TAP + KODE)
// ============================================================
function setupGhostActivation() {
    let taps = 0;
    let tapTimeout;
    const triggerZone = document.getElementById('ghost-trigger-zone');
    if (!triggerZone) return;

    triggerZone.addEventListener('click', () => {
        taps++;
        if (tapTimeout) clearTimeout(tapTimeout);

        // Visual feedback
        triggerZone.style.opacity = 1 - (taps * 0.15);
        window.DREAM_SYS?.haptic?.(30);

        if (taps === 5) {
            taps = 0;
            triggerZone.style.opacity = '';
            
            // Minta kode akses
            const code = prompt('🔑 Masukkan kode akses Ghost Architect:');
            if (code === 'dreamos2026') {
                window.DREAM_SYS.log('info', 'Kode benar, mengaktifkan Ghost Mode');
                window.DREAM.load('ghost');
            } else {
                window.DREAM_SYS.toast('❌ Kode salah. Akses ditolak.', 'error');
            }
            return;
        }

        tapTimeout = setTimeout(() => {
            taps = 0;
            triggerZone.style.opacity = '';
        }, 2000);
    });

    console.log('[GHOST] 👻 5-tap + kode siap');
}

// ============================================================
// HOVER EFFECTS
// ============================================================
function addHoverEffects() {
    const cards = document.querySelectorAll('.bento-card[data-module]');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-3px)';
            card.style.borderColor = '#10b981';
            card.style.boxShadow = '0 8px 24px rgba(16,185,129,0.2)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.borderColor = 'rgba(16,185,129,0.2)';
            card.style.boxShadow = '';
        });
    });
}

// ============================================================
// GLOBAL STYLES
// ============================================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .nav-item.active {
        background: rgba(16,185,129,0.15) !important;
        color: #10b981 !important;
    }
    .bento-card {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .glass-header {
        background: rgba(15,23,42,0.8);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(16,185,129,0.2);
        padding: 12px 16px;
        position: sticky;
        top: 0;
        z-index: 30;
    }
    ::-webkit-scrollbar {
        width: 4px;
    }
    ::-webkit-scrollbar-track {
        background: #0f172a;
    }
    ::-webkit-scrollbar-thumb {
        background: #10b981;
        border-radius: 4px;
    }
`;
document.head.appendChild(style);

// ============================================================
// INITIALISASI
// ============================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderShell);
} else {
    renderShell();
}

console.log('[SHELL] 🎨 Sovereign Enterprise Shell v3.5 loaded');
console.log('[SHELL] 📦 Modul tersedia:', Object.keys(MODULES).length);
