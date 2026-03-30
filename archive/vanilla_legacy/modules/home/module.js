/**
 * ══════════════════════════════════════════════════════════════
 * DREAM OS v2.1.5 - SMART AGENT HOME MODULE
 * Feature: Auto-Integration, Real-time Automation, AI Insights
 * ══════════════════════════════════════════════════════════════
 */

export default {
    async render() {
        // 1. Fetch Dynamic Intelligence (Automation)
        const stats = await this.getSystemIntelligence();
        const user = sessionStorage.getItem('dreamos_user') || 'Master Architect';
        
        return `
            <div id="home-agent" style="animation: fadeIn 0.5s ease;">
                <section style="margin-bottom: 25px;">
                    <h2 style="color: #10b981; font-size: 1.2rem; margin:0;">Bismillah,</h2>
                    <h1 style="font-size: 1.8rem; margin:0; letter-spacing: -1px;">${user}</h1>
                    <p style="color: #64748b; font-size: 0.8rem;">Dream Team Singularity is Active.</p>
                </section>

                <div style="background: linear-gradient(135deg, #10b98122, #06b6d422); border: 1px solid #10b98144; padding: 15px; border-radius: 20px; margin-bottom: 20px;">
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                        <i class="fas fa-robot" style="color:#10b981;"></i>
                        <span style="font-size: 10px; font-weight:bold; letter-spacing:1px; color:#10b981;">AI AGENT INSIGHT</span>
                    </div>
                    <p id="ai-message" style="font-size: 0.85rem; line-height: 1.4; color: #cbd5e1;">
                        Memeriksa integritas sistem... Menunggu instruksi Master.
                    </p>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 25px;">
                    <div class="stat-card">
                        <span class="label">DATABASE</span>
                        <span class="value" style="color: #10b981;">Connected</span>
                    </div>
                    <div class="stat-card">
                        <span class="label">SECURITY LEVEL</span>
                        <span class="value" style="color: #f59e0b;">ISO 27001</span>
                    </div>
                </div>

                <h3 style="font-size: 0.9rem; color:#64748b; margin-bottom:15px; letter-spacing:1px;">QUICK AUTOMATION</h3>
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <button onclick="window.DREAM_NAV('qr')" class="action-btn">
                        <i class="fas fa-qrcode"></i> <span>Scan & Report System</span>
                    </button>
                    <button onclick="window.DREAM_NAV('maintenance')" class="action-btn">
                        <i class="fas fa-tools"></i> <span>Active Maintenance</span>
                    </button>
                </div>
            </div>

            <style>
                .stat-card { background: rgba(15, 23, 42, 0.5); padding: 12px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.05); }
                .stat-card .label { display: block; font-size: 8px; color: #64748b; margin-bottom: 4px; letter-spacing: 1px; }
                .stat-card .value { font-size: 12px; font-weight: bold; }
                .action-btn { background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); color: #fff; padding: 15px; border-radius: 15px; display: flex; align-items: center; gap: 15px; font-size: 0.9rem; cursor: pointer; transition: 0.3s; width: 100%; text-align: left; }
                .action-btn:active { transform: scale(0.98); background: rgba(16, 185, 129, 0.2); }
                .action-btn i { color: #10b981; font-size: 1.2rem; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            </style>
        `;
    },

    async getSystemIntelligence() {
        // Simulasi integrasi dengan Supabase untuk log terakhir
        return { status: "Active" };
    }
};
