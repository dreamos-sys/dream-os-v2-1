// 🛠️ DREAM OS v13.0 - MASTER CONFIGURATION ENGINE
// ISO Standard: 27001 (Security), 9001 (Quality), 55001 (Asset)

window.renderModule = () => {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div style="padding:20px; background:#0f172a; min-height:100vh; color:#f8fafc; font-family:sans-serif;">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:25px; border-bottom:1px solid #1e293b; padding-bottom:15px;">
                <img src="assets/img/icon-192.png" style="width:40px; height:40px;">
                <div>
                    <h3 style="margin:0; color:#10b981;">SYSTEM SETTINGS</h3>
                    <small style="color:#64748b;">Dream OS ver. 13.0 | ISO Standard</small>
                </div>
            </div>

            <div style="background:#1e293b; border-radius:12px; padding:15px; margin-bottom:15px; border-left:4px solid #10b981;">
                <h4 style="margin:0 0 10px 0; font-size:14px; color:#94a3b8;">CORE IDENTITY</h4>
                <div style="font-size:13px;">
                    <p style="margin:5px 0;"><b>Device ID:</b> <span style="color:#10b981;">Xiaomi Redmi Note 9 Pro</span></p>
                    <p style="margin:5px 0;"><b>Architect:</b> Master M</p>
                    <p style="margin:5px 0;"><b>Backup Email:</b> girangati1001@gmail.com</p>
                </div>
            </div>

            <div style="background:#1e293b; border-radius:12px; padding:15px; margin-bottom:15px;">
                <h4 style="margin:0 0 10px 0; font-size:14px; color:#10b981;">SECURITY & TOOLS</h4>
                <div style="display:flex; flex-direction:column; gap:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding-bottom:8px;">
                        <span>Ghost Architect Mode</span>
                        <div style="color:#10b981; font-weight:bold;">ENABLED</div>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding-bottom:8px;">
                        <span>Depok Lightning Shield</span>
                        <div style="color:#10b981; font-weight:bold;">ACTIVE</div>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span>Fingerprint Listening</span>
                        <div style="color:#ef4444; font-weight:bold;">STANDBY</div>
                    </div>
                </div>
            </div>

            <div style="background:#1e293b; border-radius:12px; padding:15px; margin-bottom:15px;">
                <h4 style="margin:0 0 10px 0; font-size:14px; color:#fbbf24;">APPROVAL FLOW</h4>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; font-size:12px;">
                    <div style="background:#0f172a; padding:8px; border-radius:6px;">
                        <span style="color:#64748b;">Applicant:</span><br>
                        <b>Erwinsyah</b>
                    </div>
                    <div style="background:#0f172a; padding:8px; border-radius:6px;">
                        <span style="color:#64748b;">Approver:</span><br>
                        <b>Hanung Budianto S. E</b>
                    </div>
                </div>
            </div>

            <div style="text-align:center; margin-top:30px; opacity:0.6;">
                <p style="font-size:11px; margin:0;">Bismillah bi idznillah</p>
                <p style="font-size:11px; margin:5px 0;">"The Power Soul Of Shalawat"</p>
                <small>SIF Al-Fikri - Global Distribution</small>
            </div>
        </div>
    `;
};
