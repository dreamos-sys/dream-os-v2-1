import './core.js'; 

class SovereignShell {
    constructor() { 
        this.ghostCounter = 0;
        this.init(); 
    }
    
    async init() {
        window.DREAM = this; // Menetapkan global object segera
        
        // Memastikan Ghost Trigger aktif kembali
        const trigger = document.getElementById('ghost-header-trigger');
        if(trigger) {
            trigger.style.pointerEvents = 'auto'; 
            trigger.onclick = () => this.handleGhostClick();
        }

        // Jalankan loader secara paksa jika terjadi error
        try {
            await this.load('home');
        } catch (e) {
            console.error("Critical Boot Error:", e);
            this.forceReveal(); // Jalankan protokol darurat jika stuck
        }
    }

    async load(key) {
        const vp = document.getElementById('root-viewport');
        const loader = document.getElementById('system-loader');
        const nav = document.getElementById('main-nav');

        try {
            const { default: render } = await import(`./modules/${key}/index.js?v=${Date.now()}`);
            vp.innerHTML = '';
            await render({ container: vp, role: 'admin' });
            
            // Tutup loader & tampilkan navigasi
            if(loader) loader.style.opacity = '0';
            setTimeout(() => { 
                if(loader) loader.style.display = 'none';
                if(nav) nav.style.display = 'flex';
            }, 500);

        } catch (err) {
            this.forceReveal();
            throw err;
        }
    }

    forceReveal() {
        document.getElementById('system-loader').style.display = 'none';
        document.getElementById('main-nav').style.display = 'flex';
        document.getElementById('root-viewport').innerHTML = '<p style="color:white; text-align:center; padding-top:50px;">Bismillah, System Restored via Emergency Protocol.</p>';
    }

    handleGhostClick() {
        this.ghostCounter++;
        if(navigator.vibrate) navigator.vibrate(50);
        if(this.ghostCounter >= 5) {
            this.ghostCounter = 0;
            this.load('ghost'); 
        }
    }
}

new SovereignShell();
