// ===== modules/sekuriti/module.js =====
export default async function initModule({ container, services, user }) {
  // Render HTML
  container.innerHTML = `
    <div class="sekuriti-panel">
      <h2>Laporan Patroli</h2>
      <form id="laporan-form">
        <input type="text" id="lokasi" placeholder="Lokasi">
        <button type="submit">Kirim</button>
      </form>
    </div>
  `;

  const form = container.querySelector('#laporan-form');
  const handleSubmit = async (e) => {
    e.preventDefault();
    services.toast('Laporan dikirim (demo)', 'success');
  };
  form.addEventListener('submit', handleSubmit);

  // Cleanup
  return () => {
    form.removeEventListener('submit', handleSubmit);
    console.log('Sekuriti cleanup');
  };
}
