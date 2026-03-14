/**
 * DREAM OS KERNEL v13.9.1 - RESILIENT BUILD
 * Perbaikan: Null-check pada DOM Element untuk mencegah kernel crash
 */

const MODULES = {
    'home': 'modules/home/index.js',
    'k3': 'modules/k3/index.js',
    'asset': 'modules/asset/index.js',
    'settings': 'modules/settings/index.js',
    'ghost': 'modules/ghost/brain-hub.js'
};

class SovereignShell {
    constructor() {
        this.ghostCounter = 0;
        this.basePath = window.location.pathname.replace(/\/index\.html$/, "").replace(/\/$/, "");
        this.init();
    }

    init() {
        window.DREAM = this;
        
        // Perbaikan: Pastikan DOM sudah siap sebelum mencari trigger
        document.addEventListener('DOMContentLoaded', () => {
            const trigger = document.getElementById('ghost-trigger-header');
            if (trigger) {
                trigger.onclick = () => this.handleGhostClick();
            } else {
                console.warn("Ghost trigger element not found in DOM");
            }
        });

        // Load Home module dengan sedikit delay agar UI Loader terlihat cantik
        setTimeout(() => this.load('home'), 1000);
    }

    async load(key) {
        try {
            const path = MODULES[key];
            const fullPath = `${this.basePath}/${path}?v=${Date.now()}`;
            
            const { default: renderModule } = await import(fullPath);
            
            const viewport = document.getElementById('root-viewport');
            if (viewport) {
                viewport.innerHTML = '';
                await renderModule({ container: viewport });
                
                // Sembunyikan Loader & Tampilkan Navigasi
                const loader = document.getElementById('system-loader');
                const nav = document.getElementById('main-nav');
                if (loader) loader.style.display = 'none';
                if (nav) nav.style.display = 'flex';
            }
        } catch (err) {
            console.error("Kernel Load Error:", err);
            const loader = document.getElementById('system-loader');
            if (loader) loader.innerHTML = `<div class="p-10 text-red-500">SYSTEM ERROR: ${err.message}</div>`;
        }
    }

    handleGhostClick() {
        this.ghostCounter++;
        this.haptic(50);
        if (this.ghostCounter >= 5) {
            this.ghostCounter = 0;
            this.load('ghost');
        }
    }

    haptic(ms) { if (navigator.vibrate) navigator.vibrate(ms); }
}

new SovereignShell();
