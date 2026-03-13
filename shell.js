const renderShell = () => {
    const app = document.getElementById('app-shell');
    app.innerHTML = `
        <header class="shell-header glass-effect sticky top-0 z-[1000] border-b border-emerald-500/20">
            <div class="flex justify-between px-6 py-2 text-[10px] text-emerald-500/60 font-mono">
                <div class="flex gap-4">
                    <span id="p-time">Fajr 04:40</span>
                    <span>4G+ <i class="fas fa-signal"></i></span>
                </div>
                <div>93% <i class="fas fa-battery-bolt text-emerald-400"></i></div>
            </div>

            <div class="text-center py-4 bg-gradient-to-b from-emerald-500/10 to-transparent">
                <h1 class="font-arabic text-2xl text-emerald-400 drop-shadow-glow">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
                <h2 class="font-arabic text-sm text-emerald-300/70">اَللهم صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ</h2>
            </div>
        </header>

        <main id="dynamic-stage" class="min-h-screen pb-32 pt-4 px-4">
            </main>

        <nav class="fixed bottom-0 left-0 right-0 glass-effect border-t border-emerald-500/20 px-8 py-4 flex justify-between items-center z-50">
            <button onclick="DREAM.load('home')" class="nav-btn"><i class="fas fa-home"></i></button>
            <button onclick="DREAM.load('sekuriti')" class="nav-btn"><i class="fas fa-shield-alt"></i></button>
            
            <div class="center-hex-wrap" onclick="DREAM.load('shalawat')">
                <div class="center-hex shadow-emerald-500/40">
                    <div class="hex-text font-arabic">صلوات</div>
                </div>
            </div>

            <button onclick="DREAM.load('inventory')" class="nav-btn"><i class="fas fa-box-open"></i></button>
            <button onclick="DREAM.load('profile')" class="nav-btn"><i class="fas fa-id-badge"></i></button>
        </nav>
    `;
};

document.addEventListener('DOMContentLoaded', renderShell);
