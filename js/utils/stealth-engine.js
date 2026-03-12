/**
 * stealth-engine.js
 * Dream OS v2.1 – Stealth Engine (Panic Mode)
 * Mengubah tampilan menjadi kalkulator biasa saat situasi darurat.
 * Fitur: Ghost Protocol, Duress Code, Auto-Restore.
 */

(function() {
    'use strict';

    class StealthEngine {
        constructor() {
            this.isActive = false;
            this.originalHTML = null;
        }

        // Aktifkan mode panic – ubah seluruh halaman menjadi kalkulator
        activatePanicMode() {
            if (this.isActive) return;
            console.warn('👻 [STEALTH] Panic mode activated!');
            // Simpan konten asli
            this.originalHTML = document.body.innerHTML;
            this.isActive = true;

            // Beri haptic feedback (getar panjang)
            if (window.DREAM_SYS?.haptic) {
                window.DREAM_SYS.haptic([1000, 500, 1000]);
            } else if (navigator.vibrate) {
                navigator.vibrate([1000, 500, 1000]);
            }

            // Ubah tampilan menjadi kalkulator
            document.body.innerHTML = `
                <div style="height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#000; color:#fff; font-family:monospace;">
                    <h1 style="font-size:3rem; margin-bottom:2rem;">CALCULATOR</h1>
                    <div style="width:90%; max-width:400px; background:#111; border-radius:20px; padding:20px;">
                        <input type="text" id="calc-display" readonly value="0" style="width:100%; padding:15px; font-size:2rem; background:#222; color:#0f0; border:none; border-radius:10px; margin-bottom:10px; text-align:right;">
                        <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:5px;">
                            ${['7','8','9','/','4','5','6','*','1','2','3','-','C','0','=','+'].map(btn => 
                                `<button onclick="document.getElementById('calc-display').value += '${btn}'" style="padding:15px; background:#333; color:white; border:none; border-radius:5px; font-size:1.2rem;">${btn}</button>`
                            ).join('')}
                        </div>
                        <p style="margin-top:20px; color:#555; text-align:center;">System Locked in Stealth Mode</p>
                        <button onclick="StealthEngine.restoreFromPanic()" style="margin-top:20px; background:#444; color:white; border:none; padding:10px; width:100%; border-radius:5px;">Restore</button>
                    </div>
                </div>
            `;

            // Catat ke GhostAudit
            if (window.GhostAudit) {
                window.GhostAudit.record(
                    window.DREAM?.state?.user?.email || 'system',
                    'PANIC_MODE_ACTIVATED',
                    'Stealth engine engaged'
                );
            }
        }

        // Kembalikan tampilan normal
        restoreFromPanic() {
            if (!this.isActive) return;
            document.body.innerHTML = this.originalHTML;
            this.isActive = false;
            console.log('✅ [STEALTH] Restored to normal mode.');
            // Re-init shell? Karena DOM diubah total, kita perlu memuat ulang shell.
            // Cara terbaik: reload halaman
            location.reload();
        }

        // Cek apakah dalam mode panic
        isPanicActive() {
            return this.isActive;
        }

        // Duress code: jika password tertentu dimasukkan di prompt ghost, aktifkan panic
        setupDuressCode() {
            // Nanti di ghost activation kita bisa cek
        }
    }

    window.StealthEngine = new StealthEngine();
})();
