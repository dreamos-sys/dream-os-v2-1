/**
 * ═══════════════════════════════════════════════════════════════════════
 * SHELL UI ENGINE - SOVEREIGN ENTERPRISE v3.5
 * Integrated with BrainCore & GhostAntibody
 * 
 * Features:
 * - Bento Grid Layout (Luxury Design)
 * - Neural AI Status Display
 * - 5-Tap Stealth Activation
 * - Real-time System Metrics
 * - Enterprise Navigation
 * 
 * Ghost Architect: Hidden Developer Access
 * ═══════════════════════════════════════════════════════════════════════
 */

'use strict';

/**
 * Render Main Shell
 */
const renderShell = () => {
    const app = document.getElementById('app-shell');
    if (!app) {
        console.error('[SHELL] App shell container not found');
        return;
    }
    
    // Get system diagnostic
    const diagnostic = window.Sovereign?.getSystemDiagnostic() || {};
    const { environment = {}, neural = {} } = diagnostic;
    
    app.innerHTML = `
        <!-- Header with Stealth Trigger -->
        <header class="glass-header" id="ghost-trigger-zone" style="cursor:default;">
            <!-- Status Bar -->
            <div style="display:flex;justify-content:space-between;font-family:var(--font-mono, monospace);font-size:10px;color:var(--color-primary, #10b981);opacity:0.7;margin-bottom:6px;">
                <span>📍 DEPOK CORE | ${new Date().toLocaleTimeString('id-ID')}</span>
                <span>ISO 27001-55001 ✅</span>
            </div>
            
            <!-- Arabic Bismillah & Shalawat -->
            <div style="text-align:center;padding:8px 0;">
                <h1 style="font-family:'Amiri',serif;font-size:1.6rem;color:#10b981;text-shadow:0 0 10px rgba(16,185,129,0.5);margin-bottom:4px;">
                    بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                </h1>
                <p style="font-family:'Amiri',serif;font-size:0.95rem;color:#94a3b8;letter-spacing:1px;">
                    اَللهم صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ
                </p>
            </div>
            
            <!-- System Info -->
            <div style="font-size:9px;text-align:center;color:#64748b;margin-top:6px;">
                ${environment.device || 'Device'} | ${environment.browser || 'Browser'} | ${environment.network?.toUpperCase() || 'Network'}
            </div>
        </header>

        <!-- Main Content with Bento Grid -->
        <main style="padding:16px;padding-bottom:140px;animation:fadeIn 0.5s ease;">
            <div class="bento-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px;">
                
                <!-- Large Card: Neural Brain Core -->
                <div class="bento-card bento-large" style="grid-column:span 2;background:linear-gradient(135deg,rgba(16,185,129,0.1),transparent);border:1px solid rgba(16,185,129,0.2);border-radius:16px;padding:20px;">
                    <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px;">
                        <h3 style="color:#10b981;font-size:1.1rem;font-weight:700;letter-spacing:0.5px;">
                            🧠 Neural Brain Core
                        </h3>
                        <i class="fas fa-network-wired" style="color:#10b981;font-size:1.5rem;"></i>
                    </div>
                    
                    <!-- AI Nodes Status -->
                    <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
                        ${Object.entries(neural.nodes || {}).map(([name, node]) => `
                            <div style="background:rgba(15,23,42,0.6);padding:6px 12px;border-radius:8px;border:1px solid rgba(16,185,129,0.3);font-size:10px;">
                                <strong>${name}:</strong> <span style="color:#10b981;">${node.status}</span> <span style="opacity:0.7;">(${node.load})</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <!-- System Status -->
                    <div style="margin-top:auto;font-family:var(--font-mono,monospace);font-size:10px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.05);">
                        <div style="color:#10b981;margin-bottom:4px;">
                            🟢 SYSTEM: OPERATIONAL
                        </div>
                        <div style="color:#64748b;">
                            ARCHITECT_ID: ${diagnostic.fingerprint || 'LOCKED'}
                        </div>
                    </div>
                </div>
                
                <!-- Security Module -->
                <div class="bento-card bento-small" onclick="DREAM.load('sekuriti')" style="background:rgba(15,23,42,0.8);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:16px;cursor:pointer;transition:all 0.2s;">
                    <i class="fas fa-shield-check" style="color:#10b981;font-size:2rem;display:block;margin-bottom:8px;"></i>
                    <span style="font-size:12px;font-weight:600;color:#e2e8f0;">Sekuriti</span>
                    <div style="font-size:9px;color:#64748b;margin-top:4px;">Monitoring & Patrol</div>
                </div>
                
                <!-- Inventory Module -->
                <div class="bento-card bento-small" onclick="DREAM.load('inventory')" style="background:rgba(15,23,42,0.8);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:16px;cursor:pointer;transition:all 0.2s;">
                    <i class="fas fa-boxes-alt" style="color:#10b981;font-size:2rem;display:block;margin-bottom:8px;"></i>
                    <span style="font-size:12px;font-weight:600;color:#e2e8f0;">Inventaris</span>
                    <div style="font-size:9px;color:#64748b;margin-top:4px;">Asset Management</div>
                </div>
                
                <!-- K3 Module -->
                <div class="bento-card bento-small" onclick="DREAM.load('k3')" style="background:rgba(15,23,42,0.8);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:16px;cursor:pointer;transition:all 0.2s;">
                    <i class="fas fa-broom" style="color:#10b981;font-size:2rem;display:block;margin-bottom:8px;"></i>
                    <span style="font-size:12px;font-weight:600;color:#e2e8f0;">K3</span>
                    <div style="font-size:9px;color:#64748b;margin-top:4px;">Safety & Hygiene</div>
                </div>
                
                <!-- Asset Module -->
                <div class="bento-card bento-small" onclick="DREAM.load('asset')" style="background:rgba(15,23,42,0.8);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:16px;cursor:pointer;transition:all 0.2s;">
                    <i class="fas fa-tools" style="color:#10b981;font-size:2rem;display:block;margin-bottom:8px;"></i>
                    <span style="font-size:12px;font-weight:600;color:#e2e8f0;">Aset</span>
                    <div style="font-size:9px;color:#64748b;margin-top:4px;">Equipment Tracking</div>
                </div>
                
                <!-- Maintenance Log -->
                <div class="bento-card bento-medium" style="grid-column:span 2;background:rgba(15,23,42,0.8);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:16px;">
                    <h4 style="font-size:11px;color:#94a3b8;text-transform:uppercase;margin-bottom:8px;">
                        📋 Maintenance Log
                    </h4>
                    <p style="font-size:13px;color:#e2e8f0;line-height:1.6;">
                        <strong style="color:#10b981;">Bpk Hanung Budianto:</strong> System Approved ✅<br>
                        <strong style="color:#10b981;">Bpk Erwinsyah:</strong> Asset Tracking Active ✅
                    </p>
                    <div style="font-size:9px;color:#64748b;margin-top:8px;font-family:var(--font-mono,monospace);">
                        Last updated: ${new Date().toLocaleString('id-ID')}
                    </div>
                </div>
                
            </div>
        </main>

        <!-- Bottom Navigation -->
        <nav class="glass-footer" style="position:fixed;bottom:0;left:0;right:0;background:rgba(15,23,42,0.95);backdrop-filter:blur(20px);border-top:1px solid rgba(16,185,129,0.2);padding:12px;z-index:40;">
            <div style="display:flex;justify-content:space-around;align-items:center;max-width:500px;margin:0 auto;">
                <!-- Home -->
                <button class="nav-item active" onclick="DREAM.load('home')" style="display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:none;color:#10b981;cursor:pointer;padding:8px 12px;border-radius:8px;transition:all 0.2s;">
                    <i class="fas fa-grid-2" style="font-size:1.25rem;"></i>
                    <span style="font-size:9px;font-weight:600;">Dash</span>
                </button>
                
                <!-- K3 -->
                <button class="nav-item" onclick="DREAM.load('k3')" style="display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:none;color:#64748b;cursor:pointer;padding:8px 12px;border-radius:8px;transition:all 0.2s;">
                    <i class="fas fa-broom" style="font-size:1.25rem;"></i>
                    <span style="font-size:9px;font-weight:600;">K3</span>
                </button>
                
                <!-- Center: AI/Shalawat Button -->
                <div style="margin-top:-50px;cursor:pointer;" id="ghost-trigger-btn">
                    <div style="width:68px;height:68px;background:linear-gradient(135deg,#10b981,#059669);border-radius:20px;transform:rotate(45deg);display:flex;align-items:center;justify-content:center;border:3px solid #020617;box-shadow:0 0 30px rgba(16,185,129,0.4);">
                        <div style="transform:rotate(-45deg);font-family:'Amiri',serif;color:white;font-size:12px;text-align:center;font-weight:700;">
                            صلوات
                        </div>
                    </div>
                </div>
                
                <!-- Asset -->
                <button class="nav-item" onclick="DREAM.load('asset')" style="display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:none;color:#64748b;cursor:pointer;padding:8px 12px;border-radius:8px;transition:all 0.2s;">
                    <i class="fas fa-tools" style="font-size:1.25rem;"></i>
                    <span style="font-size:9px;font-weight:600;">Aset</span>
                </button>
                
                <!-- Admin -->
                <button class="nav-item" onclick="DREAM.load('settings')" style="display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:none;color:#64748b;cursor:pointer;padding:8px 12px;border-radius:8px;transition:all 0.2s;">
                    <i class="fas fa-user-shield" style="font-size:1.25rem;"></i>
                    <span style="font-size:9px;font-weight:600;">Admin</span>
                </button>
            </div>
        </nav>
    `;
    
    // Setup Ghost Stealth Activation
    setupGhostActivation();
    
    // Add nav hover effects
    addNavHoverEffects();
    
    // Add bento card hover effects
    addBentoHoverEffects();
};

/**
 * Setup Ghost Stealth Activation (5-tap on header)
 */
function setupGhostActivation() {
    let taps = 0;
    let tapTimeout;
    
    const triggerZone = document.getElementById('ghost-trigger-zone');
    if (!triggerZone) return;
    
    triggerZone.addEventListener('click', () => {
        taps++;
        
        // Clear previous timeout
        if (tapTimeout) clearTimeout(tapTimeout);
        
        // Visual feedback
        if (taps > 0) {
            triggerZone.style.opacity = 1 - (taps * 0.15);
        }
        
        // Activate Ghost Brain Hub on 5 taps
        if (taps === 5) {
            console.log('[GHOST] 🔓 Activating Brain Hub...');
            
            // Reset
            taps = 0;
            triggerZone.style.opacity = '';
            
            // Activate Brain Hub
            if (window.BrainHub) {
                window.BrainHub.render();
            } else {
                console.error('[GHOST] Brain Hub not loaded');
                alert('⚠️ Brain Hub module not loaded. Please check js/kernel/brain-hub.js');
            }
            
            return;
        }
        
        // Reset after 2 seconds
        tapTimeout = setTimeout(() => {
            taps = 0;
            triggerZone.style.opacity = '';
        }, 2000);
    });
    
    console.log('[GHOST] 👻 Stealth activation ready (5-tap on header)');
}

/**
 * Add Navigation Hover Effects
 */
function addNavHoverEffects() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (!item.classList.contains('active')) {
                item.style.background = 'rgba(16,185,129,0.1)';
                item.style.color = '#10b981';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (!item.classList.contains('active')) {
                item.style.background = 'none';
                item.style.color = '#64748b';
            }
        });

        // Di dalam bottom navigation, tambahkan tombol baru
<button class="nav-item" data-module="booking" onclick="DREAM.load('booking')">
    <i class="fas fa-calendar-alt"></i>
    <span>Booking</span>
</button>
    });
}

/**
 * Add Bento Card Hover Effects
 */
function addBentoHoverEffects() {
    const cards = document.querySelectorAll('.bento-card[onclick]');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
            card.style.boxShadow = '0 8px 32px rgba(16,185,129,0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
}

/**
 * Add Global Animations
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .nav-item.active {
        background: rgba(16,185,129,0.15) !important;
        color: #10b981 !important;
    }
    
    .bento-card:hover {
        border-color: rgba(16,185,129,0.5) !important;
    }
`;
document.head.appendChild(style);

// ═══════════════════════════════════════════════════════════════════════
// AUTO-RENDER ON DOM READY
// ═══════════════════════════════════════════════════════════════════════

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderShell);
} else {
    renderShell();
}

console.log('[SHELL] 🎨 Sovereign Enterprise Shell loaded');
console.log('[SHELL] Ghost Architect: 5-tap header for Brain Hub');
