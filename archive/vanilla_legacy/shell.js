/**
 * 🧬 DREAM OS - SHELL
 * Main entry point
 */
console.log('🧬 Dream OS Shell Loaded');

// Global error handler
window.addEventListener('error', (e) => {
    console.error('❌ Global Error:', e.message);
});

// Check if app.js loaded
if (!window.App) {
    console.warn('⚠️ App not loaded, loading...');
    const script = document.createElement('script');
    script.src = './js/app.js';
    document.head.appendChild(script);
}
