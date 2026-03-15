/**
 * 📅 MODUL BOOKING – Dream OS v2.1
 * Room booking system dengan validasi kompleks
 * Based on Version 13.4 + Enterprise Features
 * 
 * RULES:
 * - User: Senin-Jumat 07:30-16:00 (Min H-1)
 * - Admin: Bisa Sabtu/Minggu & outside hours
 * - Friday blocking: 10:30-13:00 (Aula/Serbaguna)
 * - Max duration: 4 jam per booking
 * - Auto-approve if no conflict, Pending if conflict
 */

export async function render({ container, user, supabase }) {
    const isAdmin = user?.role === 'admin' || user?.email?.includes('admin');
    const userName = user?.name || '';
    const userPhone = user?.phone || '';
    const userDivisi = user?.divisi || '';
    
    // 22 Sarana Options
    const SARANA_LIST = [
        "Aula SMP", "Aula SMA", "Saung Besar", "Saung Kecil",
        "Masjid (Maintenance)", "Mushalla SMA", "Serbaguna",
        "Lapangan Basket", "Lapangan Volly", "Lapangan Tanah",
        "Lapangan SMA", "Kantin SMP", "Kantin SMA",
        "Labkom SD", "Labkom SMP", "Labkom SMA",
        "Perpustakaan SD", "Perpustakaan SMP", "Perpustakaan SMA",
        "Area Taman Depan Masjid", "Area Parkir Depan Dapur",
        "Area Parkir Loby SMA", "Ruang Rapat 1", "Ruang Rapat 2"
    ];
    
    // 8 Alat Options
    const ALAT_LIST = [
        "Sound Portable", "Projector", "Standing Mic",
        "Meja Panjang", "Kursi Futura", "Taplak Meja",
        "TV", "Layar Projektor"
    ];
    
    // Friday blocking rules
    const FRIDAY_BLOCKED_ROOMS = ["Serbaguna", "Aula SMP"];
    const FRIDAY_BLOCK_START = "10:30";
    const FRIDAY_BLOCK_END = "13:00";
    
    return `
        <div class="max-w-4xl mx-auto p-4">
            <!-- Header -->
            <header class="glass-header mb-6">
                <div class="status-bar">
                    <span style="color:#10b981;">📍 DEPOK CORE</span>
                    <span style="color:#10b981;">ISO 27001 ✅</span>                </div>
                <div class="islamic-header">
                    <h1 class="bismillah" style="color:#10b981;">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
                    <p class="shalawat" style="color:#34d399;">اَللهم صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</p>
                </div>
            </header>

            <!-- Main Content -->
            <main style="padding-bottom:140px;">
                <h2 style="font-size:1.5rem;font-weight:700;color:#10b981;margin-bottom:1.5rem;">📅 SMART BOOKING ENGINE</h2>
                <p style="font-size:0.75rem;color:#64748b;margin-bottom:1.5rem;text-align:center;">APPROVER: PAK HANUNG BUDIANTO S. E</p>
                
                <!-- Info Box -->
                <div class="glass-card p-4 mb-6" style="background:rgba(16,185,129,0.1);border-left:4px solid #10b981;">
                    <div style="font-size:0.875rem;color:#e2e8f0;">
                        <p style="margin-bottom:8px;"><strong>📋 Aturan Booking:</strong></p>
                        <ul style="list-style:disc;padding-left:20px;color:#94a3b8;">
                            <li>User: Senin-Jumat (07:30-16:00)</li>
                            <li>Min booking: H-1 (1 hari sebelum)</li>
                            <li>Max duration: 4 jam</li>
                            <li>⚠️ Jumat 10:30-13:00: Aula/Serbaguna tidak tersedia</li>
                            <li>${isAdmin ? '✅ Admin: Bisa weekend & outside hours' : '❌ Sabtu/Minggu: Khusus Admin'}</li>
                            <li>✅ Auto-approve jika tidak bentrok</li>
                        </ul>
                    </div>
                </div>

                <!-- Form Booking -->
                <div class="glass-card p-6 mb-6" style="background:rgba(15,23,42,0.9);border:1px solid rgba(16,185,129,0.2);">
                    <h3 style="font-size:1.125rem;font-weight:700;color:#e2e8f0;margin-bottom:1rem;">📝 Form Booking</h3>
                    <form id="booking-form" class="space-y-4">
                        <!-- Data Peminjam -->
                        <div style="margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid rgba(51,65,85,0.3);">
                            <h4 style="font-size:0.875rem;font-weight:600;color:#10b981;margin-bottom:0.75rem;">👤 Data Pemohon</h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block mb-1 text-sm font-medium" style="color:#e2e8f0;">Nama Lengkap *</label>
                                    <input type="text" id="nama" required class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:#e2e8f0;" placeholder="Nama lengkap" value="${userName}">
                                </div>
                                <div>
                                    <label class="block mb-1 text-sm font-medium" style="color:#e2e8f0;">Nomor HP / WhatsApp *</label>
                                    <input type="tel" id="no_hp" required pattern="[0-9]{10,15}" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:#e2e8f0;" placeholder="0812xxxxxxx" value="${userPhone}">
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4" style="margin-top:1rem;">
                                <div>
                                    <label class="block mb-1 text-sm font-medium" style="color:#e2e8f0;">Divisi / Unit *</label>
                                    <select id="divisi" required class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:#e2e8f0;">
                                        <option value="">Pilih Divisi</option>
                                        <option value="SD" ${userDivisi === 'SD' ? 'selected' : ''}>Unit SD</option>                                        <option value="SMP" ${userDivisi === 'SMP' ? 'selected' : ''}>Unit SMP</option>
                                        <option value="SMA" ${userDivisi === 'SMA' ? 'selected' : ''}>Unit SMA</option>
                                        <option value="Umum" ${userDivisi === 'Umum' ? 'selected' : ''}>Bagian Umum</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block mb-1 text-sm font-medium" style="color:#e2e8f0;">Penanggung Jawab</label>
                                    <input type="text" id="penanggung_jawab" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:#e2e8f0;" placeholder="Nama PJ">
                                </div>
                            </div>
                        </div>

                        <!-- Data Booking -->
                        <div style="margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid rgba(51,65,85,0.3);">
                            <h4 style="font-size:0.875rem;font-weight:600;color:#10b981;margin-bottom:0.75rem;">📅 Data Booking</h4>
                            <div>
                                <label class="block mb-1 text-sm font-medium" style="color:#e2e8f0;">Pilih Sarana *</label>
                                <select id="sarana" required class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:#e2e8f0;">
                                    <option value="">Pilih Sarana</option>
                                    ${SARANA_LIST.map(s => `<option value="${s}">${s}</option>`).join('')}
                                </select>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4" style="margin-top:1rem;">
                                <div>
                                    <label class="block mb-1 text-sm font-medium" style="color:#e2e8f0;">Tanggal *</label>
                                    <input type="date" id="tanggal" required class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:#e2e8f0;">
                                    <p id="date-warning" class="text-xs mt-1" style="color:#f59e0b;display:none;">⚠️ Min booking: H-1</p>
                                    <p id="friday-warning" class="text-xs mt-1" style="color:#ef4444;display:none;">⚠️ Jumat 10:30-13:00 tidak tersedia</p>
                                </div>
                                <div>
                                    <label class="block mb-1 text-sm font-medium" style="color:#e2e8f0;">Jam Mulai *</label>
                                    <input type="time" id="jam_mulai" required value="07:30" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:#e2e8f0;">
                                </div>
                                <div>
                                    <label class="block mb-1 text-sm font-medium" style="color:#e2e8f0;">Jam Selesai *</label>
                                    <input type="time" id="jam_selesai" required value="16:00" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:#e2e8f0;">
                                </div>
                            </div>
                            <p id="time-warning" class="text-xs mt-2" style="color:#f59e0b;display:none;">⚠️ Jam operasional: 07:30-16:00</p>
                            <p id="duration-warning" class="text-xs mt-1" style="color:#f59e0b;display:none;">⚠️ Max duration: 4 jam</p>
                            <div style="margin-top:1rem;">
                                <label class="block mb-1 text-sm font-medium" style="color:#e2e8f0;">Jumlah Peserta *</label>
                                <input type="number" id="jumlah_peserta" required class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:#e2e8f0;" placeholder="Contoh: 30" min="1" max="500">
                            </div>
                        </div>

                        <!-- Peminjaman Alat -->
                        <div style="margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid rgba(51,65,85,0.3);">
                            <h4 style="font-size:0.875rem;font-weight:600;color:#10b981;margin-bottom:0.75rem;">🔧 Peminjaman Alat (Opsional)</h4>
                            <div id="alat-container" class="grid grid-cols-2 md:grid-cols-3 gap-3" style="background:rgba(2,6,23,0.5);padding:1rem;border-radius:12px;">                                ${ALAT_LIST.map((a, i) => `
                                    <label class="flex items-center space-x-2" style="color:#94a3b8;cursor:pointer;">
                                        <input type="checkbox" id="alat-${i}" value="${a}" class="w-4 h-4 accent-emerald-500">
                                        <span style="font-size:0.875rem;">${a}</span>
                                    </label>
                                `).join('')}
                            </div>
                            <div style="margin-top:1rem;">
                                <label class="block mb-1 text-sm font-medium" style="color:#e2e8f0;">Catatan Alat</label>
                                <textarea id="catatan_alat" rows="2" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:#e2e8f0;" placeholder="Detail alat yang dibutuhkan..."></textarea>
                            </div>
                        </div>

                        <!-- Keperluan & Catatan -->
                        <div>
                            <h4 style="font-size:0.875rem;font-weight:600;color:#10b981;margin-bottom:0.75rem;">📝 Detail Acara</h4>
                            <div>
                                <label class="block mb-1 text-sm font-medium" style="color:#e2e8f0;">Keperluan *</label>
                                <textarea id="keperluan" required rows="3" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:#e2e8f0;" placeholder="Tujuan penggunaan (Contoh: Rapat koordinasi, Seminar, dll)"></textarea>
                            </div>
                            <div style="margin-top:1rem;">
                                <label class="block mb-1 text-sm font-medium" style="color:#e2e8f0;">Catatan Tambahan</label>
                                <textarea id="catatan" rows="2" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:#e2e8f0;" placeholder="Catatan tambahan (opsional)"></textarea>
                            </div>
                        </div>

                        <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-xl font-bold transition" style="background:linear-gradient(135deg,#10b981,#059669);margin-top:1.5rem;">
                            📅 SUBMIT BOOKING
                        </button>
                        <div id="form-result" class="text-center text-sm" style="margin-top:1rem;min-height:30px;"></div>
                    </form>
                </div>

                <!-- Riwayat Booking -->
                <div class="glass-card p-6" style="background:rgba(15,23,42,0.9);border:1px solid rgba(16,185,129,0.2);">
                    <h3 style="font-size:1.125rem;font-weight:700;color:#e2e8f0;margin-bottom:1rem;">📋 Riwayat Booking</h3>
                    <div id="booking-list" class="space-y-3">
                        <p class="text-slate-400 text-center py-4">Memuat data...</p>
                    </div>
                </div>
            </main>

            <!-- Bottom Navigation -->
            <nav class="bottom-nav">
                <div class="nav-container">
                    <button class="nav-item" data-nav="home" onclick="window.loadModule?.('home')">
                        <i class="fas fa-home"></i><span>Home</span>
                    </button>
                    <button class="nav-item active" data-nav="booking" onclick="window.loadModule?.('booking')">
                        <i class="fas fa-calendar-check"></i><span>Booking</span>                    </button>
                    <button class="nav-item" data-nav="sekuriti" onclick="window.loadModule?.('sekuriti')">
                        <i class="fas fa-shield-halved"></i><span>Security</span>
                    </button>
                    <button class="nav-item" data-nav="settings" onclick="window.loadModule?.('settings')">
                        <i class="fas fa-sliders"></i><span>Settings</span>
                    </button>
                </div>
            </nav>
        </div>
    `;
}

