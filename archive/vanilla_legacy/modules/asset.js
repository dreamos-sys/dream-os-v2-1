export default {
    name: 'Manajemen Aset',
    icon: 'fa-warehouse',
    color: '#10b981',

    async render(context) {
        const { supabase, toast } = context;
        let assets = [];
        if (supabase) {
            const { data, error } = await supabase.from('assets').select('*');
            if (!error) assets = data || [];
            else console.error(error);
        }
        return `
            <div style="background:#0f172a; border-radius:24px; padding:24px;">
                <h2 style="color:#10b981;"><i class="fas fa-warehouse"></i> Manajemen Aset</h2>
                <div style="overflow-x:auto;">
                    <table style="width:100%; border-collapse:collapse;">
                        <thead>
                            <tr style="border-bottom:2px solid #10b981;">
                                <th style="text-align:left; padding:12px;">Nama</th>
                                <th style="text-align:left; padding:12px;">Kategori</th>
                                <th style="text-align:center; padding:12px;">Jumlah</th>
                                <th style="text-align:center; padding:12px;">Kondisi</th>
                             </tr>
                        </thead>
                        <tbody>
                            ${assets.map(a => `
                                <tr style="border-bottom:1px solid #1e293b;">
                                    <td style="padding:12px;">${a.name}</td>
                                    <td style="padding:12px;">${a.category || '-'}</td>
                                    <td style="text-align:center; padding:12px;">${a.quantity || 1}</td>
                                    <td style="text-align:center; padding:12px;">${a.condition || 'good'}</td>
                                 </tr>
                            `).join('')}
                        </tbody>
                     </table>
                </div>
                ${assets.length === 0 ? '<p style="text-align:center; margin-top:20px;">Belum ada data aset. Tambahkan via SQL.</p>' : ''}
            </div>
        `;
    },
    afterRender() {}
};
