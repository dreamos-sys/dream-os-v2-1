// ========== SUPABASE CLIENT ==========
const SUPABASE_URL = 'https://lfavawkzvdhdpaaplaiq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmYXZhd2t6dmRoZHBhYXBsYWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5Mjc0NjgsImV4cCI6MjA4OTUwMzQ2OH0.EhwnhAd20lUVaWHHB51UdWCGWxkyTaWIrsPY8xvhwE00';
let supabase = null;
let currentUser = null;
let currentRole = null;

// ========== CREDENTIALS (Role-based) ==========
const credentials = {
    'b15m1ll4h_012443410': { role: 'developer', access: 'full' },
    'Mr.M_Architect_2025': { role: 'master', access: 'full' },
    '4dm1n_AF6969@00': { role: 'commandcenter', access: 'full' },
    'LHPSsec_AF2025': { role: 'sekuriti', access: 'limited' },
    'CHCS_AF_@003': { role: 'janitor-indoor', access: 'limited' },
    'CHCS_AF_@004': { role: 'janitor-outdoor', access: 'limited' },
    'SACS_AF@004': { role: 'stok', access: 'limited' },
    'M41n_4F@234': { role: 'maintenance', access: 'limited' },
    '4dm1n_6969@01': { role: 'inventaris', access: 'limited' },
    '4dm1n_9696@02': { role: 'gudang', access: 'limited' },
    '4553Tumum_AF@1112': { role: 'asset', access: 'limited' },
    'user_@1234': { role: 'booking', access: 'limited' },
    'user_@2345': { role: 'k3', access: 'limited' }
};

// ========== GHOST MODE (via Dream Team 5 clicks) ==========
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
    const dreamTeam = document.querySelector('.dream-team');
    if (!dreamTeam) return;
    dreamTeam.addEventListener('click', () => {
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

// ========== LOGIN MODAL ==========
function showLoginModal() {
    return new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.id = 'login-modal';
        modal.style.cssText = `
            position: fixed; inset: 0; background: rgba(0,0,0,0.95); backdrop-filter: blur(8px);
            z-index: 20000; display: flex; align-items: center; justify-content: center;
        `;
        modal.innerHTML = `
            <div style="background: #0f172a; border-radius: 28px; padding: 32px; width: 90%; max-width: 380px; border: 1px solid #10b981; text-align: center;">
                <div style="font-size: 40px; margin-bottom: 16px;">🚀</div>
                <h2 style="color: #10b981;">Dream OS</h2>
                <p style="color: #94a3b8;">Masukkan username & password</p>
                <input type="text" id="login-username" placeholder="Username" class="login-input">
                <div style="position: relative;">
                    <input type="password" id="login-pw" placeholder="Password" class="login-input" style="padding-right: 45px;">
                    <i id="toggle-pw" class="fas fa-eye" style="position: absolute; right: 15px; top: 50%; transform: translateY(-50%); cursor: pointer; color: #94a3b8;"></i>
                </div>
                <button id="login-submit" class="login-btn">Login</button>
                <div id="login-error" style="color: #ef4444; font-size: 12px; margin-top: 12px;"></div>
            </div>
        `;
        document.body.appendChild(modal);

        const usernameInput = modal.querySelector('#login-username');
        const passwordInput = modal.querySelector('#login-pw');
        const submitBtn = modal.querySelector('#login-submit');
        const errorDiv = modal.querySelector('#login-error');
        const toggleIcon = modal.querySelector('#toggle-pw');

        toggleIcon.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            toggleIcon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
        });

        const attemptLogin = async () => {
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            if (!username || !password) {
                errorDiv.innerText = 'Isi username dan password';
                return;
            }
            const cred = credentials[username];
            if (!cred || password !== username) {
                errorDiv.innerText = 'Username atau password salah';
                passwordInput.value = '';
                usernameInput.focus();
                return;
            }
            currentUser = username;
            currentRole = cred.role;
            sessionStorage.setItem('dreamos_user', currentUser);
            sessionStorage.setItem('dreamos_role', currentRole);
            modal.remove();
            resolve(true);
        };
        submitBtn.onclick = attemptLogin;
        usernameInput.onkeypress = (e) => { if (e.key === 'Enter') attemptLogin(); };
        passwordInput.onkeypress = (e) => { if (e.key === 'Enter') attemptLogin(); };
        usernameInput.focus();
    });
}

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

