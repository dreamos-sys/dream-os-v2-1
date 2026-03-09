/**
 * BOOKING MODULE - Dream OS v2.1
 * Modul ini menangani sistem reservasi.
 */
export default async function initModule(ctx) {
  const { container, services } = ctx;

  // 1. Render UI
  container.innerHTML = `
    <div class="module-wrapper animate-fade-in">
      <h2>📅 Sistem Booking</h2>
      <p>Silakan buat reservasi baru.</p>
      
      <div class="card-action">
        <label>Pilih Tanggal:</label>
        <input type="date" id="booking-date" />
        
        <label>Deskripsi:</label>
        <textarea id="booking-desc" placeholder="Contoh: Booking Ruang Meeting..."></textarea>
        
        <button id="btn-save-booking" class="btn-primary">Konfirmasi Booking</button>
      </div>
    </div>
  `;

  // 2. Logic (Contoh Event Listener)
  const btnSave = document.getElementById('btn-save-booking');
  const handleSave = () => {
    services.toast('✅ Booking berhasil diproses!', 'success');
  };

  btnSave.addEventListener('click', handleSave);

  // 3. CLEANUP (Penting biar memori HP lo tetep enteng!)
  return function cleanup() {
    console.log('🧹 Booking module cleaned up.');
    btnSave.removeEventListener('click', handleSave);
  };
}
