// ========== SUPABASE CLIENT ==========
const SUPABASE_URL = 'https://lfavawkzvdhdpaaplaiq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmYXZhd2t6dmRoZHBhYXBsYWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5Mjc0NjgsImV4cCI6MjA4OTUwMzQ2OH0.EhwnhAd20lUVaWHHB51UdWCGWxkyTaWIrsPY8xvhwE00';
let supabase = null;
let currentUser = null;
let currentRole = null;

// ========== GHOST MODE ==========
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
let ghostModeActive = false;
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
                if (window.DREAM && window.DREAM.navigate) window.DREAM.navigate('ghost');
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

async function loadModuleInModal(moduleId) {
    const modal = createModal();
    const modalBody = document.getElementById('modal-body');
    if (!modalBody) return;
    modalBody.innerHTML = '<div style="text-align:center; padding:20px;">⏳ Memuat modul...</div>';
    modal.style.display = 'flex';
    try {
        const module = await import(`./modules/${moduleId}/module.js`);
        const html = module.default.render({ user: currentUser, role: currentRole, toast: (msg) => alert(msg), supabase });
        modalBody.innerHTML = html;
        if (module.default.afterRender) module.default.afterRender({ supabase, toast: alert });
    } catch (err) {
        console.error(err);
        modalBody.innerHTML = `<div style="background:#0f172a; padding:20px; border-radius:12px;">❌ Modul "${moduleId}" belum siap: ${err.message}</div>`;
    }
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
                <img src="./assets/img/icon-512.png" style="width: 80px; height: 80px; border-radius: 20px; margin-bottom: 16px;">
                <h2 style="color: #10b981;">Dream OS</h2>
                <p style="color: #94a3b8;">Masukkan username & password</p>
                <input type="text" id="login-username" placeholder="Username" autocomplete="off"
                    style="width: 100%; padding: 14px; margin: 8px 0; background: #1e293b; border: 1px solid #334155; border-radius: 16px; color: white;">
                <div style="position: relative;">
                    <input type="password" id="login-pw" placeholder="Password" autocomplete="off"
                        style="width: 100%; padding: 14px; margin: 8px 0; background: #1e293b; border: 1px solid #334155; border-radius: 16px; color: white; padding-right: 45px;">
                    <i id="toggle-pw" class="fas fa-eye" style="position: absolute; right: 15px; top: 50%; transform: translateY(-50%); cursor: pointer; color: #94a3b8;"></i>
                </div>
                <button id="login-submit" style="width: 100%; padding: 14px; margin-top: 16px; background: #10b981; border: none; border-radius: 24px; font-weight: bold; cursor: pointer;">Login</button>
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
            const safeUsername = username.replace(/@/g, '_at_').toLowerCase();
            const email = `${safeUsername}@dreamos.local`;
            try {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('role, full_name')
                    .eq('id', data.user.id)
                    .single();
                if (profileError) throw profileError;
                currentUser = profile.full_name || username;
                currentRole = profile.role;
                sessionStorage.setItem('dreamos_user', currentUser);
                sessionStorage.setItem('dreamos_role', currentRole);
                sessionStorage.setItem('dreamos_session', JSON.stringify(data.session));
                modal.remove();
                resolve(true);
            } catch (err) {
                console.error(err);
                errorDiv.innerText = 'Username atau password salah';
                passwordInput.value = '';
                usernameInput.focus();
            }
        };
        submitBtn.onclick = attemptLogin;
        usernameInput.onkeypress = (e) => { if (e.key === 'Enter') attemptLogin(); };
        passwordInput.onkeypress = (e) => { if (e.key === 'Enter') attemptLogin(); };
        usernameInput.focus();
    });
}

// ========== RENDER DASHBOARD ==========
function renderApp() {
    document.getElementById('loading').style.display = 'none';
    const app = document.getElementById('app');
    const modules = window.MODULES || [];

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
            <div style="margin-top: 20px;">Selamat datang, <strong>${currentUser}</strong></div>
        </div>
        <div class="grid" id="module-grid">${cardsHtml}</div>
        <div id="content" style="margin: 20px 0; text-align: center; color: #94a3b8;">Pilih menu di atas</div>
        <nav class="nav">
            <button data-page="home"><i class="fas fa-home"></i><br>Home</button>
            <button data-page="profile"><i class="fas fa-user"></i><br>Profile</button>
            <button data-page="settings"><i class="fas fa-cog"></i><br>Settings</button>
            <button id="logout-btn"><i class="fas fa-sign-out-alt"></i><br>Exit</button>
        </nav>
        <footer>DREAM TEAM © 2026 · v2.1</footer>
    `;

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const moduleId = card.dataset.module;
            loadModuleInModal(moduleId);
        });
    });
    document.querySelectorAll('.nav button').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            if (page === 'home') renderApp();
            else if (page === 'profile') loadModuleInModal('profile');
            else if (page === 'settings') loadModuleInModal('settings');
        });
    });
    document.getElementById('logout-btn').addEventListener('click', async () => {
        await supabase.auth.signOut();
        sessionStorage.clear();
        location.reload();
    });
    initGhostMode();
}

// ========== INIT ==========
window.onload = async () => {
    if (typeof window.supabase === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        script.onload = async () => {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            await init();
        };
        document.head.appendChild(script);
    } else {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        await init();
    }
};

async function init() {
    const script = document.createElement('script');
    script.src = './modules-list.js';
    script.onload = async () => {
        const sessionData = sessionStorage.getItem('dreamos_session');
        if (sessionData) {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                currentUser = sessionStorage.getItem('dreamos_user');
                currentRole = sessionStorage.getItem('dreamos_role');
                renderApp();
                return;
            }
        }
        const success = await showLoginModal();
        if (success) renderApp();
        else alert('Login gagal');
    };
    document.head.appendChild(script);
}
