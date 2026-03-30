export default {
    name: 'Settings',
    icon: '⚙️',
    version: '3.0.0',
    
    render: async (ctx) => {
        const container = document.getElementById('module-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="settings-container">
                <h2 style="color:#10b981; margin-bottom:24px; text-align:center;">⚙️ System Settings</h2>
                
                <!-- Appearance -->
                <div class="settings-section">
                    <h3 style="color:#94a3b8; font-size:12px; margin-bottom:12px; text-transform:uppercase;">🎨 Appearance</h3>
                    <div class="settings-item">
                        <span class="settings-icon">🌙</span>
                        <div class="settings-info">
                            <span class="settings-label">Dark Mode</span>                            <span class="settings-desc">Reduce eye strain</span>
                        </div>
                        <label class="toggle">
                            <input type="checkbox" id="setting-darkmode" onchange="toggleDarkMode()">
                            <span class="slider"></span>
                        </label>
                    </div>
                    <div class="settings-item">
                        <span class="settings-icon">📏</span>
                        <div class="settings-info">
                            <span class="settings-label">Font Size</span>
                            <span class="settings-desc">Adjust text size</span>
                        </div>
                        <select class="settings-select" onchange="changeFontSize(this.value)">
                            <option value="small">Small</option>
                            <option value="medium" selected>Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>
                </div>
                
                <!-- Notifications -->
                <div class="settings-section">
                    <h3 style="color:#94a3b8; font-size:12px; margin-bottom:12px; text-transform:uppercase;">🔔 Notifications</h3>
                    <div class="settings-item">
                        <span class="settings-icon">🔔</span>
                        <div class="settings-info">
                            <span class="settings-label">Push Notifications</span>
                            <span class="settings-desc">Receive alerts</span>
                        </div>
                        <label class="toggle">
                            <input type="checkbox" id="setting-notif" checked onchange="toggleNotifications()">
                            <span class="slider"></span>
                        </label>
                    </div>
                    <div class="settings-item">
                        <span class="settings-icon">🔊</span>
                        <div class="settings-info">
                            <span class="settings-label">Sound Effects</span>
                            <span class="settings-desc">Play sounds</span>
                        </div>
                        <label class="toggle">
                            <input type="checkbox" id="setting-sound" checked onchange="toggleSound()">
                            <span class="slider"></span>
                        </label>
                    </div>
                    <div class="settings-item">
                        <span class="settings-icon">📳</span>
                        <div class="settings-info">
                            <span class="settings-label">Vibration</span>                            <span class="settings-desc">Haptic feedback</span>
                        </div>
                        <label class="toggle">
                            <input type="checkbox" id="setting-vibrate" checked onchange="toggleVibrate()">
                            <span class="slider"></span>
                        </label>
                    </div>
                </div>
                
                <!-- Connectivity -->
                <div class="settings-section">
                    <h3 style="color:#94a3b8; font-size:12px; margin-bottom:12px; text-transform:uppercase;">📡 Connectivity</h3>
                    <div class="settings-item" onclick="openPrinterSetup()">
                        <span class="settings-icon">🖨️</span>
                        <div class="settings-info">
                            <span class="settings-label">WiFi Printer</span>
                            <span class="settings-desc">Connect printer</span>
                        </div>
                        <span class="settings-arrow">→</span>
                    </div>
                    <div class="settings-item" onclick="openTVSetup()">
                        <span class="settings-icon">📺</span>
                        <div class="settings-info">
                            <span class="settings-label">Smart TV</span>
                            <span class="settings-desc">Connect display</span>
                        </div>
                        <span class="settings-arrow">→</span>
                    </div>
                    <div class="settings-item" onclick="openAndroidTVSetup()">
                        <span class="settings-icon">🤖</span>
                        <div class="settings-info">
                            <span class="settings-label">Android TV</span>
                            <span class="settings-desc">Android TV Box</span>
                        </div>
                        <span class="settings-arrow">→</span>
                    </div>
                    <div class="settings-item" onclick="openBluetoothSetup()">
                        <span class="settings-icon">🔵</span>
                        <div class="settings-info">
                            <span class="settings-label">Bluetooth</span>
                            <span class="settings-desc">Pair devices</span>
                        </div>
                        <span class="settings-arrow">→</span>
                    </div>
                </div>
                
                <!-- Data -->
                <div class="settings-section">
                    <h3 style="color:#94a3b8; font-size:12px; margin-bottom:12px; text-transform:uppercase;">💾 Data</h3>
                    <div class="settings-item" onclick="exportData()">                        <span class="settings-icon">📤</span>
                        <div class="settings-info">
                            <span class="settings-label">Export Data</span>
                            <span class="settings-desc">Backup all data</span>
                        </div>
                        <span class="settings-arrow">→</span>
                    </div>
                    <div class="settings-item" onclick="importData()">
                        <span class="settings-icon">📥</span>
                        <div class="settings-info">
                            <span class="settings-label">Import Data</span>
                            <span class="settings-desc">Restore backup</span>
                        </div>
                        <span class="settings-arrow">→</span>
                    </div>
                    <div class="settings-item" onclick="clearCache()">
                        <span class="settings-icon">🗑️</span>
                        <div class="settings-info">
                            <span class="settings-label">Clear Cache</span>
                            <span class="settings-desc">Free up space</span>
                        </div>
                        <span class="settings-arrow">→</span>
                    </div>
                </div>
                
                <!-- About -->
                <div class="settings-section">
                    <h3 style="color:#94a3b8; font-size:12px; margin-bottom:12px; text-transform:uppercase;">ℹ️ About</h3>
                    <div class="settings-item" onclick="openAbout()">
                        <span class="settings-icon">📦</span>
                        <div class="settings-info">
                            <span class="settings-label">App Version</span>
                            <span class="settings-desc">v2.1.0 PRO</span>
                        </div>
                        <span class="settings-arrow">→</span>
                    </div>
                    <div class="settings-item" onclick="openPrivacy()">
                        <span class="settings-icon">🔒</span>
                        <div class="settings-info">
                            <span class="settings-label">Privacy Policy</span>
                            <span class="settings-desc">Read policy</span>
                        </div>
                        <span class="settings-arrow">→</span>
                    </div>
                    <div class="settings-item" onclick="openTerms()">
                        <span class="settings-icon">📋</span>
                        <div class="settings-info">
                            <span class="settings-label">Terms of Service</span>
                            <span class="settings-desc">Read terms</span>
                        </div>                        <span class="settings-arrow">→</span>
                    </div>
                </div>
                
                <!-- Logout -->
                <div class="settings-section" style="margin-bottom:100px;">
                    <button onclick="App.logout()" class="logout-btn">
                        🚪 Logout from All Devices
                    </button>
                    <p style="color:#64748b; font-size:11px; text-align:center; margin-top:12px;">
                        ⚠️ Required by Play Store Policy
                    </p>
                </div>
            </div>
            
            <style>
                .settings-container { max-width: 480px; margin: 0 auto; padding: 20px; padding-bottom: 120px; }
                .settings-section { background: rgba(15,23,42,0.8); border-radius: 20px; padding: 20px; margin-bottom: 20px; }
                .settings-item { display: flex; align-items: center; gap: 12px; padding: 16px; background: rgba(0,0,0,0.3); border-radius: 16px; margin-bottom: 12px; cursor: pointer; }
                .settings-item:last-child { margin-bottom: 0; }
                .settings-icon { font-size: 24px; }
                .settings-info { flex: 1; }
                .settings-label { display: block; font-size: 14px; color: #e2e8f0; font-weight: 600; }
                .settings-desc { display: block; font-size: 12px; color: #94a3b8; margin-top: 2px; }
                .settings-arrow { font-size: 18px; color: #94a3b8; }
                .settings-select { background: rgba(0,0,0,0.3); border: 1px solid #475569; color: #e2e8f0; padding: 8px 12px; border-radius: 8px; }
                .toggle { position: relative; width: 50px; height: 28px; }
                .toggle input { opacity: 0; width: 0; height: 0; }
                .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background: #475569; border-radius: 28px; transition: 0.3s; }
                .slider:before { position: absolute; content: ""; height: 22px; width: 22px; left: 3px; bottom: 3px; background: white; border-radius: 50%; transition: 0.3s; }
                input:checked + .slider { background: #10b981; }
                input:checked + .slider:before { transform: translateX(22px); }
                .logout-btn { width: 100%; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; border: none; padding: 16px; border-radius: 16px; font-size: 16px; font-weight: 700; cursor: pointer; }
            </style>
        `;
        
        // Load saved settings
        loadSettings();
    }
};

// Settings functions
window.toggleDarkMode = function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark_mode', document.body.classList.contains('dark-mode'));
};

window.toggleNotifications = function() {
    const enabled = document.getElementById('setting-notif').checked;
    localStorage.setItem('notifications', enabled);};

window.toggleSound = function() {
    const enabled = document.getElementById('setting-sound').checked;
    localStorage.setItem('sound_effects', enabled);
};

window.toggleVibrate = function() {
    const enabled = document.getElementById('setting-vibrate').checked;
    localStorage.setItem('vibration', enabled);
};

window.changeFontSize = function(size) {
    document.body.style.fontSize = size === 'small' ? '12px' : size === 'large' ? '16px' : '14px';
    localStorage.setItem('font_size', size);
};

window.openPrinterSetup = function() {
    alert('🖨️ WiFi Printer Setup\n\n1. Ensure printer is on same WiFi network\n2. Enter printer IP address\n3. Test connection\n\nComing soon: Full printer integration!');
};

window.openTVSetup = function() {
    alert('📺 Smart TV Setup\n\n1. Ensure TV is on same network\n2. Enter TV IP address\n3. Select display mode\n\nComing soon: Screen mirroring!');
};

window.openAndroidTVSetup = function() {
    alert('🤖 Android TV Setup\n\n1. Install Dream OS TV app\n2. Pair with code\n3. Sync data\n\nComing soon: Android TV companion app!');
};

window.openBluetoothSetup = function() {
    alert('🔵 Bluetooth Setup\n\n1. Enable Bluetooth\n2. Scan for devices\n3. Pair device\n\nComing soon: Bluetooth device support!');
};

window.exportData = function() {
    const data = {
        localStorage: localStorage,
        timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dream-os-backup.json';
    a.click();
    alert('✅ Data exported!');
};

window.importData = function() {
    alert('📥 Import Data\n\nSelect backup file to restore.\n\nComing soon: File picker!');
};
window.clearCache = function() {
    if (confirm('Clear all cache and data?')) {
        localStorage.clear();
        sessionStorage.clear();
        alert('✅ Cache cleared! Reloading...');
        location.reload();
    }
};

window.openAbout = function() {
    alert('📦 Dream OS v2.1.0 PRO\n\nEnterprise Resource Planning\n\n© 2026 Dream Team\nAll rights reserved.');
};

window.openPrivacy = function() {
    alert('🔒 Privacy Policy\n\nYour data is stored locally and encrypted.\nWe do not share data with third parties.\n\nFull policy: dreamos-sys.github.io/privacy');
};

window.openTerms = function() {
    alert('📋 Terms of Service\n\nBy using this app, you agree to our terms.\n\nFull terms: dreamos-sys.github.io/terms');
};

function loadSettings() {
    if (localStorage.getItem('dark_mode') === 'true') {
        document.body.classList.add('dark-mode');
        document.getElementById('setting-darkmode').checked = true;
    }
    if (localStorage.getItem('notifications') === 'false') {
        document.getElementById('setting-notif').checked = false;
    }
    if (localStorage.getItem('sound_effects') === 'false') {
        document.getElementById('setting-sound').checked = false;
    }
    if (localStorage.getItem('vibration') === 'false') {
        document.getElementById('setting-vibrate').checked = false;
    }
}
