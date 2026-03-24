const KERNEL_CONFIG = {
    key: "012443410",
    version: "2.1.0",
    owner: "Master M"
};

const UI = {
    init() {
        this.renderAuth();
    },
    renderAuth() {
        document.getElementById('app').innerHTML = `
            <div class="text-center">
                <div class="w-24 h-24 bg-gradient-to-br from-green-500/20 to-emerald-900/40 rounded-[2.5rem] mx-auto mb-10 flex items-center justify-center border border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.1)]">
                    <i class="fas fa-microchip text-4xl text-green-500"></i>
                </div>
                <h1 class="text-[11px] tracking-[12px] text-white/40 uppercase mb-12 font-black">Dream OS v2.1</h1>
                <input type="password" id="access" placeholder="MANTRA" class="bg-transparent border-b border-white/10 text-center tracking-[12px] outline-none w-44 pb-3 text-lg focus:border-green-500 transition-all placeholder:text-white/5 uppercase">
            </div>
        `;
        document.getElementById('access').addEventListener('input', (e) => {
            if(e.target.value === KERNEL_CONFIG.key) this.launchDash();
        });
    },
    launchDash() {
        const modules = [
            {i: 'calendar-alt', l: 'Booking'}, {i: 'hand-holding-heart', l: 'K3'}, {i: 'user-shield', l: 'Security'},
            {i: 'broom', l: 'Janitor'}, {i: 'tools', l: 'Tools'}, {i: 'cogs', l: 'Maintenance'},
            {i: 'warehouse', l: 'Assets'}, {i: 'brain', l: 'AI Arena'}, {i: 'id-card-alt', l: 'Admin'}
        ];
        document.getElementById('app').innerHTML = `
            <div class="grid grid-cols-3 gap-5 animate-in fade-in zoom-in duration-500">
                ${modules.map(m => `
                    <div class="grid-icon glass-card aspect-square flex flex-col items-center justify-center rounded-[1.8rem] cursor-pointer active-ring">
                        <i class="fas fa-${m.i} text-2xl mb-3 text-white/80"></i>
                        <span class="text-[9px] uppercase tracking-widest text-white/30 font-bold">${m.l}</span>
                    </div>
                `).join('')}
            </div>
            <div class="mt-16 text-center">
                <p class="text-[8px] text-white/10 tracking-[6px] font-black uppercase mb-2 italic">Out of The Box Inside</p>
                <p class="text-[7px] text-green-500/30 uppercase tracking-[2px]">Dream Team Family System</p>
            </div>
        `;
    }
};
window.onload = () => UI.init();
