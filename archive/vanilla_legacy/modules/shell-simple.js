// ========== LOAD MODULES LIST ==========
function loadModules() {
    const script = document.createElement('script');
    script.src = './modules-list.js';
    script.onload = () => {
        console.log("Modules loaded:", window.MODULES);
        renderDashboard();
    };
    script.onerror = () => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('app').innerHTML = '<div style="color:red">Gagal memuat modul.</div>';
    };
    document.head.appendChild(script);
}

// ========== GHOST MODE ==========
let ghostModeActive = false;

function generateGhostPassword() {
    const now = new Date();
    const hour = now.getHours();
    let rakaat = 0;
    if (hour >= 4 && hour < 6) rakaat = 2;
    else if (hour >= 12 && hour < 15) rakaat = 4;
    else if (hour >= 15 && hour < 18) rakaat = 4;
    else if (hour >= 18 && hour < 19) rakaat = 3;
    else if (hour >= 19 && hour < 20) rakaat = 4;
    else rakaat = 0;
    return `dreamos2026${rakaat}`;
}

function initGhostMode() {
    let tapCount = 0;
    const header = document.querySelector('.bismillah')?.closest('.header');
    if (!header) return;
    header.addEventListener('click', () => {
        tapCount++;
        setTimeout(() => tapCount = 0, 2000);
        if (tapCount === 5 && !ghostModeActive) {
            const code = prompt('👻 Enter Ghost Code:');
            const correctCode = generateGhostPassword();
            if (code === correctCode) {
                ghostModeActive = true;
                sessionStorage.setItem('ghost_mode', 'true');
                alert('👻 Ghost Stealth Mode Activated');
                renderDashboard();
            } else if (code !== null) alert('Invalid Ghost Code');
            tapCount = 0;
        }
    });
}

// ========== MODAL SYSTEM ==========
function createModal() {
    let modal = document.getElementById('module-modal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'module-modal';
    modal.style.cssText = `
        display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.85); backdrop-filter: blur(8px); z-index: 10000;
        align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;
    `;
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: #0f172a; border-radius: 24px; max-width: 800px; width: 100%;
        max-height: 90%; overflow-y: auto; position: relative; border: 1px solid #10b981;
    `;
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: sticky; top: 10px; right: 10px; float: right;
        background: #10b981; border: none; color: #000; font-size: 24px;
        width: 40px; height: 40px; border-radius: 50%; cursor: pointer; margin: 10px;
    `;
    closeBtn.onclick = () => modal.style.display = 'none';
    const modalBody = document.createElement('div');
    modalBody.id = 'modal-body';
    modalBody.style.padding = '20px';
    modalBody.style.color = '#e2e8f0';
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
    return modal;
}

function loadModuleInModal(moduleId) {
    const modal = createModal();
    const modalBody = document.getElementById('modal-body');
    if (!modalBody) return;
    modalBody.innerHTML = '<div style="text-align:center; padding:20px;">⏳ Memuat modul...</div>';
    modal.style.display = 'flex';
    import(`./modules/${moduleId}/module.js`)
        .then(module => {
            const html = module.default.render({ user: "Guest", role: "user", toast: alert, supabase: null });
            modalBody.innerHTML = html;
            if (module.default.afterRender) module.default.afterRender({ supabase: null, toast: alert });
        })
        .catch(err => {
            console.error(err);
            modalBody.innerHTML = `<div style="background:#0f172a; padding:20px; border-radius:12px;">❌ Modul "${moduleId}" belum siap: ${err.message}</div>`;
        });
}

// ========== RENDER DASHBOARD ==========
function renderDashboard() {
    document.getElementById('loading').style.display = 'none';
    const app = document.getElementById('app');
    let modules = window.MODULES || [];

    const cardsHtml = modules.map(mod => `
        <div class="card" data-module="${mod.id}">
            <div class="card-icon"><i class="fas ${mod.icon}"></i></div>
            <div class="card-title">${mod.name}</div>
            <div class="card-desc">${mod.description || ''}</div>
        </div>
    `).join('');

    app.innerHTML = `
        <div class="header">
            <div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            <div style="font-size: 12px; color: #94a3b8;">THE POWER SOUL OF SHALAWAT</div>
        </div>
        <div class="grid" id="module-grid">${cardsHtml}</div>
        <div id="content" style="margin: 20px 0; text-align: center; color: #94a3b8;">Pilih menu di atas</div>
        <nav class="nav">
            <button data-page="home"><i class="fas fa-home"></i><br>Home</button>
            <button data-page="profile"><i class="fas fa-user"></i><br>Profile</button>
            <button data-page="settings"><i class="fas fa-cog"></i><br>Settings</button>
        </nav>
        <footer>DREAM TEAM © 2026 · v2.1</footer>
    `;

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const moduleId = card.dataset.module;
            loadModuleInModal(moduleId);
        });
    });

    document.querySelector('[data-page="home"]').addEventListener('click', () => renderDashboard());
    document.querySelector('[data-page="profile"]').addEventListener('click', () => loadModuleInModal('profile'));
    document.querySelector('[data-page="settings"]').addEventListener('click', () => loadModuleInModal('settings'));
}

// ========== INIT ==========
function init() {
    const savedGhost = sessionStorage.getItem('ghost_mode');
    if (savedGhost === 'true') ghostModeActive = true;
    loadModules();
    initGhostMode();
}
init();
