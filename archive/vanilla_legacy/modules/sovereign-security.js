export const SovereignSecurity = {
    getDynamicKey: function() {
        const now = new Date();
        const HH = String(now.getHours()).padStart(2, '0');
        let RR = "04"; 
        const hour = now.getHours();
        if (hour >= 4 && hour < 6) RR = "02"; 
        else if (hour >= 18 && hour < 19) RR = "03";
        else if (hour >= 1 && hour < 4) RR = "02"; // Tahajud Logic
        return `dreamos2026${HH}${RR}`;
    },
    validate: function(key) {
        const target = this.getDynamicKey();
        const success = key === target;
        this.logAccess(success ? 'SUCCESS' : 'FAILED', key);
        return success;
    },
    getCurrentPrayer: function() {
        const h = new Date().getHours();
        if (h >= 1 && h < 4) return { name: "Tahajud", rakaat: "02" };
        if (h >= 4 && h < 6) return { name: "Subuh", rakaat: "02" };
        if (h >= 18 && h < 19) return { name: "Maghrib", rakaat: "03" };
        return { name: "Isya/Umum", rakaat: "04" };
    },
    logAccess: function(status, key) {
        let logs = JSON.parse(localStorage.getItem('GHOST_LOGS')) || [];
        logs.unshift({ ts: new Date().toISOString(), status, type: 'AUTH' });
        localStorage.setItem('GHOST_LOGS', JSON.stringify(logs.slice(0, 50)));
    },
    getAccessLogs: () => JSON.parse(localStorage.getItem('GHOST_LOGS')) || []
};
export default SovereignSecurity;
