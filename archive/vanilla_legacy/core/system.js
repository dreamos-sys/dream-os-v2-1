// Dream OS - Core System with Professional Ghost Mode UI
import { APP_CONFIG } from '../config/app.js';

class DreamOS {
    constructor() {
        this.initialized = false;
        this.modules = new Map();
        this.state = {
            user: null,
            role: null,
            sessionStart: null,
            ghostMode: false,
            ghostReason: null,
            debug: APP_CONFIG.debug
        };
    }
    
    async init() {
        console.log('🚀 Initializing Dream OS...');
        
        if (sessionStorage.getItem('ghost_emergency')) {
            this.state.ghostMode = true;
            this.state.ghostReason = sessionStorage.getItem('ghost_emergency');
            console.log('👻 Ghost Emergency Mode Activated');
            this.showGhostNotification();
        }
        
        await this.loadCoreModules();
        
        this.initialized = true;
        console.log('✅ Dream OS Ready');
        return this;
    }
    
    showGhostNotification() {
        const notif = document.createElement('div');
        notif.id = 'ghost-notification';
        notif.innerHTML = `
            <div style="position:fixed;top:20px;right:20px;background:linear-gradient(135deg,#1e1b4b,#0c0a2a);border:2px solid #a855f7;border-radius:16px;padding:16px 24px;z-index:99999;animation:slideIn 0.3s;box-shadow:0 10px 40px rgba(168,85,247,0.3);">
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:40px;height:40px;background:rgba(168,85,247,0.2);border-radius:12px;display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-ghost" style="font-size:24px;color:#a855f7;"></i>
                    </div>
                    <div>
                        <h4 style="margin:0;color:#a855f7;">Ghost Mode Active</h4>
                        <p style="margin:0;font-size:11px;color:#94a3b8;">Emergency recovery mode • System in safe state</p>
                    </div>
                    <button onclick="document.getElementById('ghost-notification').remove()" style="background:none;border:none;color:#64748b;cursor:pointer;">✕</button>
                </div>
                <div style="margin-top:12px;font-size:10px;color:#64748b;border-top:1px solid rgba(168,85,247,0.2);padding-top:8px;">
                    <i class="fas fa-info-circle"></i> Reason: ${this.state.ghostReason || 'System recovery'}
                </div>
            </div>
        `;
        document.body.appendChild(notif);
        setTimeout(() => {
            if (document.getElementById('ghost-notification')) {
                notif.style.animation = 'fadeOut 0.3s';
                setTimeout(() => notif.remove(), 300);
            }
        }, 8000);
    }
    
    async loadCoreModules() {
        try {
            const coreModules = APP_CONFIG.modules.core;
            for (const moduleName of coreModules) {
                try {
                    const module = await import(`../modules/${moduleName}/module.js`);
                    this.modules.set(moduleName, module.default);
                    console.log(`📦 Loaded: ${moduleName}`);
                } catch (e) {
                    console.warn(`⚠️ Failed to load ${moduleName}, using fallback`);
                    this.modules.set(moduleName, this.getFallbackModule(moduleName));
                }
            }
        } catch (error) {
            console.error('Core module load error:', error);
            this.enterGhostMode('core_load_failed');
        }
    }
    
    getFallbackModule(moduleName) {
        return {
            name: moduleName,
            icon: 'fa-shield-alt',
            render: async (context) => this.renderGhostFallback(moduleName, context)
        };
    }
    
    renderGhostFallback(moduleName, context) {
        return `
            <div style="max-width:500px;margin:40px auto;background:linear-gradient(135deg,rgba(30,27,75,0.9),rgba(12,10,42,0.9));border-radius:24px;border:1px solid rgba(168,85,247,0.3);padding:32px;text-align:center;">
                <div style="width:80px;height:80px;background:linear-gradient(135deg,#a855f7,#8b5cf6);border-radius:24px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
                    <i class="fas fa-ghost" style="font-size:40px;color:white;"></i>
                </div>
                <h2 style="color:#a855f7;margin-bottom:12px;">Ghost Recovery Mode</h2>
                <p style="color:#94a3b8;margin-bottom:20px;">Module <strong>${moduleName}</strong> is in emergency recovery state</p>
                
                <div style="background:rgba(0,0,0,0.3);border-radius:16px;padding:16px;margin:20px 0;text-align:left;">
                    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                        <i class="fas fa-chart-line" style="color:#10b981;"></i>
                        <span style="font-weight:600;">System Status</span>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px;">
                        <div><span style="color:#64748b;">Ghost Mode:</span> <span style="color:#a855f7;">ACTIVE</span></div>
                        <div><span style="color:#64748b;">Emergency Backup:</span> <span style="color:#10b981;">AVAILABLE</span></div>
                        <div><span style="color:#64748b;">Recovery Point:</span> <span style="color:#f59e0b;">${new Date().toLocaleTimeString()}</span></div>
                        <div><span style="color:#64748b;">Module:</span> <span style="color:#a855f7;">${moduleName}</span></div>
                    </div>
                </div>
                
                <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
                    <button onclick="window.ghostScanner?.scan()" style="background:rgba(168,85,247,0.2);border:1px solid #a855f7;padding:10px 20px;border-radius:12px;cursor:pointer;color:white;">
                        <i class="fas fa-search"></i> Run System Scan
                    </button>
                    <button onclick="window.ghostScanner?.recover()" style="background:rgba(16,185,129,0.2);border:1px solid #10b981;padding:10px 20px;border-radius:12px;cursor:pointer;color:white;">
                        <i class="fas fa-heartbeat"></i> Emergency Recovery
                    </button>
                    <button onclick="window.location.reload()" style="background:rgba(59,130,246,0.2);border:1px solid #3b82f6;padding:10px 20px;border-radius:12px;cursor:pointer;color:white;">
                        <i class="fas fa-sync-alt"></i> Reload System
                    </button>
                </div>
                
                <details style="margin-top:20px;text-align:left;">
                    <summary style="cursor:pointer;color:#a855f7;font-size:12px;">
                        <i class="fas fa-bug"></i> Debug Information
                    </summary>
                    <pre style="background:#000;padding:12px;border-radius:8px;font-size:10px;margin-top:12px;overflow-x:auto;">${JSON.stringify({
                        module: moduleName,
                        ghost: true,
                        timestamp: new Date().toISOString(),
                        userAgent: navigator.userAgent,
                        url: window.location.href
                    }, null, 2)}</pre>
                </details>
            </div>
        `;
    }
    
    enterGhostMode(reason) {
        this.state.ghostMode = true;
        this.state.ghostReason = reason;
        sessionStorage.setItem('ghost_emergency', reason);
        console.warn(`👻 Ghost Mode Activated - Reason: ${reason}`);
        this.showGhostNotification();
    }
    
    async loadModule(moduleName) {
        if (this.modules.has(moduleName)) {
            return this.modules.get(moduleName);
        }
        
        try {
            const module = await import(`../modules/${moduleName}/module.js`);
            this.modules.set(moduleName, module.default);
            return module.default;
        } catch (error) {
            console.error(`Failed to load module: ${moduleName}`, error);
            return this.getFallbackModule(moduleName);
        }
    }
    
    getState() {
        return this.state;
    }
    
    isGhostMode() {
        return this.state.ghostMode;
    }
}

export const dreamOS = new DreamOS();
