/**
 * shell.js - Ghost Architect Core Shell
 * Menjamin kehadiran Bismillah, Shalawat, dan Monitoring Enterprise.
 */

const renderShell = () => {
    const app = document.getElementById('app-shell');
    app.innerHTML = `
        <div id="loading-overlay" class="fixed inset-0 bg-slate-950 z-[10000] flex items-center justify-center transition-opacity duration-500" style="background:#020617;">
            <div class="text-center">
                <div class="loader-emerald mb-4" style="width:60px;height:60px;border:4px solid rgba(16,185,129,0.2);border-top-color:#10b981;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto;"></div>
                <p class="text-emerald-400 font-arabic text-xl animate-pulse">بِسْمِ اللَّهِ</p>
            </div>
        </div>

        <header class="shell-header glass-effect sticky top-0 z-50 border-b border-emerald-500/20" style="background:rgba(15,23,42,0.65);backdrop-filter:blur(24px);padding:0.5rem 1rem;">
            <div class="flex justify-between px-4 py-1 text-[10px] text-emerald-500/60 font-mono">
                <div class="flex gap-3">
                    <span id="prayer-time">Fajr 04:40</span>
                    <span id="net-status">4G+</span>
                </div>
                <div id="battery-status">93%</div>
            </div>

            <div class="text-center py-4 bg-gradient-to-b from-emerald-500/5 to-transparent">
                <h1 class="font-arabic text-2xl text-emerald-400 mb-1 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                    بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                </h1>
                <h2 class="font-arabic text-sm text-emerald-300/80">
                    اَللهم صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ
                </h2>
            </div>
        </header>

        <main id="dynamic-stage" class="min-h-[80vh] pb-24" style="padding:1rem; padding-bottom:5rem;"></main>

        <nav class="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-xl border-t border-white/5 px-6 py-3 flex justify-between items-center z-40" style="background:rgba(15,23,42,0.85);backdrop-filter:blur(24px);border-top:1px solid rgba(16,185,129,0.2);">
            <button onclick="DREAM.load('home')" class="nav-btn" style="background:transparent;border:none;color:#94a3b8;cursor:pointer;"><i class="fas fa-home"></i></button>
            <button onclick="DREAM.load('sekuriti')" class="nav-btn" style="background:transparent;border:none;color:#94a3b8;cursor:pointer;"><i class="fas fa-shield-halved"></i></button>
            <div class="center-hex" onclick="window.openAIPanel?.()" style="transform:translateY(-15px); background:#10b981; width:50px; height:50px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; cursor:pointer; box-shadow:0 0 20px rgba(16,185,129,0.3);">
                <div class="hex-inner font-arabic text-xs">صلوات</div>
            </div>
            <button onclick="DREAM.load('qr')" class="nav-btn" style="background:transparent;border:none;color:#94a3b8;cursor:pointer;"><i class="fas fa-qrcode"></i></button>
            <button onclick="DREAM.load('profile')" class="nav-btn" style="background:transparent;border:none;color:#94a3b8;cursor:pointer;"><i class="fas fa-user-circle"></i></button>
        </nav>
    `;
};

// Inisialisasi Enterprise Systems
document.addEventListener('DOMContentLoaded', () => {
    renderShell();
    window.SystemWatchdog?.start(); // Jalankan Imun Sistem
    window.DREAM_SYS.log('success', 'Dream OS v2.1 Initialized bi idznillah');
    
    // Hilangkan loading setelah 1.5 detik
    setTimeout(() => {
        document.getElementById('loading-overlay')?.classList.add('opacity-0', 'pointer-events-none');
        window.DREAM.load('home');
    }, 1500);
});

// Tambahkan animasi loading jika belum ada di CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes spin { to { transform: rotate(360deg); } }
    .animate-pulse { animation: pulse 2s cubic-bezier(0.4,0,0.6,1) infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
`;
document.head.appendChild(style);
