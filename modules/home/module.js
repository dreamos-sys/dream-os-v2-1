// modules/home/module.js
export async function render() {
    // Data statis sementara (nanti bisa diganti dengan data real)
    const prayerTimes = window.DREAM?.utils?.prayerTime?.getTimes?.() || {};
    const networkStatus = window.DREAM?.state?.networkStatus ? 'Online' : 'Offline';
    const networkType = window.DREAM?.utils?.network?.type?.toUpperCase() || '4G';
    
    // Data untuk explainable AI
    const securityScore = 98.5;
    const threatsBlocked = 2;
    const assetsCount = 1247;
    const anomalies = 0;
    
    const insight = {
        message: "System operating optimally",
        reason: `${threatsBlocked} threats blocked in 24h. No anomalies.`,
        confidence: `${securityScore}% based on ${assetsCount} assets`
    };
    
    return `
        <div class="bento-grid animate-in">
            <!-- Security Status Card -->
            <div class="bento-card bento-large">
                <div class="metric-label">🛡️ Security Status</div>
                <div class="metric-value">${securityScore}%</div>
                <div class="metric-trend up">↑ +2.3% this week</div>
                <div class="security-status" style="margin-top: 12px;">
                    <span class="status-dot secure"></span>
                    <span>All Systems Normal</span>
                </div>
            </div>
            
            <!-- Prayer Time Card -->
            <div class="bento-card bento-small">
                <div class="metric-label">🕌 Next Prayer</div>
                <div class="metric-value" style="font-size: 1.5rem;">
                    ${prayerTimes?.Dhuhr || '--:--'}
                </div>
                <div class="metric-trend">Dhuhr</div>
            </div>
            
            <!-- Assets Card -->
            <div class="bento-card bento-small">
                <div class="metric-label">📦 Assets</div>
                <div class="metric-value">${assetsCount.toLocaleString()}</div>
                <div class="metric-trend up">↑ +12</div>
            </div>
            
            <!-- Network Status -->
            <div class="bento-card bento-medium">
                <div class="metric-label">📶 Network</div>
                <div class="metric-value">${networkStatus}</div>
                <div class="metric-trend up">${networkType}</div>
            </div>
            
            <!-- Quick Actions -->
            <div class="bento-card bento-small">
                <div class="metric-label">⚡ Quick Actions</div>
                <button class="btn btn-primary" style="width: 100%; margin-top: 8px;" onclick="window.DREAM.load('qr')">
                    Scan Now
                </button>
            </div>
            
            <!-- AI Insights (Explainable) -->
            <div class="bento-card bento-full insight-card">
                <div class="metric-label">🤖 AI Insights</div>
                <p class="insight-message">${insight.message}</p>
                <p class="insight-reason">${insight.reason}</p>
                <div class="insight-confidence">
                    <span>Confidence</span>
                    <span>${insight.confidence}</span>
                </div>
            </div>
        </div>
    `;
}

// Optional: init function jika diperlukan
export async function init() {
    console.log('🏠 Home module initialized');
}
