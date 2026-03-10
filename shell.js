// shell.js - Dream OS v2.1 (Kernel Core)
// Official Enterprise Modular Platform - Bismillah & Shalawat Standard

import { services, initServices } from './shared/services/index.js';

// State App
const state = {
  user: null,
  currentModule: null,
  cleanup: null,
  isInitialized: false,
  logoAngle: 240 // Sudut awal: Huruf ه
};

/**
 * Inisialisasi Kernel
 */
async function init() {
  try {
    await initServices();
    const manifestRes = await fetch('./manifest.json');
    if (!manifestRes.ok) throw new Error('System Manifest tidak ditemukan.');
    const { modules } = await manifestRes.json();

    // Render Framework Utama
    renderShell();

    // Render Grid Modul
    renderModuleGrid(modules);

    // Cek Session (Placeholder Supabase)
    checkSession();

    state.isInitialized = true;
    console.log('✅ Dream OS v2.1 Kernel Ready (Bismillah Mode)');
  } catch (err) {
    console.error('Kernel Initialization Failed:', err);
    document.getElementById('app-shell').innerHTML = `
      <div style="color:white; padding:2rem; text-align:center;">
        <h2 style="color:#ef4444">Critical System Failure</h2>
        <p>${err.message}</p>
        <button onclick="location.reload()" style="padding:10px; margin-top:10px; cursor:pointer">Reboot Kernel</button>
      </div>
    `;
  }
}

/**
 * Render Struktur Framework dengan Bismillah & Transisi Logo
 */
function renderShell() {
  const shell = document.getElementById('app-shell');
  shell.innerHTML = `
    <header class="shell-header">
      <div class="header-content">
        <div class="logo-area">
          <img id="dream-os-logo" src="./assets/icons/logo_haa.svg" alt="Dream OS" style="transform: rotate(${state.logoAngle}deg);" />
          <h1 style="color:#10b981">Dream OS <span class="version">v2.1</span></h1>
        </div>
        
        <div class="system-meta">
          <span class="arabic bismillah-text">بسم الله الرحمن الرحيم</span>
          <div class="user-info">
            <span id="clock" class="clock">00:00:00</span>
            <div id="user-badge" class="user-badge">OFFLINE</div>
          </div>
        </div>
      </div>
    </header>
    
    <main id="main-content">
      <div id="module-grid" class="module-grid"></div>
      <div id="module-container" class="module-container" style="display:none"></div>
    </main>

    <footer class="bottom-bar">
      <button id="shalawat-btn" class="nav-btn shalawat-action">
        <span class="arabic">اللهم صل على محمد</span>
        <span class="btn-subtext">Dashoard</span>
      </button>
    </footer>
  `;

  // Bind Event Tombol Home
  document.getElementById('shalawat-btn').addEventListener('click', closeCurrentModule);

  // Jalankan Jam
  setInterval(() => {
    const clockEl = document.getElementById('clock');
    if (clockEl) clockEl.textContent = new Date().toLocaleTimeString('id-ID');
  }, 1000);
}

/**
 * Render Menu Modul (Standard Grid)
 */
function renderModuleGrid(modules) {
  const grid = document.getElementById('module-grid');
  grid.innerHTML = modules.map(m => `
    <div class="module-card" data-module-id="${m.id}" style="cursor:pointer">
      <div class="module-icon">${m.icon}</div>
      <div class="module-namearabic arabic" style="color: #64748b;">${m.nameArabic || ''}</div>
      <div class="module-name">${m.name}</div>
    </div>
  `).join('');

  grid.querySelectorAll('.module-card').forEach(card => {
    card.addEventListener('click', async () => {
      const id = card.dataset.moduleId;
      const moduleInfo = modules.find(m => m.id === id);
      if (moduleInfo) await openModule(moduleInfo);
    });
  });
}

/**
 * Membuka Modul & Trigger Transisi Visual (ه → d)
 */
async function openModule(moduleInfo) {
  if (services.toast) services.toast(`Bismillah, Memuat ${moduleInfo.name}...`);
  
  // Cleanup sebelumnya
  if (state.cleanup) {
    state.cleanup();
    state.cleanup = null;
  }

  // TRANSISI VISUAL LOGO: ه (240°) → d (275°)
  const logoEl = document.getElementById('dream-os-logo');
  if (logoEl) {
    logoEl.style.transition = 'transform 0.5s ease-in-out';
    logoEl.style.transform = `rotate(275deg)`; // Sudut transisi: d
    state.logoAngle = 275;
  }

  // UI Ganti
  document.getElementById('module-grid').style.display = 'none';
  const container = document.getElementById('module-container');
  container.style.display = 'block';
  container.innerHTML = '<div class="loader">Initializing Module...</div>';

  try {
    const module = await import(moduleInfo.path);
    const cleanup = await module.default({
      container: container,
      services: services,
      user: state.user
    });

    state.cleanup = cleanup;
    state.currentModule = moduleInfo.id;
    
  } catch (err) {
    console.error(`Error loading module ${moduleInfo.id}:`, err);
    if (services.toast) services.toast('Gagal memuat modul!', 'error');
    closeCurrentModule();
  }
}

/**
 * Kembali ke Dashboard & Trigger Transisi Visual (d → ه)
 */
function closeCurrentModule() {
  if (state.cleanup) {
    state.cleanup();
    state.cleanup = null;
  }

  // TRANSISI VISUAL LOGO: d (275°) → ه (240°)
  const logoEl = document.getElementById('dream-os-logo');
  if (logoEl) {
    logoEl.style.transition = 'transform 0.5s ease-in-out';
    logoEl.style.transform = `rotate(240deg)`; // Kembali ke Sudut: ه
    state.logoAngle = 240;
  }

  document.getElementById('module-container').style.display = 'none';
  document.getElementById('module-grid').style.display = 'grid';
  state.currentModule = null;
}

function checkSession() {
  const badge = document.getElementById('user-badge');
  if (state.user) {
    badge.textContent = state.user.name;
    badge.classList.add('online');
  } else {
    badge.textContent = 'GUEST';
    badge.classList.remove('online');
  }
}

// Bismillah, Boot!
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
