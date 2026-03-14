class SovereignShell {
    constructor() { this.ghostCounter = 0; this.init(); }
    init() {
        window.DREAM = this;
        document.getElementById('ghost-trigger-header').onclick = () => this.handleGhostClick();
        setTimeout(() => this.load('home'), 800);
    }
    async load(key) {
        const { default: render } = await import(`./modules/${key}/index.js?v=${Date.now()}`);
        const vp = document.getElementById('root-viewport');
        vp.innerHTML = '';
        await render({ container: vp });
        document.getElementById('system-loader').style.display = 'none';
        document.getElementById('main-nav').style.display = 'flex';
    }
    handleGhostClick() {
        this.ghostCounter++;
        this.haptic(50);
        if(this.ghostCounter >= 5) {
            this.ghostCounter = 0;
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            this.load('ghost'); // Panel Monitoring
        }
    }
    haptic(ms) { if(navigator.vibrate) navigator.vibrate(ms); }
}
new SovereignShell();
