/* ============================================
   🕌 DREAM OS 2026 - BATTERY MONITOR
   ============================================ */

class BatteryMonitor {
  constructor() {
    this.battery = null;
    this.level = null;
    this.charging = false;
  }

  async init() {
    if ('getBattery' in navigator) {
      this.battery = await navigator.getBattery();
      this.updateBattery();
      this.addListeners();
    }
  }

  updateBattery() {
    this.level = this.battery.level * 100;
    this.charging = this.battery.charging;
    
    const batteryLevel = document.getElementById('battery-level');
    if (batteryLevel) {
      batteryLevel.textContent = `${Math.round(this.level)}%`;
    }
    
    // Enable power saver if low
    if (this.level < 20) {
      document.documentElement.setAttribute('data-performance', 'saver');
    }
  }

  addListeners() {
    this.battery.addEventListener('levelchange', () => this.updateBattery());
    this.battery.addEventListener('chargingchange', () => this.updateBattery());
  }

  getLevel() {
    return this.level;
  }

  isCharging() {
    return this.charging;
  }
}

if (!window.DREAM?.utils) window.DREAM.utils = {};
window.DREAM.utils.battery = new BatteryMonitor();
