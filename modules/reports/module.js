/**
 * modules/reports/module.js
 * Dream OS v2.1 - Reports Module
 */

export async function render({ container, user, supabase }) {
    return `
        <div class="module-container active" id="module-reports">
            <header class="glass-header">
                <div class="status-bar">
                    <span>📍 DEPOK CORE</span>
                    <span>ISO 27001 ✅</span>
                </div>
                <div class="islamic-header">
                    <h1 class="bismillah">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
                    <p class="shalawat">اَللهم صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</p>
                </div>
            </header>

            <main style="padding:16px;padding-bottom:140px;">
                <h2 class="text-2xl font-bold text-emerald-400 mb-6">📊 Reports</h2>
                
                <div class="glass-card p-6 mb-6">
                    <h3 class="text-lg font-semibold mb-4">📋 Report Type</h3>
                    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;">
                        <button onclick="showReport('booking')" class="glass-card p-4 text-left hover:bg-slate-800 transition">
                            <div style="font-size:2rem;margin-bottom:8px;">📅</div>
                            <div style="font-size:0.875rem;font-weight:600;">Booking Report</div>
                        </button>
                        <button onclick="showReport('security')" class="glass-card p-4 text-left hover:bg-slate-800 transition">
                            <div style="font-size:2rem;margin-bottom:8px;">🛡️</div>
                            <div style="font-size:0.875rem;font-weight:600;">Security Report</div>
                        </button>
                        <button onclick="showReport('k3')" class="glass-card p-4 text-left hover:bg-slate-800 transition">
                            <div style="font-size:2rem;margin-bottom:8px;">⚠️</div>
                            <div style="font-size:0.875rem;font-weight:600;">K3 Report</div>
                        </button>
                        <button onclick="showReport('maintenance')" class="glass-card p-4 text-left hover:bg-slate-800 transition">
                            <div style="font-size:2rem;margin-bottom:8px;">🔧</div>
                            <div style="font-size:0.875rem;font-weight:600;">Maintenance Report</div>
                        </button>
                    </div>
                </div>

                <div class="glass-card p-6">
                    <h3 class="text-lg font-semibold mb-4">📊 Report Preview</h3>
                    <div id="report-preview" class="text-center py-8 text-slate-400">
                        <div style="font-size:3rem;margin-bottom:1rem;">📊</div>
                        <p>Select a report type to view</p>
                    </div>                </div>
            </main>

            <nav class="bottom-nav">
                <div class="nav-container">
                    <button class="nav-item" data-nav="home" onclick="window.loadModule('home')">
                        <i class="fas fa-home"></i><span>Home</span>
                    </button>
                    <button class="nav-item" data-nav="booking" onclick="window.loadModule('booking')">
                        <i class="fas fa-calendar-check"></i><span>Booking</span>
                    </button>
                    <button class="nav-item active" data-nav="reports" onclick="window.loadModule('reports')">
                        <i class="fas fa-file-lines"></i><span>Reports</span>
                    </button>
                    <button class="nav-item" data-nav="settings" onclick="window.loadModule('settings')">
                        <i class="fas fa-sliders"></i><span>Settings</span>
                    </button>
                </div>
            </nav>
        </div>
    `;
}

export async function afterRender() {
    console.log('📊 [REPORTS] Module loaded');
    
    window.showReport = function(type) {
        const preview = document.getElementById('report-preview');
        if (!preview) return;
        
        const titles = {
            'booking': '📅 Booking Report',
            'security': '🛡️ Security Report',
            'k3': '⚠️ K3 Report',
            'maintenance': '🔧 Maintenance Report'
        };
        
        const data = localStorage.getItem(`dreamos-${type}`) || '[]';
        const items = JSON.parse(data);
        
        preview.innerHTML = `
            <h4 style="color:var(--text-primary);font-size:1.25rem;margin-bottom:1rem;">${titles[type] || type}</h4>
            <div style="background:rgba(16,185,129,0.1);border:1px solid var(--color-primary);border-radius:8px;padding:1rem;margin-bottom:1rem;">
                <p style="color:var(--text-muted);">Total Records: <span style="color:var(--color-primary);font-weight:600;">${items.length}</span></p>
            </div>
            <div style="display:flex;gap:10px;justify-content:center;">
                <button onclick="exportReport('${type}')" style="padding:12px 24px;background:var(--color-primary);color:white;border:none;border-radius:8px;cursor:pointer;">📤 Export</button>
                <button onclick="window.loadModule('reports')" style="padding:12px 24px;background:transparent;color:var(--text-muted);border:1px solid var(--color-border);border-radius:8px;cursor:pointer;">← Back</button>
            </div>
        `;    };
    
    window.exportReport = function(type) {
        const data = localStorage.getItem(`dreamos-${type}`) || '[]';
        const items = JSON.parse(data);
        const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dreamos-${type}-report-${Date.now()}.json`;
        a.click();
        if (window.toast) {
            window.toast('📤 Report exported!', 'success');
        }
    };
}

export function cleanup() {
    console.log('📊 [REPORTS] Module cleanup');
    delete window.showReport;
    delete window.exportReport;
}
