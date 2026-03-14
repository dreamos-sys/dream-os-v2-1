export default async function render({ container }) {
    const menus = [
        { id: 'cc', name: 'COMMAND CENTER', icon: 'fa-chart-column', desc: 'Pusat kendali' },
        { id: 'booking', name: 'BOOKING', icon: 'fa-calendar-check', desc: 'Pemesanan ruangan' },
        { id: 'k3', name: 'K3', icon: 'fa-triangle-exclamation', desc: 'Keselamatan & kesehatan' },
        { id: 'sekuriti', name: 'SEKURITI', icon: 'fa-shield-halved', desc: 'Keamanan & kehilangan' },
        { id: 'janitor-in', name: 'JANITOR IN', icon: 'fa-broom', desc: 'Kebersihan indoor' },
        { id: 'janitor-out', name: 'JANITOR OUT', icon: 'fa-leaf', desc: 'Kebersihan outdoor' }
    ];

    container.innerHTML = `
        <div class="p-4 pt-10 grid grid-cols-2 gap-4 pb-24">
            ${menus.map(m => `
                <div class="bg-slate-800/50 backdrop-blur-md p-5 rounded-[2rem] border border-slate-700 flex flex-col items-center text-center shadow-xl active:scale-95 transition-all">
                    <div class="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-3">
                        <i class="fa-solid ${m.icon} text-2xl text-emerald-400"></i>
                    </div>
                    <h3 class="text-white text-[10px] font-bold tracking-wider uppercase">${m.name}</h3>
                    <p class="text-slate-400 text-[8px] mt-1 italic">${m.desc}</p>
                </div>
            `).join('')}
        </div>
    `;
}
