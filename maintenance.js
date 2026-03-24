/**
 * 🔧 DREAM OS - MAINTENANCE & TECHNICIAN MODULE
 * Feature: Task Management, Sparepart Integration, K3 Sync
 * Standard: ISO 9001 (Quality) & ISO 55001 (Asset)
 * Bismillah bi idznillah.
 */
console.log('🔧 Maintenance Module Loaded');

(function() {
    'use strict';
    const supabase = window.supabase;
    if (!supabase) return console.error('❌ Maintenance: Supabase Missing');

    let currentFilter = 'semua';

    // 1. Dashboard Stats (Real-time Count)
    async function loadStats() {
        try {
            const getCount = async (status) => {
                const { count } = await supabase.from('maintenance_tasks')
                    .select('*', { count: 'exact', head: true }).eq('status', status);
                return count || 0;
            };
            
            document.getElementById('stat-pending').textContent = await getCount('pending');
            document.getElementById('stat-proses').textContent = await getCount('proses');
            document.getElementById('stat-selesai').textContent = await getCount('selesai');
        } catch (err) { console.warn('Stats Sync Error'); }
    }

    // 2. Task Engine (Filterable List)
    async function loadTasks(filter = 'semua') {
        const container = document.getElementById('tasks-list');
        if (!container) return;
        
        container.innerHTML = '<div class="p-10 text-center animate-pulse font-mono text-xs opacity-50">📡 MENGAMBIL DATA TUGAS...</div>';

        try {
            let query = supabase.from('maintenance_tasks').select(`
                *, k3_reports(jenis_laporan, foto_url)
            `).order('created_at', { ascending: false });

            if (filter !== 'semua') query = query.eq('status', filter);

            const { data, error } = await query;
            if (error) throw error;

            if (!data?.length) {
                container.innerHTML = '<div class="p-10 text-center opacity-40 text-xs italic">Tidak ada antrean tugas.</div>';
                return;
            }

            container.innerHTML = data.map(task => {
                const pColor = task.prioritas === 'tinggi' ? 'border-red-500 bg-red-500/5' : 'border-yellow-500 bg-yellow-500/5';
                const sBadge = task.status === 'selesai' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400';
                
                return `
                <div class="mb-3 p-4 rounded-xl border-l-4 ${pColor} bg-slate-800/40 backdrop-blur-sm transition-all hover:scale-[1.01]">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-white/10 text-slate-300 italic">${task.k3_report_id ? 'Source: K3' : 'Manual'}</span>
                                <span class="text-[9px] font-black uppercase px-2 py-0.5 rounded ${sBadge}">${task.status}</span>
                            </div>
                            <h3 class="text-sm font-bold text-slate-100 uppercase tracking-tight">${task.lokasi}</h3>
                            <p class="text-xs text-slate-400 mt-1 leading-relaxed">${task.deskripsi}</p>
                            <div class="mt-3 flex gap-4 text-[10px] font-mono text-slate-500">
                                <span>📅 ${new Date(task.created_at).toLocaleDateString()}</span>
                                <span>👤 ${task.pelapor || 'System'}</span>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            ${task.status === 'pending' ? `<button onclick="ambilTugas('${task.id}')" class="bg-yellow-500 text-black font-black text-[10px] px-3 py-2 rounded-lg hover:bg-yellow-400">AMBIL</button>` : ''}
                            ${task.status === 'proses' ? `<button onclick="selesaikanTugas('${task.id}')" class="bg-green-500 text-black font-black text-[10px] px-3 py-2 rounded-lg">SELESAI</button>` : ''}
                        </div>
                    </div>
                </div>`;
            }).join('');
        } catch (err) {
            container.innerHTML = `<div class="p-4 text-red-400 text-xs font-mono">❌ DATA ERROR: ${err.message}</div>`;
        }
    }

    // 3. Actions
    window.ambilTugas = async (id) => {
        if (!confirm('Bismillah, ambil tugas ini?')) return;
        const { error } = await supabase.from('maintenance_tasks')
            .update({ status: 'proses', progress_notes: 'Dikerjakan oleh teknisi' }).eq('id', id);
        if (!error) { loadTasks(currentFilter); loadStats(); }
    };

    window.selesaikanTugas = async (id) => {
        const note = prompt('Catatan penyelesaian (Opsional):');
        const { error } = await supabase.from('maintenance_tasks')
            .update({ 
                status: 'selesai', 
                progress_notes: note || 'Pekerjaan Selesai',
                waktu_selesai: new Date() 
            }).eq('id', id);
        if (!error) { loadTasks(currentFilter); loadStats(); }
    };

    // Tab Switcher UI
    window.setMaintFilter = (filter, elId) => {
        currentFilter = filter;
        document.querySelectorAll('.tab-maint').forEach(b => b.classList.remove('border-yellow-500', 'text-yellow-500'));
        document.getElementById(elId).classList.add('border-yellow-500', 'text-yellow-500');
        loadTasks(filter);
    };

    // Init
    loadStats();
    loadTasks('semua');
})();
