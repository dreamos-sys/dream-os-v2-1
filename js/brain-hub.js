/**
 * ═══════════════════════════════════════════════════════════════════════
 * BRAIN HUB LUX - GHOST ARCHITECT DEVELOPER CONSOLE
 * Bismillah bi idznillah - ISO 27001 Certified
 * ═══════════════════════════════════════════════════════════════════════
 */
class BrainHub {
    constructor() {
        this.isVisible = false;
        this.activeTab = 'overview';
        this.consoleBuffer = [];
        this.interceptConsole();
    }

    interceptConsole() {
        const origLog = console.log, origWarn = console.warn, origError = console.error;
        const add = (level, args) => {
            this.consoleBuffer.push({
                timestamp: new Date().toLocaleTimeString(),
                level,
                message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')
            });
            if (this.consoleBuffer.length > 100) this.consoleBuffer.shift();
        };
        console.log = (...a) => { add('INFO', a); origLog(...a); };
        console.warn = (...a) => { add('WARN', a); origWarn(...a); };
        console.error = (...a) => { add('ERROR', a); origError(...a); };
    }

    static render() {
        if (!window.BrainHubInstance) window.BrainHubInstance = new BrainHub();
        window.BrainHubInstance.createOverlay();
    }

    createOverlay() {
        if (this.isVisible) return;
        this.isVisible = true;
        
        // Hapus overlay lama jika ada
        const old = document.getElementById('brain-hub');
        if (old) old.remove();

        const overlay = document.createElement('div');
        overlay.id = 'brain-hub';
        overlay.innerHTML = this.getHTML();
        document.body.appendChild(overlay);
        this.bindEvents();
    }

    getHTML() {
        return `
        <style>
            #brain-hub { position:fixed; inset:0; z-index:999999; background:#020617; color:#10b981; font-family:'JetBrains Mono',monospace; font-size:11px; display:flex; flex-direction:column; animation: slideUp 0.3s ease-out; }
            .hub-header { background:linear-gradient(135deg,#0f172a,#1e293b); border-bottom:2px solid #10b981; padding:12px 16px; display:flex; justify-content:space-between; align-items:center; }
            .hub-title { font-size:14px; font-weight:700; letter-spacing:2px; }
            .hub-close { color:#ef4444; cursor:pointer; padding:4px 12px; border:1px solid #ef4444; border-radius:4px; background:rgba(239,68,68,0.1); font-weight:bold; }
            .hub-tabs { background:#0f172a; border-bottom:1px solid #334155; display:flex; gap:4px; padding:8px; overflow-x:auto; }
            .hub-tab { padding:8px 16px; border:1px solid transparent; border-radius:6px; cursor:pointer; font-size:10px; text-transform:uppercase; white-space:nowrap; }
            .hub-tab.active { background:rgba(16,185,129,0.2); border-color:#10b981; color:#10b981; font-weight:700; }
            .hub-content { flex:1; overflow-y:auto; padding:16px; background:#020617; }
            .hub-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:12px; }
            .hub-card { background:#0f172a; border:1px solid #334155; border-radius:8px; padding:12px; }
            .hub-card-title { font-size:12px; font-weight:700; color:#fff; margin-bottom:8px; text-transform:uppercase; border-left:3px solid #10b981; padding-left:8px; }
            .hub-stat { display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #1e293b; }
            .hub-stat-label { color:#94a3b8; }
            .hub-stat-value { color:#10b981; font-weight:600; }
            .hub-console { background:#000; border:1px solid #334155; border-radius:8px; padding:12px; height:400px; overflow-y:auto; font-size:10px; line-height:1.5; }
            .console-INFO { color:#94a3b8; } .console-WARN { color:#f59e0b; } .console-ERROR { color:#ef4444; }
            .hub-btn { padding:8px 16px; border:1px solid #10b981; border-radius:6px; background:rgba(16,185,129,0.1); color:#10b981; cursor:pointer; font-size:10px; font-weight:600; margin:4px; text-transform:uppercase; }
            .hub-footer { background:#0f172a; border-top:1px solid #334155; padding:8px 16px; font-size:9px; text-align:center; color:#64748b; }
            @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        </style>
        <div class="hub-header">
            <div><span class="hub-title">🧠 BRAIN HUB [GHOST ARCHITECT]</span><div style="font-size:9px;opacity:0.7;">Sovereign Enterprise v13.5 LUX</div></div>
            <div class="hub-close" onclick="window.BrainHubInstance.close()">✕ CLOSE</div>
        </div>
        <div class="hub-tabs">
            <div class="hub-tab active" data-tab="overview">📊 OVERVIEW</div>
            <div class="hub-tab" data-tab="console">💻 CONSOLE</div>
            <div class="hub-tab" data-tab="audit">📋 AUDIT</div>
            <div class="hub-tab" data-tab="hotpatch">🔧 HOT-PATCH</div>
            <div class="hub-tab" data-tab="database">🗄️ DATABASE</div>
        </div>
        <div class="hub-content" id="hub-content">${this.renderOverview()}</div>
        <div class="hub-footer">ISO 27001 | 55001 | Dream Team Family | Bi idznillah 💚</div>
        `;
    }

