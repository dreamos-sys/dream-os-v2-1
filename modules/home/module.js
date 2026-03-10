// modules/home/module.js
export async function render() {
    // Data sementara – nanti bisa diganti dengan data real dari utility
    const securityScore = 98.5;
    const securityTrend = '+2.3%';
    const assetsCount = 1247;
    const assetsTrend = '+12';
    const prayerTime = '12:05'; // contoh waktu shalat
    const networkStatus = navigator.onLine ? 'Online' : 'Offline';
    const networkType = '4G';

    return `
        <div class="bento-grid">
            <!-- Security Status -->
            <div class="bento-card bento-large">
                <div class="metric-label">🛡️ Security Status</div>
                <div class="metric-value">${securityScore}%</div>
                <div class="metric-trend up">↑ ${securityTrend} this week</div>
                <div class="security-status">
                    <span class="status-dot secure"></span>
                    <span>All Systems Normal</span>
                </div>
            </div>

            <!-- Prayer Time -->
            <div class="bento-card bento-small">
                <div class="metric-label">🕌 Next Prayer</div>
                <div class="metric-value" style="font-size:1.5rem;">${prayerTime}</div>
                <div class="metric-trend">Dhuhr</div>
            </div>

            <!-- Assets -->
            <div class="bento-card bento-small">
                <div class="metric-label">📦 Assets</div>
                <div class="metric-value">${assetsCount}</div>
                <div class="metric-trend up">↑ ${assetsTrend}</div>
            </div>

            <!-- Network -->
            <div class="bento-card bento-medium">
                <div class="metric-label">📶 Network</div>
                <div class="metric-value">${networkStatus}</div>
                <div class="metric-trend">${networkType}</div>
            </div>

            <!-- Quick Actions -->
            <div class="bento-card bento-small">
                <div class="metric-label">⚡ Quick Actions</div>
                <button class="btn btn-primary" onclick="window.DREAM.load('qr')">Scan Now</button>
            </div>

            <!-- AI Insights -->
            <div class="bento-card bento-full">
                <div class="metric-label">🤖 AI Insights</div>
                <p style="color: var(--color-text-muted);">
                    System operating optimally. No anomalies detected in the last 24 hours.
                    Tap the AI button for personalized assistance.
                </p>
            </div>
        </div>
    `;
}

export async function init() {
    console.log('🏠 Home module initialized');
}
