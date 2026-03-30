export default {
    name: 'User Profile',
    icon: '👤',
    version: '3.0.0',
    
    render: async (ctx) => {
        const container = document.getElementById('module-container');
        if (!container) return;
        
        const user = ctx?.user?.name || sessionStorage.getItem('dream_user') || 'GUEST';
        const deviceInfo = await getDeviceInfo();
        const appVersion = '2.1.0';
        const buildDate = '2026-03-29';
        
        container.innerHTML = `
            <div class="profile-container">
                <!-- Header -->
                <div class="profile-header">
                    <div class="profile-avatar" id="profile-avatar">👤</div>
                    <h2 style="margin:16px 0 8px; color:#fff;">${user}</h2>
                    <div class="profile-badge">🔐 ${user.toUpperCase()}</div>
                </div>
                
                <!-- Device Info -->
                <div class="profile-section">
                    <h3 style="color:#10b981; margin-bottom:16px;">📱 Device Information</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">Device</span>
                            <span class="info-value">${deviceInfo.device}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">OS</span>
                            <span class="info-value">${deviceInfo.os}</span>
                        </div>                        <div class="info-item">
                            <span class="info-label">Browser</span>
                            <span class="info-value">${deviceInfo.browser}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Screen</span>
                            <span class="info-value">${deviceInfo.screen}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Battery</span>
                            <span class="info-value" id="profile-battery">--%</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Connection</span>
                            <span class="info-value" id="profile-connection">--</span>
                        </div>
                    </div>
                </div>
                
                <!-- App Info -->
                <div class="profile-section">
                    <h3 style="color:#10b981; margin-bottom:16px;">📦 App Information</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">Version</span>
                            <span class="info-value">${appVersion}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Build</span>
                            <span class="info-value">${buildDate}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Status</span>
                            <span class="info-value" style="color:#10b981;">✅ Active</span>
                        </div>
                    </div>
                </div>
                
                <!-- QR Code -->
                <div class="profile-section">
                    <h3 style="color:#10b981; margin-bottom:16px;">🔳 My QR Code</h3>
                    <div class="qr-container">
                        <div id="profile-qr" style="background:white; padding:20px; border-radius:16px; display:inline-block;">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=DREAM-OS-USER-${encodeURIComponent(user)}" alt="QR Code" style="width:200px; height:200px;">
                        </div>
                        <p style="color:#94a3b8; font-size:12px; margin-top:12px;">Scan to identify user</p>
                        <button onclick="downloadQR()" class="profile-btn" style="margin-top:12px;">
                            📥 Download QR
                        </button>
                    </div>                </div>
                
                <!-- About -->
                <div class="profile-section">
                    <h3 style="color:#10b981; margin-bottom:16px;">ℹ️ About Dream OS</h3>
                    <div class="about-content">
                        <p style="color:#e2e8f0; line-height:1.6; margin-bottom:16px;">
                            <strong>DREAM OS v2.1 PRO</strong> - Enterprise Resource Planning System
                        </p>
                        <p style="color:#94a3b8; font-size:13px; line-height:1.6;">
                            Integrated system for Command Center, Booking, K3, Security, 
                            Janitor (Indoor/Outdoor), Stok, Maintenance, Asset, and Gudang management.
                        </p>
                        <div style="margin-top:16px; padding:12px; background:rgba(16,185,129,0.1); border-radius:12px;">
                            <p style="color:#10b981; font-size:12px; margin:0;">
                                🏆 Dream Team © 2026<br>
                                📧 support@dreamos.sys<br>
                                🌐 dreamos-sys.github.io
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Settings Quick Access -->
                <div class="profile-section">
                    <h3 style="color:#10b981; margin-bottom:16px;">⚙️ Quick Settings</h3>
                    <div class="settings-list">
                        <div class="settings-item" onclick="toggleTheme()">
                            <span class="settings-icon">🌙</span>
                            <span class="settings-label">Dark Mode</span>
                            <span class="settings-toggle" id="theme-toggle">OFF</span>
                        </div>
                        <div class="settings-item" onclick="toggleNotifications()">
                            <span class="settings-icon">🔔</span>
                            <span class="settings-label">Notifications</span>
                            <span class="settings-toggle" id="notif-toggle">ON</span>
                        </div>
                        <div class="settings-item" onclick="clearCache()">
                            <span class="settings-icon">🗑️</span>
                            <span class="settings-label">Clear Cache</span>
                            <span class="settings-icon">→</span>
                        </div>
                    </div>
                </div>
                
                <!-- Logout (Play Store Requirement) -->
                <div class="profile-section" style="margin-bottom:100px;">
                    <button onclick="App.logout()" class="logout-btn">
                        🚪 Logout
                    </button>                    <p style="color:#64748b; font-size:11px; text-align:center; margin-top:12px;">
                        ⚠️ Required by Play Store Policy
                    </p>
                </div>
            </div>
            
            <style>
                .profile-container { max-width: 480px; margin: 0 auto; padding: 20px; padding-bottom: 120px; }
                .profile-header { text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 24px; margin-bottom: 24px; }
                .profile-avatar { width: 100px; height: 100px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 50px; margin: 0 auto; }
                .profile-badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; }
                .profile-section { background: rgba(15,23,42,0.8); border-radius: 20px; padding: 20px; margin-bottom: 20px; }
                .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
                .info-item { background: rgba(0,0,0,0.3); padding: 12px; border-radius: 12px; }
                .info-label { display: block; font-size: 11px; color: #94a3b8; margin-bottom: 4px; }
                .info-value { display: block; font-size: 13px; color: #e2e8f0; font-weight: 600; }
                .qr-container { text-align: center; }
                .about-content { color: #e2e8f0; }
                .settings-list { display: flex; flex-direction: column; gap: 12px; }
                .settings-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 12px; cursor: pointer; }
                .settings-icon { font-size: 20px; }
                .settings-label { flex: 1; font-size: 14px; color: #e2e8f0; }
                .settings-toggle { font-size: 12px; color: #10b981; font-weight: 700; }
                .logout-btn { width: 100%; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; border: none; padding: 16px; border-radius: 16px; font-size: 16px; font-weight: 700; cursor: pointer; }
                .profile-btn { background: #10b981; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; }
            </style>
        `;
        
        // Load device info
        updateDeviceInfo();
    }
};

