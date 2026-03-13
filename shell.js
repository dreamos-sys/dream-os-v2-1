/**
 * SHELL UI ENGINE - Sovereign Enterprise v3.5
 * Integrated with BrainCore & GhostAntibody
 */
const renderShell = () => {
    const app = document.getElementById('app-shell');
    app.innerHTML = `
        <header class="glass-header" id="ghost-trigger-zone">
            <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 10px; color: var(--color-primary); opacity: 0.6; margin-bottom: 4px;">
                <span>DEPOK | ${new Date().toLocaleTimeString()}</span>
                <span>ISO 27001-55001 COMPLIANT</span>
            </div>
            <div class="text-center">
                <h1 style="font-family: var(--font-arabic); font-size: 1.6rem; color: var(--color-primary); filter: drop-shadow(0 0 10px var(--color-primary-alpha-50));">
                    بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                </h1>
                <p style="font-family: var(--font-arabic); font-size: 0.9rem; color: var(--color-text-muted); letter-spacing: 1px;">
                    اَللهم صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ
                </p>
            </div>
        </header>

        <main class="animate-fade-in" style="padding: 16px; padding-bottom: 120px;">
            <div class="bento-grid">
                <div class="bento-card bento-large" style="background: linear-gradient(135deg, var(--color-primary-alpha-10), transparent);">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <h3 class="text-emerald-400">Neural Brain Core</h3>
                        <i class="fas fa-network-wired text-emerald-400"></i>
                    </div>
                    <div style="display: flex; gap: 8px; margin-top: 10px;">
                        ${['Gemini', 'Qwen', 'Deepseek'].map(ai => `
                            <div style="background: var(--glass-bg); padding: 4px 8px; border-radius: 6px; font-size: 9px; border: 1px solid var(--color-border-primary);">
                                ${ai}: <span class="text-emerald-400">SYNC</span>
                            </div>
                        `).join('')}
                    </div>
                    <div style="margin-top: auto; font-family: var(--font-mono); font-size: 10px; color: var(--color-success); margin-top: 15px;">
                        SYSTEM: OPERATIONAL | ARCHITECT_ID: ${window.DREAM_SECURITY?.getFingerprint().substring(0,8)}
                    </div>
                </div>

                <div class="bento-card bento-small" onclick="DREAM.load('security')">
                    <i class="fas fa-shield-check text-emerald-400 text-xl"></i>
                    <span style="font-size: 11px; font-weight: 600;">Sekuriti</span>
                </div>

                <div class="bento-card bento-small" onclick="DREAM.load('inventory')">
                    <i class="fas fa-boxes-alt text-emerald-400 text-xl"></i>
                    <span style="font-size: 11px; font-weight: 600;">Inventaris</span>
                </div>

                <div class="bento-card bento-medium">
                    <h4 style="font-size: 10px; color: var(--color-text-dim); text-transform: uppercase;">Maintenance Log</h4>
                    <p style="font-size: 12px; margin-top: 4px;">Bpk Hanung Budianto: System Approved. Bpk Erwinsyah: Asset Tracking Active.</p>
                </div>
            </div>
        </main>

        <nav class="glass-footer">
            <div style="display: flex; justify-content: space-around; align-items: center; max-width: 500px; margin: 0 auto;">
                <button class="nav-item active" onclick="DREAM.load('home')"><i class="fas fa-grid-2"></i><span style="font-size: 9px;">Dash</span></button>
                <button class="nav-item" onclick="DREAM.load('k3')"><i class="fas fa-broom"></i><span style="font-size: 9px;">K3</span></button>

                <div style="margin-top: -50px; cursor: pointer;" id="ghost-trigger-btn">
                    <div style="width: 65px; height: 65px; background: var(--gradient-primary); border-radius: 20px; transform: rotate(45deg); display: flex; align-items: center; justify-content: center; border: 2px solid var(--color-border-primary); box-shadow: var(--shadow-glow-primary);">
                        <div style="transform: rotate(-45deg); font-family: var(--font-arabic); color: white; font-size: 11px; text-align: center;">صلوات</div>
                    </div>
                </div>

                <button class="nav-item" onclick="DREAM.load('asset')"><i class="fas fa-tools"></i><span style="font-size: 9px;">Aset</span></button>
                <button class="nav-item" onclick="DREAM.load('admin')"><i class="fas fa-user-shield"></i><span style="font-size: 9px;">Admin</span></button>
            </div>
        </nav>
    `;

    // Ghost Stealth Architect Activation (5 Tap on Header)
    let taps = 0;
    document.getElementById('ghost-trigger-zone').addEventListener('click', () => {
        taps++;
        if (taps === 5) {
            window.BrainHub.render(); // Call the BrainCore Hub
            taps = 0;
        }
        setTimeout(() => taps = 0, 2000);
    });
};

document.addEventListener('DOMContentLoaded', renderShell);
