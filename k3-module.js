/**
 * 🛡️ DREAM OS - K3 SMART MODULE (ENTERPRISE REVISION)
 * Safety, Security & Maintenance Reporting
 * Standard: ISO 45001 & ISO 9001
 * Bismillah bi idznillah.
 */
console.log('🛡️ K3 Smart Module Loaded');

(function() {
    'use strict';
    const supabase = window.supabase;
    if (!supabase) return console.error('❌ K3: Supabase Missing');

    const jenisSelect = document.getElementById('jenis_laporan');
    const dynamicFields = document.getElementById('dynamic-fields');

    // 1. Dynamic UI Templates (Berubah sesuai pilihan user)
    const templates = {
        kerusakan: `
            <div class="p-3 bg-orange-500/10 border-l-4 border-orange-500 rounded-r-xl space-y-2 animate-in fade-in duration-300">
                <p class="text-[10px] font-black text-orange-500 uppercase italic">🔧 Detail Perbaikan</p>
                <input type="text" id="kategori_kerusakan" placeholder="Kategori (Listrik/Air/Fisik/AC)" class="w-full bg-slate-800 border-none text-xs p-2 rounded-lg text-white">
                <select id="priority" class="w-full bg-slate-800 border-none text-xs p-2 rounded-lg text-white font-bold">
                    <option value="normal" class="text-white">Prioritas: Normal</option>
                    <option value="tinggi" class="text-red-400">Prioritas: TINGGI (Urgent)</option>
                </select>
            </div>`,
        kehilangan: `
            <div class="p-3 bg-blue-500/10 border-l-4 border-blue-500 rounded-r-xl space-y-2 animate-in fade-in duration-300">
                <p class="text-[10px] font-black text-blue-500 uppercase italic">🔒 Protokol Kehilangan</p>
                <input type="text" id="barang_hilang" placeholder="Nama Barang yang Hilang" class="w-full bg-slate-800 border-none text-xs p-2 rounded-lg text-white">
                <input type="number" id="nilai_estimasi" placeholder="Estimasi Nilai (Rp)" class="w-full bg-slate-800 border-none text-xs p-2 rounded-lg text-white">
            </div>`,
        kebersihan: `
            <div class="p-3 bg-emerald-500/10 border-l-4 border-emerald-500 rounded-r-xl space-y-2 animate-in fade-in duration-300">
                <p class="text-[10px] font-black text-emerald-500 uppercase italic">🧹 Area Kebersihan</p>
                <select id="tingkat_kekotoran" class="w-full bg-slate-800 border-none text-xs p-2 rounded-lg text-white">
                    <option value="ringan">Kondisi: Ringan</option>
                    <option value="sedang" selected>Kondisi: Sedang</option>
                    <option value="berat">Kondisi: Berat (Butuh Tindakan Cepat)</option>
                </select>
            </div>`
    };

    function updateDynamicUI() {
        if (dynamicFields && jenisSelect) {
            dynamicFields.innerHTML = templates[jenisSelect.value] || '';
        }
    }
    
    // Listen perubahan jenis laporan
    if (jenisSelect) {
        jenisSelect.addEventListener('change', updateDynamicUI);
    }

    // 2. Automated Smart Routing Logic (Submit)
    async function submitK3(e) {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        const res = document.getElementById('form-result');
        
        if (btn) btn.disabled = true;
        if (res) res.innerHTML = '<span class="text-[10px] font-mono animate-pulse text-cyan-400">📡 ROUTING REPORT TO SERVER...</span>';

        const jenis = jenisSelect.value;
        const departemenMap = { 
            kerusakan: 'maintenance', 
            kehilangan: 'sekuriti', 
            kebersihan: 'janitor' 
        };

        const baseData = {
            tanggal: document.getElementById('tanggal').value,
            lokasi: document.getElementById('lokasi').value,
            jenis_laporan: jenis,
            deskripsi: document.getElementById('deskripsi').value,
            pelapor: document.getElementById('pelapor').value,
            departemen_tujuan: departemenMap[jenis] || 'umum',
            status: 'pending',
            created_at: new Date()
        };

        // Capture data dari field dinamis
        if (jenis === 'kerusakan') {
            baseData.kategori_kerusakan = document.getElementById('kategori_kerusakan')?.value;
            baseData.priority = document.getElementById('priority')?.value;
        } else if (jenis === 'kehilangan') {
            baseData.barang_hilang = document.getElementById('barang_hilang')?.value;
            baseData.nilai_estimasi = document.getElementById('nilai_estimasi')?.value;
        } else if (jenis === 'kebersihan') {
            baseData.tingkat_kekotoran = document.getElementById('tingkat_kekotoran')?.value;
        }

        try {
            const { error } = await supabase.from('k3_reports').insert([baseData]);
            if (error) throw error;
            
            if (res) res.innerHTML = `<span class="text-green-500 font-black text-xs uppercase italic">✅ LAPORAN TERKIRIM KE DEPT. ${baseData.departemen_tujuan.toUpperCase()}</span>`;
            e.target.reset();
            updateDynamicUI();
            loadK3History();
        } catch (err) {
            if (res) res.innerHTML = '<span class="text-red-500 text-xs font-mono">❌ SYNC ERROR: ' + err.message + '</span>';
        } finally { 
            if (btn) btn.disabled = false; 
        }
    }

    // 3. Live History (Table Feed)
    async function loadK3History() {
        const tbody = document.getElementById('history-table-body');
        if (!tbody) return;
        
        try {
            const { data, error } = await supabase.from('k3_reports')
                .select('*').order('created_at', { ascending: false }).limit(10);

            if (error) throw error;

            tbody.innerHTML = (data || []).map(item => `
                <tr class="border-b border-white/5 text-[11px] hover:bg-white/5 transition">
                    <td class="p-2 font-mono opacity-60 text-[9px]">${item.tanggal}</td>
                    <td class="p-2 font-bold text-slate-300">${item.lokasi}</td>
                    <td class="p-2 uppercase text-cyan-400 font-black">${item.jenis_laporan}</td>
                    <td class="p-2 opacity-80">${item.pelapor}</td>
                    <td class="p-2">
                        <span class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${item.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}">
                            ${item.status}
                        </span>
                    </td>
                </tr>
            `).join('') || '<tr><td colspan="5" class="p-4 text-center opacity-40 text-xs italic">Belum ada laporan K3 hari ini.</td></tr>';
        } catch (err) {
            tbody.innerHTML = '<tr><td colspan="5" class="p-2 text-red-500 text-center text-[10px]">Gagal load data.</td></tr>';
        }
    }

    // Bridge Kamera Redmi Note 9 Pro
    window.openK3Camera = () => {
        alert('📸 Sensor Kamera Xiaomi Redmi Note 9 Pro Aktif.\n(Gunakan sensor sidik jari untuk pengambilan gambar)');
    };

    // Initialization
    const k3Form = document.getElementById('k3Form');
    if (k3Form) k3Form.addEventListener('submit', submitK3);
    
    const refreshBtn = document.getElementById('refresh-history');
    if (refreshBtn) refreshBtn.addEventListener('click', loadK3History);

    updateDynamicUI();
    loadK3History();
})();
