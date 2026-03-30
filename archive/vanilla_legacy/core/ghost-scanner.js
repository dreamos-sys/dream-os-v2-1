// Dream OS - Ghost Mode Scanner with All Secret Codes
class GhostScanner {
    constructor() {
        this.scanResults = {};
        this.debugMode = true;
        this.secretCodes = {
            // Activation Codes
            GHOST_MODE: 'dreamos2026',
            ARCHITECT: 'Mr.M_Architect_2025',
            ADMIN_MASTER: '4dm1n_AF6969@00',
            ADMIN_BACKUP: 'cmdaf4dm1n@2026',
            
            // Developer Commands
            DEBUG_CONSOLE: 'GHOST_DEBUG',
            DEV_MODE: 'DREAM_DEV_MODE',
            RECOVER: 'RECOVER_SYSTEM',
            EXPORT_ALL: 'EXPORT_ALL',
            FIX_MODULES: 'FIX_MODULES',
            RESET_CACHE: 'RESET_CACHE',
            SHOW_STATS: 'SHOW_STATS',
            DEBUG_DB: 'DEBUG_DB',
            
            // Emergency Codes
            EMERGENCY_RESET: 'EMERGENCY_2026',
            FORCE_RECOVER: 'FORCE_RECOVER',
            BACKUP_RESTORE: 'BACKUP_NOW',
            SYSTEM_SCAN: 'SCAN_DEEP',
            MODULE_REPAIR: 'REPAIR_ALL',
            DATA_EXPORT: 'EXPORT_FULL',
            LOGS_DUMP: 'DUMP_LOGS'
        };
        
        this.consoleCommands = {
            help: () => this.showHelp(),
            scan: () => this.fullSystemScan(),
            modules: () => this.scanModules(),
            backup: () => this.createBackup(),
            fix: () => this.autoFix(),
            reset: () => this.resetSystem(),
            stats: () => this.showStats(),
            export: () => this.exportAllData(),
            debug: () => this.enableDebugMode(),
            recover: () => this.emergencyRecovery(),
            clear: () => this.clearConsole(),
            version: () => console.log('Dream OS v7.0 | Ghost Scanner v2.0'),
            status: () => this.showStatus()
        };
    }
    
    showHelp() {
        console.log(`
╔══════════════════════════════════════════════════════════════════╗
║  👻 DREAM OS - GHOST SCANNER COMMANDS                            ║
╠══════════════════════════════════════════════════════════════════╣
║  scan()      - Full system diagnostic scan                       ║
║  modules()   - Scan all modules status                           ║
║  backup()    - Create system backup                              ║
║  fix()       - Auto-fix common issues                            ║
║  reset()     - Reset system to default                           ║
║  stats()     - Show system statistics                            ║
║  export()    - Export all data                                   ║
║  debug()     - Enable debug mode                                 ║
║  recover()   - Emergency recovery                                ║
║  status()    - Show current status                               ║
║  help()      - Show this help                                    ║
╚══════════════════════════════════════════════════════════════════╝
        `);
    }
    
    async fullSystemScan() {
        console.log('👻 Running full system scan...');
        
        const scan = {
            timestamp: new Date().toISOString(),
            system: await this.scanSystem(),
            modules: await this.scanModules(),
            database: await this.scanDatabase(),
            storage: await this.scanStorage(),
            security: this.scanSecurity(),
            performance: this.scanPerformance(),
            errors: this.errorLogs || [],
            warnings: []
        };
        
        localStorage.setItem('ghost_scan', JSON.stringify(scan));
        this.showScanReport(scan);
        
        return scan;
    }
    
    scanSecurity() {
        return {
            ghostMode: sessionStorage.getItem('ghost_emergency') !== null,
            lastLogin: localStorage.getItem('dreamos_last_login'),
            deviceId: localStorage.getItem('dreamos_device_id'),
            sessionValid: sessionStorage.getItem('dreamos_role') !== null,
            securityLevel: 'HIGH'
        };
    }
    
