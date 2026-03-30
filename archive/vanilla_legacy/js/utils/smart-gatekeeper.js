/**
 * 🛡️ SMART_GATEKEEPER v12.0
 * Role: Non-Intrusive Security Filter
 * Logic: Passive Monitoring vs Active Threat
 * Bismillah bi idznillah.
 */

export const GateKeeper = {
    // 1. POLA ANCAMAN (SQLi, XSS, Script Injection)
    threatPatterns: [
        /<script/i, /javascript:/i, /onclick/i, /eval\(/i, 
        /UNION SELECT/i, /OR '1'='1'/i, /--/i, /DROP TABLE/i,
        /base64/i, /<iframe/i
    ],

    // 2. MONITORING INPUT SECARA NATIVE
    init: function() {
        console.log("🛡️ GateKeeper Active: Monitoring for anomalies...");
        
        // Listen ke semua input di sistem secara global
        document.addEventListener('input', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                this.analyze(e.target.value);
            }
        });
    },

    // 3. ANALISA: NORMAL VS INJEKSI
    analyze: function(value) {
        // Jika input kosong atau sangat pendek, biarkan (Input Normal)
        if (!value || value.length < 4) return;

        // Cek apakah ada pola ancaman dalam input
        const isThreat = this.threatPatterns.some(pattern => pattern.test(value));

        if (isThreat) {
            console.warn("⚠️ [SYSTEM] Upaya Injeksi Terdeteksi! Menyiapkan Counter-Intelligence...");
            
            // Panggil perlindungan cerdas (Pura-pura pingsan + Shalawat)
            import('./honey-pot.js').then(m => {
                m.HoneyPot.triggerSystemBlackout();
            });
        } 
        // Jika tidak ada pola ancaman, sistem DIAM (Native behavior)
    }
};

// Aktifkan GateKeeper
GateKeeper.init();
