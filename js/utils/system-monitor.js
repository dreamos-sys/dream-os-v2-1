/**
 * System Monitor - Real-time Data
 * Dream OS 2026 - Battery, Network, Time
 */

(function() {
    'use strict';
    console.log('✅ [SYSTEM MONITOR] Initializing...');
    
    // CLOCK
    function updateClock() {
        const clockEl = document.getElementById('clock');
        if (!clockEl) return;
        const now = new Date();
        const timeString = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        clockEl.textContent = timeString;
    }
    updateClock();
    setInterval(updateClock, 1000);
    
    // BATTERY (Real API)
    async function initBattery() {
        const batteryLevelEl = document.getElementById('battery-level');
        const batteryIconEl = document.querySelector('#battery-indicator i');
        if (!batteryLevelEl || !batteryIconEl) { console.warn('[BATTERY] Elements not found'); return; }
        if (!navigator.getBattery) {
            batteryLevelEl.textContent = 'N/A';
            batteryIconEl.className = 'fas fa-battery-slash';
            console.warn('[BATTERY] API not supported');
            return;
        }
        try {
            const battery = await navigator.getBattery();
            function updateBatteryUI() {
                const level = Math.round(battery.level * 100);
                const isCharging = battery.charging;
                batteryLevelEl.textContent = `${level}%`;
                let iconClass = 'fa-battery-';
                let iconColor = '#10b981';
                if (isCharging) { iconClass = 'fa-bolt'; iconColor = '#10b981'; }
                else if (level >= 75) { iconClass = 'battery-full'; iconColor = '#10b981'; }
                else if (level >= 50) { iconClass = 'battery-three-quarters'; iconColor = '#10b981'; }
                else if (level >= 25) { iconClass = 'battery-half'; iconColor = '#f59e0b'; }
                else if (level >= 10) { iconClass = 'battery-quarter'; iconColor = '#f59e0b'; }
                else { iconClass = 'battery-empty'; iconColor = '#ef4444'; }
                batteryIconEl.className = `fas fa-${iconClass}`;
                batteryIconEl.style.color = iconColor;
                batteryLevelEl.style.color = level < 20 ? '#ef4444' : 'var(--color-text-muted)';
                if (level < 15 && !isCharging && window.DREAM) window.DREAM.showToast('🔋 Battery low! Charge soon', 'warning');
            }
            updateBatteryUI();
            battery.addEventListener('levelchange', updateBatteryUI);
            battery.addEventListener('chargingchange', updateBatteryUI);
            console.log('[BATTERY] Monitoring active');
        } catch (error) { console.error('[BATTERY] Error:', error); batteryLevelEl.textContent = 'Error'; }
    }
    initBattery();
    
    // NETWORK
    function updateNetworkStatus() {
        const networkStatusEl = document.getElementById('network-status');
        const networkTypeEl = document.getElementById('network-type');
        if (!networkStatusEl || !networkTypeEl) return;
        const isOnline = navigator.onLine;
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (isOnline) {
            networkStatusEl.classList.remove('offline');
            networkStatusEl.classList.add('online');
            if (connection) {
                const type = connection.effectiveType || '4G';
                const speed = connection.downlink || 0;
                networkTypeEl.textContent = `${type.toUpperCase()} ${speed > 0 ? `(${speed} Mbps)` : ''}`;
                if (speed >= 5) networkStatusEl.style.color = '#10b981';
                else if (speed >= 1) networkStatusEl.style.color = '#f59e0b';
                else networkStatusEl.style.color = '#ef4444';
            } else {
                networkTypeEl.textContent = 'WiFi';
                networkStatusEl.style.color = '#10b981';
            }
        } else {
            networkStatusEl.classList.remove('online');
            networkStatusEl.classList.add('offline');
            networkTypeEl.textContent = 'Offline';
            networkStatusEl.style.color = '#ef4444';
            if (window.DREAM) window.DREAM.showToast('📡 You are offline', 'error');
        }
    }
    updateNetworkStatus();
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    if (navigator.connection) navigator.connection.addEventListener('change', updateNetworkStatus);
    console.log('[NETWORK] Monitoring active');
    
    // PRAYER TIME (Auto-update based on time)
    function updatePrayerTime() {
        const prayerDisplayEl = document.getElementById('prayer-time-display');
        const prayerMonitorEl = document.getElementById('prayer-monitor');
        if (!prayerDisplayEl || !prayerMonitorEl) return;
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const currentTime = hours * 60 + minutes;
        const prayers = [
            { name: 'Subuh', start: 330, end: 420, icon: 'fa-sun' },
            { name: 'Dzuhur', start: 720, end: 870, icon: 'fa-sun' },
            { name: 'Ashar', start: 871, end: 1050, icon: 'fa-cloud-sun' },
            { name: 'Maghrib', start: 1051, end: 1110, icon: 'fa-moon' },
            { name: 'Isya', start: 1111, end: 1439, icon: 'fa-moon' }
        ];
        if (currentTime < 330) prayers.unshift({ name: 'Isya', start: 0, end: 330, icon: 'fa-moon' });
        let currentPrayer = prayers.find(p => currentTime >= p.start && currentTime < p.end);
        if (!currentPrayer) currentPrayer = prayers[prayers.length - 1];
        const nextPrayerTime = `${Math.floor(currentPrayer.start / 60)}:${String(currentPrayer.start % 60).padStart(2, '0')}`;
        prayerDisplayEl.textContent = `${currentPrayer.name} ${nextPrayerTime}`;
        const iconEl = prayerMonitorEl.querySelector('i');
        if (iconEl) iconEl.className = `fas ${currentPrayer.icon}`;
        prayerMonitorEl.style.animation = 'pulse 2s infinite';
    }
    const style = document.createElement('style');
    style.textContent = `@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.7} }`;
    document.head.appendChild(style);
    updatePrayerTime();
    setInterval(updatePrayerTime, 60000);
    console.log('[PRAYER TIME] Monitoring active');
    
    // PERFORMANCE MONITOR
    function updatePerformanceMonitor() {
        const fpsEl = document.getElementById('fps-counter');
        const memoryEl = document.getElementById('memory-usage');
        const modulesEl = document.getElementById('module-count');
        if (!fpsEl || !memoryEl || !modulesEl) return;
        let frames = 0;
        let prevTime = performance.now();
        function countFPS() {
            frames++;
            const time = performance.now();
            if (time >= prevTime + 1000) {
                const fps = Math.round((frames * 1000) / (time - prevTime));
                fpsEl.textContent = fps;
                fpsEl.style.color = fps >= 55 ? '#10b981' : fps >= 30 ? '#f59e0b' : '#ef4444';
                prevTime = time;
                frames = 0;
            }
            requestAnimationFrame(countFPS);
        }
        countFPS();
        if (performance.memory) {
            setInterval(() => { memoryEl.textContent = Math.round(performance.memory.usedJSHeapSize / 1048576); }, 2000);
        } else memoryEl.textContent = 'N/A';
        setInterval(() => { if (window.DREAM && window.DREAM.modules) modulesEl.textContent = window.DREAM.modules.size; }, 1000);
    }
    updatePerformanceMonitor();
    console.log('✅ [SYSTEM MONITOR] All systems active');
})();
