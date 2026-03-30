export default {
    async render(context) {
        const { supabase, toast } = context;
        let items = [];
        if (supabase) {
            const { data, error } = await supabase.from('inventory').select('*').order('category', { ascending: true });
            if (!error) items = data;
        }
        return `
            <div style="background:#0f172a; border-radius:24px; padding:24px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                    <h2 style="color:#10b981;"><i class="fas fa-warehouse"></i> Manajemen Inventaris</h2>
                    <button id="btn-add-item" style="background:#10b981; border:none; padding:10px 20px; border-radius:20px; cursor:pointer;">
                        <i class="fas fa-plus"></i> Tambah Item
                    </button>
                </div>

                <!-- Tabel Inventaris -->
                <div style="overflow-x:auto;">
                    <table style="width:100%; border-collapse:collapse;">
                        <thead>
                            <tr style="border-bottom:2px solid #10b981;">
                                <th style="text-align:left; padding:12px;">Kategori</th>
                                <th style="text-align:left; padding:12px;">Item</th>
                                <th style="text-align:left; padding:12px;">Lokasi</th>
                                <th style="text-align:center; padding:12px;">Jumlah</th>
                                <th style="text-align:center; padding:12px;">Status</th>
                                <th style="text-align:center; padding:12px;">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${items.map(item => `
                                <tr style="border-bottom:1px solid #1e293b;">
                                    <td style="padding:12px;">${item.category || '-'}</td>
                                    <td style="padding:12px;">${item.item_name}</td>
                                    <td style="padding:12px;">${item.location || '-'}</td>
                                    <td style="text-align:center; padding:12px;">${item.quantity}</td>
                                    <td style="text-align:center; padding:12px;">
                                        <span style="background:${item.status === 'baik' ? '#10b981' : item.status === 'rusak' ? '#ef4444' : '#f59e0b'}; padding:4px 8px; border-radius:12px; font-size:12px;">
                                            ${item.status || 'baik'}
                                        </span>
                                    </td>
                                    <td style="text-align:center; padding:12px;">
                                        <button class="edit-item" data-id="${item.id}" style="background:#3b82f6; border:none; padding:4px 8px; border-radius:8px; margin-right:5px; cursor:pointer;"><i class="fas fa-edit"></i></button>
                                        <button class="delete-item" data-id="${item.id}" style="background:#ef4444; border:none; padding:4px 8px; border-radius:8px; cursor:pointer;"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                ${items.length === 0 ? '<p style="text-align:center; margin-top:20px;">Belum ada data. Klik "Tambah Item" untuk memulai.</p>' : ''}
            </div>
        `;
    },

    afterRender(context) {
        const { supabase, toast } = context;

        // Fungsi untuk menampilkan form modal tambah/edit
        function showItemForm(item = null) {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed; top:0; left:0; width:100%; height:100%;
                background:rgba(0,0,0,0.8); backdrop-filter:blur(8px);
                display:flex; align-items:center; justify-content:center; z-index:10001;
            `;
            const isEdit = !!item;
            modal.innerHTML = `
                <div style="background:#0f172a; border-radius:24px; padding:24px; width:90%; max-width:500px; border:1px solid #10b981;">
                    <h3 style="color:#10b981;">${isEdit ? 'Edit Item' : 'Tambah Item Baru'}</h3>
                    <form id="item-form">
                        <div style="margin:12px 0;">
                            <label>Kategori</label>
                            <input type="text" id="category" value="${item?.category || ''}" style="width:100%; padding:8px; background:#1e293b; border:1px solid #334155; border-radius:8px; color:white;">
                        </div>
                        <div style="margin:12px 0;">
                            <label>Nama Item *</label>
                            <input type="text" id="item_name" value="${item?.item_name || ''}" required style="width:100%; padding:8px; background:#1e293b; border:1px solid #334155; border-radius:8px; color:white;">
                        </div>
                        <div style="margin:12px 0;">
                            <label>Lokasi</label>
                            <input type="text" id="location" value="${item?.location || ''}" style="width:100%; padding:8px; background:#1e293b; border:1px solid #334155; border-radius:8px; color:white;">
                        </div>
                        <div style="margin:12px 0;">
                            <label>Jumlah *</label>
                            <input type="number" id="quantity" value="${item?.quantity || 1}" required style="width:100%; padding:8px; background:#1e293b; border:1px solid #334155; border-radius:8px; color:white;">
                        </div>
                        <div style="margin:12px 0;">
                            <label>Status</label>
                            <select id="status" style="width:100%; padding:8px; background:#1e293b; border:1px solid #334155; border-radius:8px; color:white;">
                                <option value="baik" ${item?.status === 'baik' ? 'selected' : ''}>Baik</option>
                                <option value="rusak" ${item?.status === 'rusak' ? 'selected' : ''}>Rusak</option>
                                <option value="hilang" ${item?.status === 'hilang' ? 'selected' : ''}>Hilang</option>
                                <option value="perbaikan" ${item?.status === 'perbaikan' ? 'selected' : ''}>Dalam Perbaikan</option>
                            </select>
                        </div>
                        <div style="margin:12px 0;">
                            <label>Tanggal Pembelian (opsional)</label>
                            <input type="date" id="purchase_date" value="${item?.purchase_date || ''}" style="width:100%; padding:8px; background:#1e293b; border:1px solid #334155; border-radius:8px; color:white;">
                        </div>
                        <div style="margin:12px 0;">
                            <label>Catatan</label>
                            <textarea id="notes" rows="2" style="width:100%; padding:8px; background:#1e293b; border:1px solid #334155; border-radius:8px; color:white;">${item?.notes || ''}</textarea>
                        </div>
                        <div style="display:flex; gap:10px; margin-top:20px;">
                            <button type="submit" style="background:#10b981; border:none; padding:10px; border-radius:12px; flex:1; cursor:pointer;">Simpan</button>
                            <button type="button" id="close-modal" style="background:#334155; border:none; padding:10px; border-radius:12px; flex:1; cursor:pointer;">Batal</button>
                        </div>
                    </form>
                </div>
            `;
            document.body.appendChild(modal);

            const form = modal.querySelector('#item-form');
            form.onsubmit = async (e) => {
                e.preventDefault();
                const data = {
                    category: modal.querySelector('#category').value,
                    item_name: modal.querySelector('#item_name').value,
                    location: modal.querySelector('#location').value,
                    quantity: parseInt(modal.querySelector('#quantity').value),
                    status: modal.querySelector('#status').value,
                    purchase_date: modal.querySelector('#purchase_date').value || null,
                    notes: modal.querySelector('#notes').value
                };
                try {
                    if (isEdit) {
                        const { error } = await supabase.from('inventory').update(data).eq('id', item.id);
                        if (error) throw error;
                        toast('Item berhasil diperbarui', 'success');
                    } else {
                        const { error } = await supabase.from('inventory').insert(data);
                        if (error) throw error;
                        toast('Item berhasil ditambahkan', 'success');
                    }
                    modal.remove();
                    // reload modul
                    context.navigate('inventaris');
                } catch (err) {
                    console.error(err);
                    toast('Gagal menyimpan: ' + err.message, 'error');
                }
            };
            modal.querySelector('#close-modal').onclick = () => modal.remove();
        }

        // Event listener untuk tombol tambah
        document.getElementById('btn-add-item')?.addEventListener('click', () => showItemForm());

        // Event listener untuk tombol edit dan delete (delegasi)
        document.querySelectorAll('.edit-item').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.dataset.id;
                const { data, error } = await supabase.from('inventory').select('*').eq('id', id).single();
                if (!error) showItemForm(data);
                else toast('Gagal mengambil data', 'error');
            });
        });
        document.querySelectorAll('.delete-item').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (confirm('Hapus item ini?')) {
                    const id = btn.dataset.id;
                    const { error } = await supabase.from('inventory').delete().eq('id', id);
                    if (error) toast('Gagal hapus: ' + error.message, 'error');
                    else {
                        toast('Item dihapus', 'success');
                        context.navigate('inventaris');
                    }
                }
            });
        });
    }
};
