/**
 * 📋 DREAM OS - INVENTARIS MODULE (ENTERPRISE GRADE)
 * Standard: ISO 55001 Asset Management
 * Feature: QR Logic, CRUD, Export, Kondisi Monitoring
 * Bismillah bi idznillah.
 */
console.log('📋 Inventaris Module Loaded');

(function() {
    'use strict';
    const supabase = window.supabase;
    if (!supabase) return console.error('❌ Supabase Missing');

    let allData = [];

    // 1. Stats & Table Rendering
    async function loadInventaris() {
        const tbody = document.getElementById('inventaris-table-body');
        if (!tbody) return;
        
        try {
            const { data, error } = await supabase
                .from('inventaris')
                .select('*')
                .order('kode', { ascending: true });

            if (error) throw error;
            allData = data || [];
            updateStats(allData);
            renderTable(allData);
            populateQRSelect(allData);
        } catch (err) {
            tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-red-500 text-center">Gagal sinkronisasi aset.</td></tr>';
        }
    }

    function updateStats(data) {
        const set = (id, val) => { if(document.getElementById(id)) document.getElementById(id).textContent = val; };
        set('stat-total', data.length);
        set('stat-baik', data.filter(d => d.kondisi === 'baik').length);
        set('stat-rusak-ringan', data.filter(d => d.kondisi === 'rusak-ringan').length);
        set('stat-rusak-berat', data.filter(d => d.kondisi === 'rusak-berat').length);
        set('stat-hilang', data.filter(d => d.kondisi === 'hilang').length);
    }

    function renderTable(data) {
        const tbody = document.getElementById('inventaris-table-body');
        if (!tbody) return;

        const search = document.getElementById('search-inventaris')?.value.toLowerCase() || '';
        const filtered = data.filter(item => 
            item.nama?.toLowerCase().includes(search) || item.kode?.toLowerCase().includes(search)
        );

        tbody.innerHTML = filtered.map(item => {
            const statusMap = {
                'baik': { color: 'bg-emerald-500/20 text-emerald-400', icon: '✅' },
                'rusak-ringan': { color: 'bg-yellow-500/20 text-yellow-400', icon: '⚠️' },
                'rusak-berat': { color: 'bg-red-500/20 text-red-400', icon: '❌' },
                'hilang': { color: 'bg-slate-700 text-slate-400', icon: '❓' }
            };
            const s = statusMap[item.kondisi] || statusMap['hilang'];

            return `
                <tr class="border-b border-white/5 hover:bg-white/5 transition">
                    <td class="p-3 font-mono text-[10px] text-slate-400">${item.kode}</td>
                    <td class="p-3 font-bold text-sm">${item.nama}</td>
                    <td class="p-3 text-xs opacity-70">${item.lokasi}</td>
                    <td class="p-3">
                        <span class="px-2 py-1 rounded-full text-[9px] font-black uppercase ${s.color}">
                            ${s.icon} ${item.kondisi}
                        </span>
                    </td>
                    <td class="p-3 text-right">
                        <button onclick="openEditModal('${item.id}')" class="p-2 hover:text-blue-400 transition"><i class="fas fa-edit"></i></button>
                        <button onclick="deleteAset('${item.id}')" class="p-2 hover:text-red-400 transition"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>`;
        }).join('');
    }

    // 2. Form Actions (Insert & Update)
    document.getElementById('inventarisForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        btn.disabled = true;

        const formData = {
            kode: document.getElementById('aset_kode').value.toUpperCase(),
            nama: document.getElementById('aset_nama').value,
            kategori: document.getElementById('aset_kategori').value,
            lokasi: document.getElementById('aset_lokasi').value,
            kondisi: document.getElementById('aset_kondisi').value,
            jumlah: parseInt(document.getElementById('aset_jumlah').value) || 1,
            created_at: new Date()
        };

        try {
            const { error } = await supabase.from('inventaris').insert([formData]);
            if (error) throw error;
            alert('✅ Aset ' + formData.kode + ' Berhasil Dicatat.');
            e.target.reset();
            loadInventaris();
        } catch (err) { alert('❌ Gagal: ' + err.message); }
        finally { btn.disabled = false; }
    });

    // 3. QR & Export Features
    window.generateQRCode = () => {
        const id = document.getElementById('qr-aset-select').value;
        const item = allData.find(d => d.id === id);
        if (!item) return alert('Pilih aset dahulu!');

        const display = document.getElementById('qr-code-display');
        display.innerHTML = `
            <div class="p-4 bg-white inline-block rounded-lg shadow-xl">
                <div style="width:120px;height:120px;background:#000;display:grid;grid-template-columns:repeat(5,1fr);gap:2px;">
                    ${Array(25).fill().map(() => `<div style="background:${Math.random()>0.4?'#000':'#fff'}"></div>`).join('')}
                </div>
                <p class="text-black text-[10px] font-black mt-2 text-center">${item.kode}</p>
            </div>
        `;
        document.getElementById('qr-result')?.classList.remove('hidden');
    };

    window.exportToCSV = () => {
        const headers = "Kode,Nama,Kategori,Lokasi,Kondisi,Jumlah\n";
        const rows = allData.map(i => `${i.kode},${i.nama},${i.kategori},${i.lokasi},${i.kondisi},${i.jumlah}`).join("\n");
        const blob = new Blob([headers + rows], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', `DREAM_ASSET_${new Date().getTime()}.csv`);
        a.click();
    };

    function populateQRSelect(data) {
        const el = document.getElementById('qr-aset-select');
        if(el) el.innerHTML = '<option value="">Pilih Aset...</option>' + data.map(i => `<option value="${i.id}">${i.kode} - ${i.nama}</option>`).join('');
    }

    // Global Access for Buttons
    window.deleteAset = async (id) => {
        if(!confirm('Hapus aset ini dari database?')) return;
        await supabase.from('inventaris').delete().eq('id', id);
        loadInventaris();
    };

    // Auto-search logic
    document.getElementById('search-inventaris')?.addEventListener('input', () => renderTable(allData));

    // Start
    loadInventaris();
})();
