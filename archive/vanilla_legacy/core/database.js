/**
 * 🗄️ DREAM OS v2.1 - DATABASE TOOLS
 * Integrated with Ghost Immune System
 */

import { ghost } from './ghost.js';

class DatabaseTools {
    constructor() {
        this.supabaseUrl = 'https://pvznaeppaagylwddirla.supabase.co';
        this.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2em5hZXBwYWFneWx3ZGRpcmxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NTEwNDMsImV4cCI6MjA4NzUyNzA0M30.t9SJi3VfsBDkKmeZ3egZ4rbvljl4xe0WwNkPtfA9-vo';
    }

    // Get complete health status
    async getHealthStatus() {
        const ghostStatus = ghost.getStatus();
        
        return {
            immunity: {
                level: ghostStatus.immunityLevel + '%',
                vaccines: ghostStatus.vaccineCount,
                active: ghostStatus.isActive,
                lastActivation: ghostStatus.lastActivation
            },
            tiny: {
                status: '🦾 HUNTING_BUGS',
                device: navigator.userAgent.includes('Mobile') ? 'MOBILE' : 'DESKTOP',
                battery: await this.getBatteryLevel()
            },
            babyAgent: {                status: '🧠 GENERATING_VACCINE',
                learningCount: this.getLearningCount(),
                intelligence: 'SUPER_AGENT'
            },
            database: await this.checkDatabaseTables(),
            timestamp: new Date().toLocaleTimeString()
        };
    }

    // Get battery level
    async getBatteryLevel() {
        if ('getBattery' in navigator) {
            const battery = await navigator.getBattery();
            return Math.round(battery.level * 100) + '%';
        }
        return 'N/A';
    }

    // Get learning count
    getLearningCount() {
        let count = 0;
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).includes('baby_agent_learn')) {
                count++;
            }
        }
        return count;
    }

    // Check database tables
    async checkDatabaseTables() {
        const tables = [
            'bookings', 'k3_reports', 'security_logs',
            'janitor_indoor', 'janitor_outdoor', 'stock',
            'maintenance_tasks', 'inventaris', 'gudang'
        ];
        
        const status = {};
        for (const table of tables) {
            try {
                const response = await fetch(`${this.supabaseUrl}/rest/v1/${table}?limit=1`, {
                    headers: {
                        'apikey': this.supabaseKey,
                        'Authorization': `Bearer ${this.supabaseKey}`,
                        'Prefer': 'count=exact'
                    }
                });
                
                if (response.ok) {
                    const count = response.headers.get('Content-Range')?.split('/')[1] || '0';                    status[table] = { status: '🟢 OK', count: parseInt(count) };
                } else {
                    status[table] = { status: '🔴 ERROR', code: response.status };
                }
            } catch (e) {
                status[table] = { status: '⚪ OFFLINE', error: e.message };
            }
        }
        
        return status;
    }

    // Export all data (backup)
    async exportAllData() {
        const backup = {
            timestamp: new Date().toISOString(),
            immunity: ghost.getStatus(),
            vaccines: JSON.parse(localStorage.getItem('dream_vaccines') || '[]'),
            audit: JSON.parse(localStorage.getItem('girangati_audit') || '[]'),
            sessions: {
                localStorage: localStorage.length,
                sessionStorage: sessionStorage.length
            }
        };
        
        return backup;
    }

    // Clear corrupted data
    clearCorrupted() {
        let cleared = 0;
        
        // Clear old caches
        if ('caches' in window) {
            caches.keys().then(names => {
                names.forEach(n => {
                    caches.delete(n);
                    cleared++;
                });
            });
        }
        
        // Clear old sessions
        const corruptedSessions = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.includes('dream_session_old')) {
                corruptedSessions.push(key);
            }
        }        corruptedSessions.forEach(key => localStorage.removeItem(key));
        cleared += corruptedSessions.length;
        
        return { cleared: cleared, status: 'success' };
    }
}

const dbTools = new DatabaseTools();
export { dbTools };