    renderOverview() {
        const diag = window.Sovereign?.getSystemDiagnostic?.() || {};
        return `
        <div class="hub-grid">
            <div class="hub-card"><div class="hub-card-title">🔒 SECURITY</div>
                <div class="hub-stat"><span class="hub-stat-label">Identity</span><span class="hub-stat-value">GHOST-ARCHITECT</span></div>
                <div class="hub-stat"><span class="hub-stat-label">Integrity</span><span class="hub-stat-value">${diag.integrity || 'VERIFIED'}</span></div>
            </div>
            <div class="hub-card"><div class="hub-card-title">⚡ KERNEL</div>
                <div class="hub-stat"><span class="hub-stat-label">Device</span><span class="hub-stat-value">Redmi Note 9 Pro</span></div>
                <div class="hub-stat"><span class="hub-stat-label">Status</span><span class="hub-stat-value" style="color:#10b981">HEALTHY</span></div>
            </div>
        </div>
        <div style="margin-top:20px; text-align:center;">
            <button class="hub-btn" onclick="window.BrainHubInstance.switchTab('console')">💻 OPEN KERNEL CONSOLE</button>
            <button class="hub-btn" onclick="location.reload()">🔄 REBOOT SYSTEM</button>
        </div>
        `;
    }

    renderConsole() {
        const logs = this.consoleBuffer.slice().reverse();
        return `
        <div style="margin-bottom:8px;">
            <button class="hub-btn" onclick="window.BrainHubInstance.clearConsole()">🗑️ CLEAR</button>
        </div>
        <div class="hub-console">${logs.map(l => `<div class="console-${l.level}">[${l.timestamp}] ${l.level}: ${l.message}</div>`).join('') || 'Waiting for logs...'}</div>
        `;
    }

    bindEvents() {
        const tabs = document.querySelectorAll('.hub-tab');
        tabs.forEach(tab => {
            tab.onclick = () => this.switchTab(tab.getAttribute('data-tab'));
        });
    }

    switchTab(tab) {
        this.activeTab = tab;
        document.querySelectorAll('.hub-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`.hub-tab[data-tab="${tab}"]`)?.classList.add('active');
        const content = document.getElementById('hub-content');
        
        if (tab === 'overview') content.innerHTML = this.renderOverview();
        else if (tab === 'console') content.innerHTML = this.renderConsole();
        else if (tab === 'audit') content.innerHTML = `<div class="hub-card">Audit Trail is active. Standard ISO 9001.</div>`;
        else if (tab === 'hotpatch') content.innerHTML = `<div class="hub-card">Ready for code injection.</div>`;
        else if (tab === 'database') content.innerHTML = `<div class="hub-card">Database ISO 55001 Synced.</div>`;
    }

    close() {
        const overlay = document.getElementById('brain-hub');
        if (overlay) overlay.remove();
        this.isVisible = false;
    }

    clearConsole() { this.consoleBuffer = []; this.switchTab('console'); }
}

// ═══════════════════════════════════════════════════════════════════════
// BRIDGE UNTUK SHELL.JS (Sangat Penting!)
// ═══════════════════════════════════════════════════════════════════════
export default function({ container, user }) {
    console.log('[GHOST] 🔐 Activating Brain Hub LUX...');
    BrainHub.render();
    
    // Tampilkan konfirmasi di container utama agar tidak stuck logo
    if (container) {
        container.innerHTML = `
            <div style="height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#020617; color:#10b981; font-family:monospace;">
                <div style="font-size:3rem; animation: pulse 2s infinite;">🧠</div>
                <p>BRAIN HUB LUX ACTIVE</p>
                <button onclick="location.reload()" style="background:none; border:1px solid #10b981; color:#10b981; padding:10px; border-radius:5px; cursor:pointer;">EXIT GHOST MODE</button>
            </div>
        `;
    }
}
