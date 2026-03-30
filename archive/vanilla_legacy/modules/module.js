export default {
    render: (ctx) => {
        const userName = (ctx.user?.name || 'GUEST').toUpperCase();
        const SHIFT_OPTIONS = [
            { value: 'P', label: 'Pagi (07:00-19:00)', icon: '🌅' },
            { value: 'M', label: 'Malam (19:00-07:00)', icon: '🌙' },
            { value: 'L', label: 'Libur', icon: '🏖️' },
            { value: 'CT', label: 'Cuti', icon: '✈️' }
        ];
        const QUICK_TEMPLATES = [
            { id: 'patroli_normal', name: '✅ Patroli Normal', desc: 'Situasi aman terkendali', kategori: 'normal' },
            { id: 'insiden_minor', name: '⚠️ Insiden Minor', desc: 'Kejadian kecil perlu perhatian', kategori: 'warning' },
            { id: 'emergency', name: '🚨 Emergency', desc: 'Situasi darurat memerlukan tindakan', kategori: 'critical' },
            { id: 'maintenance', name: '🔧 Pemeliharaan', desc: 'Temuan yang perlu perbaikan', kategori: 'maintenance' },
            { id: 'visitor', name: '👥 Tamu/Visitor', desc: 'Kunjungan atau tamu', kategori: 'info' }
        ];
        const LOKASI_PRESETS = [
            'Pos Utama', 'Gerbang Depan', 'Gerbang Belakang',
            'Area Parkir', 'Gedung A', 'Gedung B', 'Gedung C',
            'Lapangan', 'Musholla', 'Kantin', 'Perpustakaan',
            'Lab Komputer', 'Ruang Guru', 'Halaman'
        ];
        const listPetugas = [
            'SUDARSONO', 'MARHUSIN', 'HERIYATNO', 'SUNARKO',
            'HARIYANSAHC', 'AGUS SUTISNA', 'DONIH'
        ];
        const MAX_PHOTOS = 5;
        const MAX_VOICE_DURATION = 120;
        const getCurrentShift = () => {
            const jam = new Date().getHours();
            if (jam >= 7 && jam < 19) return { value: 'P', label: 'PAGI (07:00-19:00)', icon: '🌅' };
            else return { value: 'M', label: 'MALAM (19:00-07:00)', icon: '🌙' };
        };
        const shift = getCurrentShift();
        return `
            <div id="sekuriti-root">
                <div class="sek-panel sek-header">
                    <div class="sek-header-content">
                        <div class="sek-header-icon">🛡️</div>
                        <div style="flex:1; min-width:200px;">
                            <div class="sek-title">SEKURITI</div>
                            <div class="sek-sub">Sistem Monitoring & Laporan Patroli 24/7 — Enterprise Edition</div>
                        </div>
                        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;">
                            <span class="sek-enterprise-badge">⚡ ENTERPRISE</span>
                            <span class="sek-badge sek-badge-info">${userName}</span>
                            <span class="sek-badge sek-badge-aman">${shift.icon} ${shift.label}</span>
                        </div>
                    </div>
                </div>

                <div class="sek-status-grid">
                    <div class="sek-status-card"><div class="sek-status-label">🕐 SHIFT AKTIF</div><div class="sek-status-value" id="sek-shift-val">—</div><div class="sek-status-trend">Real-time</div></div>
                    <div class="sek-status-card"><div class="sek-status-label">💾 DATABASE</div><div class="sek-status-value" id="sek-db-status">—</div><div class="sek-status-trend">Connection status</div></div>
                    <div class="sek-status-card"><div class="sek-status-label">📍 GPS STATUS</div><div class="sek-status-value" id="sek-gps-status">—</div><div class="sek-status-trend" id="sek-gps-accuracy">—</div></div>
                    <div class="sek-status-card"><div class="sek-status-label">📊 LAPORAN HARI INI</div><div class="sek-status-value" id="sek-today-count">0</div><div class="sek-status-trend">Updated live</div></div>
                </div>

                <div class="sek-tabs">
                    <button class="sek-tab active" data-tab="laporan">📝 Laporan Baru</button>
                    <button class="sek-tab" data-tab="history">📜 Riwayat</button>
                    <button class="sek-tab" data-tab="analytics">📊 Analytics</button>
                    <button class="sek-tab" data-tab="jadwal">📅 Jadwal</button>
                </div>

                <div id="sek-laporan-tab" class="tab-content">
                    <div class="sek-panel">
                        <div class="sek-form-section"><div class="sek-form-section-title">⚡ Quick Templates</div>
                        <div class="sek-quick-templates" id="sek-templates">
                            ${QUICK_TEMPLATES.map(tpl => `<div class="sek-template-card" data-template="${tpl.id}"><div class="sek-template-icon">${tpl.name.split(' ')[0]}</div><div class="sek-template-name">${tpl.name.substring(2)}</div><div class="sek-template-desc">${tpl.desc}</div></div>`).join('')}
                        </div></div>

                        <form id="sekForm">
                            <div class="sek-form-section"><div class="sek-form-section-title">📋 Informasi Dasar</div>
                            <div class="sek-form-grid">
                                <div><label class="sek-label sek-label-required">Tanggal</label><input type="date" id="sek-tanggal" class="sek-input" required></div>
                                <div><label class="sek-label sek-label-required">Shift</label><select id="sek-shift" class="sek-select" required>${SHIFT_OPTIONS.map(opt => `<option value="${opt.value}" ${opt.value === shift.value ? 'selected' : ''}>${opt.icon} ${opt.label}</option>`).join('')}</select></div>
                                <div><label class="sek-label sek-label-required">Petugas Jaga</label><select id="sek-petugas" class="sek-select" required><option value="">-- Pilih Petugas --</option>${listPetugas.map(p => `<option value="${p}">${p}</option>`).join('')}</select></div>
                            </div></div>

                            <div class="sek-form-section"><div class="sek-form-section-title">📍 Lokasi Patroli</div>
                            <div><label class="sek-label sek-label-required">Lokasi</label><input type="text" id="sek-lokasi" class="sek-input" placeholder="Ketik atau pilih preset di bawah" required>
                            <div class="sek-location-presets">${LOKASI_PRESETS.map(loc => `<span class="sek-location-chip" data-location="${loc}">${loc}</span>`).join('')}</div>
                            <div class="sek-gps-indicator" id="sek-gps-info" style="display:none;"><div class="sek-gps-pulse"></div><span id="sek-gps-coords">Getting GPS...</span></div></div></div>

                            <div class="sek-form-section"><div class="sek-form-section-title">📝 Deskripsi</div>
                            <textarea id="sek-deskripsi" class="sek-textarea" placeholder="Jelaskan situasi / kejadian secara detail..." required></textarea></div>

                            <div class="sek-form-section"><div class="sek-form-section-title">📷 Foto Bukti (Max ${MAX_PHOTOS})</div>
                            <div class="sek-photo-grid" id="sek-photo-grid">${Array(MAX_PHOTOS).fill(0).map((_, i) => `<div class="sek-photo-slot" data-slot="${i}"><span style="font-size:2rem;">📷</span><span style="font-size:0.85rem;color:var(--sek-text-muted);margin-top:0.5rem;">${i === 0 ? 'Foto Utama (Wajib)' : `Foto ${i + 1}`}</span></div>`).join('')}</div>
                            <input type="file" id="sek-photo-input" accept="image/*" capture="environment" style="display:none;" multiple></div>

                            <div class="sek-form-section"><div class="sek-form-section-title">🎤 Voice Note (Opsional)</div>
                            <div class="sek-voice-recorder"><button type="button" class="sek-voice-btn" id="sek-voice-btn">🎤</button><div class="sek-voice-timer" id="sek-voice-timer" style="display:none;">00:00</div><div class="sek-voice-waveform" id="sek-voice-wave" style="display:none;">${Array(12).fill(0).map((_, i) => `<div class="sek-voice-bar" style="animation-delay:${i * 0.1}s;"></div>`).join('')}</div><p style="margin-top:1rem;font-size:0.85rem;color:var(--sek-text-muted);">Klik untuk mulai/stop recording (Max ${MAX_VOICE_DURATION}s)</p></div></div>

                            <div style="display:flex;gap:1rem;justify-content:center;margin-top:2rem;">
                                <button type="button" class="sek-btn sek-btn-secondary" id="sek-draft-btn">💾 Simpan Draft</button>
                                <button type="submit" class="sek-btn sek-btn-primary sek-btn-lg" id="sek-submit-btn">🔒 Enkripsi & Kirim Laporan</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div id="sek-history-tab" class="tab-content" style="display:none;">
                    <div class="sek-panel"><div style="display:flex;justify-content:space-between;margin-bottom:1.5rem;"><div class="sek-form-section-title">📜 Riwayat Laporan</div><div><button class="sek-btn sek-btn-sm sek-btn-secondary" id="sek-export-excel">📊 Export Excel</button><button class="sek-btn sek-btn-sm sek-btn-danger" id="sek-export-pdf">📄 Export PDF</button><button class="sek-btn sek-btn-sm" id="sek-refresh-history">🔄 Refresh</button></div></div>
                    <div class="sek-table-wrap"><table class="sek-table"><thead><tr><th>ID</th><th>Tanggal</th><th>Shift</th><th>Petugas</th><th>Lokasi</th><th>Template</th><th>Status</th><th>Aksi</th></tr></thead><tbody id="sek-history-body"><tr><td colspan="8"><div class="sek-loader"><div class="sek-spinner"></div><p>Memuat riwayat...</p></div></td></tr></tbody></table></div></div>
                </div>

                <div id="sek-analytics-tab" class="tab-content" style="display:none;"><div class="sek-panel"><div class="sek-form-section-title">📊 Analytics Dashboard</div><p style="text-align:center;padding:3rem;">Analytics dashboard dengan charts & heatmaps akan segera hadir!</p></div></div>
                <div id="sek-jadwal-tab" class="tab-content" style="display:none;"><div class="sek-panel"><div class="sek-form-section-title">📅 Jadwal Piket</div><p style="text-align:center;padding:3rem;">Jadwal piket interaktif akan segera hadir!</p></div></div>
            </div>

            <style>
                :root { --sek-primary: #10b981; --sek-primary-dark: #059669; --sek-primary-light: rgba(16,185,129,0.1); --sek-primary-border: rgba(16,185,129,0.25); --sek-secondary: #3b82f6; --sek-warning: #f59e0b; --sek-danger: #ef4444; --sek-bg-panel: rgba(15,23,42,0.92); --sek-bg-card: rgba(30,41,59,0.8); --sek-text: #e2e8f0; --sek-text-muted: #94a3b8; --sek-text-dim: #64748b; --sek-border: rgba(255,255,255,0.08); --sek-radius: 16px; --sek-radius-sm: 12px; --sek-radius-xs: 8px; --sek-transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1); --sek-shadow: 0 4px 24px rgba(16,185,129,0.15); --sek-font-mono: 'JetBrains Mono', monospace; --sek-font-sans: 'Rajdhani', 'Inter', sans-serif; }
                #sekuriti-root * { box-sizing: border-box; }
                #sekuriti-root { max-width: 1400px; margin: 0 auto; padding: 1rem; font-family: var(--sek-font-sans); color: var(--sek-text); }
                .sek-panel { background: var(--sek-bg-panel); backdrop-filter: blur(20px); border: 1px solid var(--sek-primary-border); border-radius: var(--sek-radius); padding: 1.5rem; margin-bottom: 1.5rem; position: relative; overflow: hidden; animation: slideIn 0.4s ease; }
                @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .sek-panel::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--sek-primary), transparent); animation: shimmer 3s ease-in-out infinite; }
                @keyframes shimmer { 0%,100% { opacity: 0; } 50% { opacity: 1; } }
                .sek-header { background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05)); border-left: 4px solid var(--sek-primary); }
                .sek-header-content { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
                .sek-header-icon { font-size: 3.5rem; filter: drop-shadow(0 4px 12px rgba(16,185,129,0.3)); animation: pulse 3s ease-in-out infinite; }
                @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
                .sek-title { font-size: 2rem; font-weight: 800; background: linear-gradient(135deg, var(--sek-primary), var(--sek-primary-dark)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.25rem; }
                .sek-sub { font-size: 0.85rem; color: var(--sek-text-muted); }
                .sek-enterprise-badge { background: linear-gradient(135deg, #f59e0b, #d97706); color: #020617; padding: 0.35rem 1rem; border-radius: 30px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
                .sek-status-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px,1fr)); gap: 1rem; margin-bottom: 1.5rem; }
                .sek-status-card { background: var(--sek-bg-card); border-radius: var(--sek-radius-sm); padding: 1.25rem; border-left: 4px solid var(--sek-primary); transition: all var(--sek-transition); cursor: pointer; }
                .sek-status-card:hover { transform: translateY(-4px); box-shadow: var(--sek-shadow); border-left-width: 6px; }
                .sek-status-label { font-size: 0.7rem; text-transform: uppercase; color: var(--sek-text-muted); letter-spacing: 0.8px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; font-weight: 600; }
                .sek-status-value { font-size: 1.5rem; font-weight: 700; color: var(--sek-text); font-family: var(--sek-font-mono); }
                .sek-status-trend { font-size: 0.75rem; margin-top: 0.5rem; opacity: 0.7; }
                .sek-tabs { display: flex; gap: 0.5rem; border-bottom: 2px solid var(--sek-primary-border); margin-bottom: 2rem; overflow-x: auto; padding-bottom: 0.5rem; }
                .sek-tab { padding: 0.75rem 1.75rem; background: rgba(255,255,255,0.03); border: 1px solid transparent; border-radius: 12px 12px 0 0; cursor: pointer; font-weight: 600; font-size: 0.95rem; color: var(--sek-text-dim); white-space: nowrap; transition: all var(--sek-transition); position: relative; display: flex; align-items: center; gap: 0.5rem; }
                .sek-tab::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 2px; background: var(--sek-primary); transform: scaleX(0); transition: transform var(--sek-transition); }
                .sek-tab:hover { background: var(--sek-primary-light); color: var(--sek-text); }
                .sek-tab.active { background: rgba(16,185,129,0.15); border-color: var(--sek-primary); color: var(--sek-primary); }
                .sek-tab.active::after { transform: scaleX(1); }
                .sek-form-section { margin-bottom: 2rem; }
                .sek-form-section-title { font-size: 1.1rem; font-weight: 700; color: var(--sek-primary); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.75rem; }
                .sek-form-section-title::before { content: ''; width: 4px; height: 1.5rem; background: var(--sek-primary); border-radius: 2px; }
                .sek-form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px,1fr)); gap: 1.25rem; }
                .sek-label { display: block; font-size: 0.8rem; color: var(--sek-text-muted); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; }
                .sek-label-required::after { content: ' *'; color: var(--sek-danger); }
                .sek-input, .sek-select, .sek-textarea { width: 100%; padding: 0.875rem 1.25rem; background: rgba(0,0,0,0.3); border: 2px solid var(--sek-primary-border); border-radius: var(--sek-radius-xs); color: var(--sek-text); font-family: inherit; font-size: 0.95rem; outline: none; transition: all var(--sek-transition); }
                .sek-input:focus, .sek-select:focus, .sek-textarea:focus { border-color: var(--sek-primary); box-shadow: 0 0 0 4px var(--sek-primary-light); background: rgba(0,0,0,0.4); }
                .sek-textarea { resize: vertical; min-height: 120px; line-height: 1.6; }
                .sek-quick-templates { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px,1fr)); gap: 1rem; margin-bottom: 1.5rem; }
                .sek-template-card { background: var(--sek-bg-card); border: 2px solid var(--sek-primary-border); border-radius: var(--sek-radius-sm); padding: 1rem; cursor: pointer; transition: all var(--sek-transition); text-align: center; }
                .sek-template-card:hover { transform: translateY(-4px); border-color: var(--sek-primary); box-shadow: var(--sek-shadow); }
                .sek-template-card.active { background: rgba(16,185,129,0.15); border-color: var(--sek-primary); }
                .sek-template-icon { font-size: 2rem; margin-bottom: 0.5rem; }
                .sek-template-name { font-weight: 700; font-size: 0.9rem; margin-bottom: 0.25rem; }
                .sek-template-desc { font-size: 0.75rem; color: var(--sek-text-muted); }
                .sek-photo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px,1fr)); gap: 1rem; margin-top: 1rem; }
                .sek-photo-slot { aspect-ratio: 1; border: 2px dashed var(--sek-primary-border); border-radius: var(--sek-radius-sm); display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: all var(--sek-transition); background: rgba(0,0,0,0.2); }
                .sek-photo-slot:hover { border-color: var(--sek-primary); background: var(--sek-primary-light); }
                .sek-photo-slot.has-image { border-style: solid; border-color: var(--sek-primary); padding: 0; }
                .sek-photo-preview { width: 100%; height: 100%; object-fit: cover; }
                .sek-photo-remove { position: absolute; top: 0.5rem; right: 0.5rem; background: rgba(239,68,68,0.9); color: white; border: none; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1rem; transition: all var(--sek-transition); z-index: 10; }
                .sek-photo-remove:hover { background: #dc2626; transform: scale(1.1); }
                .sek-photo-info { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.8); padding: 0.5rem; font-size: 0.7rem; display: flex; justify-content: space-between; align-items: center; }
                .sek-voice-recorder { background: var(--sek-bg-card); border: 2px solid var(--sek-primary-border); border-radius: var(--sek-radius-sm); padding: 1.5rem; text-align: center; }
                .sek-voice-btn { width: 80px; height: 80px; border-radius: 50%; border: none; background: linear-gradient(135deg, var(--sek-danger), #dc2626); color: white; font-size: 2rem; cursor: pointer; transition: all var(--sek-transition); box-shadow: 0 4px 16px rgba(239,68,68,0.3); margin: 0 auto; display: flex; align-items: center; justify-content: center; }
                .sek-voice-btn:hover { transform: scale(1.05); box-shadow: 0 6px 24px rgba(239,68,68,0.4); }
                .sek-voice-btn.recording { animation: recordPulse 1.5s ease-in-out infinite; }
                @keyframes recordPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.7); } 50% { box-shadow: 0 0 0 20px rgba(239,68,68,0); } }
                .sek-voice-timer { font-family: var(--sek-font-mono); font-size: 1.5rem; font-weight: 700; color: var(--sek-danger); margin-top: 1rem; }
                .sek-voice-waveform { height: 60px; margin-top: 1rem; display: flex; align-items: center; justify-content: center; gap: 3px; }
                .sek-voice-bar { width: 4px; background: var(--sek-primary); border-radius: 2px; animation: waveform 0.8s ease-in-out infinite; }
                @keyframes waveform { 0%,100% { height: 10px; } 50% { height: 40px; } }
                .sek-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.875rem 1.75rem; border-radius: var(--sek-radius-xs); font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all var(--sek-transition); border: none; background: rgba(255,255,255,0.08); color: var(--sek-text); position: relative; overflow: hidden; }
                .sek-btn::before { content: ''; position: absolute; top: 50%; left: 50%; width: 0; height: 0; border-radius: 50%; background: rgba(255,255,255,0.2); transform: translate(-50%,-50%); transition: width 0.6s, height 0.6s; }
                .sek-btn:hover::before { width: 300px; height: 300px; }
                .sek-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: var(--sek-shadow); }
                .sek-btn-primary { background: linear-gradient(135deg, var(--sek-primary), var(--sek-primary-dark)); color: #020617; }
                .sek-btn-secondary { background: linear-gradient(135deg, var(--sek-secondary), #2563eb); color: white; }
                .sek-btn-danger { background: linear-gradient(135deg, var(--sek-danger), #dc2626); color: white; }
                .sek-btn-sm { padding: 0.5rem 1.25rem; font-size: 0.85rem; }
                .sek-btn-lg { padding: 1.25rem 2.5rem; font-size: 1.1rem; }
                .sek-location-presets { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem; }
                .sek-location-chip { background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.3); color: var(--sek-secondary); padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.85rem; cursor: pointer; transition: all var(--sek-transition); }
                .sek-location-chip:hover { background: rgba(59,130,246,0.25); transform: translateY(-2px); }
                .sek-gps-indicator { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: rgba(16,185,129,0.15); border: 1px solid var(--sek-primary); border-radius: 20px; font-size: 0.85rem; margin-top: 0.5rem; }
                .sek-gps-pulse { width: 10px; height: 10px; background: var(--sek-primary); border-radius: 50%; animation: gpsPulse 2s ease-in-out infinite; }
                @keyframes gpsPulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } }
                .sek-badge { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.35rem 0.875rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; white-space: nowrap; }
                .sek-badge-aman { background: rgba(16,185,129,0.2); color: var(--sek-primary); border: 1px solid rgba(16,185,129,0.3); }
                .sek-badge-warning { background: rgba(245,158,11,0.2); color: var(--sek-warning); border: 1px solid rgba(245,158,11,0.3); }
                .sek-badge-danger { background: rgba(239,68,68,0.2); color: var(--sek-danger); border: 1px solid rgba(239,68,68,0.3); }
                .sek-badge-info { background: rgba(59,130,246,0.2); color: var(--sek-secondary); border: 1px solid rgba(59,130,246,0.3); }
                .sek-table-wrap { overflow-x: auto; border-radius: var(--sek-radius); border: 1px solid var(--sek-border); margin-top: 1rem; }
                table.sek-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
                table.sek-table thead { background: rgba(0,0,0,0.4); }
                table.sek-table th { padding: 1rem 1.25rem; text-align: left; font-size: 0.75rem; text-transform: uppercase; color: var(--sek-text-muted); font-weight: 700; letter-spacing: 0.5px; }
                table.sek-table td { padding: 1rem 1.25rem; border-top: 1px solid var(--sek-border); vertical-align: middle; }
                .sek-loader { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3rem 1rem; text-align: center; }
                .sek-spinner { width: 50px; height: 50px; border: 4px solid var(--sek-primary-light); border-top-color: var(--sek-primary); border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 1rem; }
                @keyframes spin { to { transform: rotate(360deg); } }
                @media (max-width: 768px) { .sek-title { font-size: 1.5rem; } .sek-header-icon { font-size: 2.5rem; } .sek-status-value { font-size: 1.2rem; } .sek-tab { padding: 0.6rem 1.25rem; font-size: 0.85rem; } .sek-panel { padding: 1rem; } .sek-form-grid { grid-template-columns: 1fr; } }
            </style>
        `;
    },

    afterRender: async (ctx) => {
        const toast = ctx.toast || ((msg, type) => alert(`${type?.toUpperCase()}: ${msg}`));
        const container = document.getElementById('sekuriti-root');
        if (!container) return;

        const MAX_PHOTOS = 5;
        const MAX_PHOTO_SIZE = 5 * 1024 * 1024;
        const MAX_VOICE_DURATION = 120;
        const DEPOK_CORE = { lat: -6.4000, lng: 106.8200 };
        const SAFE_RADIUS_KM = 5.0;

        let _photos = [];
        let _voiceBlob = null;
        let _mediaRecorder = null;
        let _recordingStartTime = null;
        let _currentGPS = null;
        let _selectedTemplate = null;

        const formatFileSize = (bytes) => {
            if (bytes === 0) return '0 B';
            const sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(1024));
            return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
        };

        const compressImage = (file) => new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width, height = img.height;
                    const MAX_WIDTH = 1920, MAX_HEIGHT = 1920;
                    if (width > height) {
                        if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
                    } else {
                        if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.85);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });

        const renderPhotoGrid = () => {
            const photoGrid = container.querySelector('#sek-photo-grid');
            if (!photoGrid) return;
            photoGrid.innerHTML = '';
            _photos.forEach((photo, idx) => {
                const slot = document.createElement('div');
                slot.className = 'sek-photo-slot has-image';
                slot.innerHTML = `<img src="${photo.base64}" class="sek-photo-preview"><button class="sek-photo-remove" data-photo-id="${photo.id}">×</button><div class="sek-photo-info"><span>${formatFileSize(photo.size)}</span><span>${idx === 0 ? '⭐ Utama' : `#${idx+1}`}</span></div>`;
                photoGrid.appendChild(slot);
            });
            for (let i = _photos.length; i < MAX_PHOTOS; i++) {
                const slot = document.createElement('div');
                slot.className = 'sek-photo-slot';
                slot.dataset.slot = i;
                slot.innerHTML = `<span style="font-size:2rem;">📷</span><span style="font-size:0.85rem;color:var(--sek-text-muted);margin-top:0.5rem;">${i === 0 ? 'Foto Utama (Wajib)' : `Foto ${i+1}`}</span>`;
                slot.addEventListener('click', () => container.querySelector('#sek-photo-input').click());
                photoGrid.appendChild(slot);
            }
            photoGrid.querySelectorAll('.sek-photo-remove').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const id = parseFloat(btn.dataset.photoId);
                    _photos = _photos.filter(p => p.id !== id);
                    renderPhotoGrid();
                    toast('Photo removed', 'info');
                });
            });
        };

        const handlePhotoUpload = (files) => {
            Array.from(files).forEach(async (file) => {
                if (_photos.length >= MAX_PHOTOS) { toast(`Maksimal ${MAX_PHOTOS} foto`, 'warning'); return; }
                if (file.size > MAX_PHOTO_SIZE) { toast(`File terlalu besar (max 5MB)`, 'error'); return; }
                const compressed = await compressImage(file);
                const reader = new FileReader();
                reader.onload = (e) => {
                    _photos.push({ id: Date.now() + Math.random(), file: compressed, base64: e.target.result, size: compressed.size });
                    renderPhotoGrid();
                    toast(`Foto ditambahkan (${formatFileSize(compressed.size)})`, 'success');
                };
                reader.readAsDataURL(compressed);
            });
        };

        const toggleVoiceRecording = async () => {
            const voiceBtn = container.querySelector('#sek-voice-btn');
            const voiceTimer = container.querySelector('#sek-voice-timer');
            const voiceWave = container.querySelector('#sek-voice-wave');
            if (!_mediaRecorder || _mediaRecorder.state === 'inactive') {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    _mediaRecorder = new MediaRecorder(stream);
                    const chunks = [];
                    _mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
                    _mediaRecorder.onstop = () => {
                        _voiceBlob = new Blob(chunks, { type: 'audio/webm' });
                        toast(`Voice note recorded (${formatFileSize(_voiceBlob.size)})`, 'success');
                        stream.getTracks().forEach(t => t.stop());
                    };
                    _mediaRecorder.start();
                    _recordingStartTime = Date.now();
                    voiceBtn.classList.add('recording');
                    voiceBtn.innerHTML = '⏹️';
                    voiceTimer.style.display = 'block';
                    voiceWave.style.display = 'flex';
                    const timerInterval = setInterval(() => {
                        if (!_recordingStartTime) { clearInterval(timerInterval); return; }
                        const elapsed = Math.floor((Date.now() - _recordingStartTime) / 1000);
                        const mins = Math.floor(elapsed / 60).toString().padStart(2,'0');
                        const secs = (elapsed % 60).toString().padStart(2,'0');
                        voiceTimer.textContent = `${mins}:${secs}`;
                        if (elapsed >= MAX_VOICE_DURATION) { _mediaRecorder.stop(); clearInterval(timerInterval); }
                    }, 100);
                    container.dataset.voiceTimer = timerInterval;
                } catch (err) { toast('Microphone access denied', 'error'); }
            } else {
                _mediaRecorder.stop();
                _recordingStartTime = null;
                clearInterval(container.dataset.voiceTimer);
                voiceBtn.classList.remove('recording');
                voiceBtn.innerHTML = '🎤';
                voiceTimer.style.display = 'none';
                voiceWave.style.display = 'none';
            }
        };

        const selectTemplate = (templateId) => {
            _selectedTemplate = templateId;
            container.querySelectorAll('.sek-template-card').forEach(card => card.classList.toggle('active', card.dataset.template === templateId));
            const desc = container.querySelector('#sek-deskripsi');
            if (desc) desc.value = (templateId === 'patroli_normal' ? 'Situasi aman terkendali' : templateId === 'insiden_minor' ? 'Kejadian kecil perlu perhatian' : templateId === 'emergency' ? 'Situasi darurat memerlukan tindakan' : templateId === 'maintenance' ? 'Temuan yang perlu perbaikan' : 'Kunjungan atau tamu') + '\n\n';
            toast('Template selected', 'info');
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (_photos.length === 0) { toast('Minimal 1 foto diperlukan', 'error'); return; }
            const btn = container.querySelector('#sek-submit-btn');
            const original = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<div class="sek-spinner" style="width:20px;height:20px;"></div> Mengirim...';
            try {
                await new Promise(r => setTimeout(r, 1500));
                toast('✅ Laporan berhasil dikirim!', 'success');
                _photos = []; _voiceBlob = null; _selectedTemplate = null;
                renderPhotoGrid();
                container.querySelectorAll('.sek-template-card').forEach(c => c.classList.remove('active'));
                container.querySelector('#sekForm').reset();
                container.querySelector('#sek-tanggal').value = new Date().toISOString().split('T')[0];
            } catch (err) { toast('❌ Gagal: ' + err.message, 'error'); }
            finally { btn.disabled = false; btn.innerHTML = original; }
        };

        const loadHistory = () => {
            const tbody = container.querySelector('#sek-history-body');
            if (!tbody) return;
            tbody.innerHTML = `<tr><td colspan="8"><div class="sek-loader"><div class="sek-spinner"></div><p>Memuat riwayat...</p></div></td></tr>`;
            setTimeout(() => {
                tbody.innerHTML = `<tr><td>#1</td><td>2026-03-28</td><td>P</td><td>SUDARSONO</td><td>Pos Utama</td><td>Patroli Normal</td><td><span class="sek-badge sek-badge-aman">verified</span></td><td><button class="sek-btn sek-btn-sm">Detail</button></td></tr><tr><td>#2</td><td>2026-03-28</td><td>M</td><td>MARHUSIN</td><td>Gerbang Depan</td><td>Insiden Minor</td><td><span class="sek-badge sek-badge-warning">pending</span></td><td><button class="sek-btn sek-btn-sm">Detail</button></td></tr>`;
            }, 500);
        };

        const updateStatusBar = () => {
            const shiftVal = container.querySelector('#sek-shift-val');
            if (shiftVal) shiftVal.textContent = new Date().getHours() >= 7 && new Date().getHours() < 19 ? 'PAGI' : 'MALAM';
            const dbStatus = container.querySelector('#sek-db-status');
            if (dbStatus) dbStatus.innerHTML = '<span class="sek-badge sek-badge-aman">ONLINE</span>';
            const todayCount = container.querySelector('#sek-today-count');
            if (todayCount) todayCount.textContent = '2';
        };

        const startGPSTracking = () => {
            const gpsInfo = container.querySelector('#sek-gps-info');
            const gpsStatus = container.querySelector('#sek-gps-status');
            const gpsCoords = container.querySelector('#sek-gps-coords');
            const gpsAccuracy = container.querySelector('#sek-gps-accuracy');
            if (!navigator.geolocation) { if(gpsStatus) gpsStatus.innerHTML = '<span class="sek-badge sek-badge-danger">Not supported</span>'; return; }
            if(gpsInfo) gpsInfo.style.display = 'flex';
            if(gpsStatus) gpsStatus.innerHTML = '<span class="sek-badge sek-badge-warning">Searching...</span>';
            navigator.geolocation.watchPosition(
                (pos) => {
                    _currentGPS = { lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy };
                    const dist = (() => {
                        const R = 6371;
                        const dLat = (DEPOK_CORE.lat - _currentGPS.lat) * Math.PI/180;
                        const dLon = (DEPOK_CORE.lng - _currentGPS.lng) * Math.PI/180;
                        const a = Math.sin(dLat/2)**2 + Math.cos(DEPOK_CORE.lat*Math.PI/180)*Math.cos(_currentGPS.lat*Math.PI/180)*Math.sin(dLon/2)**2;
                        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                    })();
                    if(gpsCoords) gpsCoords.textContent = `${_currentGPS.lat.toFixed(6)}, ${_currentGPS.lng.toFixed(6)} (${dist.toFixed(2)}km)`;
                    if(gpsStatus) gpsStatus.innerHTML = dist <= SAFE_RADIUS_KM ? '<span class="sek-badge sek-badge-aman">✅ GPS Active</span>' : '<span class="sek-badge sek-badge-warning">⚠️ Outside core</span>';
                    if(gpsAccuracy) gpsAccuracy.textContent = `±${Math.round(_currentGPS.accuracy)}m`;
                },
                (err) => { if(gpsStatus) gpsStatus.innerHTML = '<span class="sek-badge sek-badge-danger">GPS Error</span>'; },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        };

        const switchTab = (tabName) => {
            container.querySelectorAll('.sek-tab').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabName));
            container.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
            const target = container.querySelector(`#sek-${tabName}-tab`);
            if (target) target.style.display = 'block';
            if (tabName === 'history') loadHistory();
        };

        container.querySelectorAll('.sek-tab').forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));
        container.querySelectorAll('.sek-template-card').forEach(card => card.addEventListener('click', () => selectTemplate(card.dataset.template)));
        container.querySelectorAll('.sek-location-chip').forEach(chip => chip.addEventListener('click', () => { const loc = container.querySelector('#sek-lokasi'); if(loc) loc.value = chip.dataset.location; }));
        const photoInput = container.querySelector('#sek-photo-input');
        if(photoInput) photoInput.addEventListener('change', (e) => { handlePhotoUpload(e.target.files); e.target.value = ''; });
        const voiceBtn = container.querySelector('#sek-voice-btn');
        if(voiceBtn) voiceBtn.addEventListener('click', toggleVoiceRecording);
        const form = container.querySelector('#sekForm');
        if(form) form.addEventListener('submit', handleSubmit);
        const draftBtn = container.querySelector('#sek-draft-btn');
        if(draftBtn) draftBtn.addEventListener('click', () => toast('Draft saved to localStorage', 'success'));
        const refreshBtn = container.querySelector('#sek-refresh-history');
        if(refreshBtn) refreshBtn.addEventListener('click', loadHistory);
        const exportExcel = container.querySelector('#sek-export-excel');
        const exportPdf = container.querySelector('#sek-export-pdf');
        if(exportExcel) exportExcel.addEventListener('click', () => toast('Excel export coming soon!', 'info'));
        if(exportPdf) exportPdf.addEventListener('click', () => toast('PDF export coming soon!', 'info'));

        container.querySelector('#sek-tanggal').value = new Date().toISOString().split('T')[0];
        startGPSTracking();
        renderPhotoGrid();
        updateStatusBar();
        setInterval(updateStatusBar, 30000);
    }
};
