/**
 * DREAM OS v2.1 - SOVEREIGN SHELL
 * Integrated: Security, Slider, Nav, AI Core
 */

class DreamKernel {
    constructor() {
        this.state = {
            isAuth: sessionStorage.getItem('dream_auth_v2.1') === 'true',
            masterKey: '012443410', 
            idleSeconds: 0,
            maxIdle: 120 
        };
        // 7 Slides Data
        this.slides = [
            { title: "🕌 Spiritual Core", content: "Bismillah bi idznillah.\nSistem beroperasi dengan keberkahan." },
            { title: "🛡️ Security Status", content: "ISO 27001 Active.\nNo threats detected." },
            { title: "📅 Today's Agenda", content: "Rapat Koordinasi: 13:00\nCek Lapangan: 15:00" },
            { title: "⚠️ K3 Alert", content: "Area Gudang B: Aman\nPerlu inspeksi rutin." },
            { title: "📦 Asset Health", content: "98% Aset Terawat.\nJadwal maintenance besok." },
            { title: "🌤️ Weather", content: "Depok: Cerah Berawan\nSuhu: 32°C" },
            { title: "💡 Quote of Day", content: "'Keamanan adalah pondasi,\nSpiritualitas adalah atap.'" }
        ];
        this.currentSlide = 0;
        this.init();
    }

    init() {
        if (document.readyState === 'complete') { this.renderUI(); }
        else { window.addEventListener('load', () => this.renderUI()); }
        this.setupGlobalIdle();
        this.startSlider(); 
    }

    setupGlobalIdle() {
        const reset = () => { this.state.idleSeconds = 0; };
        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'].forEach(e => document.addEventListener(e, reset, true));
        setInterval(() => {
            if (this.state.isAuth) {
                this.state.idleSeconds++;
                if (this.state.idleSeconds >= this.state.maxIdle) this.terminateSession("GLOBAL IDLE DETECTION: Sesi diputus otomatis demi keamanan.");
            }
        }, 1000);
    }

    startSlider() {
        setInterval(() => {
            if (!this.state.isAuth) return;
            const slideEl = document.getElementById('smart-slide-content');            if (slideEl) {
                this.currentSlide = (this.currentSlide + 1) % this.slides.length;
                const s = this.slides[this.currentSlide];
                slideEl.style.opacity = 0;
                setTimeout(() => {
                    slideEl.innerHTML = `<h3 style="color:#10b981; margin:0 0 10px 0;">${s.title}</h3><p style="color:#cbd5e1; line-height:1.6; white-space:pre-line;">${s.content}</p>`;
                    slideEl.style.opacity = 1;
                }, 300);
            }
        }, 7000); // 7 Detik
    }

    terminateSession(reason) {
        sessionStorage.clear();
        alert(`⚠️ ${reason}`);
        location.reload();
    }

    renderUI() {
        this.state.isAuth ? this.boot() : this.renderLogin();
    }

