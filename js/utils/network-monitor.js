/* ============================================
   🕌 DREAM OS 2026 - NETWORK MONITOR
   ============================================ */

class NetworkMonitor {
  constructor() {
    this.online = navigator.onLine;
    this.type = 'unknown';
    this.downlink = null;
  }

  init() {
    this.updateNetwork();
    this.addListeners();
  }

  updateNetwork() {
    this.online = navigator.onLine;
    
    if ('connection' in navigator) {
      this.type = navigator.connection.effectiveType || 'unknown';
      this.downlink = navigator.connection.downlink;
    }
    
    this.updateUI();
  }

  updateUI() {
    const networkType = document.getElementById('network-type');
    const networkStatus = document.getElementById('network-status');
    
    if (networkType) {
      networkType.textContent = this.type.toUpperCase();
    }
    
    if (networkStatus) {
      networkStatus.classList.toggle('text-emerald-400', this.online);
      networkStatus.classList.toggle('text-red-400', !this.online);
    }
  }

  addListeners() {
    window.addEventListener('online', () => {
      this.online = true;
      this.updateUI();
      DREAM.showToast('📡 Connection restored', 'success');
    });
    
    window.addEventListener('offline', () => {
      this.online = false;
      this.updateUI();
      DREAM.showToast('📡 You\'re offline', 'warning');
    });
  }

  isOnline() {
    return this.online;
  }

  getSpeed() {
    return this.downlink;
  }
}

DREAM.utils = DREAM.utils || {};
DREAM.utils.network = new NetworkMonitor();
