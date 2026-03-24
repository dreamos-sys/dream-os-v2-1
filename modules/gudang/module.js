/**
 * 🏭 DREAM OS - GUDANG & INVENTARIS MODULE
 * Feature: Stock Management, Reorder Alerts, Transaction History
 * Bismillah bi idznillah.
 */
console.log('🏭 Gudang Module Loaded');

(function() {
    const supabase = window.supabase;
    if (!supabase) return console.error('❌ Supabase tidak tersedia untuk Gudang Module');

    let stockData = [];

    // 1. Tab switching Logic
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => {
                b.classList.remove('active', 'bg-emerald-600', 'text-white');
                b.classList.add('bg-slate-700', 'text-slate-300');
            });
            btn.classList.remove('bg-slate-700', 'text-slate-300');
            btn.classList.add('active', 'bg-emerald-600', 'text-white');
            
            document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
            const target = document.getElementById(`tab-${btn.dataset.tab}`);
            if(target) target.classList.remove('hidden');
        });
    });

    // 2. Load & Render Stock
    async function loadStock() {
        const tbody = document.getElementById('stock-table-body');
        if (!tbody) return;

        try {
            const { data, error } = await supabase
                .from('gudang_stok')
                .select('*')
                .order('kategori', { ascending: true });

            if (error) throw error;
            stockData = data || [];
            updateStats(stockData);
            populateSelects(stockData);
            renderStockTable(stockData);
        } catch (err) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-red-500">Gagal memuat stok</td></tr>';
        }
    }

    function updateStats(data) {
        const setVal = (id, val) => { if(document.getElementById(id)) document.getElementById(id).textContent = val; };
        setVal('stat-total-items', data.length);
        setVal('stat-stok-aman', data.filter(d => d.stok > d.reorder_level).length);
        setVal('stat-stok-rendah', data.filter(d => d.stok <= d.reorder_level && d.stok > 0).length);
        setVal('stat-perlu-order', data.filter(d => d.stok <= 0).length);
    }

    function renderStockTable(data) {
        const tbody = document.getElementById('stock-table-body');
        if (!tbody) return;
        tbody.innerHTML = data.map(item => {
            const isLow = item.stok <= item.reorder_level;
            const isOut = item.stok <= 0;
            const statusClass = isOut || isLow ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400';
            const statusText = isOut ? '❌ Habis' : (isLow ? '⚠️ Low' : '✅ Aman');

            return `
                <tr class="border-b border-slate-700 hover:bg-slate-800/50 transition">
                    <td class="p-3 font-mono text-xs">${item.kode || '-'}</td>
                    <td class="p-3 font-medium">${item.nama}</td>
                    <td class="p-3 text-xs opacity-70">${item.kategori}</td>
                    <td class="p-3 font-bold">${item.stok}</td>
                    <td class="p-3 text-xs">${item.satuan}</td>
                    <td class="p-3"><span class="px-2 py-1 rounded-full text-[10px] ${statusClass}">${statusText}</span></td>
                    <td class="p-3">
                        <button onclick="quickAdjust('${item.id}')" class="text-blue-400 hover:text-white"><i class="fas fa-edit"></i></button>
                    </td>
                </tr>`;
        }).join('');
    }

    function populateSelects(data) {
        const options = '<option value="">Pilih barang...</option>' + data.map(item => 
            `<option value="${item.id}">${item.kode} - ${item.nama} (Stok: ${item.stok})</option>`
        ).join('');
        ['in_barang_id', 'out_barang_id'].forEach(id => {
            const el = document.getElementById(id);
            if(el) el.innerHTML = options;
        });
    }

    // 3. Transactions (In/Out)
    async function handleTransaction(type, e) {
        e.preventDefault();
        const bId = document.getElementById(`${type}_barang_id`).value;
        const qty = parseInt(document.getElementById(`${type}_jumlah`).value);
        if(!bId || !qty) return alert('Data tidak lengkap');

        try {
            const { data: curr } = await supabase.from('gudang_stok').select('stok').eq('id', bId).single();
            const newQty = type === 'in' ? curr.stok + qty : curr.stok - qty;
            if(newQty < 0) return alert('Stok tidak mencukupi!');

            await supabase.from('gudang_stok').update({ stok: newQty }).eq('id', bId);
            await supabase.from('stock_transactions').insert([{
                barang_id: bId, type, jumlah: qty,
                catatan: document.getElementById(`${type}_catatan`)?.value || '',
                tanggal: new Date().toISOString().split('T')[0]
            }]);

            alert('✅ Transaksi Berhasil');
            e.target.reset();
            loadStock();
        } catch (err) { alert('❌ Error: ' + err.message); }
    }

    document.getElementById('stockInForm')?.addEventListener('submit', (e) => handleTransaction('in', e));
    document.getElementById('stockOutForm')?.addEventListener('submit', (e) => handleTransaction('out', e));

    window.quickAdjust = (id) => {
        const val = prompt('Masukkan jumlah stok baru:');
        if(val !== null) {
            supabase.from('gudang_stok').update({ stok: parseInt(val) }).eq('id', id)
                .then(() => loadStock());
        }
    };

    loadStock();
})();
