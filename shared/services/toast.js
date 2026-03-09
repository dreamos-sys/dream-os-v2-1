// ===== shared/services/toast.js =====
export function toast(msg, type = 'success') {
  const icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️' };
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.innerHTML = `<span>${icons[type]}</span><span>${String(msg).replace(/</g,'&lt;')}</span>`;
  const container = document.getElementById('toast-container');
  if (container) {
    container.appendChild(el);
    setTimeout(() => { el.style.opacity='0'; setTimeout(() => el.remove(), 350); }, 3500);
  } else {
    alert(msg); // fallback
  }
}