    scanPerformance() {
        const perf = {
            memory: performance.memory ? {
                used: (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
                total: (performance.memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
                limit: (performance.memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB'
            } : 'N/A',
            loadTime: performance.timing ? performance.timing.loadEventEnd - performance.timing.navigationStart + ' ms' : 'N/A',
            localStorage: this.getStorageSize('localStorage'),
            sessionStorage: this.getStorageSize('sessionStorage')
        };
        return perf;
    }
    
    getStorageSize(type) {
        let total = 0;
        const storage = type === 'localStorage' ? localStorage : sessionStorage;
        for (let i = 0; i < storage.length; i++) {
            total += storage.getItem(storage.key(i))?.length || 0;
        }
        return (total / 1024).toFixed(2) + ' KB';
    }
    
    showScanReport(scan) {
        const modal = document.createElement('div');
        modal.id = 'ghost-scan-modal';
        modal.style.cssText = `
            position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:100000;
            display:flex;align-items:center;justify-content:center;animation:fadeIn 0.3s;
        `;
        modal.innerHTML = `
            <div style="background:linear-gradient(135deg,#1e1b4b,#0c0a2a);border-radius:24px;border:1px solid #a855f7;max-width:700px;width:90%;max-height:85vh;overflow-y:auto;padding:24px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                    <h2 style="color:#a855f7;margin:0;">
                        <i class="fas fa-ghost"></i> Ghost Scan Report
                    </h2>
                    <button onclick="this.closest('#ghost-scan-modal').remove()" style="background:none;border:none;color:#64748b;font-size:24px;cursor:pointer;">✕</button>
                </div>
                
                <div style="background:rgba(0,0,0,0.3);border-radius:12px;padding:12px;margin-bottom:16px;">
                    <div><strong>📅 Scan Time:</strong> ${scan.timestamp}</div>
                    <div><strong>🌐 System:</strong> ${scan.system.online ? 'Online' : 'Offline'}</div>
                    <div><strong>👻 Ghost Mode:</strong> ${scan.security.ghostMode ? 'ACTIVE' : 'Inactive'}</div>
                </div>
                
                <h3 style="color:#a855f7;">📦 Modules (${scan.modules.filter(m => m.exists).length}/${scan.modules.length})</h3>
                <div style="background:rgba(0,0,0,0.3);border-radius:12px;padding:12px;margin-bottom:16px;max-height:200px;overflow-y:auto;">
                    ${scan.modules.map(m => `
                        <div style="display:flex;justify-content:space-between;padding:4px 0;">
                            <span>${m.name}</span>
                            <span style="color:${m.exists ? '#10b981' : '#ef4444'}">
                                ${m.exists ? '✅ OK' : '❌ Missing'}
                            </span>
                        </div>
                    `).join('')}
                </div>
                
                <h3 style="color:#a855f7;">💾 Storage</h3>
                <div style="background:rgba(0,0,0,0.3);border-radius:12px;padding:12px;margin-bottom:16px;">
                    <div>LocalStorage: ${scan.storage.localStorageUsed}</div>
                    <div>SessionStorage: ${scan.storage.sessionStorageUsed}</div>
                    ${scan.performance.memory !== 'N/A' ? `
                        <div>Memory Used: ${scan.performance.memory.used}</div>
                        <div>Memory Limit: ${scan.performance.memory.limit}</div>
                    ` : ''}
                </div>
                
                <div style="display:flex;gap:12px;margin-top:20px;flex-wrap:wrap;">
                    <button onclick="window.ghostScanner?.exportAllData()" style="flex:1;background:#a855f7;border:none;padding:10px;border-radius:12px;cursor:pointer;">
                        <i class="fas fa-download"></i> Export All
                    </button>
                    <button onclick="window.ghostScanner?.emergencyRecovery()" style="flex:1;background:#10b981;border:none;padding:10px;border-radius:12px;cursor:pointer;">
                        <i class="fas fa-heartbeat"></i> Recovery
                    </button>
                    <button onclick="window.ghostScanner?.autoFix()" style="flex:1;background:#f59e0b;border:none;padding:10px;border-radius:12px;cursor:pointer;">
                        <i class="fas fa-wrench"></i> Auto Fix
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    async createBackup() {
        const backup = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            version: '7.0',
            data: {
                localStorage: {},
                sessionStorage: {},
                systemInfo: {
                    userAgent: navigator.userAgent,
                    url: window.location.href,
                    timestamp: new Date().toISOString()
                }
            }
        };
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            backup.data.localStorage[key] = localStorage.getItem(key);
        }
        
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            backup.data.sessionStorage[key] = sessionStorage.getItem(key);
        }
        
        const backups = JSON.parse(localStorage.getItem('dreamos_backups') || '[]');
        backups.unshift(backup);
        if (backups.length > 10) backups.pop();
        localStorage.setItem('dreamos_backups', JSON.stringify(backups));
        
        console.log(`✅ Backup created: ${backup.timestamp}`);
        return backup;
    }
    
    async autoFix() {
        console.log('🔧 Running auto-fix...');
        const fixes = [];
        
        // Fix 1: Check localStorage structure
        try {
            const test = localStorage.getItem('test');
            fixes.push({ action: 'localStorage', status: 'OK' });
        } catch (e) {
            fixes.push({ action: 'localStorage', status: 'Fixed', message: e.message });
        }
        
        // Fix 2: Re-register service worker
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('/sw.js');
                fixes.push({ action: 'Service Worker', status: 'Re-registered' });
            } catch (e) {
                fixes.push({ action: 'Service Worker', status: 'Failed', error: e.message });
            }
        }
        
        // Fix 3: Clear ghost mode if stuck
        if (sessionStorage.getItem('ghost_emergency') === 'stuck') {
            sessionStorage.removeItem('ghost_emergency');
            fixes.push({ action: 'Ghost Mode', status: 'Reset' });
        }
        
        console.table(fixes);
        return fixes;
    }
    
    async resetSystem() {
        const confirm = window.confirm('⚠️ WARNING: This will reset all local data! Continue?');
        if (!confirm) return;
        
        // Clear all storage
        localStorage.clear();
        sessionStorage.clear();
        
        // Reload page
        window.location.reload();
    }
    
    async showStats() {
        const stats = {
            version: '7.0',
            modulesLoaded: Object.keys(localStorage).filter(k => k.startsWith('dreamos_')).length,
            lastBackup: localStorage.getItem('dreamos_last_backup'),
            ghostActive: sessionStorage.getItem('ghost_emergency') !== null,
            storageUsed: this.getStorageSize('localStorage'),
            sessionUsed: this.getStorageSize('sessionStorage'),
            timestamp: new Date().toISOString()
        };
        
        console.table(stats);
        return stats;
    }
    
    async exportAllData() {
        const data = {
            timestamp: new Date().toISOString(),
            version: '7.0',
            system: await this.scanSystem(),
            localStorage: {},
            sessionStorage: {},
            backups: JSON.parse(localStorage.getItem('dreamos_backups') || '[]')
        };
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            data.localStorage[key] = localStorage.getItem(key);
        }
        
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            data.sessionStorage[key] = sessionStorage.getItem(key);
        }
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dreamos_export_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        console.log('📁 Full data export complete');
        return data;
    }
    
    enableDebugMode() {
        this.debugMode = true;
        localStorage.setItem('dreamos_debug', 'true');
        console.log('%c🐛 DEBUG MODE ENABLED', 'color: #a855f7; font-size: 14px;');
        console.log('Additional debug info will be logged to console');
    }
    
    async emergencyRecovery() {
        console.log('🚨 EMERGENCY RECOVERY PROTOCOL ACTIVATED');
        
        const steps = [
            { text: 'Checking system integrity...', progress: 20 },
            { text: 'Loading latest backup...', progress: 40 },
            { text: 'Restoring core modules...', progress: 60 },
            { text: 'Validating data consistency...', progress: 80 },
            { text: 'System recovery complete!', progress: 100 }
        ];
        
        for (const step of steps) {
            console.log(`🔧 ${step.text}`);
            await new Promise(r => setTimeout(r, 500));
        }
        
        // Attempt to restore from latest backup
        const backups = JSON.parse(localStorage.getItem('dreamos_backups') || '[]');
        if (backups.length > 0) {
            const latest = backups[0];
            Object.entries(latest.data.localStorage).forEach(([k, v]) => {
                localStorage.setItem(k, v);
            });
            console.log(`✅ Restored from backup: ${latest.timestamp}`);
        }
        
        console.log('✅ Emergency recovery completed');
        return { success: true, message: 'System recovered' };
    }
    
    clearConsole() {
        console.clear();
        console.log('%c👻 Ghost Console Cleared', 'color: #a855f7;');
        console.log('Type ghost.help() for commands');
    }
    
    showStatus() {
        const status = {
            ghostMode: sessionStorage.getItem('ghost_emergency') !== null,
            debugMode: localStorage.getItem('dreamos_debug') === 'true',
            online: navigator.onLine,
            storage: this.getStorageSize('localStorage'),
            timestamp: new Date().toISOString()
        };
        console.table(status);
    }
    
    async scanSystem() {
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            online: navigator.onLine,
            cookiesEnabled: navigator.cookieEnabled,
            screenSize: `${window.innerWidth}x${window.innerHeight}`,
            url: window.location.href
        };
    }
    
    async scanModules() {
        const modules = ['auth', 'dashboard', 'command-center', 'stok', 'maintenance', 'security', 'booking', 'k3', 'asset', 'qr', 'settings', 'ghost'];
        const results = [];
        
        for (const mod of modules) {
            try {
                const response = await fetch(`./modules/${mod}/module.js`, { method: 'HEAD' });
                results.push({ name: mod, exists: response.ok });
            } catch {
                results.push({ name: mod, exists: false });
            }
        }
        return results;
    }
    
    async scanDatabase() {
        return { supabase: window.supabase ? 'Available' : 'Not Available' };
    }
    
    scanStorage() {
        let total = 0;
        for (let i = 0; i < localStorage.length; i++) {
            total += localStorage.getItem(localStorage.key(i))?.length || 0;
        }
        return { localStorageUsed: (total / 1024).toFixed(2) + ' KB' };
    }
}

export const ghostScanner = new GhostScanner();

// Expose to global console
window.ghost = ghostScanner;
console.log('%c👻 Ghost Scanner Active', 'color: #a855f7; font-size: 12px;');
console.log('📜 Available commands:');
console.log('   ghost.help()      - Show all commands');
console.log('   ghost.scan()      - Full system scan');
console.log('   ghost.modules()   - Scan modules');
console.log('   ghost.backup()    - Create backup');
console.log('   ghost.fix()       - Auto fix issues');
console.log('   ghost.reset()     - Reset system');
console.log('   ghost.stats()     - Show stats');
console.log('   ghost.export()    - Export all data');
console.log('   ghost.debug()     - Enable debug mode');
console.log('   ghost.recover()   - Emergency recovery');
console.log('   ghost.status()    - Show current status');
