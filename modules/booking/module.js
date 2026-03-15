/**
 * 📅 MODUL BOOKING – Dream OS v2.1
 * Room booking system dengan validasi kompleks
 * 
 * RULES:
 * - User: Senin-Jumat 07:30-16:00 (Min H-1)
 * - Admin: Bisa booking Sabtu/Minggu & outside hours
 * - Auto-block outside hours untuk user
 */

export async function render({ container, user, supabase }) {
    const isAdmin = user?.role === 'admin' || user?.email?.includes('admin');
    
    return `
        <div class="max-w-4xl mx-auto p-4">
            <!-- Header -->
            <header class="glass-header mb-6">
                <div class="status-bar">
                    <span>📍 DEPOK CORE</span>
                    <span>ISO 27001 ✅</span>
                </div>
                <div class="islamic-header">
                    <h1 class="bismillah">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
                    <p class="shalawat">اَللهم صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</p>
                </div>
            </header>

            <!-- Main Content -->
            <main style="padding-bottom:140px;">
                <h2 class="text-2xl font-bold text-emerald-400 mb-6">📅 Booking Ruangan</h2>
                
                <!-- Info Box -->
                <div class="glass-card p-4 mb-6" style="background:rgba(16,185,129,0.1);border-left:4px solid var(--color-primary);">
                    <div style="font-size:0.875rem;color:var(--text-primary);">
                        <p style="margin-bottom:8px;"><strong>📋 Aturan Booking:</strong></p>
                        <ul style="list-style:disc;padding-left:20px;color:var(--text-muted);">
                            <li>User: Senin-Jumat (07:30-16:00)</li>
                            <li>Min booking: H-1 (1 hari sebelum)</li>
                            <li>${isAdmin ? '✅ Admin: Bisa booking Sabtu/Minggu & outside hours' : '❌ Sabtu/Minggu: Khusus Admin'}</li>
                        </ul>
                    </div>
                </div>

                <!-- Form Booking -->
                <div class="glass-card p-6 mb-6">
                    <h3 class="text-lg font-semibold mb-4" style="color:var(--text-primary);">Form Booking</h3>
                    <form id="booking-form" class="space-y-4">
                        <div>
                            <label class="block mb-1 text-sm font-medium" style="color:var(--text-primary);">Nama Peminjam *</label>
                            <input type="text" id="nama" required class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:var(--text-primary);" placeholder="Nama lengkap">                        </div>
                        <div>
                            <label class="block mb-1 text-sm font-medium" style="color:var(--text-primary);">Ruangan *</label>
                            <select id="ruang" required class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:var(--text-primary);">
                                <option value="">Pilih Ruangan</option>
                                <option value="Ruang Rapat 1">Ruang Rapat 1</option>
                                <option value="Ruang Rapat 2">Ruang Rapat 2</option>
                                <option value="Aula">Aula</option>
                                <option value="Lab Komputer">Lab Komputer</option>
                                <option value="Lab IPA">Lab IPA</option>
                            </select>
                        </div>
                        <div>
                            <label class="block mb-1 text-sm font-medium" style="color:var(--text-primary);">Tanggal *</label>
                            <input type="date" id="tanggal" required class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:var(--text-primary);">
                            <p id="date-warning" class="text-xs mt-1" style="color:var(--color-warning);display:none;">⚠️ Booking hanya bisa dilakukan H-1 (1 hari sebelum)</p>
                            <p id="weekend-warning" class="text-xs mt-1" style="color:var(--color-error);display:none;">⚠️ Sabtu/Minggu hanya untuk Admin</p>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block mb-1 text-sm font-medium" style="color:var(--text-primary);">Jam Mulai *</label>
                                <input type="time" id="jam_mulai" required class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:var(--text-primary);">
                                <p id="time-warning" class="text-xs mt-1" style="color:var(--color-warning);display:none;">⚠️ Jam operasional: 07:30-16:00</p>
                            </div>
                            <div>
                                <label class="block mb-1 text-sm font-medium" style="color:var(--text-primary);">Jam Selesai *</label>
                                <input type="time" id="jam_selesai" required class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:var(--text-primary);">
                            </div>
                        </div>
                        <div>
                            <label class="block mb-1 text-sm font-medium" style="color:var(--text-primary);">Keperluan *</label>
                            <textarea id="keperluan" required rows="3" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:var(--text-primary);" placeholder="Tujuan penggunaan ruangan"></textarea>
                        </div>
                        <div>
                            <label class="block mb-1 text-sm font-medium" style="color:var(--text-primary);">Catatan</label>
                            <textarea id="catatan" rows="3" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:var(--text-primary);" placeholder="Catatan tambahan (opsional)"></textarea>
                        </div>
                        <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-xl font-bold transition">
                            📅 Simpan Booking
                        </button>
                        <div id="form-result" class="text-center text-sm"></div>
                    </form>
                </div>

                <!-- Daftar Booking -->
                <div class="glass-card p-6">
                    <h3 class="text-lg font-semibold mb-4" style="color:var(--text-primary);">📋 Daftar Booking</h3>
                    <div id="booking-list" class="space-y-3">
                        <p class="text-slate-400 text-center py-4">Memuat data...</p>
                    </div>                </div>
            </main>

            <!-- Bottom Navigation -->
            <nav class="bottom-nav">
                <div class="nav-container">
                    <button class="nav-item active" data-nav="home" onclick="window.loadModule?.('home')">
                        <i class="fas fa-home"></i><span>Home</span>
                    </button>
                    <button class="nav-item" data-nav="booking" onclick="window.loadModule?.('booking')">
                        <i class="fas fa-calendar-check"></i><span>Booking</span>
                    </button>
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
    const jamMulaiInput = document.getElementById('jam_mulai');
    const jamSelesaiInput = document.getElementById('jam_selesai');
    const dateWarning = document.getElementById('date-warning');
    const weekendWarning = document.getElementById('weekend-warning');
    const timeWarning = document.getElementById('time-warning');
    
    // Set min date to tomorrow (H-1 rule)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    
    if (tanggalInput) {
        tanggalInput.min = minDate;
        tanggalInput.value = minDate;
    }
        // Validate date on change
    tanggalInput?.addEventListener('change', () => {
        if (!tanggalInput.value) return;
        
        const selectedDate = new Date(tanggalInput.value);
        const dayOfWeek = selectedDate.getDay(); // 0 = Minggu, 6 = Sabtu
        
        // Check H-1 rule
        const selectedMin = new Date();
        selectedMin.setDate(selectedMin.getDate() + 1);
        if (selectedDate < selectedMin) {
            dateWarning.style.display = 'block';
        } else {
            dateWarning.style.display = 'none';
        }
        
        // Check weekend (for non-admin)
        if (!isAdmin && (dayOfWeek === 0 || dayOfWeek === 6)) {
            weekendWarning.style.display = 'block';
            tanggalInput.value = minDate;
            if (window.toast) {
                window.toast('❌ Sabtu/Minggu hanya untuk Admin', 'error');
            }
        } else {
            weekendWarning.style.display = 'none';
        }
    });
    
    // Validate time on change
    const validateTime = () => {
        if (!jamMulaiInput.value || !jamSelesaiInput.value) return;
        
        const [startHour, startMin] = jamMulaiInput.value.split(':').map(Number);
        const [endHour, endMin] = jamSelesaiInput.value.split(':').map(Number);
        
        const startTime = startHour * 60 + startMin;
        const endTime = endHour * 60 + endMin;
        
        // Operating hours: 07:30 - 16:00 (for non-admin)
        const minTime = 7 * 60 + 30; // 07:30
        const maxTime = 16 * 60; // 16:00
        
        if (!isAdmin && (startTime < minTime || endTime > maxTime)) {
            timeWarning.style.display = 'block';
            if (window.toast) {
                window.toast('❌ Jam operasional: 07:30-16:00 (Admin only outside)', 'error');
            }
        } else {
            timeWarning.style.display = 'none';
        }        
        // Check end > start
        if (endTime <= startTime) {
            if (window.toast) {
                window.toast('❌ Jam selesai harus lebih besar dari jam mulai', 'error');
            }
        }
    };
    
    jamMulaiInput?.addEventListener('change', validateTime);
    jamSelesaiInput?.addEventListener('change', validateTime);
    
    // Load bookings
    await loadBookings();
    
    // Form submit handler
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Final validation
        if (!isAdmin) {
            const selectedDate = new Date(tanggalInput.value);
            const dayOfWeek = selectedDate.getDay();
            
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                if (window.toast) {
                    window.toast('❌ Sabtu/Minggu hanya untuk Admin', 'error');
                }
                return;
            }
            
            const [startHour, startMin] = jamMulaiInput.value.split(':').map(Number);
            const [endHour, endMin] = jamSelesaiInput.value.split(':').map(Number);
            const startTime = startHour * 60 + startMin;
            const endTime = endHour * 60 + endMin;
            
            if (startTime < minTime || endTime > maxTime) {
                if (window.toast) {
                    window.toast('❌ Jam operasional: 07:30-16:00', 'error');
                }
                return;
            }
        }
        
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '⏳ Menyimpan...';
        
        const booking = {            id: Date.now(),
            nama: document.getElementById('nama')?.value,
            ruang: document.getElementById('ruang')?.value,
            tanggal: document.getElementById('tanggal')?.value,
            jam_mulai: document.getElementById('jam_mulai')?.value,
            jam_selesai: document.getElementById('jam_selesai')?.value,
            keperluan: document.getElementById('keperluan')?.value,
            catatan: document.getElementById('catatan')?.value || '',
            status: 'pending',
            created_by: window.DREAM?.state?.user?.email || 'user',
            is_admin: isAdmin,
            created_at: new Date().toISOString()
        };
        
        try {
            // Check for double booking
            const existing = await checkDoubleBooking(booking);
            if (existing) {
                throw new Error('❌ Ruangan sudah dibooking pada waktu yang sama!');
            }
            
            // Save to Supabase or localStorage
            if (supabase) {
                const { error } = await supabase.from('bookings').insert([booking]);
                if (error) throw error;
            } else {
                const bookings = JSON.parse(localStorage.getItem('dreamos-bookings') || '[]');
                bookings.push(booking);
                localStorage.setItem('dreamos-bookings', JSON.stringify(bookings));
            }
            
            // Audit log
            if (window.GhostAudit) {
                window.GhostAudit.record(
                    window.DREAM?.state?.user?.email || booking.nama,
                    'BOOKING_CREATED',
                    `Ruangan: ${booking.ruang}, Tanggal: ${booking.tanggal}`
                );
            }
            
            // Toast
            if (window.toast) {
                window.toast('✅ Booking berhasil disimpan!', 'success');
            }
            
            formResult.innerHTML = '<span class="text-emerald-400">✅ Booking berhasil!</span>';
            form.reset();
            if (tanggalInput) tanggalInput.value = minDate;
            
            await loadBookings();            
        } catch (error) {
            formResult.innerHTML = `<span class="text-red-500">${error.message}</span>`;
            if (window.toast) {
                window.toast(error.message, 'error');
            }
        } finally {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    });
    
    // Load bookings function
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
                <div class="glass-card p-4 border-l-4 ${b.status === 'approved' ? 'border-emerald-500' : b.status === 'rejected' ? 'border-red-500' : 'border-yellow-500'}">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h4 class="font-bold" style="color:var(--text-primary);">${b.ruang}</h4>
                            <p class="text-sm" style="color:var(--text-muted);">${b.nama}</p>
                            <p class="text-xs" style="color:var(--text-subtle);margin-top:4px;">📅 ${b.tanggal} | ⏰ ${b.jam_mulai} - ${b.jam_selesai}</p>
                            <p class="text-sm" style="color:var(--text-muted);margin-top:4px;">${b.keperluan}</p>
                            ${b.catatan ? `<p class="text-xs" style="color:var(--text-subtle);margin-top:4px;">📝 ${b.catatan}</p>` : ''}
                        </div>
                        <span class="text-xs px-2 py-1 rounded-full ${b.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : b.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}">
                            ${b.status}                        </span>
                    </div>
                </div>
            `).join('');
            
        } catch (error) {
            bookingList.innerHTML = '<p class="text-red-500 text-center py-4">Gagal memuat data</p>';
        }
    }
    
    // Check double booking
    async function checkDoubleBooking(newBooking) {
        let bookings = [];
        
        if (supabase) {
            const { data } = await supabase
                .from('bookings')
                .select('*')
                .eq('ruang', newBooking.ruang)
                .eq('tanggal', newBooking.tanggal)
                .in('status', ['pending', 'approved']);
            bookings = data || [];
        } else {
            bookings = JSON.parse(localStorage.getItem('dreamos-bookings') || '[]');
            bookings = bookings.filter(b => 
                b.ruang === newBooking.ruang && 
                b.tanggal === newBooking.tanggal &&
                b.status !== 'rejected'
            );
        }
        
        // Check time overlap
        for (const b of bookings) {
            const overlap = (newBooking.jam_mulai < b.jam_selesai && newBooking.jam_selesai > b.jam_mulai);
            if (overlap) return b;
        }
        
        return null;
    }
    
    // Expose for refresh
    window.refreshBookingList = loadBookings;
}

export function cleanup() {
    console.log('📅 [BOOKING] Module cleanup');
    delete window.refreshBookingList;
}
