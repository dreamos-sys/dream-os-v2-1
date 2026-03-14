/**
 * SOVEREIGN KERNEL v13.6 - FINAL CALIBRATION
 * Fix: Ghost Data Object & Lockdown Logic
 */

const MODULES = {
    'home': { path: './modules/home.js' },
    'k3': { path: './modules/k3.js' },
    'asset': { path: './modules/asset.js' },
    'settings': { path: './modules/settings.js' },
    'ghost': { path: './modules/ghost/brain-hub.js' }
};

class SovereignShell {
    constructor() {
        this.ghostCounter = 0;
        this.failCounter = 0;
        this.ghostTimer = null;
        this.isLocked = false;
        // Data user disesuaikan dengan kebutuhan Brain Hub LUX
        this.currentUser = { 
            name: 'My Bro', 
            email: 'girangati1001@gmail.com', 
            role: 'architect' 
        };
        this.init();
    }

    init() {
        window.DREAM = this;
        this.checkLockdown();
        
        const trigger = document.getElementById('ghost-trigger-header');
        if (trigger) trigger.onclick = () => this.handleGhostClick();
        
        // Auto-boot ke home
        setTimeout(() => this.load('home'), 1500);
    }

    async load(key) {
        if (this.isLocked) {
            this.haptic([50, 50, 50]);
            return;
        }

        this.haptic(40);
        const viewport = document.getElementById('root-viewport');
        const loader = document.getElementById('system-loader');
        const nav = document.getElementById('main-nav');

        try {
            const { default: renderModule } = await import(`${MODULES[key].path}?v=${Date.now()}`);
            viewport.innerHTML = ''; 
            
            // Kirim data user yang lengkap ke modul
            await renderModule({ 
                container: viewport, 
                user: this.currentUser,
                services: {} // Placeholder untuk integrasi masa depan
            });

            if(loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 500);
            }
            nav.style.display = 'flex';
            this.updateNav(key);
        } catch (err) {
            console.error("Antibody Alert: Modul gagal dimuat. Recovery...", err);
            // Jika error, kembali ke home untuk mencegah stuck
            if (key !== 'home') this.load('home');
        }
    }

    handleGhostClick() {
        if (this.isLocked) return;
        
        this.haptic(60);
        this.ghostCounter++;
        
        clearTimeout(this.ghostTimer);
        this.ghostTimer = setTimeout(() => {
            // Jika klik berhenti di angka 1-4, hitung sebagai kegagalan akses (potensi penyusup)
            if (this.ghostCounter > 0 && this.ghostCounter < 5) {
                this.failCounter++;
                console.warn(`[SECURITY] Unauthorized access attempt: ${this.failCounter}/3`);
                if (this.failCounter >= 3) this.activateLockdown();
            }
            this.ghostCounter = 0;
        }, 2000);

        if (this.ghostCounter >= 5) {
            this.ghostCounter = 0;
            this.failCounter = 0;
            console.log("👻 Ghost Architect Verified. Bismillah...");
            this.haptic([100, 50, 100, 50, 100]);
            this.load('ghost');
        }
    }

    activateLockdown() {
        this.isLocked = true;
        const duration = 5 * 60 * 1000; // 5 Menit
        const endTime = Date.now() + duration;
        localStorage.setItem('dreamos_lock', endTime);
        this.checkLockdown();
    }

    checkLockdown() {
        const lockUntil = localStorage.getItem('dreamos_lock');
        const lockdownOverlay = document.getElementById('lockdown-screen');
        const nav = document.getElementById('main-nav');

        if (lockUntil && Date.now() < lockUntil) {
            this.isLocked = true;
            if (lockdownOverlay) lockdownOverlay.style.display = 'flex';
            if (nav) nav.style.opacity = '0.3'; // Visual feedback bahwa nav non-aktif
            setTimeout(() => this.checkLockdown(), 1000);
        } else {
            this.isLocked = false;
            if (lockdownOverlay) lockdownOverlay.style.display = 'none';
            if (nav) nav.style.opacity = '1';
            localStorage.removeItem('dreamos_lock');
        }
    }

    updateNav(key) {
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.remove('active');
            if (el.getAttribute('onclick')?.includes(`'${key}'`)) el.classList.add('active');
        });
    }

    haptic(pattern) {
        if (navigator.vibrate) navigator.vibrate(pattern);
    }
}

new SovereignShell();
