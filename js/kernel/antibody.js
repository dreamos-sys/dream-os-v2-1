/**
 * js/kernel/antibody.js
 * Immunity System - Ghost Architect Only
 * Sovereign Edition v2.1
 */
class DreamImmunity {
    constructor() {
        this.threatVault = [];
        this.isShadowMode = false;
        this.initBypass();
        this.initWatchdog();
        window.DREAM_SYS?.log('success', 'Immunity Kernel Initialized.');
    }

    // 1. Ghost Bypass: Independen & Tidak Tergantung Header DOM
    initBypass() {
        let taps = 0, tapTimer;
        // Deteksi tap di area manapun (Global Capture)
        document.addEventListener('click', (e) => {
            // Kita gunakan area atas layar (Ghost Zone) sebagai trigger utama
            if (e.clientY > 100) return; 
            
            taps++;
            window.DREAM_SYS?.haptic(40);
            clearTimeout(tapTimer);
            
            if (taps === 5) {
                const pwd = prompt('👻 Ghost Recovery Access:');
                if (pwd === 'dreamos2026') this.launchAnalysis();
                taps = 0;
            }
            tapTimer = setTimeout(() => taps = 0, 1500);
        });
    }

    // 2. Watchdog: Mendeteksi Crash/Virus Secara Mandiri
    initWatchdog() {
        // Asimilasi error sistem secara global
        window.onerror = (msg, url, line) => {
            this.absorbThreat({ msg, url, line, type: 'RUNTIME_ERR' });
            return true; // Shadow Band: Cegah user melihat crash
        };

        // Heuristic: Cek injeksi script eksternal
        setInterval(() => {
            if (document.querySelector('script[src*="malware"]')) {
                this.absorbThreat({ type: 'INJECTION_ATTEMPT', detail: 'Malicious Script Found' });
            }
        }, 5000);
    }

    // 3. Virus Assimilation (Makan Virus Jadi Antibodi)
    absorbThreat(error) {
        this.threatVault.push({ time: new Date().toISOString(), detail: error });
        this.isShadowMode = true;
        
        // Shadow Banding: Mengalihkan aktivitas ke sandbox
        window.DREAM_SYS?.log('warn', 'Virus absorbed. Shadow Mode Active.');
        
        // Haptic alert: Getaran pendek-panjang-pendek
        window.DREAM_SYS?.haptic([50, 100, 50]);
    }

    // 4. Matrix Analysis Dashboard (Independent Overlay)
    launchAnalysis() {
        const overlay = document.createElement('div');
        overlay.id = 'ghost-analysis-overlay';
        overlay.style = `
            position: fixed; inset: 0; z-index: 999999;
            background: #020617; color: #10b981; font-family: 'JetBrains Mono', monospace;
            padding: 20px; overflow-y: auto; box-sizing: border-box;
        `;
        
        overlay.innerHTML = `
            <div style="border-bottom: 1px solid #10b98144; padding-bottom: 10px; margin-bottom: 20px;">
                <h2 style="margin:0;">GHOST_ANALYSIS_DASHBOARD</h2>
                <p style="font-size: 10px; opacity: 0.6;">Sovereign System Status: ${this.isShadowMode ? 'SHADOW_MODE_ACTIVE' : 'SYSTEM_STABLE'}</p>
            </div>
            <div id="logs" style="font-size: 11px; white-space: pre-wrap;">
                > Antibodies Created: ${this.threatVault.length}
                > Last Threat: ${this.threatVault.length > 0 ? JSON.stringify(this.threatVault[this.threatVault.length - 1].detail) : 'NONE'}
            </div>
            <div style="margin-top: 30px;">
                <button onclick="location.reload()" style="background:#10b981; color:#020617; padding:10px; border:none; border-radius:5px; cursor:pointer;">REBOOT_KERNEL</button>
                <button onclick="document.getElementById('ghost-analysis-overlay').remove()" style="background:transparent; color:#ef4444; border:1px solid #ef4444; padding:10px; margin-left:10px; cursor:pointer;">EXIT_STEALTH</button>
            </div>
        `;
        document.body.appendChild(overlay);
    }
}

// Inisialisasi otomatis sebagai "Sistem Imun" pertama
const GhostAntibody = new DreamImmunity();
