/**
 * 🏛️ DREAM OS v13.4 - SHELL CORE
 * Integrated with ISO 27001 | 9001 | 55001
 * Bismillah bi idznillah.
 */

export const DreamShell = {
    modules: [
        { id: 'booking', name: 'BOOKING', icon: '📅', color: '#00bcd4' },
        { id: 'k3', name: 'K3 SMART', icon: '🛡️', color: '#ff9800' },
        { id: 'teknisi', name: 'TEKNISI', icon: '🛠️', color: '#fdd835' },
        { id: 'gudang', name: 'GUDANG', icon: '📦', color: '#9c27b0' },
        { id: 'indoor', name: 'INDOOR', icon: '🧹', color: '#4caf50' },
        { id: 'outdoor', name: 'OUTDOOR', icon: '🌲', color: '#26a69a' },
        { id: 'dana', name: 'DANA', icon: '👛', color: '#1e88e5' },
        { id: 'predictive', name: 'PREDICTIVE', icon: '🧠', color: '#ba68c8' },
        { id: 'admin', name: 'ADMIN', icon: '👤', color: '#607d8b' }
    ],

    renderHeader: function() {
        return `
            <header class="dream-header">
                <div class="header-top">
                    <h1>DREAM OS <small>v13.4</small></h1>
                    <div class="fingerprint-btn">🆔</div>
                </div>
                <p class="iso-tag">ISO 27001 | 9001 | 55001 COMPLIANT</p>
                <div class="spiritual-blessing">
                    <small>Bismillah bi idznillah,</small>
                    <h2>Halo, My Bro Architect 🧐</h2>
                    <p class="sholawat-tagline">"The Power Soul Of Shalawat"</p>
                </div>
            </header>
        `;
    },

    renderGrid: function() {
        let gridHtml = '<div class="dream-grid">';
        this.modules.forEach(m => {
            gridHtml += `
                <div class="grid-item" onclick="app.open('${m.id}')">
                    <div class="icon-box" style="background:${m.color}22; color:${m.color}">${m.icon}</div>
                    <span>${m.name}</span>
                </div>
            `;
        });
        gridHtml += '</div>';
        return gridHtml;
    },

    renderBottomNav: function() {
        return `
            <nav class="nav-bottom">
                <div class="nav-item active">🏠<span>Home</span></div>
                <div class="nav-item">📊<span>Stat</span></div>
                <div class="nav-item">💬<span>AI Agent</span></div>
                <div class="nav-item">⚙️<span>Settings</span></div>
            </nav>
        `;
    },

    init: function() {
        const app = document.getElementById('app');
        app.innerHTML = `
            ${this.renderHeader()}
            <main class="content-area">
                ${this.renderGrid()}
                <div class="ai-insights">
                    <h3>⚡ DREAM AI INSIGHTS</h3>
                    <div class="insight-box">
                        ✅ <strong>Sistem Normal:</strong> Performa stabil, Shalawat 1001x active.
                    </div>
                </div>
            </main>
            ${this.renderBottomNav()}
        `;
    }
};

// Start Shell
DreamShell.init();
