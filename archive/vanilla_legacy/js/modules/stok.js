/**
 * 📦 DREAM OS - SMART STOCK MANAGEMENT
 * Feature: Real-time Inventory, Auto-Critical Warning
 * Standard: ISO 55001 Asset Management
 * Bismillah bi idznillah.
 */
console.log('📦 Stock Module Loaded');

(function() {
    'use strict';
    const supabase = window.supabase;
    if (!supabase) return console.error('❌ Stock: Supabase Missing');

    // 1. Load & Render Stock with Analytics
    async function loadStok() {
        const listDiv = document.getElementById('stok-list');
        if (!listDiv) return;
        
        listDiv.innerHTML = '<div class="p-6 text-center animate-pulse font-mono text-[10px] opacity-50 text-cyan-400">📡 SYNCING INVENTORY...</div>';

        try {
            const { data, error } = await supabase
                .from('stok')
                .select('*')
                .order('nama_barang', { ascending: true });

            if (error) throw error;

            if (!data?.length) {
                listDiv.innerHTML = '<div class="p-10 text-center opacity-40 text-xs italic font-mono">GUDANG KOSONG</div>';
                return;
            }

            listDiv.innerHTML = `
                <div class="grid grid-cols-1 gap-2">
                    ${data.map(item => {
                        const isCritical = item.jumlah <= (item.minimal_stok || 0);
                        const statusClass = isCritical ? 'border-red-500/50 bg-red-500/10' : 'border-white/5 bg-white/5';
                        const textClass = isCritical ? 'text-red-400 animate-pulse font-black' : 'text-emerald-400 font-bold';
                        
                        return `
                        <div class="p-3 rounded-xl border ${statusClass} flex justify-between items-center transition-all hover:bg-white/10">
                            <div class="flex-1">
                                <div class="flex items-center gap-2">
                                    <span class="text-sm font-bold text-slate-200 tracking-tight">${item.nama_barang}</span>
                                    ${isCritical ? '<span class="text-[8px] bg-red-600 text-white px-1 rounded font-black italic">LOW!</span>' : ''}
                                </div>
                                <div class="text-[10px] opacity-50 font-mono mt-1 uppercase">
                                    ${item.kategori || 'General'} • Loc: ${item.lokasi || '-'}
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-sm ${textClass}">${item.jumlah} <span class="text-[10px] opacity-60 font-normal">${item.satuan || 'Pcs'}</span></div>
                                <div class="text-[8px] opacity-40 font-mono italic">Min: ${item.minimal_stok || 0}</div>
                            </div>
                        </div>`;
                    }).join('')}
                </div>`;
        } catch (err) {
            listDiv.innerHTML = `<div class="p-4 text-red-500 text-center text-xs font-mono italic">❌ GAGAL SYNC: ${err.message}</div>`;
        }
    }

    // 2. Insert Logic with Validation
    const stokForm = document.getElementById('stokForm');
    if (stokForm) {
        stokForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const res = document.getElementById('form-result');
            const btn = e.target.querySelector('button[type="submit"]');

            if (res) res.innerHTML = '<span class="text-cyan-500 animate-pulse font-mono text-[10px]">📡 UPDATING LEDGER...</span>';
            if (btn) btn.disabled = true;

            const formData = {
                nama_barang: document.getElementById('nama_barang').value.trim(),
                kategori: document.getElementById('kategori').value,
                jumlah: parseInt(document.getElementById('jumlah').value),
                satuan: document.getElementById('satuan').value.trim(),
                lokasi: document.getElementById('lokasi').value.trim(),
                minimal_stok: parseInt(document.getElementById('minimal_stok').value) || 0,
                updated_at: new Date()
            };

            try {
                const { error } = await supabase.from('stok').insert([formData]);
                if (error) throw error;

                if (res) res.innerHTML = '<span class="text-green-500 font-black text-xs">✅ STOK BERHASIL DITAMBAHKAN!</span>';
                e.target.reset();
                loadStok();
                setTimeout(() => { if (res) res.innerHTML = ''; }, 3000);
            } catch (err) {
                if (res) res.innerHTML = `<span class="text-red-500 text-[10px]">❌ ERROR: ${err.message}</span>`;
            } finally {
                if (btn) btn.disabled = false;
            }
        });
    }

    // Initialize
    loadStok();
    // Refresh otomatis setiap 1 menit
    setInterval(loadStok, 60000);
})();
