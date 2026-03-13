/**
 * 📦 MODUL STOK – Dream OS v2.1
 * Manajemen inventaris alat dan stok.
 * Fitur:
 * - Form tambah/update stok
 * - Daftar stok dengan peringatan stok minimum
 * - Integrasi Supabase, GhostAudit, dan toast
 */

export async function render() {
    return `
        <div class="max-w-6xl mx-auto p-4">
            <div class="text-center mb-6">
                <h2 class="text-2xl font-bold text-purple-400">📦 Alat & Stok</h2>
                <p class="text-sm opacity-70">Manajemen inventaris alat</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Form Tambah Stok -->
                <div class="glass-card p-6 rounded-xl">
                    <h3 class="text-lg font-semibold mb-4 border-b border-slate-700 pb-2">Tambah / Update Stok</h3>
                    <form id="stokForm" class="space-y-4">
                        <div>
                            <label class="block mb-1 text-sm font-medium">Nama Barang *</label>
                            <input type="text" id="nama_barang" required class="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white">
                        </div>
                        <div>
                            <label class="block mb-1 text-sm font-medium">Kategori</label>
                            <select id="kategori" class="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white">
                                <option value="alat_kebersihan">Alat Kebersihan</option>
                                <option value="alat_taman">Alat Taman</option>
                                <option value="bahan_habis">Bahan Habis Pakai</option>
                                <option value="sparepart">Sparepart</option>
                            </select>
                        </div>
                        <div>
                            <label class="block mb-1 text-sm font-medium">Jumlah *</label>
                            <input type="number" id="jumlah" required class="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white">
                        </div>
                        <div>
                            <label class="block mb-1 text-sm font-medium">Satuan</label>
                            <input type="text" id="satuan" placeholder="pcs, liter, kg" class="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white">
                        </div>
                        <div>
                            <label class="block mb-1 text-sm font-medium">Lokasi</label>
                            <input type="text" id="lokasi" placeholder="Gudang A" class="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white">
                        </div>
                        <div>
                            <label class="block mb-1 text-sm font-medium">Minimal Stok</label>
                            <input type="number" id="minimal_stok" class="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white">
                        </div>
                        <button type="submit" class="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-xl font-semibold transition">
                            Simpan
                        </button>
                        <div id="form-result" class="text-center text-sm"></div>
                    </form>
                </div>

                <!-- Daftar Stok -->
                <div class="glass-card p-6 rounded-xl">
                    <h3 class="text-lg font-semibold mb-4 border-b border-slate-700 pb-2">Daftar Stok</h3>
                    <div id="stok-list" class="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">Memuat...</div>
                </div>
            </div>
            <div class="mt-6 text-center">
                <a href="#" onclick="window.DREAM.load('home'); return false;" class="text-blue-400 hover:text-blue-300 text-sm">
                    <i class="fas fa-arrow-left mr-1"></i> Kembali
                </a>
            </div>
        </div>
    `;
}

export async function afterRender() {
    console.log('[STOK] Module loaded');

    const supabase = window.supabase;
    if (!supabase) {
        console.error('[STOK] Supabase tidak tersedia');
        return;
    }

    const form = document.getElementById('stokForm');
    const formResult = document.getElementById('form-result');
    const stokList = document.getElementById('stok-list');

    // ========== LOAD DAFTAR STOK ==========
    async function loadStok() {
        if (!stokList) return;
        stokList.innerHTML = '<p class="text-center py-4 text-slate-400">⏳ Memuat...</p>';

        try {
            const { data, error } = await supabase
                .from('stok')
                .select('*')
                .order('nama_barang', { ascending: true });

            if (error) throw error;

            if (!data || data.length === 0) {
                stokList.innerHTML = '<p class="text-center py-4 opacity-60">Belum ada data stok</p>';
                return;
            }

            let html = '';
            data.forEach(item => {
                const stokWarning = item.jumlah <= item.minimal_stok ? 'text-red-400 font-bold' : '';
                html += `
                    <div class="border-b border-slate-700 pb-2">
                        <div class="flex justify-between">
                            <span class="font-semibold">${item.nama_barang}</span>
                            <span class="${stokWarning}">${item.jumlah} ${item.satuan || ''}</span>
                        </div>
                        <div class="text-xs text-slate-400">${item.kategori || '-'} | Lokasi: ${item.lokasi || '-'}</div>
                    </div>
                `;
            });
            stokList.innerHTML = html;
        } catch (err) {
            console.error('[STOK] Gagal load stok:', err);
            stokList.innerHTML = '<p class="text-center py-4 text-red-500">Gagal memuat data</p>';
        }
    }

    // ========== HANDLE SUBMIT ==========
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nama_barang = document.getElementById('nama_barang')?.value.trim();
        const kategori = document.getElementById('kategori')?.value;
        const jumlah = parseInt(document.getElementById('jumlah')?.value || 0);
        const satuan = document.getElementById('satuan')?.value.trim();
        const lokasi = document.getElementById('lokasi')?.value.trim();
        const minimal_stok = parseInt(document.getElementById('minimal_stok')?.value) || 0;

        if (!nama_barang || !jumlah) {
            if (formResult) formResult.innerHTML = '<span class="text-red-500">Nama barang dan jumlah harus diisi!</span>';
            return;
        }

        const formData = {
            nama_barang,
            kategori: kategori || null,
            jumlah,
            satuan: satuan || null,
            lokasi: lokasi || null,
            minimal_stok
        };

        try {
            const { error } = await supabase.from('stok').insert([formData]);
            if (error) throw error;

            if (formResult) formResult.innerHTML = '<span class="text-emerald-400">Stok berhasil ditambahkan! ✅</span>';
            form.reset();

            // Catat audit
            if (window.GhostAudit) {
                window.GhostAudit.record(
                    window.DREAM?.state?.user?.email || 'system',
                    'STOK_ADD',
                    `Barang: ${nama_barang}, Jumlah: ${jumlah}`
                );
            }

            // Toast
            if (window.DREAM?.showToast) {
                window.DREAM.showToast('Stok ditambahkan', 'success');
            }

            loadStok();
            setTimeout(() => { if (formResult) formResult.innerHTML = ''; }, 3000);
        } catch (err) {
            console.error('[STOK] Insert error:', err);
            if (formResult) formResult.innerHTML = `<span class="text-red-500">Gagal: ${err.message}</span>`;
        }
    });

    // ========== INIT ==========
    loadStok();
}