// Device Info Helper
async function getDeviceInfo() {
    const ua = navigator.userAgent;
    let device = 'Unknown';
    let os = 'Unknown';
    let browser = 'Unknown';
    
    // Detect device
    if (/Android/i.test(ua)) device = 'Android';
    else if (/iPhone/i.test(ua)) device = 'iPhone';
    else if (/iPad/i.test(ua)) device = 'iPad';
    else device = 'Desktop';
    
    // Detect OS
    if (/Android/i.test(ua)) os = 'Android';
    else if (/iOS/i.test(ua)) os = 'iOS';
    else if (/Windows/i.test(ua)) os = 'Windows';    else if (/Mac/i.test(ua)) os = 'macOS';
    
    // Detect browser
    if (/Chrome/i.test(ua)) browser = 'Chrome';
    else if (/Firefox/i.test(ua)) browser = 'Firefox';
    else if (/Safari/i.test(ua)) browser = 'Safari';
    
    return {
        device,
        os,
        browser,
        screen: `${window.screen.width}x${window.screen.height}`
    };
}

// Update device info
async function updateDeviceInfo() {
    // Battery
    if ('getBattery' in navigator) {
        const battery = await navigator.getBattery();
        const batteryEl = document.getElementById('profile-battery');
        if (batteryEl) {
            batteryEl.textContent = Math.round(battery.level * 100) + '%';
            batteryEl.style.color = battery.level < 0.2 ? '#ef4444' : battery.level < 0.5 ? '#f59e0b' : '#10b981';
        }
    }
    
    // Connection
    const connectionEl = document.getElementById('profile-connection');
    if (connectionEl) {
        connectionEl.textContent = navigator.onLine ? '🟢 Online' : '🔴 Offline';
        connectionEl.style.color = navigator.onLine ? '#10b981' : '#ef4444';
    }
}

// Download QR
window.downloadQR = function() {
    const qrImg = document.querySelector('#profile-qr img');
    if (qrImg) {
        const link = document.createElement('a');
        link.download = 'my-qr-code.png';
        link.href = qrImg.src;
        link.click();
    }
};

// Toggle theme
window.toggleTheme = function() {
    document.body.classList.toggle('dark-mode');
    const toggle = document.getElementById('theme-toggle');    if (toggle) toggle.textContent = document.body.classList.contains('dark-mode') ? 'ON' : 'OFF';
};

// Toggle notifications
window.toggleNotifications = function() {
    const toggle = document.getElementById('notif-toggle');
    if (toggle) toggle.textContent = toggle.textContent === 'ON' ? 'OFF' : 'ON';
};

// Clear cache
window.clearCache = function() {
    if (confirm('Clear all cache and data?')) {
        localStorage.clear();
        sessionStorage.clear();
        alert('Cache cleared! Please reload.');
        location.reload();
    }
};
