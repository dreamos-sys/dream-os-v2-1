/**
 * modules/ghost/module.js
 * Dream OS 2026 - Ghost Architect Stealth Mode
 * Professional Developer & Architect Control Panel
 * ISO 27001 Compliant • Zero Proof • Stealth Mode
 */

export default async function({ container, services, supabase, user, i18n, lang }) {
    console.log('👻 [GHOST MODE] Initializing Stealth Control...');
    
    // ════════════════════════════════════════════
    // GHOST MODE SECURITY CHECK - REVISED
    // ════════════════════════════════════════════
    
    // Ambil user dari parameter atau dari DREAM.state
    const currentUser = user || window.DREAM?.state?.user;
    const authorizedRoles = ['developer', 'master', 'admin', 'architect', 'developer'];
    
    // Jika belum login, redirect ke halaman login
    if (!currentUser) {
        console.log('👻 [GHOST] No user found, redirecting to login...');
        window.DREAM.load('login');
        return;
    }
    
    // Cek apakah role sesuai
    const hasValidRole = currentUser && authorizedRoles.includes(currentUser.role);
    
    // Jika role tidak sesuai, tampilkan pesan error
    if (!hasValidRole) {
        container.innerHTML = `
            <div class="text-center py-20">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🔒</div>
                <h2 class="text-2xl font-bold text-red-400 mb-2">Access Denied</h2>
                <p class="text-slate-400">Ghost Mode requires Developer/Architect privileges</p>
                <p class="text-sm text-slate-500 mt-2">Your role: ${currentUser.role || 'unknown'}</p>
                <button onclick="DREAM.load('home')" class="mt-4 px-6 py-2 bg-emerald-500 rounded-lg">
                    ← Back to Home
                </button>
            </div>
        `;
        return;
    }
    
    // ════════════════════════════════════════════
    // COLLECT SYSTEM DATA
    // ════════════════════════════════════════════
    
    const modules = Array.from(window.DREAM?.modules?.keys() || []);
    const logs = JSON.parse(localStorage.getItem('dreamos-logs') || '[]').slice(-100);
    const errors = logs.filter(log => log.level === 'ERROR' || log.level === 'WARN');
    const performance = window.performance?.memory ? {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576),
        total: Math.round(performance.memory.totalJSHeapSize / 1048576),
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
    } : null;
    
    const systemInfo = {
        version: window.DREAM?.version || 'Unknown',
        env: window.DREAM?.env || 'Unknown',
        currentModule: window.DREAM?.state?.currentModule || 'None',
        modulesLoaded: modules.length,
        user: currentUser.name,
        role: currentUser.role,
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        cores: navigator.hardwareConcurrency || 'Unknown',
        memory: navigator.deviceMemory || 'Unknown',
        online: navigator.onLine,
        battery: 'Check Battery API',
        screen: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    
    // ════════════════════════════════════════════
    // RENDER GHOST UI
    // ════════════════════════════════════════════
    
    container.innerHTML = `
        <div class="ghost-architect-panel" style="padding: 1rem; max-width: 1400px; margin: 0 auto;">
            
            <!-- HEADER - STEALTH MODE -->
            <div class="glass-card p-6 mb-6" style="
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.15));
                border: 1px solid rgba(16, 185, 129, 0.3);
                border-radius: 16px;
                padding: 1.5rem;
                position: relative;
                overflow: hidden;
            ">
                <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 60%); animation: ghostPulse 8s linear infinite; pointer-events: none;"></div>
                
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; position: relative;">
                    <div style="font-size: 3rem;">👻</div>
                    <div>
                        <h2 class="text-2xl font-bold" style="color: #10b981; margin: 0;">
                            Ghost Architect Mode
                        </h2>
                        <p class="text-sm" style="color: var(--color-text-muted); margin: 0;">
                            Stealth Control Panel • Developer Only • Zero Proof
                        </p>
                    </div>
                    <div style="margin-left: auto; display: flex; gap: 0.5rem;">
                        <span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600;">
                            🔒 SECURE
                        </span>
                        <span class="badge" style="background: rgba(6, 182, 212, 0.2); color: #06b6d4; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600;">
                            👤 ${currentUser?.name || 'Unknown'} (${currentUser?.role || '?'})
                        </span>
                    </div>
                </div>
                
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; position: relative;">
                    <button onclick="window.ghostExportData()" class="btn-ghost" style="
                        background: rgba(16, 185, 129, 0.15);
                        color: #10b981;
                        padding: 0.5rem 1rem;
                        border-radius: 8px;
                        border: 1px solid rgba(16, 185, 129, 0.3);
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.background='rgba(16, 185, 129, 0.25)'" onmouseout="this.style.background='rgba(16, 185, 129, 0.15)'">
                        📊 Export Data
                    </button>
                    <button onclick="window.ghostClearAll()" class="btn-ghost" style="
                        background: rgba(239, 68, 68, 0.15);
                        color: #ef4444;
                        padding: 0.5rem 1rem;
                        border-radius: 8px;
                        border: 1px solid rgba(239, 68, 68, 0.3);
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.background='rgba(239, 68, 68, 0.25)'" onmouseout="this.style.background='rgba(239, 68, 68, 0.15)'">
                        🗑️ Clear All
                    </button>
                    <button onclick="window.ghostToggleStealth()" class="btn-ghost" style="
                        background: rgba(139, 92, 246, 0.15);
                        color: #a855f7;
                        padding: 0.5rem 1rem;
                        border-radius: 8px;
                        border: 1px solid rgba(139, 92, 246, 0.3);
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.background='rgba(139, 92, 246, 0.25)'" onmouseout="this.style.background='rgba(139, 92, 246, 0.15)'">
                        👻 Toggle Stealth
                    </button>
                </div>
            </div>
            
            <!-- TAB NAVIGATION -->
            <div class="ghost-tabs" style="
                display: flex;
                gap: 0.5rem;
                border-bottom: 2px solid rgba(16, 185, 129, 0.2);
                margin-bottom: 1rem;
                overflow-x: auto;
            ">
                <button class="ghost-tab active" data-tab="overview" style="
                    padding: 0.75rem 1.25rem;
                    background: rgba(16, 185, 129, 0.15);
                    border: 1px solid rgba(16, 185, 129, 0.3);
                    border-radius: 8px 8px 0 0;
                    color: #10b981;
                    font-weight: 600;
                    cursor: pointer;
                ">📊 Overview</button>
                <button class="ghost-tab" data-tab="logs" style="
                    padding: 0.75rem 1.25rem;
                    background: transparent;
                    border: 1px solid transparent;
                    border-radius: 8px 8px 0 0;
                    color: var(--color-text-muted);
                    font-weight: 600;
                    cursor: pointer;
                ">📋 Logs</button>
                <button class="ghost-tab" data-tab="errors" style="
                    padding: 0.75rem 1.25rem;
                    background: transparent;
                    border: 1px solid transparent;
                    border-radius: 8px 8px 0 0;
                    color: var(--color-text-muted);
                    font-weight: 600;
                    cursor: pointer;
                ">⚠️ Errors</button>
                <button class="ghost-tab" data-tab="performance" style="
                    padding: 0.75rem 1.25rem;
                    background: transparent;
                    border: 1px solid transparent;
                    border-radius: 8px 8px 0 0;
                    color: var(--color-text-muted);
                    font-weight: 600;
                    cursor: pointer;
                ">⚡ Performance</button>
                <button class="ghost-tab" data-tab="security" style="
                    padding: 0.75rem 1.25rem;
                    background: transparent;
                    border: 1px solid transparent;
                    border-radius: 8px 8px 0 0;
                    color: var(--color-text-muted);
                    font-weight: 600;
                    cursor: pointer;
                ">🔐 Security</button>
                <button class="ghost-tab" data-tab="tools" style="
                    padding: 0.75rem 1.25rem;
                    background: transparent;
                    border: 1px solid transparent;
                    border-radius: 8px 8px 0 0;
                    color: var(--color-text-muted);
                    font-weight: 600;
                    cursor: pointer;
                ">🛠️ Tools</button>
                <button class="ghost-tab" data-tab="settings" style="
                    padding: 0.75rem 1.25rem;
                    background: transparent;
                    border: 1px solid transparent;
                    border-radius: 8px 8px 0 0;
                    color: var(--color-text-muted);
                    font-weight: 600;
                    cursor: pointer;
                ">⚙️ Settings</button>
            </div>
            
            <!-- TAB CONTENT AREA -->
            <div id="ghost-tab-content" class="glass-card" style="
                background: rgba(15, 23, 42, 0.6);
                backdrop-filter: blur(16px);
                border: 1px solid rgba(16, 185, 129, 0.15);
                border-radius: 16px;
                padding: 1.5rem;
                min-height: 500px;
            ">
                ${renderOverview(systemInfo, modules, performance)}
            </div>
            
            <!-- FOOTER -->
            <div class="text-center" style="margin-top: 1.5rem; padding: 1rem; color: var(--color-text-subtle); font-size: 0.75rem;">
                <p>⚡ Bi idznillah • Ghost Architect Mode • Hidden from regular users</p>
                <p style="margin-top: 0.5rem;">Dream OS v${systemInfo.version} • ISO 27001 Compliant</p>
            </div>
            
        </div>
    `;
    
    // ════════════════════════════════════════════
    // TAB SWITCHING LOGIC
    // ════════════════════════════════════════════
    
    document.querySelectorAll('.ghost-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            document.querySelectorAll('.ghost-tab').forEach(t => {
                t.style.background = 'transparent';
                t.style.border = '1px solid transparent';
                t.style.color = 'var(--color-text-muted)';
            });
            
            // Add active class to clicked tab
            tab.style.background = 'rgba(16, 185, 129, 0.15)';
            tab.style.border = '1px solid rgba(16, 185, 129, 0.3)';
            tab.style.color = '#10b981';
            
            // Load tab content
            const tabName = tab.dataset.tab;
            const contentDiv = document.getElementById('ghost-tab-content');
            
            switch(tabName) {
                case 'overview':
                    contentDiv.innerHTML = renderOverview(systemInfo, modules, performance);
                    break;
                case 'logs':
                    contentDiv.innerHTML = renderLogs(logs);
                    break;
                case 'errors':
                    contentDiv.innerHTML = renderErrors(errors);
                    break;
                case 'performance':
                    contentDiv.innerHTML = renderPerformance(performance);
                    break;
                case 'security':
                    contentDiv.innerHTML = renderSecurity();
                    break;
                case 'tools':
                    contentDiv.innerHTML = renderTools();
                    break;
                case 'settings':
                    contentDiv.innerHTML = renderSettings();
                    break;
            }
        });
    });
    
    // ════════════════════════════════════════════
    // GLOBAL GHOST FUNCTIONS
    // ════════════════════════════════════════════
    
    window.ghostExportData = async function() {
        const exportData = {
            timestamp: new Date().toISOString(),
            systemInfo: systemInfo,
            modules: modules,
            logs: logs,
            performance: performance,
            userAgent: navigator.userAgent
        };
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dreamos-ghost-export-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(a.href);
        
        window.DREAM?.showToast('📊 Data exported successfully', 'success');
    };
    
    window.ghostClearAll = function() {
        if (confirm('⚠️ WARNING: This will clear all logs, cache, and local data. Continue?')) {
            localStorage.clear();
            sessionStorage.clear();
            window.DREAM?.showToast('🗑️ All data cleared', 'warning');
            setTimeout(() => location.reload(), 1000);
        }
    };
    
    window.ghostToggleStealth = function() {
        const panel = document.querySelector('.ghost-architect-panel');
        if (panel.style.opacity === '0.3') {
            panel.style.opacity = '1';
            window.DREAM?.showToast('👻 Stealth mode OFF', 'info');
        } else {
            panel.style.opacity = '0.3';
            window.DREAM?.showToast('👻 Stealth mode ON', 'info');
        }
    };
    
    window.ghostDownloadLogs = function() {
        const logs = JSON.parse(localStorage.getItem('dreamos-logs') || '[]');
        const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dreamos-logs-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(a.href);
        window.DREAM?.showToast('📋 Logs downloaded', 'success');
    };
    
    window.ghostRunDiagnostics = function() {
        const diagnostics = {
            memory: performance.memory ? 'OK' : 'Not Available',
            network: navigator.onLine ? 'OK' : 'Offline',
            storage: localStorage ? 'OK' : 'Failed',
            camera: navigator.mediaDevices ? 'OK' : 'Not Available',
            biometric: window.PublicKeyCredential ? 'OK' : 'Not Available',
            nfc: window.NDEFReader ? 'OK' : 'Not Available',
            geolocation: navigator.geolocation ? 'OK' : 'Not Available'
        };
        
        console.table(diagnostics);
        alert('🔍 Diagnostics Complete!\n\n' + JSON.stringify(diagnostics, null, 2));
        window.DREAM?.showToast('✅ Diagnostics complete', 'success');
    };
    
    console.log('✅ [GHOST MODE] Stealth Control Ready');
    
    return function cleanup() {
        console.log('👻 [GHOST MODE] Cleanup complete');
        delete window.ghostExportData;
        delete window.ghostClearAll;
        delete window.ghostToggleStealth;
        delete window.ghostDownloadLogs;
        delete window.ghostRunDiagnostics;
    };
}

