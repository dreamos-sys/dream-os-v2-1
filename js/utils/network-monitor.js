// js/utils/network-monitor.js
class NetworkMonitor {
    constructor() {
        this.type = '4G';
        this.online = navigator.onLine;
    }
    init() {
        this.updateNetwork();
        window.addEventListener('online', () => this.updateNetwork());
        window.addEventListener('offline', () => this.updateNetwork());
        if (navigator.connection) {
            navigator.connection.addEventListener('change', () => this.updateNetwork());
        }
    }
    updateNetwork() {
        this.online = navigator.onLine;
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        this.type = connection?.effectiveType?.toUpperCase() || (navigator.onLine ? 'WiFi' : 'Offline');
        
        const networkType = document.getElementById('network-type');
        if (networkType) networkType.textContent = this.type;
        
        // Update DREAM state
        if (window.DREAM?.state) {
            window.DREAM.state.networkStatus = this.online;
        }
    }
}

// Inisialisasi otomatis
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.DREAM?.utils) window.DREAM.utils = {};
        window.DREAM.utils.network = new NetworkMonitor();
        window.DREAM.utils.network.init();
    });
} else {
    if (!window.DREAM?.utils) window.DREAM.utils = {};
    window.DREAM.utils.network = new NetworkMonitor();
    window.DREAM.utils.network.init();
}