    renderLogin() {
        const shell = document.getElementById('app-shell');
        shell.innerHTML = `
            <div style="min-height: 100vh; background: #000; display: flex; align-items: center; justify-content: center; font-family: sans-serif;">
                <div style="width: 320px; text-align: center; border: 1px solid #333; padding: 40px; border-radius: 40px; background: rgba(10,10,10,0.8); backdrop-filter: blur(20px); box-shadow: 0 0 50px rgba(167, 139, 250, 0.1);">
                    <img src="./icons/icon-192.png" alt="Logo" style="width: 70px; height: 70px; border-radius: 20px; margin-bottom: 20px; box-shadow: 0 0 20px rgba(167, 139, 250, 0.3);">
                    <h1 style="color: #fff; font-size: 16px; letter-spacing: 4px; margin-bottom: 10px; font-weight: 800;">AI CORE v2.1</h1>
                    <p style="color: #666; font-size: 10px; margin-bottom: 30px;">SOVEREIGN ACCESS TERMINAL</p>
                    
                    <div style="position: relative; width: 100%; margin-bottom: 25px;">
                        <input type="password" id="pin" inputmode="numeric" placeholder="Enter Master Key" 
                            style="width: 100%; background: #111; border: 1px solid #333; padding: 15px 45px 15px 20px; border-radius: 15px; color: #fff; text-align: center; font-size: 20px; letter-spacing: 5px; outline: none; transition: border-color 0.3s; box-sizing: border-box;">
                        
                        <i class="fas fa-eye" id="toggle-pin" 
                            onclick="const i=document.getElementById('pin'), t=document.getElementById('toggle-pin'); if(i.type==='password'){i.type='text'; t.classList.remove('fa-eye'); t.classList.add('fa-eye-slash'); t.style.color='#a78bfa';} else {i.type='password'; t.classList.remove('fa-eye-slash'); t.classList.add('fa-eye'); t.style.color='#666';}"
                            style="position: absolute; right: 15px; top: 50%; transform: translateY(-50%); color: #666; cursor: pointer; font-size: 18px; transition: color 0.3s;">
                        </i>
                    </div>

                    <button id="go" style="width: 100%; background: linear-gradient(135deg, #a78bfa, #7c3aed); color: #fff; padding: 15px; border-radius: 15px; font-weight: 900; cursor: pointer; border: none; font-size: 14px; letter-spacing: 2px; box-shadow: 0 5px 20px rgba(124, 58, 237, 0.4); transition: transform 0.2s;">
                        INITIALIZE SYSTEM
                    </button>
                    
                    <p style="color:#444; font-size:9px; margin-top:25px;">SECURED BY DREAM TEAM SYSTEM • ISO 27001</p>
                </div>
            </div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        `;
        document.getElementById('go').onclick = () => {
            const pinInput = document.getElementById('pin');
            if(pinInput.value === this.state.masterKey) {
                const btn = document.getElementById('go');
                btn.innerHTML = "✅ ACCESS GRANTED";
                btn.style.background = "#10b981";
                sessionStorage.setItem('dream_auth_v2.1', 'true');
                setTimeout(() => location.reload(), 800);
            } else {
                pinInput.style.borderColor = "#ef4444";
                pinInput.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-10px)' }, { transform: 'translateX(10px)' }, { transform: 'translateX(0)' }], { duration: 300 });
                alert('🔴 ACCESS DENIED: Invalid Master Key');
                pinInput.value = '';
                pinInput.focus();
            }
        };
        setTimeout(() => document.getElementById('pin').focus(), 100);
    }

    boot() {
        const shell = document.getElementById('app-shell');
        shell.innerHTML = `
            <header style="text-align:center; padding: 20px; background: linear-gradient(180deg, rgba(16,185,129,0.1), transparent);">
                <p style="font-family:'Amiri', serif; color:#10b981; font-size:18px; margin:0;">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                <p style="font-family:'Amiri', serif; color:#34d399; font-size:14px; margin:5px 0 0 0;">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</p>
            </header>

            <div style="margin: 15px; background: rgba(30,41,59,0.5); border: 1px solid #333; border-radius: 15px; padding: 20px; min-height: 100px; display:flex; align-items:center; justify-content:center; transition: opacity 0.3s;" id="smart-slide-container">
                <div id="smart-slide-content" style="transition: opacity 0.3s;"></div>
            </div>

            <div id="main-content" style="padding: 15px; padding-bottom: 100px;"></div>

            <nav style="position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: rgba(20,20,20,0.95); border: 1px solid #333; padding: 12px 25px; border-radius: 30px; display: flex; gap: 30px; backdrop-filter: blur(10px); z-index: 1000; box-shadow: 0 10px 30px rgba(0,0,0,0.8);">
                <div onclick="DREAM.navigate('home')" style="cursor:pointer; display:flex; flex-direction:column; align-items:center; color:#a78bfa;">
                    <i class="fas fa-brain" style="font-size: 20px; margin-bottom:4px;"></i>
                    <span style="font-size:9px; font-weight:700;">HOME</span>
                </div>
                <div onclick="DREAM.navigate('profile')" style="cursor:pointer; display:flex; flex-direction:column; align-items:center; color:#64748b;">
                    <i class="fas fa-user" style="font-size: 20px; margin-bottom:4px;"></i>
                    <span style="font-size:9px; font-weight:700;">PROFILE</span>
                </div>
                <div onclick="DREAM.navigate('qr')" style="cursor:pointer; display:flex; flex-direction:column; align-items:center; color:#64748b;">
                    <i class="fas fa-qrcode" style="font-size: 20px; margin-bottom:4px;"></i>
                    <span style="font-size:9px; font-weight:700;">QR SCAN</span>
                </div>
                <div onclick="DREAM.navigate('about')" style="cursor:pointer; display:flex; flex-direction:column; align-items:center; color:#64748b;">
                    <i class="fas fa-info-circle" style="font-size: 20px; margin-bottom:4px;"></i>
                    <span style="font-size:9px; font-weight:700;">ABOUT</span>                </div>
                <div onclick="DREAM.navigate('settings')" style="cursor:pointer; display:flex; flex-direction:column; align-items:center; color:#64748b;">
                    <i class="fas fa-cog" style="font-size: 20px; margin-bottom:4px;"></i>
                    <span style="font-size:9px; font-weight:700;">SETTINGS</span>
                </div>
            </nav>
            
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap" rel="stylesheet">
        `;
        
        window.DREAM = { navigate: (id) => this.navigate(id) };
        this.navigate('home');
    }

    async navigate(id) {
        const shell = document.getElementById('main-content');
        try {
            const mod = await import(`./modules/${id}/module.js?v=${Date.now()}`);
            shell.innerHTML = await mod.default.render({ user: 'Master M', navigate: this.navigate.bind(this) });
            if (mod.default.afterRender) mod.default.afterRender({ user: 'Master M', navigate: this.navigate.bind(this) });
        } catch(e) { 
            console.error(e);
            shell.innerHTML = `<div style="color:#ef4444; padding:50px; text-align:center;"><i class="fas fa-triangle-exclamation" style="font-size:40px; margin-bottom:20px;"></i><br>Module '${id}' Sync Failed.<br><small>${e.message}</small></div>`; 
        }
    }
}

new DreamKernel();
