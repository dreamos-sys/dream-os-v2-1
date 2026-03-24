/**
 * 📅 DREAM OS v2.0 - BOOKING MODULE
 * Enterprise Grade - Bismillah bi idznillah.
 */

export default {
    async render() {
        // Karena modul ini butuh data user, kita ambil dari session
        const user = { name: 'Master M', role: 'admin' }; 
        const minDate = new Date(); minDate.setDate(minDate.getDate() + 1);
        const minDateStr = minDate.toISOString().split('T')[0];

        return `
            <div class="p-5 animate-up" style="color: #e2e8f0;">
                <div class="flex items-center gap-4 mb-8">
                    <button onclick="DREAM.navigate('home')" class="glass p-3 rounded-2xl active:scale-90 transition">
                        <i class="fas fa-arrow-left text-lime-400"></i>
                    </button>
                    <h2 class="text-xl font-black tracking-widest text-white uppercase">RESERVASI SARANA</h2>
                </div>

                <div id="lock-banner" class="hidden mb-5 p-4 rounded-2xl border border-red-500/50 bg-red-500/10 text-red-400 text-xs font-bold text-center">
                    🔒 SISTEM BOOKING TERKUNCI (DI LUAR JAM KERJA)
                </div>

                <form id="bookingForm" class="space-y-4">
                    <div class="glass p-5 rounded-[30px] space-y-4 border-lime-500/10">
                        <div>
                            <label class="text-[9px] font-black text-lime-500 tracking-[2px] uppercase ml-2">Pilih Ruangan</label>
                            <select id="sarana" required class="w-full bg-slate-900/50 border border-white/10 p-4 rounded-2xl text-sm text-white outline-none focus:border-lime-500 transition mt-2">
                                <option value="">-- Pilih Lokasi --</option>
                                <option>Aula SMP</option><option>Aula SMA</option><option>Serbaguna</option>
                                <option>Saung Besar</option><option>Labkom SMA</option><option>Lapangan Basket</option>
                            </select>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="text-[9px] font-black text-lime-500 tracking-[2px] uppercase ml-2">Tanggal</label>
                                <input type="date" id="tgl" required min="${minDateStr}" class="w-full bg-slate-900/50 border border-white/10 p-4 rounded-2xl text-sm text-white outline-none focus:border-lime-500 transition mt-2">
                            </div>
                            <div>
                                <label class="text-[9px] font-black text-lime-500 tracking-[2px] uppercase ml-2">No. HP</label>
                                <input type="tel" placeholder="08..." required class="w-full bg-slate-900/50 border border-white/10 p-4 rounded-2xl text-sm text-white outline-none focus:border-lime-500 transition mt-2">
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="text-[9px] font-black text-lime-500 tracking-[2px] uppercase ml-2">Jam Mulai</label>
                                <input type="time" id="jam_mulai" value="08:00" class="w-full bg-slate-900/50 border border-white/10 p-4 rounded-2xl text-sm text-white outline-none focus:border-lime-500 transition mt-2">
                            </div>
                            <div>
                                <label class="text-[9px] font-black text-lime-500 tracking-[2px] uppercase ml-2">Jam Selesai</label>
                                <input type="time" id="jam_selesai" value="10:00" class="w-full bg-slate-900/50 border border-white/10 p-4 rounded-2xl text-sm text-white outline-none focus:border-lime-500 transition mt-2">
                            </div>
                        </div>
                    </div>

                    <div class="glass p-5 rounded-[30px] border-lime-500/10">
                        <label class="text-[9px] font-black text-lime-500 tracking-[2px] uppercase ml-2">Peralatan (Smart Check)</label>
                        <div class="grid grid-cols-2 gap-2 mt-3">
                            ${['Projektor', 'Mic Wireless', 'Sound Portable', 'Sound Karaoke'].map(item => `
                                <label class="flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/5 active:scale-95 transition">
                                    <input type="checkbox" name="alat" value="${item}" class="accent-lime-500">
                                    <span class="text-[10px] font-bold text-slate-300 uppercase">${item}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <button type="submit" id="submitBtn" class="w-full p-5 rounded-[30px] bg-gradient-to-r from-lime-600 to-lime-400 text-slate-900 font-black tracking-[4px] shadow-lg shadow-lime-500/20 active:scale-95 transition">
                        KIRIM PENGAJUAN
                    </button>
                </form>
            </div>
        `;
    },

    afterRender() {
        const form = document.getElementById('bookingForm');
        const now = new Date();
        const hour = now.getHours();

        // 🔒 SMART LOCK: Jika di atas jam 16:00
        if (hour >= 16) {
            document.getElementById('lock-banner').classList.remove('hidden');
            const btn = document.getElementById('submitBtn');
            btn.innerHTML = '🔒 SISTEM TERKUNCI';
            btn.style.filter = 'grayscale(1)';
            btn.disabled = true;
        }

        form.onsubmit = (e) => {
            e.preventDefault();
            // Validasi Jumat Shalat Jumat
            const tgl = document.getElementById('tgl').value;
            const sarana = document.getElementById('sarana').value;
            const day = new Date(tgl).getDay(); // 5 = Jumat

            if (day === 5 && (sarana.includes('Aula') || sarana === 'Serbaguna')) {
                alert('⚠️ JUMAT BERKAH: Ruangan tidak tersedia pukul 10:30 - 13:00 untuk Shalat Jumat.');
                return;
            }

            alert('✅ Bismillah, Pengajuan Berhasil Terkirim ke Kabag Umum!');
            DREAM.navigate('home');
        };
    }
};
