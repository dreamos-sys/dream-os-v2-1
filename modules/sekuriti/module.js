// modules/sekuriti/module.js
export default async function initModule(ctx) {
  const { container, utils, state } = ctx;
  const user = state?.user || { name: 'GUEST' };

  // Render UI
  container.innerHTML = `
    <div class="module-wrapper animate-fade-in">
      <div class="module-header">
        <h2>🛡️ Sistem Sekuriti</h2>
        <p>Petugas: ${user.name}</p>
      </div>

      <div class="module-content">
        <div class="card-action">
          <h3>Log Kejadian</h3>
          <textarea id="log-input" placeholder="Tulis laporan di sini..."></textarea>
          <button id="btn-submit-log" class="btn-primary">Kirim Laporan</button>
        </div>
        
        <div class="status-indicator">
          <span class="dot pulse"></span> Sistem Pemantauan Aktif
        </div>
      </div>
    </div>
  `;

  // Logic
  const btnSubmit = document.getElementById('btn-submit-log');
  const input = document.getElementById('log-input');

  const handleSubmit = async () => {
    const val = input.value.trim();
    if (!val) return utils.showToast('Laporan tidak boleh kosong!', 'warning');

    utils.showToast('Mengirim laporan ke Supabase...', 'info');
    
    // Simulasi pengiriman
    setTimeout(() => {
      utils.showToast('✅ Laporan berhasil disimpan!', 'success');
      input.value = '';
    }, 1500);
  };

  btnSubmit.addEventListener('click', handleSubmit);

  // Cleanup function
  return function cleanup() {
    console.log('🧹 Cleaning up Sekuriti Module...');
    btnSubmit.removeEventListener('click', handleSubmit);
  };
}
