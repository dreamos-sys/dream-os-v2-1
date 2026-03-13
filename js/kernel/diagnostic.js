/**
 * Auto-Diagnostic System
 * Memeriksa integritas modul inti saat startup
 */
(function() {
    const requiredModules = [
        { name: 'SovereignKernel', path: './js/kernel/sovereign-kernel.js', global: 'Sovereign' },
        { name: 'BrainHub', path: './js/kernel/brain-hub.js', global: 'BrainHub' },
        { name: 'Antibody', path: './js/kernel/antibody.js', global: 'Antibody' }
    ];

    console.log('[DIAGNOSTIC] 🔍 Running system integrity check...');

    requiredModules.forEach(module => {
        if (!window[module.global]) {
            console.warn(`[DIAGNOSTIC] ⚠️ ${module.name} not loaded. Attempting fallback...`);
            // Coba load ulang dengan dynamic import
            import(module.path).catch(err => {
                console.error(`[DIAGNOSTIC] ❌ Failed to load ${module.name}:`, err);
            });
        } else {
            console.log(`[DIAGNOSTIC] ✅ ${module.name} OK`);
        }
    });
})();
