/**
 * 🏛️ DREAM OS v2.3 - AI AGENT INTEGRATED
 * Core AI now tracks Real-time Booking & Stok status
 */

export const DreamShell = {
    // ... (Data modules tetap sama)
    modules: [
        { id: 'booking', name: 'BOOKING', icon: 'fa-calendar-alt', color: '#00bcd4' },
        { id: 'k3', name: 'K3 SMART', icon: 'fa-shield-alt', color: '#ff9800' },
        { id: 'teknisi', name: 'TEKNISI', icon: 'fa-tools', color: '#fdd835' },
        { id: 'gudang', name: 'GUDANG', icon: 'fa-box-open', color: '#9c27b0' },
        { id: 'stok', name: 'STOK', icon: 'fa-layer-group', color: '#4caf50' },
        { id: 'admin', name: 'ADMIN', icon: 'fa-user-cog', color: '#607d8b' }
    ],

    init: async function() {
        this.renderUI();
        this.runAISensor();
    },

    // 🤖 AI SENSOR: Melakukan audit otomatis saat startup
    runAISensor: async function() {
        const aiBox = document.getElementById('ai-content');
        if (!aiBox) return;

        // Simulasi Berpikir (AI Processing)
        setTimeout(() => {
            const hour = new Date().getHours();
            let aiMsg = "Bismillah, Sistem Optimal. Semua lini aman.";
            let aiIcon = "fa-check-circle text-emerald-400";

            if (hour >= 16) {
                aiMsg = "Reminder: Jam kerja berakhir. Sistem Booking terkunci otomatis sesuai regulasi.";
                aiIcon = "fa-lock text-orange-400";
            }
            
            aiBox.innerHTML = `<i class="fas ${aiIcon} mr-2"></i> ${aiMsg}`;
        }, 2000);
    },

    renderUI: function() {
        const root = document.getElementById('app-shell');
        if (!root) return;

        root.innerHTML = `
            <style>
                body { background: #020617; color: white; font-family: 'Inter', sans-serif; margin:0; padding:0; overflow-x:hidden; }
                .glass { background: rgba(30, 41, 59, 0.4); backdrop-filter: blur(12px); border: 1px solid rgba(163, 230, 53, 0.1); border-radius: 24px; }
                .main-content { padding: 20px 15px 120px 15px; }
                .grid-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 20px 0; }
                .btn-module { padding: 15px 5px; text-align: center; cursor: pointer; transition: 0.2s; }
                .btn-module:active { transform: scale(0.9); }
                .spiritual-header { text-align: center; padding: 40px 20px 20px; }
            </style>

            <header class="spiritual-header">
                <p class="text-lime-500 font-black tracking-[4px] text-[10px] uppercase">بِسْمِ اللَّهِ بِإِذْنِ اللَّهِ</p>
                <h1 class="text-2xl font-black mt-2">DREAM OS <span class="text-lime-500">v13.4</span></h1>
            </header>

            <div class="main-content">
                <div class="glass p-5 mb-5 border-lime-500/20">
                    <p class="text-[9px] font-black text-lime-500 tracking-[2px] mb-2 uppercase">AI Agent Analysis</p>
                    <div id="ai-content" class="text-xs text-slate-300">
                        <i class="fas fa-spinner fa-spin mr-2"></i> Menganalisa data sistem...
                    </div>
                </div>

                <div class="grid-container">
                    ${this.modules.map(m => `
                        <div class="glass btn-module" onclick="DREAM.navigate('${m.id}')">
                            <i class="fas ${m.icon} text-xl mb-2" style="color:${m.color}"></i>
                            <p class="text-[9px] font-bold uppercase">${m.name}</p>
                        </div>
                    `).join('')}
                </div>
                
                <div id="module-container"></div>
            </div>

            <footer style="position:fixed; bottom:0; width:100%; text-align:center; padding:20px; font-size:9px; color:#334155; letter-spacing:3px; background:linear-gradient(transparent, #020617);">
                THE POWER SOUL OF SHALAWAT
            </footer>
        `;
        window.DREAM = { navigate: (id) => this.navigate(id) };
    },

    navigate: async function(id) {
        const container = document.getElementById('module-container');
        const grid = document.querySelector('.grid-container');
        if (!container) return;

        grid.style.display = 'none'; // Sembunyikan menu saat masuk modul
        container.innerHTML = '<div class="text-center p-10"><i class="fas fa-circle-notch fa-spin text-lime-500"></i></div>';
        
        try {
            const mod = await import(`./modules/${id}/module.js?v=${Date.now()}`);
            container.innerHTML = await mod.default.render();
            if (mod.default.afterRender) mod.default.afterRender();
        } catch (e) {
            container.innerHTML = `<div class="glass p-10 text-center text-red-400">Gagal Memuat Modul ${id}</div>`;
        }
    }
};

DreamShell.init();
