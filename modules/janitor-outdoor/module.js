/**
 * 🌳 DREAM OS - JANITOR OUTDOOR MODULE (ENTERPRISE GRADE)
 * Area: Jalan Utama, Parkir, Playground, Lapangan, Saluran
 * Bismillah bi idznillah.
 */
console.log('🌳 Janitor Outdoor Module Loaded');

(function() {
    'use strict';
    const supabase = window.supabase;
    if (!supabase) return console.error('❌ Supabase Missing for Outdoor Module');

    // 1. Tab Management (Cyan Theme)
    const tabs = ['form', 'history', 'schedule'];
    window.activateOutdoorTab = (active) => {
        tabs.forEach(t => {
            const btn = document.getElementById(`tab-${t}`);
            const panel = document.getElementById(`panel-${t}`);
            if (btn) {
                btn.classList.toggle('border-cyan-500', t === active);
                btn.classList.toggle('text-cyan-600', t === active);
                btn.classList.toggle('text-gray-500', t !== active);
            }
            if (panel) panel.classList.toggle('hidden', t !== active);
        });
        if (active === 'history') loadHistory();
        if (active === 'schedule') loadSchedule();
    };

    // 2. Load History (Real-time Feed)
    async function loadHistory() {
        const tbody = document.getElementById('history-body');
        if (!tbody) return;
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-[10px] opacity-50 font-mono italic">⏳ SINKRONISASI AREA...</td></tr>';

        try {
            const { data, error } = await supabase
                .from('janitor_outdoor')
                .select('id, tanggal, shift, petugas, area, status')
                .order('created_at', { ascending: false })
                .limit(40);

            if (error) throw error;
            if (!data?.length) {
                tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-xs opacity-60">Belum ada laporan outdoor.</td></tr>';
                return;
            }

            tbody.innerHTML = data.map(item => `
                <tr class="border-b border-white/5 hover:bg-cyan-500/5 transition text-[11px]">
                    <td class="p-2 font-mono opacity-70">${item.tanggal}</td>
                    <td class="p-2 uppercase font-black text-cyan-400">${item.shift || '-'}</td>
                    <td class="p-2">${item.petugas}</td>
                    <td class="p-2 font-medium">${item.area}</td>
                    <td class="p-2">
                        <span class="px-2 py-0.5 rounded-full text-[9px] ${item.status === 'verified' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}">
                            ${item.status.toUpperCase()}
                        </span>
                    </td>
                    <td class="p-2 text-right"><button onclick="viewDetail('${item.id}')" class="hover:text-cyan-400"><i class="fas fa-eye"></i></button></td>
                </tr>
            `).join('');
        } catch (err) {
            tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-red-500 text-center text-xs font-mono">⚠️ SYNC FAILED: ' + err.message + '</td></tr>';
        }
    }

    // 3. Automated Checkbox Gathering
    const outdoorForm = document.getElementById('janitorOutdoorForm');
    if (outdoorForm) {
        outdoorForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const resultDiv = document.getElementById('form-result');
            resultDiv.innerHTML = '<span class="text-cyan-500 animate-pulse font-mono text-xs">📡 SENDING DATA...</span>';

            const getChecks = () => {
                const items = {};
                document.querySelectorAll('input[id^="check_"]').forEach(el => {
                    items[el.id.replace('check_', '')] = el.checked;
                });
                return items;
            };

            const formData = {
                tanggal: document.getElementById('tanggal').value,
                shift: document.getElementById('shift').value,
                petugas: document.getElementById('petugas').value,
                area: document.getElementById('area').value,
                items: getChecks(),
                catatan: document.getElementById('catatan').value || null,
                status: 'pending',
                created_at: new Date()
            };

            try {
                const { error } = await supabase.from('janitor_outdoor').insert([formData]);
                if (error) throw error;
                
                resultDiv.innerHTML = '<span class="text-green-500 font-black text-xs">✅ LAPORAN OUTDOOR DITERIMA!</span>';
                outdoorForm.reset();
                setTimeout(() => resultDiv.innerHTML = '', 4000);
            } catch (err) {
                resultDiv.innerHTML = `<span class="text-red-500 text-xs font-mono">❌ FAILED: ${err.message}</span>`;
            }
        });
    }

    // 4. Schedule Loader (Placeholder logic for future table)
    function loadSchedule() {
        const tbody = document.getElementById('schedule-body');
        if (!tbody) return;
        const crews = ['Joko', 'Rina', 'Agus', 'Budi', 'Ani'];
        const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        
        tbody.innerHTML = days.map(d => `
            <tr class="border-b border-white/5 text-[11px]">
                <td class="p-2 font-bold">${d}</td>
                <td class="p-2">${crews[0]}</td>
                <td class="p-2">${crews[1]}</td>
                <td class="p-2">${crews[2]}</td>
            </tr>
        `).join('') + '<tr class="text-slate-500 italic"><td class="p-2">Minggu</td><td colspan="3" class="p-2 text-center">LIBUR NASIONAL</td></tr>';
    }

    // Global Handlers
    window.viewDetail = (id) => alert('Outdoor Detail [' + id + ']\nFoto & GPS log sedang diunggah.');
    document.getElementById('refresh-history')?.addEventListener('click', loadHistory);

    // Bootstrap
    activateOutdoorTab('form');
})();
