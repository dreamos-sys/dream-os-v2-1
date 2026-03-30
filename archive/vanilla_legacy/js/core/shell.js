// 🐚 DREAM OS SHELL ENGINE v2.1 - MODULAR EDITION
console.log("🐚 Shell.js: JRENG MODE ON!");
const SHELL = {
    init() {
        console.log("🚀 Shell: Initializing...");
        if (typeof renderApp === 'function') renderApp();
    },
    navigate(page) {
        if (typeof loadModuleInModal === 'function') loadModuleInModal(page);
    }
};
window.DREAM = SHELL;
window.onload = () => SHELL.init();