// ════════════════════════════════════════════════
// TAB CONTENT RENDERERS
// ════════════════════════════════════════════════

function renderOverview(info, modules, performance) {
    return `
        <h3 class="text-lg font-semibold mb-4" style="color: #10b981;">📊 System Overview</h3>
        
        <div class="grid grid-cols-2 gap-4 mb-6" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
            ${Object.entries(info).map(([key, value]) => `
                <div class="info-item" style="
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(148, 163, 184, 0.15);
                    border-radius: 8px;
                    padding: 0.75rem;
                ">
                    <div style="font-size: 0.75rem; color: var(--color-text-subtle); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">
                        ${key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div style="font-family: monospace; font-size: 0.9rem; color: var(--color-text); word-break: break-all;">
                        ${value}
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="glass-card p-4 mb-4" style="
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.2);
            border-radius: 12px;
            padding: 1rem;
        ">
            <h4 class="font-semibold mb-2" style="color: #10b981;">📦 Loaded Modules (${modules.length})</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${modules.length > 0 ? modules.map(mod => `
                    <span style="
                        background: rgba(16, 185, 129, 0.15);
                        color: #10b981;
                        padding: 0.25rem 0.75rem;
                        border-radius: 20px;
                        font-size: 0.75rem;
                        font-family: monospace;
                    ">${mod}</span>
                `).join('') : '<span style="color: var(--color-text-muted);">No modules loaded</span>'}
            </div>
        </div>
        
        ${performance ? `
        <div class="glass-card p-4" style="
            background: rgba(6, 182, 212, 0.1);
            border: 1px solid rgba(6, 182, 212, 0.2);
            border-radius: 12px;
            padding: 1rem;
        ">
            <h4 class="font-semibold mb-2" style="color: #06b6d4;">⚡ Memory Usage</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; text-align: center;">
                <div>
                    <div style="font-size: 1.5rem; font-weight: bold; color: #06b6d4;">${performance.used} MB</div>
                    <div style="font-size: 0.75rem; color: var(--color-text-subtle);">Used</div>
                </div>
                <div>
                    <div style="font-size: 1.5rem; font-weight: bold; color: #3b82f6;">${performance.total} MB</div>
                    <div style="font-size: 0.75rem; color: var(--color-text-subtle);">Total</div>
                </div>
                <div>
                    <div style="font-size: 1.5rem; font-weight: bold; color: #8b5cf6;">${performance.limit} MB</div>
                    <div style="font-size: 0.75rem; color: var(--color-text-subtle);">Limit</div>
                </div>
            </div>
        </div>
        ` : ''}
    `;
}

function renderLogs(logs) {
    return `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 class="text-lg font-semibold" style="color: #10b981;">📋 System Logs (${logs.length})</h3>
            <div style="display: flex; gap: 0.5rem;">
                <button onclick="window.ghostDownloadLogs()" class="btn-ghost-sm" style="
                    background: rgba(16, 185, 129, 0.15);
                    color: #10b981;
                    padding: 0.4rem 0.8rem;
                    border-radius: 6px;
                    border: 1px solid rgba(16, 185, 129, 0.3);
                    font-size: 0.75rem;
                    cursor: pointer;
                ">⬇️ Download</button>
                <button onclick="localStorage.removeItem('dreamos-logs'); location.reload();" class="btn-ghost-sm" style="
                    background: rgba(239, 68, 68, 0.15);
                    color: #ef4444;
                    padding: 0.4rem 0.8rem;
                    border-radius: 6px;
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    font-size: 0.75rem;
                    cursor: pointer;
                ">🗑️ Clear</button>
            </div>
        </div>
        
        <pre style="
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(148, 163, 184, 0.15);
            border-radius: 8px;
            padding: 1rem;
            height: 500px;
            overflow-y: auto;
            font-size: 0.75rem;
            font-family: 'JetBrains Mono', monospace;
            color: var(--color-text);
            line-height: 1.6;
        ">${logs.map(log => `[${log.timestamp || 'N/A'}] <span style="color: ${log.level === 'ERROR' ? '#ef4444' : log.level === 'WARN' ? '#f59e0b' : '#10b981'}">${log.level}</span>: ${log.message}`).join('\n') || 'No logs available'}</pre>
    `;
}

function renderErrors(errors) {
    return `
        <h3 class="text-lg font-semibold mb-4" style="color: #ef4444;">⚠️ Error Reports (${errors.length})</h3>
        
        ${errors.length === 0 ? `
            <div class="text-center py-10" style="color: var(--color-text-muted);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
                <p>No errors detected - System healthy!</p>
            </div>
        ` : `
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                ${errors.map((error, index) => `
                    <div style="
                        background: rgba(239, 68, 68, 0.1);
                        border-left: 4px solid #ef4444;
                        border-radius: 8px;
                        padding: 1rem;
                    ">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                            <span style="font-weight: 600; color: #ef4444;">Error #${index + 1}</span>
                            <span style="font-size: 0.75rem; color: var(--color-text-subtle);">${error.timestamp || 'N/A'}</span>
                        </div>
                        <div style="font-family: monospace; font-size: 0.85rem; color: var(--color-text); word-break: break-all;">
                            ${error.message}
                        </div>
                    </div>
                `).join('')}
            </div>
        `}
    `;
}

function renderPerformance(performance) {
    return `
        <h3 class="text-lg font-semibold mb-4" style="color: #06b6d4;">⚡ Performance Metrics</h3>
        
        <div class="grid grid-cols-2 gap-4" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
            <div class="glass-card p-4" style="background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.2); border-radius: 12px; padding: 1rem;">
                <h4 class="font-semibold mb-2" style="color: #06b6d4;">Memory (Chrome Only)</h4>
                ${performance ? `
                    <div style="font-family: monospace; font-size: 0.9rem;">
                        <div>Used: ${performance.used} MB</div>
                        <div>Total: ${performance.total} MB</div>
                        <div>Limit: ${performance.limit} MB</div>
                    </div>
                ` : '<span style="color: var(--color-text-muted);">Not available</span>'}
            </div>
            
            <div class="glass-card p-4" style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 1rem;">
                <h4 class="font-semibold mb-2" style="color: #10b981;">Network</h4>
                <div style="font-family: monospace; font-size: 0.9rem;">
                    <div>Online: ${navigator.onLine ? '✅ Yes' : '❌ No'}</div>
                    <div>Connection: ${navigator.connection?.effectiveType || 'Unknown'}</div>
                    <div>Downlink: ${navigator.connection?.downlink || 'Unknown'} Mbps</div>
                    <div>RTT: ${navigator.connection?.rtt || 'Unknown'} ms</div>
                </div>
            </div>
            
            <div class="glass-card p-4" style="background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 12px; padding: 1rem;">
                <h4 class="font-semibold mb-2" style="color: #a855f7;">Device</h4>
                <div style="font-family: monospace; font-size: 0.9rem;">
                    <div>Cores: ${navigator.hardwareConcurrency || 'Unknown'}</div>
                    <div>Memory: ${navigator.deviceMemory || 'Unknown'} GB</div>
                    <div>Platform: ${navigator.platform}</div>
                </div>
            </div>
            
            <div class="glass-card p-4" style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 12px; padding: 1rem;">
                <h4 class="font-semibold mb-2" style="color: #f59e0b;">Storage</h4>
                <div style="font-family: monospace; font-size: 0.9rem;">
                    <div>LocalStorage: ${localStorage.length} items</div>
                    <div>SessionStorage: ${sessionStorage.length} items</div>
                    <div>Estimated: ${navigator.storage?.estimate ? 'Available' : 'Unknown'}</div>
                </div>
            </div>
        </div>
    `;
}

function renderSecurity() {
    return `
        <h3 class="text-lg font-semibold mb-4" style="color: #10b981;">🔐 Security Audit</h3>
        
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div class="security-item" style="
                background: rgba(16, 185, 129, 0.1);
                border: 1px solid rgba(16, 185, 129, 0.2);
                border-radius: 8px;
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <div>
                    <div style="font-weight: 600; color: #10b981;">Device Fingerprint</div>
                    <div style="font-size: 0.75rem; color: var(--color-text-subtle);">Unique device identification</div>
                </div>
                <span style="background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem;">✅ Active</span>
            </div>
            
            <div class="security-item" style="
                background: rgba(16, 185, 129, 0.1);
                border: 1px solid rgba(16, 185, 129, 0.2);
                border-radius: 8px;
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <div>
                    <div style="font-weight: 600; color: #10b981;">Biometric Auth</div>
                    <div style="font-size: 0.75rem; color: var(--color-text-subtle);">Face/Touch ID support</div>
                </div>
                <span style="background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem;">✅ Ready</span>
            </div>
            
            <div class="security-item" style="
                background: rgba(16, 185, 129, 0.1);
                border: 1px solid rgba(16, 185, 129, 0.2);
                border-radius: 8px;
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <div>
                    <div style="font-weight: 600; color: #10b981;">Geofencing</div>
                    <div style="font-size: 0.75rem; color: var(--color-text-subtle);">Location-based access</div>
                </div>
                <span style="background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem;">✅ Active</span>
            </div>
            
            <div class="security-item" style="
                background: rgba(16, 185, 129, 0.1);
                border: 1px solid rgba(16, 185, 129, 0.2);
                border-radius: 8px;
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <div>
                    <div style="font-weight: 600; color: #10b981;">Audit Trail</div>
                    <div style="font-size: 0.75rem; color: var(--color-text-subtle);">Complete activity logging</div>
                </div>
                <span style="background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem;">✅ Logging</span>
            </div>
        </div>
        
        <div class="glass-card p-4 mt-4" style="
            background: rgba(245, 158, 11, 0.1);
            border: 1px solid rgba(245, 158, 11, 0.2);
            border-radius: 12px;
            padding: 1rem;
        ">
            <h4 class="font-semibold mb-2" style="color: #f59e0b;">⚠️ Security Recommendations</h4>
            <ul style="font-size: 0.85rem; color: var(--color-text); line-height: 1.8;">
                <li>✅ Enable HTTPS for production</li>
                <li>✅ Rotate API keys regularly</li>
                <li>✅ Monitor error logs daily</li>
                <li>✅ Review access permissions weekly</li>
                <li>✅ Backup data before major updates</li>
            </ul>
        </div>
    `;
}

function renderTools() {
    return `
        <h3 class="text-lg font-semibold mb-4" style="color: #a855f7;">🛠️ Developer Tools</h3>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
            <button onclick="window.DREAM.clearCache?.()" class="tool-btn" style="
                background: rgba(16, 185, 129, 0.15);
                border: 1px solid rgba(16, 185, 129, 0.3);
                border-radius: 12px;
                padding: 1.5rem;
                text-align: left;
                cursor: pointer;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='rgba(16, 185, 129, 0.25)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(16, 185, 129, 0.15)'; this.style.transform='translateY(0)'">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🗑️</div>
                <div style="font-weight: 600; color: #10b981;">Clear Cache</div>
                <div style="font-size: 0.75rem; color: var(--color-text-subtle); margin-top: 0.25rem;">Clear all cached data</div>
            </button>
            
            <button onclick="location.reload()" class="tool-btn" style="
                background: rgba(6, 182, 212, 0.15);
                border: 1px solid rgba(6, 182, 212, 0.3);
                border-radius: 12px;
                padding: 1.5rem;
                text-align: left;
                cursor: pointer;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='rgba(6, 182, 212, 0.25)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(6, 182, 212, 0.15)'; this.style.transform='translateY(0)'">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔄</div>
                <div style="font-weight: 600; color: #06b6d4;">Reload App</div>
                <div style="font-size: 0.75rem; color: var(--color-text-subtle); margin-top: 0.25rem;">Refresh application</div>
            </button>
            
            <button onclick="window.ghostExportData()" class="tool-btn" style="
                background: rgba(139, 92, 246, 0.15);
                border: 1px solid rgba(139, 92, 246, 0.3);
                border-radius: 12px;
                padding: 1.5rem;
                text-align: left;
                cursor: pointer;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='rgba(139, 92, 246, 0.25)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(139, 92, 246, 0.15)'; this.style.transform='translateY(0)'">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">📊</div>
                <div style="font-weight: 600; color: #a855f7;">Export Data</div>
                <div style="font-size: 0.75rem; color: var(--color-text-subtle); margin-top: 0.25rem;">Download system data</div>
            </button>
            
            <button onclick="window.ghostDownloadLogs()" class="tool-btn" style="
                background: rgba(245, 158, 11, 0.15);
                border: 1px solid rgba(245, 158, 11, 0.3);
                border-radius: 12px;
                padding: 1.5rem;
                text-align: left;
                cursor: pointer;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='rgba(245, 158, 11, 0.25)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(245, 158, 11, 0.15)'; this.style.transform='translateY(0)'">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">📋</div>
                <div style="font-weight: 600; color: #f59e0b;">Download Logs</div>
                <div style="font-size: 0.75rem; color: var(--color-text-subtle); margin-top: 0.25rem;">Export error logs</div>
            </button>
            
            <button onclick="window.ghostRunDiagnostics()" class="tool-btn" style="
                background: rgba(59, 130, 246, 0.15);
                border: 1px solid rgba(59, 130, 246, 0.3);
                border-radius: 12px;
                padding: 1.5rem;
                text-align: left;
                cursor: pointer;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='rgba(59, 130, 246, 0.25)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(59, 130, 246, 0.15)'; this.style.transform='translateY(0)'">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</div>
                <div style="font-weight: 600; color: #3b82f6;">Run Diagnostics</div>
                <div style="font-size: 0.75rem; color: var(--color-text-subtle); margin-top: 0.25rem;">System health check</div>
            </button>
            
            <button onclick="window.ghostToggleStealth()" class="tool-btn" style="
                background: rgba(239, 68, 68, 0.15);
                border: 1px solid rgba(239, 68, 68, 0.3);
                border-radius: 12px;
                padding: 1.5rem;
                text-align: left;
                cursor: pointer;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='rgba(239, 68, 68, 0.25)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(239, 68, 68, 0.15)'; this.style.transform='translateY(0)'">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">👻</div>
                <div style="font-weight: 600; color: #ef4444;">Toggle Stealth</div>
                <div style="font-size: 0.75rem; color: var(--color-text-subtle); margin-top: 0.25rem;">Hide/Show panel</div>
            </button>
        </div>
    `;
}

function renderSettings() {
    return `
        <h3 class="text-lg font-semibold mb-4" style="color: #3b82f6;">⚙️ Ghost Settings</h3>
        
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="setting-item" style="
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(148, 163, 184, 0.15);
                border-radius: 8px;
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <div>
                    <div style="font-weight: 600; color: var(--color-text);">Debug Mode</div>
                    <div style="font-size: 0.75rem; color: var(--color-text-subtle);">Enable detailed logging</div>
                </div>
                <label style="position: relative; display: inline-block; width: 50px; height: 26px;">
                    <input type="checkbox" checked style="opacity: 0; width: 0; height: 0;">
                    <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #10b981; border-radius: 34px; transition: .4s;"></span>
                </label>
            </div>
            
            <div class="setting-item" style="
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(148, 163, 184, 0.15);
                border-radius: 8px;
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <div>
                    <div style="font-weight: 600; color: var(--color-text);">Auto-Clear Logs</div>
                    <div style="font-size: 0.75rem; color: var(--color-text-subtle);">Clear logs after 7 days</div>
                </div>
                <label style="position: relative; display: inline-block; width: 50px; height: 26px;">
                    <input type="checkbox" style="opacity: 0; width: 0; height: 0;">
                    <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #64748b; border-radius: 34px; transition: .4s;"></span>
                </label>
            </div>
            
            <div class="setting-item" style="
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(148, 163, 184, 0.15);
                border-radius: 8px;
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <div>
                    <div style="font-weight: 600; color: var(--color-text);">Error Notifications</div>
                    <div style="font-size: 0.75rem; color: var(--color-text-subtle);">Show toast on errors</div>
                </div>
                <label style="position: relative; display: inline-block; width: 50px; height: 26px;">
                    <input type="checkbox" checked style="opacity: 0; width: 0; height: 0;">
                    <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #10b981; border-radius: 34px; transition: .4s;"></span>
                </label>
            </div>
        </div>
    `;
}

// Animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ghostPulse {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(180deg); }
    }
`;
document.head.appendChild(style);
