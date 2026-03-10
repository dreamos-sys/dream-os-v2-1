/* ============================================
   🕌 DREAM OS 2026 - HOME MODULE
   Main Dashboard
   ============================================ */

export async function init(params) {
  console.log('🏠 [HOME] Module initialized');
}

export async function render(params) {
  const prayerTimes = DREAM.utils?.prayerTime?.getTimes();
  
  return `
    <div class="bento-grid animate-in">
      <!-- Security Status Card -->
      <div class="bento-card bento-large">
        <div class="metric-label">🛡️ Security Status</div>
        <div class="metric-value">98.5%</div>
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
        <div class="metric-value">1,247</div>
        <div class="metric-trend up">↑ +12</div>
      </div>
      
      <!-- Network Status -->
      <div class="bento-card bento-medium">
        <div class="metric-label">📶 Network</div>
        <div class="metric-value">5G</div>
        <div class="metric-trend up">Excellent</div>
      </div>
      
      <!-- Quick Actions -->
      <div class="bento-card bento-small">
        <div class="metric-label">⚡ Quick Actions</div>
        <button class="btn btn-primary" style="width: 100%; margin-top: 8px;" onclick="DREAM.load('qr-scanner')">
          Scan Now
        </button>
      </div>
      
      <!-- AI Insights -->
      <div class="bento-card bento-full">
        <div class="metric-label">🤖 AI Insights</div>
        <p style="color: var(--color-slate-400); font-size: var(--text-body);">
          System operating optimally. No anomalies detected in the last 24 hours.
          Tap the AI button for personalized assistance.
        </p>
      </div>
    </div>
  `;
}

export async function afterRender(params) {
  console.log('🏠 [HOME] Module rendered');
}

export function refresh() {
  console.log('🏠 [HOME] Module refreshed');
}
