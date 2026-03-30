// Dream OS - Database Recovery & Ghost Mode Database Scanner
import { APP_CONFIG } from '../config/app.js';

class DatabaseRecovery {
    constructor() {
        this.supabase = null;
        this.localCache = new Map();
        this.recoveryLogs = [];
    }
    
    async init() {
        console.log('🔍 Initializing Database Recovery System...');
        
        // Try to connect to Supabase
        try {
            if (window.supabase) {
                this.supabase = window.supabase.createClient(
                    APP_CONFIG.supabase.url,
                    APP_CONFIG.supabase.key
                );
                await this.testConnection();
                console.log('✅ Supabase Connected');
            }
        } catch (error) {
            console.warn('⚠️ Supabase unavailable - using local cache');
            this.logRecovery('supabase_unavailable', error.message);
        }
        
        // Load local backup
        await this.loadLocalBackup();
        
        return this;
    }
    
    async testConnection() {
        try {
            const { data, error } = await this.supabase.from('_test').select('*').limit(1);
            if (error) throw error;
            return true;
        } catch (error) {
            this.logRecovery('connection_test_failed', error.message);
            return false;
        }
    }
    
    async loadLocalBackup() {
        // Load from localStorage
        const backups = ['dreamos_backup', 'dreamos_modules', 'dreamos_state'];
        for (const backup of backups) {
            const data = localStorage.getItem(backup);
            if (data) {
                try {
                    this.localCache.set(backup, JSON.parse(data));
                    console.log(`📦 Loaded local backup: ${backup}`);
                } catch (e) {
                    console.warn(`Failed to parse ${backup}`);
                }
            }
        }
    }
    
    async scanAllData() {
        const results = {
            supabase: null,
            localStorage: {},
            sessionStorage: {},
            indexedDB: null
        };
        
        // Scan localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            results.localStorage[key] = localStorage.getItem(key);
        }
        
        // Scan sessionStorage
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            results.sessionStorage[key] = sessionStorage.getItem(key);
        }
        
        // Try to get Supabase data if available
        if (this.supabase) {
            try {
                const tables = ['bookings', 'k3_reports', 'inventaris', 'maintenance_tasks', 'users'];
                const supabaseData = {};
                for (const table of tables) {
                    const { data } = await this.supabase.from(table).select('*').limit(100);
                    supabaseData[table] = data || [];
                }
                results.supabase = supabaseData;
            } catch (error) {
                this.logRecovery('supabase_scan_failed', error.message);
            }
        }
        
        return results;
    }
    
    async ghostRecovery() {
        console.log('👻 Running Ghost Recovery Protocol...');
        
        const recovery = {
            timestamp: new Date().toISOString(),
            modules: [],
            data: await this.scanAllData(),
            errors: this.recoveryLogs,
            suggestions: []
        };
        
        // Analyze and suggest fixes
        if (!this.supabase) {
            recovery.suggestions.push('Supabase connection failed - check internet or API keys');
        }
        
        if (recovery.data.localStorage.dreamos_backup) {
            recovery.suggestions.push('Local backup found - consider restoring');
        }
        
        // Save recovery report
        localStorage.setItem('ghost_recovery_report', JSON.stringify(recovery));
        
        return recovery;
    }
    
    logRecovery(action, detail) {
        this.recoveryLogs.push({
            timestamp: new Date().toISOString(),
            action,
            detail
        });
        
        // Keep only last 100 logs
        if (this.recoveryLogs.length > 100) {
            this.recoveryLogs.shift();
        }
    }
    
    async emergencyBackup() {
        const backup = {
            timestamp: new Date().toISOString(),
            version: APP_CONFIG.version,
            data: await this.scanAllData(),
            logs: this.recoveryLogs
        };
        
        localStorage.setItem('dreamos_emergency_backup', JSON.stringify(backup));
        console.log('💾 Emergency backup saved');
        return backup;
    }
    
    async restoreFromBackup(backupKey = 'dreamos_emergency_backup') {
        const backup = localStorage.getItem(backupKey);
        if (!backup) {
            throw new Error('No backup found');
        }
        
        const data = JSON.parse(backup);
        console.log('🔄 Restoring from backup:', data.timestamp);
        
        // Restore to localStorage
        if (data.data && data.data.localStorage) {
            Object.entries(data.data.localStorage).forEach(([key, value]) => {
                localStorage.setItem(key, value);
            });
        }
        
        this.logRecovery('restore_from_backup', backupKey);
        return data;
    }
}

export const dbRecovery = new DatabaseRecovery();
