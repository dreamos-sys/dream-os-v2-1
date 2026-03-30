export default {
    render: () => {
        return `
            <div class="max-w-4xl mx-auto p-4">
                <!-- NOTIFICATION BUTTON -->
                <div style="position:fixed; top:20px; right:20px; z-index:999;">
                    <button id="booking-notif-btn" style="
                        background: linear-gradient(135deg, #3b82f6, #2563eb);
                        border: none; border-radius: 50%; width: 56px; height: 56px;
                        cursor: pointer; box-shadow: 0 4px 20px rgba(59,130,246,0.4);
                        display: flex; align-items: center; justify-content: center;
                        font-size: 1.5rem; transition: transform 0.2s; position: relative;
                    " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                        🔔
                        <span id="notif-badge" style="
                            position: absolute; top: -5px; right: -5px;
                            background: #ef4444; color: white; border-radius: 50%;
                            width: 24px; height: 24px; display: flex;
                            align-items: center; justify-content: center;
                            font-size: 0.75rem; font-weight: 700;
                        "></span>
                    </button>
                </div>

                <div style="display:flex;align-items:center;gap:1rem;margin-bottom:2rem">
                    <button onclick="window.closeModule()" class="px-4 py-2 rounded-xl bg-slate-800 border border-slate-600 hover:border-emerald-500 transition text-white">
                        <i class="fas fa-arrow-left mr-2"></i> Kembali
                    </button>
                    <h2 class="text-2xl font-bold text-white">📅 Form Booking Sarana</h2>
                </div>

                <!-- SYSTEM LOCK ALERT -->
                <div id="system-lock-alert" class="hidden" style="background:rgba(239,68,68,0.1); border:1px solid #ef4444; border-radius:12px; padding:1rem; margin-bottom:1.5rem;">
                    <div style="color:#ef4444; font-weight:700; margin-bottom:0.5rem;">🔒 Sistem Booking Ditutup</div>
                    <div id="lock-alert-message" style="color:#fca5a5; font-size:0.9rem;"></div>
                </div>

                <form id="bookingForm" class="space-y-6 bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm text-slate-400 mb-2">Nama Pemohon <span class="text-red-500">*</span></label>
                            <input type="text" name="nama" required class="w-full p-3 rounded-xl bg-slate-900 border border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-white" placeholder="Nama lengkap">
                        </div>
                        <div>
                            <label class="block text-sm text-slate-400 mb-2">Divisi</label>
                            <input type="text" name="divisi" class="w-full p-3 rounded-xl bg-slate-900 border border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-white" placeholder="Divisi/Departemen">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm text-slate-400 mb-2">No. HP <span class="text-red-500">*</span></label>
                        <input type="tel" name="no_hp" required class="w-full p-3 rounded-xl bg-slate-900 border border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-white" placeholder="08xx-xxxx-xxxx">
                    </div>
                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm text-slate-400 mb-2">Pilih Sarana <span class="text-red-500">*</span></label>
                            <select name="sarana" id="sarana" required class="w-full p-3 rounded-xl bg-slate-900 border border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-white">
                                <option value="">-- Pilih Sarana --</option>
                                <!-- options will be injected via JS to keep code clean -->
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm text-slate-400 mb-2">Tanggal <span class="text-red-500">*</span></label>
                            <input type="date" name="tgl" id="tgl" required class="w-full p-3 rounded-xl bg-slate-900 border border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-white">
                            <p id="dateWarning" class="text-xs text-orange-400 mt-1 hidden"><i class="fas fa-exclamation-triangle mr-1"></i><span></span></p>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm text-slate-400 mb-2">Jam Mulai <span class="text-red-500">*</span></label>
                            <input type="time" name="jam_mulai" id="jam_mulai" required min="07:30" max="16:00" value="08:00" class="w-full p-3 rounded-xl bg-slate-900 border border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-white">
                        </div>
                        <div>
                            <label class="block text-sm text-slate-400 mb-2">Jam Selesai <span class="text-red-500">*</span></label>
                            <input type="time" name="jam_selesai" id="jam_selesai" required min="07:30" max="16:00" value="10:00" class="w-full p-3 rounded-xl bg-slate-900 border border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-white">
                        </div>
                    </div>

                    <!-- Peralatan -->
                    <div>
                        <label class="block text-sm text-slate-400 mb-2">Peralatan Tambahan</label>
                        <div id="peralatan-list" class="grid grid-cols-2 md:grid-cols-3 gap-3 bg-slate-900/50 p-4 rounded-xl"></div>
                    </div>

                    <div>
                        <label class="block text-sm text-slate-400 mb-2">Keperluan (opsional)</label>
                        <textarea name="keperluan" rows="3" class="w-full p-3 rounded-xl bg-slate-900 border border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-white" placeholder="Jelaskan keperluan booking..."></textarea>
                    </div>
                    <button type="submit" id="submitBtn" class="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-4 px-6 rounded-xl transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                        <i class="fas fa-paper-plane mr-2"></i> AJUKAN BOOKING
                    </button>
                </form>

                <div class="mt-6 p-4 bg-blue-900/30 border border-blue-700/50 rounded-xl">
                    <h4 class="text-blue-400 font-bold mb-2"><i class="fas fa-info-circle mr-2"></i>Informasi:</h4>
                    <ul class="text-sm text-slate-300 space-y-1">
                        <li>• Jam operasional: <strong>07:30 - 16:00</strong> (Senin-Jumat)</li>
                        <li>• Sabtu: <strong>Optional</strong> (untuk team umum)</li>
                        <li>• Minggu & Tanggal Merah: <strong>LIBUR</strong></li>
                        <li>• Jumat 10:30-13:00: Aula & Serbaguna <strong>tidak tersedia</strong> (Shalat Jumat)</li>
                        <li>• Booking minimal <strong>H-1</strong></li>
                        <li>• <strong>Sound Portable</strong> & <strong>Sound Display Karaoke</strong> tersedia!</li>
                    </ul>
                </div>
            </div>
        `;
    },

    afterRender: async (ctx) => {
        const supabase = ctx.supabase;
        const currentUser = ctx.user || { name: 'Guest', role: 'regular' };

        const CONFIG = {
            WORK_HOURS: { start: 7.5, end: 16.0 },
            FRIDAY_PRAYER_BLOCK: { start: 10.5, end: 13.0 },
            FRIDAY_BLOCKED_ROOMS: ['Aula SMP', 'Aula SMA', 'Serbaguna', 'Mushalla SMA'],
            MIN_BOOKING_DAYS: 1,
            MAX_BOOKING_DAYS: 30,
            OVERRIDE_ROLES: ['kabag_umum', 'koord_umum', 'admin'],
            SARANA_LIST: [
                "Aula SMP", "Aula SMA", "Saung Besar", "Saung Kecil",
                "Masjid (Maintenance)", "Mushalla SMA", "Serbaguna",
                "Lapangan Basket", "Lapangan Volly", "Lapangan Tanah",
                "Lapangan SMA", "Kantin SMP", "Kantin SMA",
                "Labkom SD", "Labkom SMP", "Labkom SMA",
                "Perpustakaan SD", "Perpustakaan SMP", "Perpustakaan SMA"
            ],
            PERALATAN_LIST: [
                "Kursi Futura", "Kursi Chitose", "Meja Siswa", "Meja Panjang",
                "Meja Oshin", "Taplak Meja", "Projektor", "Screen Projektor",
                "TV", "Sound System", "Sound Portable", "Sound Portable Display (Karaoke)",
                "Mic Wireless", "AC Portable"
            ],
            HOLIDAYS_2026: [
                '2026-01-01', '2026-01-27', '2026-03-20', '2026-04-10',
                '2026-05-01', '2026-05-21', '2026-06-01', '2026-06-07',
                '2026-06-08', '2026-08-17', '2026-09-15', '2026-11-24',
                '2026-12-25', '2026-12-26'
            ]
        };

        function timeToDecimal(timeStr) { const [h, m] = timeStr.split(':').map(Number); return h + (m / 60); }
        function decimalToTime(decimal) { const h = Math.floor(decimal); const m = Math.round((decimal - h) * 60); return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`; }
        function getDayName(dateStr) { const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu']; return days[new Date(dateStr + 'T00:00:00').getDay()]; }
        function isSunday(d) { return new Date(d + 'T00:00:00').getDay() === 0; }
        function isSaturday(d) { return new Date(d + 'T00:00:00').getDay() === 6; }
        function isFriday(d) { return new Date(d + 'T00:00:00').getDay() === 5; }
        function isHoliday(d) { return CONFIG.HOLIDAYS_2026.includes(d); }
        function getMinDate() { const d = new Date(); d.setDate(d.getDate() + CONFIG.MIN_BOOKING_DAYS); return d.toISOString().split('T')[0]; }
        function getMaxDate() { const d = new Date(); d.setDate(d.getDate() + CONFIG.MAX_BOOKING_DAYS); return d.toISOString().split('T')[0]; }
        function doToast(msg, type) { alert(`${type.toUpperCase()}: ${msg}`); }

        function checkSystemLock(bookingData = null) {
            const now = new Date();
            const currentHours = now.getHours() + now.getMinutes() / 60;
            const userRole = currentUser?.role || 'regular';
            const canOverride = CONFIG.OVERRIDE_ROLES.includes(userRole);
            const lockStatus = { isLocked: false, reason: null, canOverride, isFridayPrayerBlock: false };
            if (currentHours > CONFIG.WORK_HOURS.end && !canOverride) {
                lockStatus.isLocked = true;
                lockStatus.reason = `Sistem booking tutup setelah jam ${decimalToTime(CONFIG.WORK_HOURS.end)}. Untuk booking malam/weekend, hubungi Kabag Umum atau Koord Umum.`;
                return lockStatus;
            }
            if (isSunday(new Date().toISOString().split('T')[0]) && !canOverride) {
                lockStatus.isLocked = true;
                lockStatus.reason = 'Hari Minggu LIBUR. Booking tidak tersedia.';
                return lockStatus;
            }
            if (isFriday(new Date().toISOString().split('T')[0]) && bookingData?.sarana) {
                const bookingStart = timeToDecimal(bookingData.jam_mulai);
                const bookingEnd = timeToDecimal(bookingData.jam_selesai);
                const prayerStart = CONFIG.FRIDAY_PRAYER_BLOCK.start;
                const prayerEnd = CONFIG.FRIDAY_PRAYER_BLOCK.end;
                if (CONFIG.FRIDAY_BLOCKED_ROOMS.includes(bookingData.sarana)) {
                    if (bookingStart < prayerEnd && bookingEnd > prayerStart) {
                        lockStatus.isLocked = true;
                        lockStatus.isFridayPrayerBlock = true;
                        lockStatus.reason = `❌ ${bookingData.sarana} tidak tersedia Jumat ${decimalToTime(prayerStart)}-${decimalToTime(prayerEnd)} untuk Shalat Jumat. Silakan pilih jam lain atau ruang berbeda.`;
                        return lockStatus;
                    }
                }
            }
            const todayStr = new Date().toISOString().split('T')[0];
            if (isHoliday(todayStr) && !canOverride) {
                lockStatus.isLocked = true;
                lockStatus.reason = 'Hari ini adalah hari libur nasional. Booking tidak tersedia.';
                return lockStatus;
            }
            return lockStatus;
        }

        function showLockOverlay(reason, canOverride) {
            let overlay = document.getElementById('booking-lock-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'booking-lock-overlay';
                overlay.style.cssText = 'position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.9); display:none; align-items:center; justify-content:center; z-index:9999;';
                overlay.innerHTML = `
                    <div style="background:#1e293b; padding:2rem; border-radius:16px; text-align:center; max-width:500px; border:2px solid #f59e0b;">
                        <div style="font-size:3rem; margin-bottom:1rem;">🔒</div>
                        <h2 style="color:#f59e0b; margin-bottom:1rem;">Booking Ditutup</h2>
                        <p id="lock-reason" style="margin-bottom:1.5rem; color:#e2e8f0;"></p>
                        ${canOverride ? `
                            <div style="background:rgba(59,130,246,0.1); padding:1rem; border-radius:8px; margin-bottom:1rem;">
                                <p style="font-size:0.85rem; color:#93c5fd;"><strong>Anda memiliki akses override.</strong><br>Klik "Lanjut" untuk booking dengan persetujuan khusus.</p>
                            </div>
                            <button id="lock-override" style="background:#3b82f6; color:white; padding:0.75rem 2rem; border:none; border-radius:8px; font-weight:700; cursor:pointer; margin-right:0.5rem;">Lanjut (Override)</button>
                        ` : ''}
                        <button id="lock-close" style="background:#64748b; color:white; padding:0.75rem 2rem; border:none; border-radius:8px; font-weight:700; cursor:pointer;">${canOverride ? 'Batal' : 'Mengerti'}</button>
                    </div>
                `;
                document.body.appendChild(overlay);
                document.getElementById('lock-close')?.addEventListener('click', () => overlay.style.display = 'none');
                if (canOverride) {
                    document.getElementById('lock-override')?.addEventListener('click', () => {
                        overlay.style.display = 'none';
                        const form = document.getElementById('bookingForm');
                        if (form) form.dataset.override = 'true';
                        doToast('⚠️ Booking dengan persetujuan khusus - memerlukan approval', 'warning');
                    });
                }
            }
            document.getElementById('lock-reason').textContent = reason;
            overlay.style.display = 'flex';
        }

        function validateBooking(data) {
            const errors = [], warnings = [];
            const selectedDate = new Date(data.tgl + 'T00:00:00');
            const today = new Date(); today.setHours(0,0,0,0);
            if (selectedDate < today) errors.push('Tanggal tidak boleh di masa lalu!');
            if (isSunday(data.tgl)) errors.push('❌ Hari Minggu LIBUR!');
            if (isHoliday(data.tgl)) errors.push('❌ Tanggal merah LIBUR!');
            if (isSaturday(data.tgl)) warnings.push('⚠️ Sabtu hanya untuk team umum (perlu approval)');
            const mulai = timeToDecimal(data.jam_mulai), selesai = timeToDecimal(data.jam_selesai);
            if (mulai < CONFIG.WORK_HOURS.start) errors.push(`Jam mulai minimal ${decimalToTime(CONFIG.WORK_HOURS.start)}`);
            if (selesai > CONFIG.WORK_HOURS.end) errors.push(`Jam selesai maksimal ${decimalToTime(CONFIG.WORK_HOURS.end)}`);
            if (selesai <= mulai) errors.push('Jam selesai harus > jam mulai!');
            if (isFriday(data.tgl) && CONFIG.FRIDAY_BLOCKED_ROOMS.includes(data.sarana)) {
                const prayerStart = CONFIG.FRIDAY_PRAYER_BLOCK.start;
                const prayerEnd = CONFIG.FRIDAY_PRAYER_BLOCK.end;
                if (mulai < prayerEnd && selesai > prayerStart) errors.push(`❌ ${data.sarana} tidak tersedia Jumat ${decimalToTime(prayerStart)}-${decimalToTime(prayerEnd)} untuk Shalat Jumat`);
            }
            if (data.sarana === 'Masjid (Maintenance)') errors.push('❌ Masjid sedang maintenance!');
            return { errors, warnings };
        }

        async function checkDoubleBooking(data) {
            if (!supabase) return { hasConflict: false };
            try {
                const { data: existing, error } = await supabase
                    .from('bookings')
                    .select('*')
                    .eq('ruang', data.sarana)
                    .eq('tanggal', data.tgl)
                    .eq('status', 'approved');
                if (error) throw error;
                const mulai = timeToDecimal(data.jam_mulai), selesai = timeToDecimal(data.jam_selesai);
                const conflict = existing?.find(b => {
                    const bMulai = timeToDecimal(b.jam_mulai), bSelesai = timeToDecimal(b.jam_selesai);
                    return mulai < bSelesai && selesai > bMulai;
                });
                if (conflict) return { hasConflict: true, message: `❌ BENTROK! ${data.sarana} sudah di-booking ${conflict.nama_peminjam}` };
                return { hasConflict: false };
            } catch (err) { return { hasConflict: false }; }
        }

        async function writeAuditLog(action, detail, user) {
            if (!supabase) return;
            try { await supabase.from('audit_logs').insert([{ action, detail, user, created_at: new Date().toISOString() }]); } catch(e) {}
        }

        async function loadNotifications() {
            if (!supabase) return [];
            try {
                const today = new Date().toISOString().split('T')[0];
                const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
                const tomorrowStr = tomorrow.toISOString().split('T')[0];
                const { data: bookings, error } = await supabase
                    .from('bookings')
                    .select('*')
                    .in('tanggal', [today, tomorrowStr])
                    .eq('status', 'approved')
                    .order('tanggal', { ascending: true })
                    .order('jam_mulai', { ascending: true });
                if (error) throw error;
                return bookings?.map(b => ({ ...b, isToday: b.tanggal === today, isTomorrow: b.tanggal === tomorrowStr })) || [];
            } catch(e) { return []; }
        }

        function showNotificationPanel(notifications) {
            const panel = document.createElement('div');
            panel.id = 'booking-notification-panel';
            panel.style.cssText = 'position:fixed; top:20px; right:20px; max-width:400px; max-height:60vh; overflow-y:auto; background:rgba(15,23,42,0.95); border:1px solid rgba(59,130,246,0.3); border-radius:16px; padding:1.5rem; z-index:1000; box-shadow:0 10px 40px rgba(0,0,0,0.4); backdrop-filter:blur(10px);';
            const todayBookings = notifications.filter(n => n.isToday);
            const tomorrowBookings = notifications.filter(n => n.isTomorrow);
            panel.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                    <h3 style="color:#3b82f6; font-size:1.1rem; font-weight:700;">🔔 Reminder Booking</h3>
                    <button onclick="this.closest('#booking-notification-panel').remove()" style="background:none; border:none; color:#94a3b8; cursor:pointer; font-size:1.2rem;">✕</button>
                </div>
                ${todayBookings.length ? `<div style="margin-bottom:1rem;"><div style="background:rgba(16,185,129,0.1); border-left:3px solid #10b981; padding:0.75rem; border-radius:8px;"><div style="color:#10b981; font-weight:700;">📅 HARI INI (${todayBookings.length} booking)</div>${todayBookings.map(b => `<div style="background:rgba(0,0,0,0.2); padding:0.5rem; border-radius:6px; margin-top:0.5rem;"><div style="font-weight:600;">${b.ruang}</div><div>${b.jam_mulai} - ${b.jam_selesai} | ${b.nama_peminjam}</div>${b.peralatan ? `<div>🔧 ${b.peralatan}</div>` : ''}</div>`).join('')}</div></div>` : ''}
                ${tomorrowBookings.length ? `<div><div style="background:rgba(245,158,11,0.1); border-left:3px solid #f59e0b; padding:0.75rem; border-radius:8px;"><div style="color:#f59e0b; font-weight:700;">⏰ BESOK (${tomorrowBookings.length} booking)</div>${tomorrowBookings.map(b => `<div style="background:rgba(0,0,0,0.2); padding:0.5rem; border-radius:6px; margin-top:0.5rem;"><div style="font-weight:600;">${b.ruang}</div><div>${b.jam_mulai} - ${b.jam_selesai} | ${b.nama_peminjam}</div>${b.peralatan ? `<div>🔧 ${b.peralatan}</div>` : ''}</div>`).join('')}</div></div>` : ''}
                ${!notifications.length ? `<div style="text-align:center; padding:2rem; color:#64748b;"><div>📭</div><div>Tidak ada booking hari ini/besok</div></div>` : ''}
            `;
            document.body.appendChild(panel);
            setTimeout(() => {
                if (panel?.parentNode) { panel.style.transition = 'opacity 0.5s'; panel.style.opacity = '0'; setTimeout(() => panel.remove(), 500); }
            }, 30000);
        }

        // Populate dynamic content
        const saranaSelect = document.getElementById('sarana');
        if (saranaSelect) saranaSelect.innerHTML = '<option value="">-- Pilih Sarana --</option>' + CONFIG.SARANA_LIST.map(s => `<option value="${s}">${s}</option>`).join('');
        const peralatanDiv = document.getElementById('peralatan-list');
        if (peralatanDiv) peralatanDiv.innerHTML = CONFIG.PERALATAN_LIST.map(alat => `<label class="flex items-center gap-2 cursor-pointer hover:bg-slate-800 p-2 rounded-lg transition"><input type="checkbox" name="alat" value="${alat}" class="w-4 h-4 rounded border-slate-600 text-emerald-500"><span class="text-sm text-slate-300">${alat}</span></label>`).join('');
        const tglInput = document.getElementById('tgl');
        if (tglInput) { tglInput.min = getMinDate(); tglInput.max = getMaxDate(); tglInput.value = getMinDate(); }

        const form = document.getElementById('bookingForm');
        const submitBtn = document.getElementById('submitBtn');
        const notifBtn = document.getElementById('booking-notif-btn');
        const notifBadge = document.getElementById('notif-badge');
        const lockAlert = document.getElementById('system-lock-alert');
        const lockAlertMsg = document.getElementById('lock-alert-message');
        const dateWarning = document.getElementById('dateWarning');

        const lockStatus = checkSystemLock();
        if (lockStatus.isLocked) {
            if (lockAlert && lockAlertMsg) { lockAlert.classList.remove('hidden'); lockAlertMsg.textContent = lockStatus.reason; }
            if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '🔒 Sistem Ditutup'; }
            if (!lockStatus.canOverride || lockStatus.isFridayPrayerBlock) showLockOverlay(lockStatus.reason, lockStatus.canOverride);
        }

        const notifications = await loadNotifications();
        if (notifications.length && notifBadge) { notifBadge.textContent = notifications.length; notifBadge.style.display = 'flex'; setTimeout(() => showNotificationPanel(notifications), 1000); }
        else if (notifBadge) notifBadge.style.display = 'none';
        if (notifBtn) notifBtn.onclick = async () => { const n = await loadNotifications(); showNotificationPanel(n); };

        if (tglInput) {
            tglInput.addEventListener('change', (e) => {
                const ds = e.target.value, dn = getDayName(ds);
                if (isSunday(ds) || isHoliday(ds)) { dateWarning.classList.remove('hidden'); dateWarning.querySelector('span').textContent = `${dn} - LIBUR!`; dateWarning.className = 'text-xs text-red-400 mt-1'; }
                else if (isSaturday(ds)) { dateWarning.classList.remove('hidden'); dateWarning.querySelector('span').textContent = `${dn} - Optional`; dateWarning.className = 'text-xs text-orange-400 mt-1'; }
                else if (isFriday(ds)) { dateWarning.classList.remove('hidden'); dateWarning.querySelector('span').textContent = `${dn} - Jumat Berkah!`; dateWarning.className = 'text-xs text-blue-400 mt-1'; }
                else dateWarning.classList.add('hidden');
            });
        }

        ['sarana','tgl','jam_mulai','jam_selesai'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('change', () => {
                const fd = { sarana: document.getElementById('sarana')?.value, tgl: document.getElementById('tgl')?.value, jam_mulai: document.getElementById('jam_mulai')?.value, jam_selesai: document.getElementById('jam_selesai')?.value };
                if (fd.sarana && fd.tgl && fd.jam_mulai && fd.jam_selesai) {
                    const lc = checkSystemLock(fd);
                    if (lc.isFridayPrayerBlock && lockAlert && lockAlertMsg) { lockAlert.classList.remove('hidden'); lockAlertMsg.textContent = lc.reason; lockAlert.style.borderColor = '#f59e0b'; }
                    else if (lockAlert) lockAlert.classList.add('hidden');
                }
            });
        });

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const isOverride = form.dataset.override === 'true';
                const fd = new FormData(e.target);
                const alatList = fd.getAll('alat');
                const data = {
                    nama: fd.get('nama'), divisi: fd.get('divisi'), no_hp: fd.get('no_hp'),
                    sarana: fd.get('sarana'), tgl: fd.get('tgl'), jam_mulai: fd.get('jam_mulai'), jam_selesai: fd.get('jam_selesai'),
                    peralatan: alatList.join(', '), keperluan: fd.get('keperluan')
                };
                const lc = checkSystemLock(data);
                if (lc.isLocked && !isOverride && !lc.canOverride) { doToast(lc.reason, 'error'); showLockOverlay(lc.reason, false); return; }
                const val = validateBooking(data);
                if (val.warnings.length) val.warnings.forEach(w => doToast(w, 'warning'));
                if (val.errors.length) { val.errors.forEach(e => doToast(e, 'error')); return; }
                doToast('🔍 Mengecek ketersediaan...', 'info');
                if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Checking...'; }
                const doubleCheck = await checkDoubleBooking(data);
                if (doubleCheck.hasConflict) { doToast(doubleCheck.message, 'error'); if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i> AJUKAN BOOKING'; } return; }
                try {
                    if (submitBtn) submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Menyimpan...';
                    const payload = {
                        nama_peminjam: data.nama, divisi: data.divisi || null, no_hp: data.no_hp, ruang: data.sarana,
                        tanggal: data.tgl, jam_mulai: data.jam_mulai, jam_selesai: data.jam_selesai,
                        keperluan: data.keperluan || null, peralatan: data.peralatan,
                        status: isOverride || lc.canOverride ? 'pending' : 'approved',
                        requires_approval: isOverride || lc.canOverride,
                        created_at: new Date().toISOString(), created_by: currentUser?.name || 'Unknown'
                    };
                    if (supabase) {
                        const { error } = await supabase.from('bookings').insert(payload);
                        if (error) throw error;
                        await writeAuditLog('Booking Baru', `${data.sarana} · ${data.tgl} ${data.jam_mulai}-${data.jam_selesai} · ${data.nama}`, currentUser?.name || data.nama);
                    } else {
                        const existing = JSON.parse(localStorage.getItem('bookings') || '[]');
                        existing.push({ ...payload, id: Date.now() });
                        localStorage.setItem('bookings', JSON.stringify(existing));
                    }
                    doToast('✅ Booking berhasil! Menunggu approval.', 'success');
                    form.reset(); if (tglInput) tglInput.value = getMinDate(); if (dateWarning) dateWarning.classList.add('hidden'); delete form.dataset.override;
                    const n = await loadNotifications(); if (notifBadge && n.length) { notifBadge.textContent = n.length; notifBadge.style.display = 'flex'; }
                } catch (err) { doToast('❌ Gagal: ' + err.message, 'error'); }
                finally { if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i> AJUKAN BOOKING'; } }
            });
        }
    }
};
