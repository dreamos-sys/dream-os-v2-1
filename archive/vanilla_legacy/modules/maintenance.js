export default {
    render: (ctx) => {
        const userName = (ctx.user?.name || 'GUEST').toUpperCase();
        return `
            <div id="maintenance-root">
                <div class="maint-panel maint-header">
                    <div style="display:flex; align-items:center; gap:1rem; flex-wrap:wrap;">
                        <div style="font-size:3rem;">🔧</div>
                        <div>
                            <div class="maint-title">MAINTENANCE MANAGER</div>
                            <div class="maint-sub">Kelola tugas perawatan & perbaikan</div>
                        </div>
                        <div style="margin-left:auto;">
                            <span class="maint-badge maint-badge-info">${userName}</span>
                        </div>
                    </div>
                </div>

                <div class="maint-tabs">
                    <div class="maint-tab active" data-tab="form">➕ Tugas Baru</div>
                    <div class="maint-tab" data-tab="history">📜 Riwayat</div>
                </div>

                <div id="maint-form-tab" class="tab-content">
                    <div class="maint-panel">
                        <h3 style="margin-bottom:1.5rem;">📝 Buat Tugas Maintenance Baru</h3>
                        <form id="maintForm">
                            <div class="maint-grid">
                                <div>
                                    <label class="maint-label">Tanggal *</label>
                                    <input type="date" id="maint-tanggal" class="maint-input" required>
                                </div>
                                <div>
                                    <label class="maint-label">Waktu (opsional)</label>
                                    <input type="time" id="maint-waktu" class="maint-input">
                                </div>
                                <div>
                                    <label class="maint-label">Petugas *</label>
                                    <input type="text" id="maint-petugas" class="maint-input" required placeholder="Nama petugas">
                                </div>
                                <div>
                                    <label class="maint-label">Prioritas</label>
                                    <select id="maint-prioritas" class="maint-select">
                                        <option value="low">Low</option>
                                        <option value="normal" selected>Normal</option>
                                        <option value="high">High</option>
                                        <option value="urgent">Urgent</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="maint-label">Jenis Kegiatan *</label>
                                    <select id="maint-jenis" class="maint-select" required>
                                        <option value="perbaikan">Perbaikan</option>
                                        <option value="penggantian">Penggantian</option>
                                        <option value="perawatan">Perawatan</option>
                                        <option value="cuci_ac">Cuci AC</option>
                                        <option value="inspeksi">Inspeksi</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="maint-label">Kategori</label>
                                    <select id="maint-kategori" class="maint-select">
                                        <option value="ac">AC</option>
                                        <option value="listrik">Listrik</option>
                                        <option value="plumbing">Plumbing</option>
                                        <option value="gedung">Gedung</option>
                                        <option value="peralatan">Peralatan</option>
                                        <option value="lainnya">Lainnya</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="maint-label">Lokasi *</label>
                                    <input type="text" id="maint-lokasi" class="maint-input" required placeholder="Contoh: Ruang Server">
                                </div>
                                <div>
                                    <label class="maint-label">Gedung</label>
                                    <input type="text" id="maint-gedung" class="maint-input" placeholder="Gedung A/B/C">
                                </div>
                                <div>
                                    <label class="maint-label">Lantai</label>
                                    <input type="text" id="maint-lantai" class="maint-input" placeholder="1/2/3">
                                </div>
                                <div>
                                    <label class="maint-label">Unit Aset</label>
                                    <input type="text" id="maint-aset" class="maint-input" placeholder="Kode aset (opsional)">
                                </div>
                            </div>

                            <div style="margin-top:1rem;">
                                <label class="maint-label">Deskripsi Masalah *</label>
                                <textarea id="maint-deskripsi" rows="3" class="maint-textarea" required placeholder="Jelaskan masalah..."></textarea>
                            </div>

                            <div style="margin-top:1rem;">
                                <label class="maint-label">Catatan Tambahan</label>
                                <textarea id="maint-catatan" rows="2" class="maint-textarea" placeholder="Instruksi khusus..."></textarea>
                            </div>

                            <div style="margin-top:1.5rem; display:flex; gap:0.5rem;">
                                <button type="submit" class="maint-btn maint-btn-primary">
                                    <i class="fas fa-save"></i> Simpan Tugas
                                </button>
                                <button type="reset" class="maint-btn" style="background:rgba(255,255,255,0.1);">
                                    <i class="fas fa-undo"></i> Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div id="maint-history-tab" class="tab-content" style="display:none;">
                    <div class="maint-panel">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
                            <h3 style="margin:0;">📜 Riwayat Tugas Maintenance</h3>
                            <button id="maint-refresh" class="maint-btn maint-btn-sm">🔄 Refresh</button>
                        </div>
                        <div class="maint-table-wrap">
                            <table class="maint-table">
                                <thead>
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>Jenis</th>
                                        <th>Lokasi</th>
                                        <th>Petugas</th>
                                        <th>Prioritas</th>
                                        <th>Status</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody id="maint-history-body">
                                    <tr><td colspan="7">Memuat...</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <style>
                    .maint-panel {
                        background: rgba(15,23,42,0.88);
                        backdrop-filter: blur(20px);
                        border: 1px solid rgba(249,115,22,0.2);
                        border-radius: 16px;
                        padding: 1.5rem;
                        margin-bottom: 1.5rem;
                    }
                    .maint-header {
                        background: linear-gradient(135deg, rgba(249,115,22,0.15), rgba(249,115,22,0.05));
                        border-left: 4px solid #f97316;
                    }
                    .maint-title {
                        font-size: 1.8rem;
                        font-weight: 800;
                        background: linear-gradient(135deg, #f97316, #ea580c);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        margin-bottom: 0.25rem;
                    }
                    .maint-sub { font-size: 0.75rem; color: #94a3b8; }
                    .maint-tabs {
                        display: flex;
                        gap: 0.5rem;
                        border-bottom: 2px solid rgba(249,115,22,0.3);
                        margin-bottom: 1.5rem;
                        overflow-x: auto;
                    }
                    .maint-tab {
                        padding: 0.65rem 1.5rem;
                        background: rgba(255,255,255,0.04);
                        border: 1px solid transparent;
                        border-radius: 8px 8px 0 0;
                        cursor: pointer;
                        font-weight: 600;
                        font-size: 0.9rem;
                        color: #94a3b8;
                        white-space: nowrap;
                    }
                    .maint-tab:hover { background: rgba(249,115,22,0.08); color: #e2e8f0; }
                    .maint-tab.active { background: rgba(249,115,22,0.18); border-color: #f97316; color: #f97316; }
                    .maint-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                        gap: 1rem;
                    }
                    .maint-label {
                        display: block;
                        font-size: 0.75rem;
                        color: #94a3b8;
                        margin-bottom: 0.25rem;
                        text-transform: uppercase;
                    }
                    .maint-input, .maint-select, .maint-textarea {
                        width: 100%;
                        padding: 0.75rem 1rem;
                        background: rgba(0,0,0,0.3);
                        border: 1px solid rgba(249,115,22,0.3);
                        border-radius: 8px;
                        color: #e2e8f0;
                        font-size: 0.9rem;
                    }
                    .maint-btn {
                        display: inline-flex;
                        align-items: center;
                        gap: 0.5rem;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        font-weight: 700;
                        cursor: pointer;
                        border: none;
                    }
                    .maint-btn-primary {
                        background: linear-gradient(135deg, #f97316, #ea580c);
                        color: #020617;
                    }
                    .maint-btn-sm {
                        padding: 0.4rem 1rem;
                        font-size: 0.8rem;
                        background: rgba(255,255,255,0.08);
                        border: 1px solid rgba(255,255,255,0.15);
                        color: #e2e8f0;
                    }
                    .maint-table-wrap {
                        overflow-x: auto;
                        border-radius: 8px;
                        border: 1px solid rgba(255,255,255,0.08);
                    }
                    table.maint-table {
                        width: 100%;
                        border-collapse: collapse;
                        font-size: 0.85rem;
                    }
                    table.maint-table th {
                        padding: 0.75rem 1rem;
                        text-align: left;
                        font-size: 0.7rem;
                        text-transform: uppercase;
                        color: #94a3b8;
                    }
                    table.maint-table td {
                        padding: 0.75rem 1rem;
                        border-top: 1px solid rgba(255,255,255,0.05);
                    }
                    .maint-badge {
                        display: inline-block;
                        padding: 0.2rem 0.75rem;
                        border-radius: 20px;
                        font-size: 0.7rem;
                        font-weight: 600;
                    }
                    .maint-badge-info { background: rgba(249,115,22,0.2); color: #f97316; }
                </style>
            </div>
        `;
    },

    afterRender: async (ctx) => {
        const supabase = ctx.supabase;
        const toast = ctx.toast || ((msg, type) => alert(`${type?.toUpperCase()}: ${msg}`));

        // Helper functions
        function fmtDate(d) { return d ? new Date(d).toLocaleDateString('id-ID') : '—'; }

        async function loadHistory() {
            const tbody = document.getElementById('maint-history-body');
            if (!tbody) return;
            tbody.innerHTML = '<tr><td colspan="7"><div class="maint-spinner" style="width:40px;height:40px;border:2px solid #f97316;border-top-color:transparent;border-radius:50%;animation:spin 1s linear infinite;margin:2rem auto;"></div></td></tr>';
            try {
                const { data, error } = await supabase
                    .from('maintenance_tasks')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(50);
                if (error) throw error;
                if (!data || data.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="7">Belum ada tugas maintenance.</td></tr>';
                    return;
                }
                let html = '';
                data.forEach(task => {
                    html += `<tr>
                        <td>${fmtDate(task.tanggal)}</td>
                        <td>${task.jenis_kegiatan}</td>
                        <td>${task.lokasi}</td>
                        <td>${task.petugas}</td>
                        <td><span class="maint-badge maint-badge-${task.prioritas}">${task.prioritas}</span></td>
                        <td>${task.status}</td>
                        <td><button class="maint-btn maint-btn-sm" data-id="${task.id}" data-action="detail">Detail</button></td>
                    </tr>`;
                });
                tbody.innerHTML = html;
            } catch (err) {
                console.error(err);
                tbody.innerHTML = `<tr><td colspan="7">Gagal memuat: ${err.message}</td></tr>`;
            }
        }

        async function handleSubmit(e) {
            e.preventDefault();
            const tanggal = document.getElementById('maint-tanggal').value;
            const waktu = document.getElementById('maint-waktu').value || null;
            const petugas = document.getElementById('maint-petugas').value.trim();
            const jenis = document.getElementById('maint-jenis').value;
            const kategori = document.getElementById('maint-kategori').value;
            const lokasi = document.getElementById('maint-lokasi').value.trim();
            const gedung = document.getElementById('maint-gedung').value.trim() || null;
            const lantai = document.getElementById('maint-lantai').value.trim() || null;
            const unit_aset = document.getElementById('maint-aset').value.trim() || null;
            const deskripsi = document.getElementById('maint-deskripsi').value.trim();
            const prioritas = document.getElementById('maint-prioritas').value;
            const catatan = document.getElementById('maint-catatan').value.trim() || null;

            if (!tanggal || !petugas || !lokasi || !deskripsi) {
                toast('Tanggal, Petugas, Lokasi, dan Deskripsi wajib diisi!', 'warning');
                return;
            }

            const btn = document.querySelector('#maintForm button[type="submit"]');
            const original = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyimpan...';

            try {
                const kode_task = `MNT-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`;
                const { error } = await supabase.from('maintenance_tasks').insert([{
                    kode_task,
                    tanggal,
                    waktu,
                    petugas,
                    jenis_kegiatan: jenis,
                    kategori,
                    lokasi,
                    gedung,
                    lantai,
                    unit_aset,
                    deskripsi,
                    prioritas,
                    catatan,
                    status: 'pending',
                    created_at: new Date().toISOString(),
                    created_by: ctx.user?.name || petugas
                }]);
                if (error) throw error;
                toast('Tugas maintenance berhasil dibuat!', 'success');
                document.getElementById('maintForm').reset();
                document.getElementById('maint-tanggal').value = new Date().toISOString().split('T')[0];
                if (document.querySelector('.maint-tab.active').dataset.tab === 'history') loadHistory();
            } catch (err) {
                console.error(err);
                toast('Gagal: ' + err.message, 'error');
            } finally {
                btn.disabled = false;
                btn.innerHTML = original;
            }
        }

        function switchTab(tab) {
            document.querySelectorAll('.maint-tab').forEach(t => t.classList.remove('active'));
            const activeTab = document.querySelector(`.maint-tab[data-tab="${tab}"]`);
            if (activeTab) activeTab.classList.add('active');
            document.getElementById('maint-form-tab').style.display = tab === 'form' ? 'block' : 'none';
            document.getElementById('maint-history-tab').style.display = tab === 'history' ? 'block' : 'none';
            if (tab === 'history') loadHistory();
        }

        // Attach events
        document.querySelectorAll('.maint-tab').forEach(btn => {
            btn.addEventListener('click', () => switchTab(btn.dataset.tab));
        });
        const form = document.getElementById('maintForm');
        if (form) form.addEventListener('submit', handleSubmit);
        const refreshBtn = document.getElementById('maint-refresh');
        if (refreshBtn) refreshBtn.addEventListener('click', loadHistory);
        const tbody = document.getElementById('maint-history-body');
        if (tbody) {
            tbody.addEventListener('click', (e) => {
                const btn = e.target.closest('[data-action="detail"]');
                if (btn) toast(`Detail ID: ${btn.dataset.id} (fitur detail segera hadir)`, 'info');
            });
        }

        // Set default tanggal
        const tglInput = document.getElementById('maint-tanggal');
        if (tglInput) tglInput.value = new Date().toISOString().split('T')[0];

        // Load history if tab history is active
        if (document.getElementById('maint-history-tab').style.display !== 'none') loadHistory();
    }
};
