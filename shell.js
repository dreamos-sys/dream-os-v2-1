const MODULES = {
    'home': 'modules/home/index.js',
    'ghost': 'modules/ghost/brain-hub.js'
};

class SovereignShell {
    constructor() {
        this.ghostCounter = 0;
        this.init();
    }
    init() {
        window.DREAM = this;
        const trigger = document.getElementById('ghost-trigger-header');
        if(trigger) trigger.onclick = () => this.handleGhostClick();
        setTimeout(() => this.load('home'), 1000);
    }
    async load(key) {
        try {
            const { default: render } = await import(`./${MODULES[key]}?v=${Date.now()}`);
            const vp = document.getElementById('root-viewport');
            vp.innerHTML = '';
            await render({ container: vp });
            document.getElementById('system-loader').style.display = 'none';
            document.getElementById('main-nav').style.display = 'flex';
        } catch(e) { console.error(e); }
    }
    handleGhostClick() {
        this.ghostCounter++;
        if(this.ghostCounter >= 5) { this.ghostCounter = 0; this.load('ghost'); }
    }
    haptic(ms) { if(navigator.vibrate) navigator.vibrate(ms); }
}
new SovereignShell();