export async function afterRender({ user, supabase }) {
    console.log('📅 [BOOKING] Module loaded');
    
    const isAdmin = user?.role === 'admin' || user?.email?.includes('admin');
    
    const form = document.getElementById('booking-form');
    const formResult = document.getElementById('form-result');
    const bookingList = document.getElementById('booking-list');
    const tanggalInput = document.getElementById('tanggal');
    const saranaSelect = document.getElementById('sarana');
    const jamMulaiInput = document.getElementById('jam_mulai');
    const jamSelesaiInput = document.getElementById('jam_selesai');
    const dateWarning = document.getElementById('date-warning');
    const fridayWarning = document.getElementById('friday-warning');
    const timeWarning = document.getElementById('time-warning');
    const durationWarning = document.getElementById('duration-warning');
    
    // Friday blocking rules
    const FRIDAY_BLOCKED_ROOMS = ["Serbaguna", "Aula SMP"];
    const FRIDAY_BLOCK_START = "10:30";
    const FRIDAY_BLOCK_END = "13:00";
    
    // Helper: Time to minutes
    function timeToMinutes(timeStr) {
        const [h, m] = timeStr.split(':').map(Number);
        return h * 60 + m;
    }
    
    // Check Friday blocking
    function isFridayBlocked(room, dateStr, startTime, endTime) {
        const date = new Date(dateStr + 'T00:00:00');
        const day = date.getDay(); // 5 = Jumat
        if (day !== 5) return false;
        
        if (!FRIDAY_BLOCKED_ROOMS.includes(room)) return false;
        
        const startM = timeToMinutes(startTime);        const endM = timeToMinutes(endTime);
        const blockStartM = timeToMinutes(FRIDAY_BLOCK_START);
        const blockEndM = timeToMinutes(FRIDAY_BLOCK_END);
        
        return (startM < blockEndM && endM > blockStartM);
    }
    
    // Set min date to tomorrow (H-1 rule)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    
    if (tanggalInput) {
        tanggalInput.min = minDate;
        tanggalInput.value = minDate;
    }
    
    // Validate date + Friday blocking
    const validateDate = () => {
        if (!tanggalInput.value || !saranaSelect.value) return;
        
        const selectedDate = new Date(tanggalInput.value);
        const dayOfWeek = selectedDate.getDay();
        
        // H-1 rule
        const selectedMin = new Date();
        selectedMin.setDate(selectedMin.getDate() + 1);
        if (selectedDate < selectedMin) {
            dateWarning.style.display = 'block';
        } else {
            dateWarning.style.display = 'none';
        }
        
        // Friday blocking
        if (isFridayBlocked(saranaSelect.value, tanggalInput.value, jamMulaiInput.value, jamSelesaiInput.value)) {
            fridayWarning.style.display = 'block';
        } else {
            fridayWarning.style.display = 'none';
        }
    };
    
    tanggalInput?.addEventListener('change', validateDate);
    saranaSelect?.addEventListener('change', validateDate);
    
    // Validate time
    const validateTime = () => {
        if (!jamMulaiInput.value || !jamSelesaiInput.value) return;
        
        const [startHour, startMin] = jamMulaiInput.value.split(':').map(Number);        const [endHour, endMin] = jamSelesaiInput.value.split(':').map(Number);
        
        const startTime = startHour * 60 + startMin;
        const endTime = endHour * 60 + endMin;
        const duration = endTime - startTime;
        
        const minTime = 7 * 60 + 30; // 07:30
        const maxTime = 16 * 60; // 16:00
        const maxDuration = 4 * 60; // 4 hours
        
        // Friday blocking check
        if (isFridayBlocked(saranaSelect.value, tanggalInput.value, jamMulaiInput.value, jamSelesaiInput.value)) {
            fridayWarning.style.display = 'block';
        }
        
        // Operating hours
        if (!isAdmin && (startTime < minTime || endTime > maxTime)) {
            timeWarning.style.display = 'block';
        } else {
            timeWarning.style.display = 'none';
        }
        
        // Duration
        if (duration > maxDuration) {
            durationWarning.style.display = 'block';
        } else {
            durationWarning.style.display = 'none';
        }
    };
    
    jamMulaiInput?.addEventListener('change', validateTime);
    jamSelesaiInput?.addEventListener('change', validateTime);
    
    // Load bookings
    await loadBookings();
    
    // Form submit
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nama = document.getElementById('nama')?.value.trim();
        const noHp = document.getElementById('no_hp')?.value.trim();
        const divisi = document.getElementById('divisi')?.value;
        const sarana = document.getElementById('sarana')?.value;
        const tanggal = document.getElementById('tanggal')?.value;
        const jamMulai = document.getElementById('jam_mulai')?.value;
        const jamSelesai = document.getElementById('jam_selesai')?.value;
        
        // Phone validation
        const phoneDigits = noHp.replace(/\D/g, '');        if (phoneDigits.length < 10 || phoneDigits.length > 15) {
            formResult.innerHTML = '<span class="text-red-500">⚠️ Nomor HP tidak valid (10-15 angka)!</span>';
            return;
        }
        
        // Friday blocking final check
        if (isFridayBlocked(sarana, tanggal, jamMulai, jamSelesai)) {
            formResult.innerHTML = '<span class="text-red-500">⛔ Ruangan tidak tersedia Jumat 10:30-13:00!</span>';
            return;
        }
        
        // Collect alat
        const ALAT_LIST = ["Sound Portable", "Projector", "Standing Mic", "Meja Panjang", "Kursi Futura", "Taplak Meja", "TV", "Layar Projektor"];
        const alatTerpilih = [];
        ALAT_LIST.forEach((_, i) => {
            const cb = document.getElementById(`alat-${i}`);
            if (cb?.checked) alatTerpilih.push(ALAT_LIST[i]);
        });
        
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '🔍 Checking...';
        
        const booking = {
            id: Date.now(),
            nama_peminjam: nama,
            no_hp: noHp,
            divisi: divisi,
            penanggung_jawab: document.getElementById('penanggung_jawab')?.value || '',
            ruang: sarana,
            tanggal: tanggal,
            jam_mulai: jamMulai,
            jam_selesai: jamSelesai,
            jumlah_peserta: document.getElementById('jumlah_peserta')?.value,
            peralatan: alatTerpilih.join(', '),
            catatan_alat: document.getElementById('catatan_alat')?.value || '',
            keperluan: document.getElementById('keperluan')?.value,
            catatan: document.getElementById('catatan')?.value || '',
            status: 'pending',
            created_by: window.DREAM?.state?.user?.email || 'user',
            is_admin: isAdmin,
            created_at: new Date().toISOString()
        };
        
        try {
            // Check conflict
            let existing = [];
            if (supabase) {
                const { data } = await supabase                    .from('bookings')
                    .select('jam_mulai, jam_selesai')
                    .eq('ruang', booking.ruang)
                    .eq('tanggal', booking.tanggal)
                    .eq('status', 'approved');
                existing = data || [];
            }
            
            const isBentrok = existing.some(b => 
                booking.jam_mulai < b.jam_selesai && booking.jam_selesai > b.jam_mulai
            );
            
            booking.status = isBentrok ? 'pending' : 'approved';
            booking.notes = isBentrok ? 'Conflict - Waiting Approval' : 'Auto-Approved';
            
            // Save
            if (supabase) {
                const { error } = await supabase.from('bookings').insert([booking]);
                if (error) throw error;
            } else {
                const bookings = JSON.parse(localStorage.getItem('dreamos-bookings') || '[]');
                bookings.push(booking);
                localStorage.setItem('dreamos-bookings', JSON.stringify(bookings));
            }
            
            // Audit
            if (window.GhostAudit) {
                window.GhostAudit.record(
                    window.DREAM?.state?.user?.email || nama,
                    'BOOKING_CREATED',
                    `Ruangan: ${sarana}, Status: ${booking.status}`
                );
            }
            
            // Result
            formResult.innerHTML = booking.status === 'approved'
                ? '<span class="text-emerald-400">✅ AUTO-APPROVED!<br><span style="font-size:0.75rem;">Jadwal dikunci.</span></span>'
                : '<span class="text-amber-400">📋 PENDING<br><span style="font-size:0.75rem;">Bentrok, menunggu approval.</span></span>';
            
            if (window.toast) {
                window.toast(booking.status === 'approved' ? '✅ Booking auto-approved!' : '📋 Booking pending approval', booking.status === 'approved' ? 'success' : 'warning');
            }
            
            if (booking.status === 'approved') form.reset();
            await loadBookings();
            
        } catch (error) {
            formResult.innerHTML = `<span class="text-red-500">❌ ${error.message}</span>`;
            if (window.toast) {
                window.toast(error.message, 'error');            }
        } finally {
            btn.disabled = false;
            btn.innerHTML = '📅 SUBMIT BOOKING';
        }
    });
    
    // Load bookings
    async function loadBookings() {
        if (!bookingList) return;
        
        bookingList.innerHTML = '<p class="text-slate-400 text-center py-4">⏳ Memuat...</p>';
        
        try {
            let bookings = [];
            
            if (supabase) {
                const { data, error } = await supabase
                    .from('bookings')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(20);
                if (error) throw error;
                bookings = data || [];
            } else {
                bookings = JSON.parse(localStorage.getItem('dreamos-bookings') || '[]');
            }
            
            if (bookings.length === 0) {
                bookingList.innerHTML = '<p class="text-slate-400 text-center py-4">Belum ada booking</p>';
                return;
            }
            
            bookingList.innerHTML = bookings.map(b => `
                <div class="glass-card p-4 border-l-4 ${b.status === 'approved' ? 'border-emerald-500' : b.status === 'rejected' ? 'border-red-500' : 'border-amber-500'}" style="background:rgba(15,23,42,0.9);margin-bottom:1rem;">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h4 class="font-bold" style="color:#e2e8f0;">${b.ruang || b.sarana}</h4>
                            <p class="text-sm" style="color:#94a3b8;">👤 ${b.nama_peminjam || b.nama} | 📱 ${b.no_hp || '-'}</p>
                            <p class="text-sm" style="color:#94a3b8;">🏢 ${b.divisi || '-'}</p>
                            <p class="text-xs" style="color:#64748b;margin-top:4px;">📅 ${b.tanggal} | ⏰ ${b.jam_mulai} - ${b.jam_selesai}</p>
                            <p class="text-sm" style="color:#94a3b8;margin-top:4px;">📝 ${b.keperluan || '-'}</p>
                            ${b.peralatan ? `<p class="text-xs" style="color:#64748b;margin-top:4px;">🔧 ${b.peralatan}</p>` : ''}
                        </div>
                        <span class="text-xs px-2 py-1 rounded-full ${b.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : b.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}">
                            ${b.status}
                        </span>
                    </div>
                </div>
            `).join('');            
        } catch (error) {
            bookingList.innerHTML = '<p class="text-red-500 text-center py-4">Gagal memuat data</p>';
        }
    }
    
    window.refreshBookingList = loadBookings;
}

export function cleanup() {
    console.log('📅 [BOOKING] Module cleanup');
    delete window.refreshBookingList;
      }
