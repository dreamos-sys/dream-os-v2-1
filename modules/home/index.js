export default async function render({ container }) {
    const menus = [
        { icon: 'fa-chart-pie', label: 'Command', color: 'emerald' },
        { icon: 'fa-calendar-check', label: 'Booking', color: 'blue' },
        { icon: 'fa-triangle-exclamation', label: 'K3', color: 'orange' },
        { icon: 'fa-shield', label: 'Sekuriti', color: 'slate' },
        { icon: 'fa-broom', label: 'Janitor', color: 'blue' },
        { icon: 'fa-tree', label: 'Outdoor', color: 'green' },
        { icon: 'fa-box', label: 'Stok', color: 'purple' },
        { icon: 'fa-wrench', label: 'Maint', color: 'orange' },
        { icon: 'fa-cubes', label: 'Asset', color: 'pink' }
    ];

    container.innerHTML = `
        <div class="max-w-md mx-auto pt-6 pb-24">
            <div class="p-4 grid grid-cols-3 gap-3">
                ${menus.map(m => `
                    <div class="bg-white p-4 rounded-2xl shadow-sm text-center border border-slate-100 cursor-pointer">
                        <i class="fa-solid ${m.icon} text-${m.color}-500 text-2xl mb-2"></i>
                        <div class="text-[10px] font-bold text-slate-700">${m.label}</div>
                    </div>
                `).join('')}
            </div>
            <div class="px-4">
                <button class="w-full bg-red-500 text-white p-4 rounded-xl font-black">LOGOUT</button>
            </div>
        </div>
    `;
}