// ========== RENDER DASHBOARD ==========
function renderDashboard() {
    document.getElementById('loading').style.display = 'none';
    const app = document.getElementById('app');
    const modules = window.MODULES || [];

    const roleModules = {
        developer: ['stok', 'asset', 'commandcenter', 'maintenance', 'booking', 'k3', 'janitor-indoor', 'janitor-outdoor', 'sekuriti', 'ghost'],
        master: ['stok', 'asset', 'commandcenter', 'maintenance', 'booking', 'k3', 'janitor-indoor', 'janitor-outdoor', 'sekuriti', 'ghost'],
        commandcenter: ['commandcenter', 'asset', 'stok'],
        sekuriti: ['sekuriti'],
        'janitor-indoor': ['janitor-indoor'],
        'janitor-outdoor': ['janitor-outdoor'],
        stok: ['stok'],
        maintenance: ['maintenance'],
        inventaris: ['asset'],
        gudang: ['asset'],
        asset: ['asset'],
        booking: ['booking'],
        k3: ['k3']
    };

    let allowedIds = roleModules[currentRole] || ['stok', 'asset', 'commandcenter'];
    let filteredModules = modules.filter(mod => allowedIds.includes(mod.id));

    if (ghostModeActive && (currentRole === 'developer' || currentRole === 'master')) {
        const ghostModule = modules.find(mod => mod.id === 'ghost');
        if (ghostModule && !filteredModules.find(m => m.id === 'ghost')) filteredModules.push(ghostModule);
    }

    const cardsHtml = filteredModules.map(mod => `
        <div class="card" data-module="${mod.id}">
            <div class="card-icon"><i class="fas ${mod.icon}"></i></div>
            <div class="card-title">${mod.name}</div>
            <div class="card-desc">${mod.description || ''}</div>
        </div>
    `).join('');

    app.innerHTML = `
        <div class="header">
            <div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            <div class="shalawat">اللهم صل على سيدنا محمد</div>
            <div class="dream-team">⭐ DREAM TEAM ⭐</div>
        </div>
        <div class="grid" id="module-grid">${cardsHtml}</div>
        <div id="content">✨ Selamat datang, ${currentUser} ✨</div>
        <div class="bottom-nav">
            <button class="nav-item" data-page="home"><i class="fas fa-home"></i><span>Home</span></button>
            <button class="nav-item" data-page="profile"><i class="fas fa-user"></i><span>Profile</span></button>
            <button class="nav-item" data-page="qr"><i class="fas fa-qrcode"></i><span>QR</span></button>
            <button class="nav-item" data-page="about"><i class="fas fa-info-circle"></i><span>About</span></button>
            <button class="nav-item" data-page="settings"><i class="fas fa-cog"></i><span>Settings</span></button>
            <button class="nav-item" id="logout-btn"><i class="fas fa-sign-out-alt"></i><span>Exit</span></button>
        </div>
        <footer>DREAM TEAM © 2026 · v2.1</footer>
    `;

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const moduleId = card.dataset.module;
            loadModuleInModal(moduleId);
        });
    });

    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            if (page === 'home') renderDashboard();
            else if (page === 'profile') loadModuleInModal('profile');
            else if (page === 'qr') loadModuleInModal('qr');
            else if (page === 'about') loadModuleInModal('about');
            else if (page === 'settings') loadModuleInModal('settings');
        });
    });

    document.getElementById('logout-btn').addEventListener('click', () => {
        sessionStorage.clear();
        location.reload();
    });

    initGhostMode();
}

// ========== MODAL SYSTEM ==========
function createModal() {
    let modal = document.getElementById('module-modal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'module-modal';
    modal.style.cssText = `
        display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.85);
        backdrop-filter: blur(8px); z-index: 10000; align-items: center;
        justify-content: center; padding: 20px; box-sizing: border-box;
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

async function loadModuleInModal(moduleId) {
    const modal = createModal();
    const modalBody = document.getElementById('modal-body');
    if (!modalBody) return;
    modalBody.innerHTML = '<div style="text-align:center; padding:20px;">⏳ Memuat modul...</div>';
    modal.style.display = 'flex';
    try {
        const module = await import(`./modules/${moduleId}/module.js`);
        const html = module.default.render({ user: currentUser, role: currentRole, toast: (msg) => alert(msg), supabase: null });
        modalBody.innerHTML = html;
        if (module.default.afterRender) module.default.afterRender({ supabase: null, toast: alert });
    } catch (err) {
        console.error(err);
        modalBody.innerHTML = `<div style="background:#0f172a; padding:20px; border-radius:12px;">❌ Modul "${moduleId}" belum siap: ${err.message}</div>`;
    }
}

// ========== INIT ==========
window.onload = async () => {
    const sessionUser = sessionStorage.getItem('dreamos_user');
    const sessionRole = sessionStorage.getItem('dreamos_role');
    if (sessionUser && sessionRole) {
        currentUser = sessionUser;
        currentRole = sessionRole;
        loadModules();
    } else {
        const success = await showLoginModal();
        if (success) loadModules();
        else alert('Login gagal');
    }
};
