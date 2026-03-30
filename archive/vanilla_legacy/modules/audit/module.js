export default {
    name: 'Audit Trail',
    icon: 'fa-history',
    color: '#8b5cf6',

    async render(context) {
        const { supabase, toast } = context;
        let logs = [];
        if (supabase) {
            const { data } = await supabase
                .from('asset_logs')
                .select(`
                    id, action, old_data, new_data, changed_at,
                    changed_by,
                    assets (id, name),
                    auth_users:changed_by (email)
                `)
                .order('changed_at', { ascending: false })
                .limit(100);
            logs = data || [];
        }

        return `
            <div style="background:#0f172a; border-radius:24px; padding:24px;">
                <h2 style="color:#8b5cf6;"><i class="fas fa-history"></i> Audit Trail</h2>
                <p style="color:#94a3b8; margin-bottom:20px;">Catatan perubahan aset (100 terakhir)</p>
                <div style="overflow-x:auto;">
                    <table style="width:100%; border-collapse:collapse;">
                        <thead>
                            <tr style="border-bottom:2px solid #8b5cf6;">
                                <th style="text-align:left; padding:12px;">Waktu</th>
                                <th style="text-align:left; padding:12px;">Aset</th>
                                <th style="text-align:center; padding:12px;">Aksi</th>
                                <th style="text-align:left; padding:12px;">Pengguna</th>
                                <th style="text-align:left; padding:12px;">Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${logs.map(log => `
                                <tr style="border-bottom:1px solid #1e293b;">
                                    <td style="padding:12px;">${new Date(log.changed_at).toLocaleString()}</td>
                                    <td style="padding:12px;">${log.assets?.name || '-'}</td>
                                    <td style="text-align:center; padding:12px;">
                                        <span style="background:${log.action === 'INSERT' ? '#10b981' : log.action === 'UPDATE' ? '#f59e0b' : '#ef4444'}; padding:4px 8px; border-radius:12px; font-size:12px;">${log.action}</span>
                                    </td>
                                    <td style="padding:12px;">${log.auth_users?.email || log.changed_by || 'System'}</td>
                                    <td style="padding:12px;">
                                        <button class="view-detail" data-log='${JSON.stringify(log)}' style="background:#334155; border:none; padding:4px 8px; border-radius:8px; cursor:pointer;">Lihat Detail</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                ${logs.length === 0 ? '<p style="text-align:center; margin-top:20px;">Belum ada catatan perubahan.</p>' : ''}
            </div>
        `;
    },

    afterRender(context) {
        const { toast } = context;
        document.querySelectorAll('.view-detail').forEach(btn => {
            btn.addEventListener('click', () => {
                const log = JSON.parse(btn.dataset.log);
                const detail = `
                    <div style="max-height:400px; overflow:auto;">
                        <p><strong>Waktu:</strong> ${new Date(log.changed_at).toLocaleString()}</p>
                        <p><strong>Aksi:</strong> ${log.action}</p>
                        <p><strong>Aset:</strong> ${log.assets?.name || '-'}</p>
                        <p><strong>Pengguna:</strong> ${log.auth_users?.email || log.changed_by || 'System'}</p>
                        <hr>
                        <p><strong>Data Lama:</strong></p>
                        <pre style="background:#0f0f1f; padding:8px; border-radius:8px;">${JSON.stringify(log.old_data, null, 2)}</pre>
                        <p><strong>Data Baru:</strong></p>
                        <pre style="background:#0f0f1f; padding:8px; border-radius:8px;">${JSON.stringify(log.new_data, null, 2)}</pre>
                    </div>
                `;
                const modal = document.createElement('div');
                modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; z-index:10001;';
                modal.innerHTML = `<div style="background:#0f172a; border-radius:24px; padding:24px; max-width:600px; width:90%; border:1px solid #8b5cf6;"><h3 style="color:#8b5cf6;">Detail Log</h3>${detail}<button id="close-modal" style="margin-top:20px; background:#334155; border:none; padding:8px 16px; border-radius:12px; cursor:pointer;">Tutup</button></div>`;
                document.body.appendChild(modal);
                modal.querySelector('#close-modal').onclick = () => modal.remove();
            });
        });
    }
};
