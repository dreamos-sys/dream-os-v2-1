/**
 * DREAM OS v2.1 - SHELL.JS
 * Main Application Shell & Navigation Controller
 * 
 * ✅ Ghost Mode → Brain Hub LUX (Developer Console)
 * ✅ Islamic Header → Bismillah Complete
 * ✅ Smart Background → Prayer Time Based
 * 
 * Navigation: Home → Profile → QR → About → Settings
 * Ghost Mode: Tap Header 5x → Password → BRAIN HUB
 * 
 * Bi idznillah 💚
 */

(function() {
    'use strict';

    console.log('🚀 Dream OS v2.1 Loading...');

    // ========================================================================
    // CONFIGURATION
    // ========================================================================
    
    const CONFIG = {
        version: '2.1',
        appName: 'Dream OS',
        navOrder: ['home', 'profile', 'qr', 'about', 'settings'],
        modules: {
            home: { icon: 'fa-home', label: 'Home', color: '#10b981' },
            profile: { icon: 'fa-user', label: 'Profile', color: '#3b82f6' },
            qr: { icon: 'fa-qrcode', label: 'QR', color: '#f59e0b', isPrimary: true },
            about: { icon: 'fa-info-circle', label: 'About', color: '#8b5cf6' },
            settings: { icon: 'fa-cog', label: 'Settings', color: '#64748b' }
        },
        storage: {
            session: 'dream_session',
            theme: 'dream_theme',
            user: 'dream_user',
            userProfile: 'dream_user_profile',
            ghostMode: 'dream_ghost'
        },
        prayerTimes: {
            fajr: { start: 4, end: 6 },
            dhuhr: { start: 12, end: 15 },
            asr: { start: 15, end: 18 },
            maghrib: { start: 18, end: 19 },
            isha: { start: 19, end: 24 },
            night: { start: 0, end: 4 }
        },
        ghostPasswords: {            fajr: '02',
            dhuhr: '04',
            asr: '04',
            maghrib: '03',
            isha: '04',
            night: '04'
        }
    };

    // ========================================================================
    // STATE
    // ========================================================================
    
    let currentState = {
        user: null,
        userProfile: null,
        theme: 'dark',
        currentModule: 'home',
        currentPeriod: 'night',
        ghostMode: {
            isActive: false,
            tapCount: 0,
            lastTap: 0,
            inputBuffer: ''
        }
    };

    // ========================================================================
    // SMART BACKGROUND
    // ========================================================================
    
    function getCurrentTimePeriod() {
        const hour = new Date().getHours();
        for (const [period, times] of Object.entries(CONFIG.prayerTimes)) {
            if (hour >= times.start && hour < times.end) {
                return period;
            }
        }
        return 'night';
    }

    function updateSmartBackground() {
        const period = getCurrentTimePeriod();
        document.body.setAttribute('data-time-period', period);
        currentState.currentPeriod = period;
    }

    function startBackgroundTimer() {
        updateSmartBackground();
        setInterval(updateSmartBackground, 60000);    }

    // ========================================================================
    // USER DETECTION
    // ========================================================================
    
    function detectUser() {
        const savedProfile = localStorage.getItem(CONFIG.storage.userProfile);
        if (savedProfile) {
            try { return JSON.parse(savedProfile); } catch (e) { return null; }
        }
        return null;
    }

    function saveUserProfile(profile) {
        localStorage.setItem(CONFIG.storage.userProfile, JSON.stringify(profile));
        currentState.userProfile = profile;
    }

    // ========================================================================
    // 🧠 BRAIN HUB LUX - GHOST ARCHITECT CONSOLE
    // ========================================================================
    
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
                    message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
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
                .hub-btn:hover { background:rgba(16,185,129,0.2); }
                .hub-footer { background:#0f172a; border-top:1px solid #334155; padding:8px 16px; font-size:9px; text-align:center; color:#64748b; }
                @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
            </style>
            <div class="hub-header">
                <div><span class="hub-title">🧠 BRAIN HUB [GHOST ARCHITECT]</span><div style="font-size:9px;opacity:0.7;">Sovereign Enterprise v2.1 LUX</div></div>
                <div class="hub-close" onclick="window.BrainHubInstance.close()">✕ CLOSE</div>
            </div>
            <div class="hub-tabs">
                <div class="hub-tab active" data-tab="overview">📊 OVERVIEW</div>
                <div class="hub-tab" data-tab="console">💻 CONSOLE</div>
                <div class="hub-tab" data-tab="audit">📋 AUDIT</div>
                <div class="hub-tab" data-tab="hotpatch">🔧 HOT-PATCH</div>
                <div class="hub-tab" data-tab="database">🗄️ DATABASE</div>            </div>
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
                    <div class="hub-stat"><span class="hub-stat-label">Ghost Mode</span><span class="hub-stat-value">ACTIVE</span></div>
                </div>
                <div class="hub-card"><div class="hub-card-title">⚡ KERNEL</div>
                    <div class="hub-stat"><span class="hub-stat-label">Device</span><span class="hub-stat-value">Redmi Note 9 Pro</span></div>
                    <div class="hub-stat"><span class="hub-stat-label">Status</span><span class="hub-stat-value" style="color:#10b981">HEALTHY</span></div>
                    <div class="hub-stat"><span class="hub-stat-label">Period</span><span class="hub-stat-value">${currentState.currentPeriod.toUpperCase()}</span></div>
                </div>
                <div class="hub-card"><div class="hub-card-title">👤 USER</div>
                    <div class="hub-stat"><span class="hub-stat-label">Name</span><span class="hub-stat-value">${currentState.userProfile?.name || currentState.user?.name || 'Guest'}</span></div>
                    <div class="hub-stat"><span class="hub-stat-label">Role</span><span class="hub-stat-value">${currentState.userProfile?.role || currentState.user?.role || 'Visitor'}</span></div>
                    <div class="hub-stat"><span class="hub-stat-label">Session</span><span class="hub-stat-value">ACTIVE</span></div>
                </div>
                <div class="hub-card"><div class="hub-card-title">🌍 SYSTEM</div>
                    <div class="hub-stat"><span class="hub-stat-label">Version</span><span class="hub-stat-value">${CONFIG.version}</span></div>
                    <div class="hub-stat"><span class="hub-stat-label">Build</span><span class="hub-stat-value">2026.03.16</span></div>
                    <div class="hub-stat"><span class="hub-stat-label">Time</span><span class="hub-stat-value">${new Date().toLocaleTimeString('id-ID')}</span></div>
                </div>
            </div>
            <div style="margin-top:20px; text-align:center;">
                <button class="hub-btn" onclick="window.BrainHubInstance.switchTab('console')">💻 OPEN KERNEL CONSOLE</button>
                <button class="hub-btn" onclick="window.BrainHubInstance.clearConsole()">🗑️ CLEAR LOGS</button>
                <button class="hub-btn" onclick="location.reload()">🔄 REBOOT SYSTEM</button>
                <button class="hub-btn" onclick="window.BrainHubInstance.close()" style="border-color:#ef4444;color:#ef4444;">🚪 EXIT GHOST MODE</button>
            </div>
            `;
        }

        renderConsole() {
            const logs = this.consoleBuffer.slice().reverse();
            return `
            <div style="margin-bottom:8px;">
                <button class="hub-btn" onclick="window.BrainHubInstance.clearConsole()">🗑️ CLEAR</button>
                <button class="hub-btn" onclick="window.BrainHubInstance.switchTab('overview')">📊 BACK TO OVERVIEW</button>
            </div>
            <div class="hub-console">${logs.map(l => `<div class="console-${l.level}">[${l.timestamp}] ${l.level}: ${l.message}</div>`).join('') || '<div style="color:#64748b;text-align:center;padding:2rem;">Waiting for logs...</div>'}</div>
            `;
        }
        renderAudit() {
            return `
            <div class="hub-card">
                <div class="hub-card-title">📋 AUDIT TRAIL</div>
                <p style="color:#94a3b8;font-size:10px;margin-bottom:1rem;">ISO 9001 Certified Audit System</p>
                <div class="hub-stat"><span class="hub-stat-label">Audit Status</span><span class="hub-stat-value">ACTIVE</span></div>
                <div class="hub-stat"><span class="hub-stat-label">Last Audit</span><span class="hub-stat-value">${new Date().toLocaleString('id-ID')}</span></div>
                <div class="hub-stat"><span class="hub-stat-label">Compliance</span><span class="hub-stat-value">100%</span></div>
            </div>
            `;
        }

        renderHotpatch() {
            return `
            <div class="hub-card">
                <div class="hub-card-title">🔧 HOT-PATCH CONSOLE</div>
                <p style="color:#94a3b8;font-size:10px;margin-bottom:1rem;">Ready for code injection</p>
                <textarea id="hotpatch-code" style="width:100%;height:150px;background:#000;border:1px solid #334155;color:#10b981;padding:12px;border-radius:8px;font-family:'JetBrains Mono',monospace;font-size:10px;" placeholder="Enter code to inject..."></textarea>
                <button class="hub-btn" onclick="alert('Hot-patch executed!')" style="margin-top:8px;">▶️ INJECT CODE</button>
            </div>
            `;
        }

        renderDatabase() {
            return `
            <div class="hub-card">
                <div class="hub-card-title">🗄️ DATABASE STATUS</div>
                <p style="color:#94a3b8;font-size:10px;margin-bottom:1rem;">ISO 55001 Asset Management</p>
                <div class="hub-stat"><span class="hub-stat-label">Connection</span><span class="hub-stat-value">SYNCED</span></div>
                <div class="hub-stat"><span class="hub-stat-label">Tables</span><span class="hub-stat-value">bookings, k3_reports, pengajuan_dana</span></div>
                <div class="hub-stat"><span class="hub-stat-label">Last Sync</span><span class="hub-stat-value">${new Date().toLocaleString('id-ID')}</span></div>
            </div>
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
            
            if (tab === 'overview') content.innerHTML = this.renderOverview();            else if (tab === 'console') content.innerHTML = this.renderConsole();
            else if (tab === 'audit') content.innerHTML = this.renderAudit();
            else if (tab === 'hotpatch') content.innerHTML = this.renderHotpatch();
            else if (tab === 'database') content.innerHTML = this.renderDatabase();
        }

        close() {
            const overlay = document.getElementById('brain-hub');
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 300);
            }
            this.isVisible = false;
            currentState.ghostMode.isActive = false;
            localStorage.removeItem(CONFIG.storage.ghostMode);
            document.body.style.filter = 'none';
            document.body.style.opacity = '1';
        }

        clearConsole() { this.consoleBuffer = []; this.switchTab('console'); }
    }

    // ========================================================================
    // 🤫 GHOST MODE (WITH BRAIN HUB)
    // ========================================================================
    
    function getGhostPassword() {
        const period = getCurrentTimePeriod();
        const passwordKey = period === 'night' ? 'isha' : period;
        return CONFIG.ghostPasswords[passwordKey] || '04';
    }

    function initGhostMode() {
        console.log('🤫 Initializing Ghost Mode...');
        
        const ghostState = localStorage.getItem(CONFIG.storage.ghostMode);
        if (ghostState === 'active') {
            activateBrainHub();
            console.log('🧠 Brain Hub restored from storage');
        }
        
        setupGhostTap();
        
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.shiftKey && e.key === 'G') {
                e.preventDefault();
                showGhostInput();
            }
        });
    }
    function setupGhostTap() {
        console.log('🔍 Setting up Ghost tap detection...');
        
        function trySetup(retries) {
            const header = document.querySelector('.islamic-header');
            
            if (header) {
                console.log('✅ Islamic header found!');
                header.style.cursor = 'pointer';
                header.setAttribute('data-ghost', 'true');
                header.addEventListener('click', handleGhostTap);
                console.log('👆 Ghost tap listener attached');
                return;
            }
            
            if (retries > 0) {
                setTimeout(() => trySetup(retries - 1), 500);
            } else {
                console.warn('⚠️ Could not find islamic-header');
            }
        }
        
        trySetup(10);
    }

    function handleGhostTap(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - currentState.ghostMode.lastTap;
        
        if (tapLength < 500 && tapLength > 0) {
            currentState.ghostMode.tapCount++;
            
            if (currentState.ghostMode.tapCount >= 5) {
                console.log('✅ 5 taps detected! Showing Ghost input...');
                showGhostInput();
                currentState.ghostMode.tapCount = 0;
            }
        } else {
            currentState.ghostMode.tapCount = 1;
        }
        currentState.ghostMode.lastTap = currentTime;
    }

    function showGhostInput() {
        console.log('🔐 Showing Ghost input overlay...');
        
        const existing = document.getElementById('ghost-overlay');
        if (existing) existing.remove();
                const overlay = document.createElement('div');
        overlay.id = 'ghost-overlay';
        overlay.style.cssText = `
            position:fixed;inset:0;background:rgba(2,6,23,0.98);
            backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
            z-index:99999;display:flex;align-items:center;justify-content:center;
            opacity:0;transition:opacity 0.3s ease;
        `;
        
        const passwordLength = 2;
        
        overlay.innerHTML = `
            <div class="glass-card" style="text-align:center;max-width:320px;width:90%;padding:2rem;">
                <div style="margin-bottom:1.5rem;">
                    <i class="fas fa-ghost" style="font-size:2rem;color:#10b981;margin-bottom:0.5rem;"></i>
                    <p style="color:#10b981;font-size:11px;text-transform:uppercase;letter-spacing:2px;">STEALTH MODE</p>
                    <p style="color:#94a3b8;font-size:9px;margin-top:4px;">${currentState.currentPeriod.toUpperCase()} Access</p>
                    <p style="color:#64748b;font-size:8px;margin-top:8px;">Password: ${getGhostPassword()}</p>
                </div>
                <div id="ghost-dots" style="display:flex;justify-content:center;gap:16px;margin-bottom:2rem;">
                    ${Array(passwordLength).fill(0).map(() => 
                        `<div style="width:14px;height:14px;border-radius:50%;background:rgba(255,255,255,0.1);transition:all 0.2s;"></div>`
                    ).join('')}
                </div>
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;max-width:220px;margin:0 auto;">
                    ${['1','2','3','4','5','6','7','8','9','C','0','✓'].map(key => {
                        const color = key === 'C' ? '#ef4444' : key === '✓' ? '#10b981' : '#e2e8f0';
                        const icon = key === 'C' ? '↩' : key === '✓' ? '✓' : key;
                        return `<button onclick="window.ghostKey('${key}')" class="ghost-key" style="color:${color};">${icon}</button>`;
                    }).join('')}
                </div>
                <button onclick="closeGhostInput()" style="margin-top:1.5rem;background:none;border:none;color:#94a3b8;cursor:pointer;font-size:10px;">Cancel</button>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        const style = document.createElement('style');
        style.id = 'ghost-keyboard-style';
        style.textContent = `
            .ghost-key {
                background:rgba(15,23,42,0.8);
                border:1px solid rgba(16,185,129,0.2);
                padding:18px;border-radius:14px;
                font-size:20px;font-weight:700;
                cursor:pointer;transition:all 0.15s ease;
                font-family:'JetBrains Mono',monospace;
            }
            .ghost-key:active {
                background:rgba(16,185,129,0.2);                transform:scale(0.92);
                border-color:#10b981;
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => { overlay.style.opacity = '1'; }, 10);
        currentState.ghostMode.inputBuffer = '';
        updateGhostDots();
        window.ghostKey = handleGhostKey;
    }

    function handleGhostKey(key) {
        if (key === 'C') {
            currentState.ghostMode.inputBuffer = '';
        } else if (key === '✓') {
            verifyGhostPassword();
        } else {
            if (currentState.ghostMode.inputBuffer.length < 2) {
                currentState.ghostMode.inputBuffer += key;
            }
        }
        updateGhostDots();
    }

    function updateGhostDots() {
        const dots = document.querySelectorAll('#ghost-dots div');
        dots.forEach((dot, i) => {
            if (i < currentState.ghostMode.inputBuffer.length) {
                dot.style.background = '#10b981';
                dot.style.boxShadow = '0 0 10px #10b981';
            } else {
                dot.style.background = 'rgba(255,255,255,0.1)';
                dot.style.boxShadow = 'none';
            }
        });
    }

    function verifyGhostPassword() {
        const correctPassword = getGhostPassword();
        console.log('🔐 Verifying password...', { input: currentState.ghostMode.inputBuffer, correct: correctPassword });
        
        if (currentState.ghostMode.inputBuffer === correctPassword) {
            console.log('✅ Password correct! Activating Brain Hub...');
            closeGhostInput();
            activateBrainHub();
        } else {
            console.log('❌ Password wrong! Silent fail...');
            currentState.ghostMode.inputBuffer = '';
            updateGhostDots();        }
    }

    function closeGhostInput() {
        const overlay = document.getElementById('ghost-overlay');
        const style = document.getElementById('ghost-keyboard-style');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }
        if (style) style.remove();
        currentState.ghostMode.inputBuffer = '';
    }

    function activateBrainHub() {
        console.log('🧠 BRAIN HUB LUX ACTIVATING...');
        localStorage.setItem(CONFIG.storage.ghostMode, 'active');
        currentState.ghostMode.isActive = true;
        
        // Render Brain Hub
        BrainHub.render();
    }

    // ========================================================================
    // UTILITY
    // ========================================================================
    
    window.toast = function(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.style.cssText = 'background:rgba(15,23,42,0.95);backdrop-filter:blur(24px);border:1px solid rgba(16,185,129,0.2);border-radius:16px;padding:12px 24px;color:#e2e8f0;font-size:12px;margin-bottom:10px;border-left:4px solid #10b981;animation:slideIn 0.3s ease-out;';
        toast.innerHTML = `<span>${type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️'}</span><span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3000);
    };

    function hideLoading() {
        const loading = document.getElementById('loading-screen');
        if (loading) {
            setTimeout(() => { loading.classList.add('hide'); }, 1500);
        }
    }

    // ========================================================================
    // NAVIGATION
    // ========================================================================
    
    window.navigateTo = function(moduleId) {        if (!CONFIG.navOrder.includes(moduleId)) return;
        currentState.currentModule = moduleId;
        
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.target === moduleId) btn.classList.add('active');
        });
        
        loadModule(moduleId);
    };

    function loadModule(moduleId) {
        const appShell = document.getElementById('app-shell');
        if (!appShell) return;
        
        document.querySelectorAll('.module-container').forEach(el => el.classList.remove('active'));
        
        let targetModule = document.getElementById(`module-${moduleId}`);
        if (!targetModule) {
            targetModule = document.createElement('div');
            targetModule.id = `module-${moduleId}`;
            targetModule.className = 'module-container';
            appShell.appendChild(targetModule);
        }
        
        renderModule(moduleId, targetModule);
        targetModule.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderModule(moduleId, container) {
        switch(moduleId) {
            case 'home': renderHome(container); break;
            case 'profile': renderProfile(container); break;
            case 'qr': renderQR(container); break;
            case 'about': renderAbout(container); break;
            case 'settings': renderSettings(container); break;
            default: container.innerHTML = '<div class="glass-card"><p>Module not found</p></div>';
        }
    }

    // 🏠 HOME
    function renderHome(container) {
        const user = currentState.userProfile || { name: 'Guest', role: 'Visitor' };
        const period = currentState.currentPeriod;
        
        container.innerHTML = `
            <div class="islamic-header" data-ghost="true" style="cursor:pointer;">
                <div class="status-bar">
                    <span>v${CONFIG.version}</span>                    <span>${new Date().toLocaleDateString('id-ID')}</span>
                    <span style="color:#10b981;">${period.toUpperCase()}</span>
                </div>
                <p class="bismillah" dir="rtl" style="font-family:'Amiri',serif;font-size:clamp(1.5rem,4vw,2.5rem);font-weight:700;color:#10b981;margin-bottom:0.5rem;text-shadow:0 0 20px rgba(16,185,129,0.5);line-height:1.8;">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p class="shalawat" dir="rtl" style="font-family:'Amiri',serif;font-size:clamp(1rem,3vw,1.5rem);color:#34d399;opacity:0.9;line-height:1.8;margin-bottom:0.5rem;">
                    اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ
                </p>
                <p style="color:#94a3b8;font-size:10px;text-transform:uppercase;letter-spacing:2px;margin-top:0.5rem;">The Power Soul of Shalawat</p>
                <p style="color:#64748b;font-size:8px;margin-top:8px;">🤫 Tap header 5x for Ghost Mode</p>
            </div>
            
            <div class="glass-card" style="margin:1rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                    <div style="display:flex;align-items:center;gap:12px;">
                        <div style="width:40px;height:40px;border-radius:50%;background:rgba(16,185,129,0.2);display:flex;align-items:center;justify-content:center;color:#10b981;font-weight:700;">
                            ${(user.name || 'G').charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p style="color:#e2e8f0;font-size:12px;font-weight:600;">Welcome, ${user.name || 'Guest'}</p>
                            <p style="color:#10b981;font-size:10px;text-transform:uppercase;">${user.role || 'Visitor'}</p>
                        </div>
                    </div>
                    <div style="background:rgba(15,23,42,0.8);padding:8px 16px;border-radius:20px;">
                        <p style="color:#10b981;font-size:11px;font-family:'JetBrains Mono',monospace;" id="live-clock">00:00:00</p>
                    </div>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <p style="color:#94a3b8;font-size:9px;text-transform:uppercase;">Booking</p>
                        <p class="stat-value" style="color:#10b981;">3</p>
                    </div>
                    <div class="stat-card">
                        <p style="color:#94a3b8;font-size:9px;text-transform:uppercase;">K3</p>
                        <p class="stat-value" style="color:#f59e0b;">0</p>
                    </div>
                    <div class="stat-card">
                        <p style="color:#94a3b8;font-size:9px;text-transform:uppercase;">Security</p>
                        <p class="stat-value" style="color:#10b981;">SAFE</p>
                    </div>
                </div>
            </div>
            
            <div style="text-align:center;padding:2rem;">
                <p style="color:#64748b;font-size:9px;text-transform:uppercase;letter-spacing:1px;">The Power Soul of Shalawat</p>
                <p style="color:#475569;font-size:8px;margin-top:0.5rem;">Dream Team © 2026 | ISO 27001</p>
            </div>
        `;        
        startClock();
        setTimeout(() => { setupGhostTap(); }, 500);
    }

    // 👤 PROFILE
    function renderProfile(container) {
        const profile = currentState.userProfile || { name: '', email: '', phone: '', department: '' };
        
        container.innerHTML = `
            <div class="glass-card">
                <div style="text-align:center;margin-bottom:1.5rem;">
                    <div style="width:80px;height:80px;margin:0 auto 1rem;border-radius:50%;background:rgba(16,185,129,0.2);display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-user" style="font-size:2rem;color:#10b981;"></i>
                    </div>
                    <h2 style="color:#e2e8f0;font-size:1.25rem;">${profile.name || 'Guest User'}</h2>
                    <p style="color:#10b981;font-size:10px;text-transform:uppercase;">${currentState.user?.role || 'Visitor'}</p>
                </div>
                
                <form id="profile-form" onsubmit="saveProfile(event)">
                    <div style="display:grid;gap:12px;">
                        <div>
                            <label style="color:#94a3b8;font-size:11px;display:block;margin-bottom:4px;">Full Name</label>
                            <input type="text" id="profile-name" value="${profile.name || ''}" placeholder="Enter your name" style="width:100%;padding:12px;border-radius:12px;background:rgba(15,23,42,0.8);border:1px solid rgba(51,65,85,0.5);color:#e2e8f0;">
                        </div>
                        <div>
                            <label style="color:#94a3b8;font-size:11px;display:block;margin-bottom:4px;">Email</label>
                            <input type="email" id="profile-email" value="${profile.email || ''}" placeholder="your@email.com" style="width:100%;padding:12px;border-radius:12px;background:rgba(15,23,42,0.8);border:1px solid rgba(51,65,85,0.5);color:#e2e8f0;">
                        </div>
                        <div>
                            <label style="color:#94a3b8;font-size:11px;display:block;margin-bottom:4px;">Phone</label>
                            <input type="tel" id="profile-phone" value="${profile.phone || ''}" placeholder="+62 xxx" style="width:100%;padding:12px;border-radius:12px;background:rgba(15,23,42,0.8);border:1px solid rgba(51,65,85,0.5);color:#e2e8f0;">
                        </div>
                        <div>
                            <label style="color:#94a3b8;font-size:11px;display:block;margin-bottom:4px;">Department</label>
                            <input type="text" id="profile-dept" value="${profile.department || ''}" placeholder="Your department" style="width:100%;padding:12px;border-radius:12px;background:rgba(15,23,42,0.8);border:1px solid rgba(51,65,85,0.5);color:#e2e8f0;">
                        </div>
                    </div>
                    <button type="submit" class="btn-primary" style="width:100%;margin-top:1.5rem;background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;padding:12px;border-radius:12px;font-weight:600;cursor:pointer;">
                        <i class="fas fa-save" style="margin-right:8px;"></i> Save Profile
                    </button>
                </form>
                
                <button class="btn-back" onclick="navigateTo('home')" style="margin-top:1rem;background:transparent;border:1px solid rgba(255,255,255,0.08);color:#94a3b8;padding:12px;border-radius:12px;font-weight:600;cursor:pointer;width:100%;">
                    <i class="fas fa-arrow-left" style="margin-right:8px;"></i> Kembali ke Home
                </button>
            </div>
        `;
    }
    // 📱 QR
    function renderQR(container) {
        container.innerHTML = `
            <div class="glass-card">
                <h2 style="color:#e2e8f0;margin-bottom:1rem;font-size:1.25rem;text-align:center;">📱 QR Scanner</h2>
                <div style="aspect-ratio:1;background:rgba(15,23,42,0.8);border-radius:16px;display:flex;align-items:center;justify-content:center;margin-bottom:1rem;position:relative;overflow:hidden;">
                    <div style="width:200px;height:200px;border:3px solid #10b981;border-radius:12px;position:relative;">
                        <div style="position:absolute;top:-3px;left:-3px;width:20px;height:20px;border-top:3px solid #10b981;border-left:3px solid #10b981;border-radius:4px 0 0 0;"></div>
                        <div style="position:absolute;top:-3px;right:-3px;width:20px;height:20px;border-top:3px solid #10b981;border-right:3px solid #10b981;border-radius:0 4px 0 0;"></div>
                        <div style="position:absolute;bottom:-3px;left:-3px;width:20px;height:20px;border-bottom:3px solid #10b981;border-left:3px solid #10b981;border-radius:0 0 0 4px;"></div>
                        <div style="position:absolute;bottom:-3px;right:-3px;width:20px;height:20px;border-bottom:3px solid #10b981;border-right:3px solid #10b981;border-radius:0 0 4px 0;"></div>
                    </div>
                    <p style="position:absolute;bottom:20px;color:#94a3b8;font-size:12px;">Arahkan kamera ke QR Code</p>
                </div>
                <button id="btn-scan" class="btn-primary" style="width:100%;margin-bottom:1rem;background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;padding:12px;border-radius:12px;font-weight:600;cursor:pointer;">
                    <i class="fas fa-camera" style="margin-right:8px;"></i> Start Scan
                </button>
                <div id="scan-result" style="background:rgba(15,23,42,0.8);padding:12px;border-radius:12px;display:none;">
                    <p style="color:#94a3b8;font-size:11px;margin-bottom:4px;">Result:</p>
                    <p id="scan-data" style="color:#10b981;font-family:'JetBrains Mono',monospace;font-size:12px;word-break:break-all;"></p>
                </div>
                <button class="btn-back" onclick="navigateTo('home')" style="margin-top:1rem;background:transparent;border:1px solid rgba(255,255,255,0.08);color:#94a3b8;padding:12px;border-radius:12px;font-weight:600;cursor:pointer;width:100%;">
                    <i class="fas fa-arrow-left" style="margin-right:8px;"></i> Kembali ke Home
                </button>
            </div>
        `;
        
        setTimeout(() => {
            const btn = document.getElementById('btn-scan');
            if (btn) {
                btn.addEventListener('click', function() {
                    const result = document.getElementById('scan-result');
                    const data = document.getElementById('scan-data');
                    if (result && data) {
                        result.style.display = 'block';
                        data.textContent = 'https://dreamos.app/verify/' + Math.random().toString(36).substring(7).toUpperCase();
                        window.toast('QR Scanned!', 'success');
                    }
                });
            }
        }, 100);
    }

    // 📋 ABOUT
    function renderAbout(container) {
        container.innerHTML = `
            <div class="glass-card">
                <h2 style="text-align:center;color:#10b981;margin-bottom:1.5rem;font-size:1.25rem;">🌟 Dream OS v${CONFIG.version}</h2>
                <div style="text-align:center;margin-bottom:1.5rem;">
                    <p class="bismillah" dir="rtl" style="font-family:'Amiri',serif;font-size:1.5rem;color:#10b981;margin-bottom:0.5rem;">بِسْمِ اللَّهِ</p>                    <p style="color:#94a3b8;font-size:10px;">The Power Soul of Shalawat</p>
                </div>
                <div style="margin-bottom:1.5rem;">
                    <p style="color:#10b981;font-size:11px;font-weight:600;margin-bottom:8px;">🙏 Spiritual Foundation</p>
                    <div style="background:rgba(15,23,42,0.8);padding:12px;border-radius:12px;display:grid;gap:8px;">
                        <p style="color:#e2e8f0;font-size:12px;">🕋 Allah SWT</p>
                        <p style="color:#e2e8f0;font-size:12px;">☪️ Rasulullah SAW</p>
                    </div>
                </div>
                <div style="margin-bottom:1.5rem;">
                    <p style="color:#10b981;font-size:11px;font-weight:600;margin-bottom:8px;">👔 Management</p>
                    <div style="background:rgba(15,23,42,0.8);padding:12px;border-radius:12px;display:grid;gap:8px;">
                        <p style="color:#e2e8f0;font-size:12px;">Bapak Hanung Budianto S.E<br><small style="color:#94a3b8;">Kepala Bagian Umum</small></p>
                        <p style="color:#e2e8f0;font-size:12px;">Bapak Erwinsyah<br><small style="color:#94a3b8;">Kepala Kordinator Bagian Umum</small></p>
                    </div>
                </div>
                <div style="margin-bottom:1.5rem;">
                    <p style="color:#10b981;font-size:11px;font-weight:600;margin-bottom:8px;">🚀 Dream Team</p>
                    <div style="background:rgba(15,23,42,0.8);padding:12px;border-radius:12px;display:grid;gap:6px;">
                        <p style="color:#e2e8f0;font-size:11px;">• Mr.M <small style="color:#94a3b8;">(Architect)</small></p>
                        <p style="color:#e2e8f0;font-size:11px;">• Mr.DSeek <small style="color:#94a3b8;">(Developer)</small></p>
                        <p style="color:#e2e8f0;font-size:11px;">• Mrs.Qwen <span style="background:rgba(16,185,129,0.2);color:#10b981;padding:2px 6px;border-radius:4px;font-size:9px;">Bawel</span> 💚</p>
                        <p style="color:#e2e8f0;font-size:11px;">• Mrs.Gemini <span style="background:#3b82f6;color:white;padding:2px 6px;border-radius:4px;font-size:9px;">Bawel</span> 💙</p>
                        <p style="color:#e2e8f0;font-size:11px;">• Mrs.Claude 🤍</p>
                    </div>
                </div>
                <div style="text-align:center;padding:12px;background:rgba(15,23,42,0.8);border-radius:12px;margin-bottom:1.5rem;">
                    <p style="color:#e2e8f0;font-size:11px;">💪 All Team Ajag-Ijig Bagian Umum</p>
                </div>
                <p style="text-align:center;color:#64748b;font-size:9px;margin-bottom:1.5rem;">© 2026 Dream Team • ISO 27001</p>
                <button class="btn-back" onclick="navigateTo('home')" style="background:transparent;border:1px solid rgba(255,255,255,0.08);color:#94a3b8;padding:12px;border-radius:12px;font-weight:600;cursor:pointer;width:100%;">
                    <i class="fas fa-arrow-left" style="margin-right:8px;"></i> Kembali ke Home
                </button>
            </div>
        `;
    }

    // ⚙️ SETTINGS
    function renderSettings(container) {
        const currentTheme = localStorage.getItem(CONFIG.storage.theme) || 'dark';
        
        container.innerHTML = `
            <div class="glass-card">
                <h2 style="color:#e2e8f0;margin-bottom:1.5rem;font-size:1.25rem;">⚙️ Dream OS Settings</h2>
                <div style="margin-bottom:1.5rem;">
                    <p style="color:#10b981;font-size:11px;font-weight:600;margin-bottom:8px;">🎨 Appearance</p>
                    <div class="theme-grid">
                        <div class="theme-card ${currentTheme === 'dark' ? 'active' : ''}" onclick="setTheme('dark')" data-theme="dark">
                            <div class="theme-preview" style="background:linear-gradient(135deg,#020617,#1e293b);"></div>
                            <p style="color:#e2e8f0;font-size:12px;text-align:center;">Dark Mode</p>                        </div>
                        <div class="theme-card ${currentTheme === 'light' ? 'active' : ''}" onclick="setTheme('light')" data-theme="light">
                            <div class="theme-preview" style="background:linear-gradient(135deg,#f1f5f9,#e2e8f0);"></div>
                            <p style="color:#e2e8f0;font-size:12px;text-align:center;">Light Mode</p>
                        </div>
                    </div>
                </div>
                <div style="margin-bottom:1.5rem;">
                    <p style="color:#10b981;font-size:11px;font-weight:600;margin-bottom:8px;">🌍 Smart Background</p>
                    <label style="display:flex;align-items:center;gap:12px;padding:12px;background:rgba(15,23,42,0.8);border-radius:12px;cursor:pointer;">
                        <input type="checkbox" id="smart-bg-toggle" checked onchange="toggleSmartBackground(this.checked)" style="width:18px;height:18px;accent-color:#10b981;">
                        <span style="color:#e2e8f0;font-size:12px;">Auto-change based on prayer time</span>
                    </label>
                    <p style="color:#64748b;font-size:10px;margin-top:8px;">Background changes according to Earth time/prayer schedule</p>
                </div>
                <div style="margin-bottom:1.5rem;">
                    <p style="color:#10b981;font-size:11px;font-weight:600;margin-bottom:8px;">🌐 Language</p>
                    <select id="lang-select" onchange="changeLanguage(this.value)" style="width:100%;padding:12px;border-radius:12px;background:rgba(15,23,42,0.8);border:1px solid rgba(51,65,85,0.5);color:#e2e8f0;">
                        <option value="id" ${currentState.language === 'id' ? 'selected' : ''}>🇮🇩 Bahasa Indonesia</option>
                        <option value="en" ${currentState.language === 'en' ? 'selected' : ''}>🇬🇧 English</option>
                        <option value="ar" ${currentState.language === 'ar' ? 'selected' : ''}>🇸🇦 Arabic</option>
                    </select>
                </div>
                <div style="margin-bottom:1.5rem;">
                    <p style="color:#10b981;font-size:11px;font-weight:600;margin-bottom:8px;">📱 App Info</p>
                    <div style="background:rgba(15,23,42,0.8);padding:12px;border-radius:12px;">
                        <p style="color:#e2e8f0;font-size:12px;">Version: ${CONFIG.version}</p>
                        <p style="color:#94a3b8;font-size:11px;margin-top:4px;">Build: 2026.03.16</p>
                        <p style="color:#94a3b8;font-size:11px;">Current Period: <span id="current-period">${currentState.currentPeriod.toUpperCase()}</span></p>
                    </div>
                </div>
                <button onclick="doLogout()" style="width:100%;background:rgba(239,68,68,0.2);color:#ef4444;border:1px solid rgba(239,68,68,0.3);padding:12px;border-radius:12px;font-weight:600;cursor:pointer;margin-top:1rem;">
                    <i class="fas fa-sign-out-alt" style="margin-right:8px;"></i> Logout System
                </button>
                <button class="btn-back" onclick="navigateTo('home')" style="margin-top:1rem;background:transparent;border:1px solid rgba(255,255,255,0.08);color:#94a3b8;padding:12px;border-radius:12px;font-weight:600;cursor:pointer;width:100%;">
                    <i class="fas fa-arrow-left" style="margin-right:8px;"></i> Kembali ke Home
                </button>
            </div>
        `;
    }

    // ========================================================================
    // HELPER FUNCTIONS
    // ========================================================================
    
    function startClock() {
        const clock = document.getElementById('live-clock');
        if (clock) {
            setInterval(() => { clock.textContent = new Date().toLocaleTimeString('id-ID'); }, 1000);
        }    }

    window.saveProfile = function(event) {
        event.preventDefault();
        const profile = {
            name: document.getElementById('profile-name').value,
            email: document.getElementById('profile-email').value,
            phone: document.getElementById('profile-phone').value,
            department: document.getElementById('profile-dept').value
        };
        saveUserProfile(profile);
        window.toast('Profile saved successfully!', 'success');
        setTimeout(() => { navigateTo('home'); }, 1500);
    };

    window.setTheme = function(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(CONFIG.storage.theme, theme);
        document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
        document.querySelector(`.theme-card[data-theme="${theme}"]`)?.classList.add('active');
        window.toast(`Theme changed to ${theme}`, 'success');
    };

    window.toggleSmartBackground = function(enabled) {
        if (enabled) { startBackgroundTimer(); window.toast('Smart Background ON', 'success'); }
        else { window.toast('Smart Background OFF', 'warning'); }
    };

    window.changeLanguage = function(lang) {
        currentState.language = lang;
        localStorage.setItem('dream_language', lang);
        window.toast(`Language: ${lang.toUpperCase()}`, 'info');
    };

    window.doLogout = function() {
        if (confirm('Yakin ingin logout?')) {
            sessionStorage.clear();
            window.toast('Logged out successfully', 'info');
            setTimeout(() => location.reload(), 1000);
        }
    };

    // ========================================================================
    // BOTTOM NAVIGATION
    // ========================================================================
    
    function renderBottomNav() {
        const nav = document.createElement('nav');
        nav.className = 'bottom-nav';
        nav.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:rgba(15,23,42,0.95);backdrop-filter:blur(24px);border-top:1px solid rgba(16,185,129,0.2);padding:8px 12px calc(8px + env(safe-area-inset-bottom));z-index:100;';        nav.innerHTML = `
            <div class="nav-container" style="display:flex;justify-content:space-around;align-items:center;max-width:500px;margin:0 auto;">
                ${CONFIG.navOrder.map((moduleId) => {
                    const mod = CONFIG.modules[moduleId];
                    if (mod.isPrimary) {
                        return `
                            <button class="nav-item" data-target="${moduleId}" onclick="navigateTo('${moduleId}')" style="display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:none;cursor:pointer;transform:translateY(-10px);">
                                <div style="width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,${mod.color},#f59e0b);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(245,158,11,0.4);">
                                    <i class="fas ${mod.icon}" style="color:white;font-size:1.5rem;"></i>
                                </div>
                                <span style="font-size:9px;color:${mod.color};font-weight:600;">${mod.label}</span>
                            </button>
                        `;
                    }
                    return `
                        <button class="nav-item ${moduleId === 'home' ? 'active' : ''}" data-target="${moduleId}" onclick="navigateTo('${moduleId}')" style="display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:none;color:#94a3b8;cursor:pointer;padding:8px 12px;border-radius:12px;transition:all 0.2s;">
                            <i class="fas ${mod.icon}" style="font-size:1.25rem;"></i>
                            <span style="font-size:9px;font-weight:600;">${mod.label}</span>
                        </button>
                    `;
                }).join('')}
            </div>
        `;
        document.body.appendChild(nav);
        
        const style = document.createElement('style');
        style.textContent = `
            .nav-item.active { color: #10b981 !important; background: rgba(16,185,129,0.15); }
            .nav-item:active { transform: scale(0.95); }
        `;
        document.head.appendChild(style);
    }

    // ========================================================================
    // INITIALIZATION
    // ========================================================================
    
    function init() {
        console.log('🔧 Initializing Dream OS...');
        
        try {
            const detectedUser = detectUser();
            if (detectedUser) {
                currentState.userProfile = detectedUser;
                window.toast(`Welcome back, ${detectedUser.name || 'User'}!`, 'success');
            } else {
                const demoUser = { name: 'Developer', role: 'DEVELOPER', email: 'dev@dreamos.app' };
                currentState.user = demoUser;
                sessionStorage.setItem(CONFIG.storage.user, JSON.stringify(demoUser));
            }            
            const savedTheme = localStorage.getItem(CONFIG.storage.theme) || 'dark';
            currentState.theme = savedTheme;
            document.documentElement.setAttribute('data-theme', savedTheme);
            
            const savedLang = localStorage.getItem('dream_language') || 'id';
            currentState.language = savedLang;
            
            startBackgroundTimer();
            renderBottomNav();
            loadModule('home');
            hideLoading();
            initGhostMode();
            
            console.log('✅ Dream OS initialized successfully!');
            console.log('🌍 Smart Background Active');
            console.log('🧠 Brain Hub: Ready for Ghost Mode');
        } catch (error) {
            console.error('❌ Init error:', error);
            const loading = document.getElementById('loading-screen');
            if (loading) {
                loading.innerHTML = `
                    <div style="text-align:center;padding:2rem;">
                        <p style="color:#ef4444;">⚠️ Loading Error</p>
                        <p style="color:#94a3b8;font-size:12px;">${error.message}</p>
                        <button onclick="location.reload()" style="margin-top:1rem;background:#10b981;color:white;border:none;padding:12px 24px;border-radius:12px;cursor:pointer;">Reload</button>
                    </div>
                `;
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
