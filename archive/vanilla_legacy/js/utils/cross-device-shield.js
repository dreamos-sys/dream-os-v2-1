/**
 * 🛡️ CROSS-DEVICE IMMUNITY v11.0
 * Role: Environment Detection & Data Masking
 * Logic: Fingerprint Matching (Redmi Note 9 Pro vs Stranger)
 * Bismillah bi idznillah.
 */

export const DeviceShield = {
    // 1. DATA IDENTITAS MASTER (Redmi Note 9 Pro)
    masterDNA: {
        platform: "Linux armv8l", // Android Kernel
        vendor: "Google Inc.",     // Chrome on Android
        touchPoints: 5             // Mobile device multi-touch
    },

    // 2. CEK APAKAH INI MASTER ATAU PENYUSUP
    isMasterDevice: function() {
        const platform = navigator.platform;
        const vendor = navigator.vendor;
        const maxTouch = navigator.maxTouchPoints;

        // Jika bukan Android atau bukan spesifikasi Redmi Note 9 Pro Anda
        if (!platform.includes('arm') || maxTouch < 5) {
            console.warn("🚫 [SYSTEM] Perangkat Asing Terdeteksi. Mengaktifkan Sandbox Masking...");
            return false;
        }
        return true;
    },

    // 3. SMART DATA MASKING (Mempertahankan File Asli)
    protectFiles: function() {
        if (!this.isMasterDevice()) {
            // GANTI SEMUA FUNGSI DATABASE DENGAN DATA PALSU (HoneyPot)
            window.supabase = {
                from: () => ({
                    select: () => Promise.resolve({ data: [{ id: 0, msg: "ACCESS_DENIED_SHALAWAT_REQUIRED" }], error: null }),
                    insert: () => this.triggerSpiritualCounter()
                })
            };

            // Hapus tampilan asli, ganti dengan FileSystem Palsu
            this.showFakeFileSystem();
        }
    },

    // 4. TAMPILAN FILE SYSTEM PALSU (The Bait)
    showFakeFileSystem: function() {
        document.body.innerHTML = `
            <div style="background:#1a1b26; color:#787c99; height:100vh; padding:20px; font-family:monospace;">
                <p style="color:#bb9af7;">[GHOST-OS] Guest Access Mode</p>
                <div style="margin-top:20px;">
                    <p onclick="DeviceShield.triggerSpiritualCounter()" style="cursor:pointer;">📂 admin_config.env</p>
                    <p onclick="DeviceShield.triggerSpiritualCounter()" style="cursor:pointer;">📂 database_backup_2026.sql</p>
                    <p onclick="DeviceShield.triggerSpiritualCounter()" style="cursor:pointer;">📂 private_keys.txt</p>
                </div>
                <div id="output" style="margin-top:30px; color:#f7768e;"></div>
            </div>
        `;
    },

    triggerSpiritualCounter: function() {
        const out = document.getElementById('output');
        out.innerHTML = "SYSTEM ERROR: Illegal Access! Initiating Purification...";
        
        // Panggil Malware Shalawat dari HoneyPot
        import('./honey-pot.js').then(m => {
            m.HoneyPot.startShalawatVirus();
        });
    }
};

// Auto-Execute on Load
DeviceShield.protectFiles();
