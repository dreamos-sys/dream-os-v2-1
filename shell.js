/**
 * DREAM OS v2.1 - SHELL.JS
 * Main Application Shell & Navigation Controller
 * 
 * Features:
 * - Smart Background (Prayer Time Based)
 * - Ghost Stealth Mode (Silent Activation)
 * - Shalat-Based Password System
 * - Dynamic Navigation
 * 
 * 🤫 Ghost Mode: Tap Header 5x → Password → Stealth
 * 
 * Bi idznillah 💚
 */

(function() {
    'use strict';

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
        // 🕌 Prayer Times (WIB - Adjust for your location)
        prayerTimes: {
            fajr: { start: 4, end: 6 },
            dhuhr: { start: 12, end: 15 },
            asr: { start: 15, end: 18 },
            maghrib: { start: 18, end: 19 },
            isha: { start: 19, end: 24 },
            night: { start: 0, end: 4 }
        },
        // 🔐 Ghost Mode Password (Rakaat-based)        ghostPasswords: {
            fajr: '02',      // Subuh - 2 rakaat
            dhuhr: '04',     // Dzuhur - 4 rakaat
            asr: '04',       // Ashar - 4 rakaat
            maghrib: '03',   // Maghrib - 3 rakaat
            isha: '04',      // Isya - 4 rakaat
            night: '04'      // Night uses Isya password
        }
    };

    // ========================================================================
    // STATE
    // ========================================================================
    
    let currentState = {
        user: null,
        userProfile: null,
        role: null,
        theme: 'dark',
        currentModule: 'home',
        isAuthenticated: false,
        currentPeriod: 'night',
        ghostMode: {
            isActive: false,
            tapCount: 0,
            lastTap: 0,
            inputBuffer: ''
        }
    };

    // ========================================================================
    //  SMART BACKGROUND SYSTEM
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
        setInterval(updateSmartBackground, 60000);
    }

    // ========================================================================
    // 👤 SMART USER DETECTION
    // ========================================================================
    
    function detectUser() {
        const savedProfile = localStorage.getItem(CONFIG.storage.userProfile);
        if (savedProfile) {
            try { return JSON.parse(savedProfile); } catch (e) { return null; }
        }
        const sessionUser = sessionStorage.getItem(CONFIG.storage.user);
        if (sessionUser) {
            try { return JSON.parse(sessionUser); } catch (e) { return null; }
        }
        return null;
    }

    function saveUserProfile(profile) {
        localStorage.setItem(CONFIG.storage.userProfile, JSON.stringify(profile));
        currentState.userProfile = profile;
    }

    // ========================================================================
    // 🤫 GHOST STEALTH MODE SYSTEM
    // ========================================================================
    
    function getGhostPassword() {
        const period = getCurrentTimePeriod();
        const passwordKey = period === 'night' ? 'isha' : period;
        return CONFIG.ghostPasswords[passwordKey] || '04';
    }

    function initGhostMode() {
        // Check if ghost mode was active
        const ghostState = localStorage.getItem(CONFIG.storage.ghostMode);
        if (ghostState === 'active') {
            activateGhostSilent();
        }
        
        // Setup secret tap detection on header
        setTimeout(() => {
            const header = document.querySelector('.islamic-header');
            if (header) {
                header.style.cursor = 'pointer';
                header.addEventListener('click', handleGhostTap);            }
        }, 100);
        
        // Keyboard shortcut (Developer only)
        document.addEventListener('keydown', handleGhostKeyboard);
    }

    function handleGhostTap(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - currentState.ghostMode.lastTap;
        
        if (tapLength < 500 && tapLength > 0) {
            currentState.ghostMode.tapCount++;
            
            if (currentState.ghostMode.tapCount === 5) {
                showGhostInput();
                currentState.ghostMode.tapCount = 0;
            }
        } else {
            currentState.ghostMode.tapCount = 1;
        }
        currentState.ghostMode.lastTap = currentTime;
    }

    function handleGhostKeyboard(e) {
        // Ctrl + Shift + G = Quick toggle (Developer testing)
        if (e.ctrlKey && e.shiftKey && e.key === 'G') {
            e.preventDefault();
            toggleGhostQuick();
        }
    }

    function showGhostInput() {
        // Remove existing overlay if any
        const existing = document.getElementById('ghost-overlay');
        if (existing) existing.remove();
        
        const overlay = document.createElement('div');
        overlay.id = 'ghost-overlay';
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(2, 6, 23, 0.98);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;            transition: opacity 0.3s ease;
        `;
        
        const currentPassword = getGhostPassword();
        const passwordLength = currentPassword.length;
        
        overlay.innerHTML = `
            <div class="glass-card" style="text-align:center;max-width:320px;width:90%;">
                <div style="margin-bottom:1.5rem;">
                    <i class="fas fa-ghost" style="font-size:2rem;color:var(--color-primary);margin-bottom:0.5rem;"></i>
                    <p style="color:var(--color-primary);font-size:11px;text-transform:uppercase;letter-spacing:2px;">
                        Stealth Mode
                    </p>
                    <p style="color:var(--color-text-muted);font-size:9px;margin-top:4px;">
                        ${currentState.currentPeriod.toUpperCase()} Access
                    </p>
                </div>
                
                <div id="ghost-dots" style="display:flex;justify-content:center;gap:16px;margin-bottom:2rem;">
                    ${Array(passwordLength).fill(0).map(() => 
                        `<div style="width:14px;height:14px;border-radius:50%;background:var(--color-border);transition:all 0.2s;"></div>`
                    ).join('')}
                </div>
                
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;max-width:220px;margin:0 auto;">
                    ${['1','2','3','4','5','6','7','8','9','C','0','✓'].map(key => {
                        const color = key === 'C' ? '#ef4444' : key === '✓' ? 'var(--color-primary)' : 'var(--color-text)';
                        const icon = key === 'C' ? '↩' : key === '✓' ? '✓' : key;
                        return `<button onclick="window.ghostKey('${key}')" class="ghost-key" style="color:${color};">${icon}</button>`;
                    }).join('')}
                </div>
                
                <button onclick="closeGhostInput()" style="margin-top:1.5rem;background:none;border:none;color:var(--color-text-muted);cursor:pointer;font-size:10px;text-transform:uppercase;letter-spacing:1px;">
                    Cancel
                </button>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Add keyboard styles
        const style = document.createElement('style');
        style.id = 'ghost-keyboard-style';
        style.textContent = `
            .ghost-key {
                background: rgba(15, 23, 42, 0.8);
                border: 1px solid rgba(16, 185, 129, 0.2);
                color: var(--color-text);
                padding: 18px;
                border-radius: 14px;                font-size: 20px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.15s ease;
                font-family: 'JetBrains Mono', monospace;
            }
            .ghost-key:active {
                background: rgba(16, 185, 129, 0.2);
                transform: scale(0.92);
                border-color: var(--color-primary);
            }
        `;
        document.head.appendChild(style);
        
        // Fade in
        setTimeout(() => { overlay.style.opacity = '1'; }, 10);
        
        currentState.ghostMode.inputBuffer = '';
        updateGhostDots();
        
        // Expose function globally for onclick
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
                dot.style.background = 'var(--color-primary)';
                dot.style.boxShadow = '0 0 10px var(--color-primary)';
            } else {
                dot.style.background = 'var(--color-border)';
                dot.style.boxShadow = 'none';
            }
        });
    }
    function verifyGhostPassword() {
        const correctPassword = getGhostPassword();
        
        if (currentState.ghostMode.inputBuffer === correctPassword) {
            // ✅ Correct - Activate Ghost Mode
            closeGhostInput();
            activateGhostSilent();
        } else {
            // ❌ Wrong - SILENT FAIL (No error message!)
            currentState.ghostMode.inputBuffer = '';
            updateGhostDots();
            // Security: No feedback on wrong password
        }
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

    function activateGhostSilent() {
        document.body.style.filter = 'blur(10px)';
        document.body.style.opacity = '0.6';
        document.body.style.pointerEvents = 'auto';
        localStorage.setItem(CONFIG.storage.ghostMode, 'active');
        currentState.ghostMode.isActive = true;
        
        // Auto-disable after 30 seconds
        setTimeout(() => {
            deactivateGhostSilent();
        }, 30000);
    }

    function deactivateGhostSilent() {
        document.body.style.filter = 'none';
        document.body.style.opacity = '1';
        localStorage.removeItem(CONFIG.storage.ghostMode);
        currentState.ghostMode.isActive = false;
    }

    function toggleGhostQuick() {
        if (currentState.ghostMode.isActive) {
            deactivateGhostSilent();
        } else {            const correctPassword = getGhostPassword();
            currentState.ghostMode.inputBuffer = correctPassword;
            activateGhostSilent();
        }
    }

    // ========================================================================
    // UTILITY FUNCTIONS
    // ========================================================================
    
    window.toast = function(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
        toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
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
    
    window.navigateTo = function(moduleId) {
        if (!CONFIG.navOrder.includes(moduleId)) return;
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

    // 🏠 HOME MODULE
    function renderHome(container) {
        const user = currentState.userProfile || currentState.user || { name: 'Guest', role: 'Visitor' };
        const period = currentState.currentPeriod;
        
        container.innerHTML = `
            <div class="islamic-header">
                <div class="status-bar">
                    <span>v${CONFIG.version}</span>
                    <span>${new Date().toLocaleDateString('id-ID')}</span>
                    <span style="color:var(--color-primary);">${period.toUpperCase()}</span>
                </div>
                <p class="bismillah" dir="rtl">بِسْمِ اللَّهِ</p>
                <p class="shalawat">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</p>
                <p style="color:var(--color-text-muted);font-size:10px;text-transform:uppercase;letter-spacing:2px;margin-top:0.5rem;">The Power Soul of Shalawat</p>
            </div>
            
            <div class="glass-card" style="margin:1rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                    <div style="display:flex;align-items:center;gap:12px;">                        <div style="width:40px;height:40px;border-radius:50%;background:var(--color-primary-alpha-20);display:flex;align-items:center;justify-content:center;color:var(--color-primary);font-weight:700;">
                            ${(user.name || 'G').charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p style="color:var(--color-text);font-size:12px;font-weight:600;">Welcome, ${user.name || 'Guest'}</p>
                            <p style="color:var(--color-primary);font-size:10px;text-transform:uppercase;">${user.role || 'Visitor'}</p>
                        </div>
                    </div>
                    <div style="background:var(--glass-bg);padding:8px 16px;border-radius:20px;">
                        <p style="color:var(--color-primary);font-size:11px;font-family:var(--font-mono);" id="live-clock">00:00:00</p>
                    </div>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <p style="color:var(--color-text-muted);font-size:9px;text-transform:uppercase;">Booking</p>
                        <p class="stat-value" style="color:var(--color-success);">3</p>
                    </div>
                    <div class="stat-card">
                        <p style="color:var(--color-text-muted);font-size:9px;text-transform:uppercase;">K3</p>
                        <p class="stat-value" style="color:var(--color-warning);">0</p>
                    </div>
                    <div class="stat-card">
                        <p style="color:var(--color-text-muted);font-size:9px;text-transform:uppercase;">Security</p>
                        <p class="stat-value" style="color:var(--color-success);">SAFE</p>
                    </div>
                </div>
            </div>
            
            <div style="text-align:center;padding:2rem;">
                <p style="color:var(--color-text-dim);font-size:9px;text-transform:uppercase;letter-spacing:1px;">The Power Soul of Shalawat</p>
                <p style="color:var(--color-text-dim);font-size:8px;margin-top:0.5rem;">Dream Team © 2026 | ISO 27001</p>
            </div>
        `;
        
        startClock();
    }

    // 👤 PROFILE MODULE
    function renderProfile(container) {
        const profile = currentState.userProfile || { name: '', email: '', phone: '', department: '' };
        
        container.innerHTML = `
            <div class="glass-card">
                <div style="text-align:center;margin-bottom:1.5rem;">
                    <div style="width:80px;height:80px;margin:0 auto 1rem;border-radius:50%;background:var(--color-primary-alpha-20);display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-user" style="font-size:2rem;color:var(--color-primary);"></i>
                    </div>
                    <h2 style="color:var(--color-text);font-size:1.25rem;">${profile.name || 'Guest User'}</h2>
                    <p style="color:var(--color-primary);font-size:10px;text-transform:uppercase;">${currentState.user?.role || 'Visitor'}</p>                </div>
                
                <form id="profile-form" onsubmit="saveProfile(event)">
                    <div style="display:grid;gap:12px;">
                        <div>
                            <label style="color:var(--color-text-muted);font-size:11px;display:block;margin-bottom:4px;">Full Name</label>
                            <input type="text" id="profile-name" value="${profile.name || ''}" placeholder="Enter your name" style="width:100%;padding:12px;border-radius:12px;background:var(--glass-bg);border:1px solid var(--glass-border);color:var(--color-text);">
                        </div>
                        <div>
                            <label style="color:var(--color-text-muted);font-size:11px;display:block;margin-bottom:4px;">Email</label>
                            <input type="email" id="profile-email" value="${profile.email || ''}" placeholder="your@email.com" style="width:100%;padding:12px;border-radius:12px;background:var(--glass-bg);border:1px solid var(--glass-border);color:var(--color-text);">
                        </div>
                        <div>
                            <label style="color:var(--color-text-muted);font-size:11px;display:block;margin-bottom:4px;">Phone</label>
                            <input type="tel" id="profile-phone" value="${profile.phone || ''}" placeholder="+62 xxx" style="width:100%;padding:12px;border-radius:12px;background:var(--glass-bg);border:1px solid var(--glass-border);color:var(--color-text);">
                        </div>
                        <div>
                            <label style="color:var(--color-text-muted);font-size:11px;display:block;margin-bottom:4px;">Department</label>
                            <input type="text" id="profile-dept" value="${profile.department || ''}" placeholder="Your department" style="width:100%;padding:12px;border-radius:12px;background:var(--glass-bg);border:1px solid var(--glass-border);color:var(--color-text);">
                        </div>
                    </div>
                    
                    <button type="submit" class="btn-primary" style="width:100%;margin-top:1.5rem;">
                        <i class="fas fa-save" style="margin-right:8px;"></i> Save Profile
                    </button>
                </form>
                
                <div style="margin-top:1rem;padding:12px;background:var(--glass-bg);border-radius:12px;">
                    <p style="color:var(--color-text-muted);font-size:10px;">
                        <i class="fas fa-info-circle" style="margin-right:4px;"></i>
                        Profile will be saved locally and auto-detected next time
                    </p>
                </div>
                
                <button class="btn-back" onclick="navigateTo('home')" style="margin-top:1rem;">
                    <i class="fas fa-arrow-left" style="margin-right:8px;"></i> Kembali ke Home
                </button>
            </div>
        `;
    }

    // 📱 QR MODULE
    function renderQR(container) {
        container.innerHTML = `
            <div class="glass-card">
                <h2 style="color:var(--color-text);margin-bottom:1rem;font-size:1.25rem;text-align:center;">📱 QR Scanner</h2>
                
                <div style="aspect-ratio:1;background:var(--glass-bg);border-radius:16px;display:flex;align-items:center;justify-content:center;margin-bottom:1rem;position:relative;overflow:hidden;">
                    <div style="width:200px;height:200px;border:3px solid var(--color-primary);border-radius:12px;position:relative;">
                        <div style="position:absolute;top:-3px;left:-3px;width:20px;height:20px;border-top:3px solid var(--color-primary);border-left:3px solid var(--color-primary);border-radius:4px 0 0 0;"></div>                        <div style="position:absolute;top:-3px;right:-3px;width:20px;height:20px;border-top:3px solid var(--color-primary);border-right:3px solid var(--color-primary);border-radius:0 4px 0 0;"></div>
                        <div style="position:absolute;bottom:-3px;left:-3px;width:20px;height:20px;border-bottom:3px solid var(--color-primary);border-left:3px solid var(--color-primary);border-radius:0 0 0 4px;"></div>
                        <div style="position:absolute;bottom:-3px;right:-3px;width:20px;height:20px;border-bottom:3px solid var(--color-primary);border-right:3px solid var(--color-primary);border-radius:0 0 4px 0;"></div>
                    </div>
                    <p style="position:absolute;bottom:20px;color:var(--color-text-muted);font-size:12px;">Arahkan kamera ke QR Code</p>
                </div>
                
                <button id="btn-scan" class="btn-primary" style="width:100%;margin-bottom:1rem;">
                    <i class="fas fa-camera" style="margin-right:8px;"></i> Start Scan
                </button>
                
                <div id="scan-result" style="background:var(--glass-bg);padding:12px;border-radius:12px;display:none;">
                    <p style="color:var(--color-text-muted);font-size:11px;margin-bottom:4px;">Result:</p>
                    <p id="scan-data" style="color:var(--color-primary);font-family:var(--font-mono);font-size:12px;word-break:break-all;"></p>
                </div>
                
                <button class="btn-back" onclick="navigateTo('home')" style="margin-top:1rem;">
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

    // 📋 ABOUT MODULE
    function renderAbout(container) {
        container.innerHTML = `
            <div class="glass-card">
                <h2 style="text-align:center;color:var(--color-primary);margin-bottom:1.5rem;font-size:1.25rem;">🌟 Dream OS v${CONFIG.version}</h2>
                
                <div style="text-align:center;margin-bottom:1.5rem;">
                    <p class="bismillah" dir="rtl">بِسْمِ اللَّهِ</p>
                    <p style="color:var(--color-text-muted);font-size:10px;">The Power Soul of Shalawat</p>
                </div>
                
                <div style="margin-bottom:1.5rem;">                    <p style="color:var(--color-primary);font-size:11px;font-weight:600;margin-bottom:8px;">🙏 Spiritual Foundation</p>
                    <div style="background:var(--glass-bg);padding:12px;border-radius:12px;display:grid;gap:8px;">
                        <p style="color:var(--color-text);font-size:12px;">🕋 Allah SWT</p>
                        <p style="color:var(--color-text);font-size:12px;">☪️ Rasulullah SAW</p>
                    </div>
                </div>
                
                <div style="margin-bottom:1.5rem;">
                    <p style="color:var(--color-primary);font-size:11px;font-weight:600;margin-bottom:8px;">👔 Management</p>
                    <div style="background:var(--glass-bg);padding:12px;border-radius:12px;display:grid;gap:8px;">
                        <p style="color:var(--color-text);font-size:12px;">Bapak Hanung Budianto S.E<br><small style="color:var(--color-text-muted);">Kepala Bagian Umum</small></p>
                        <p style="color:var(--color-text);font-size:12px;">Bapak Erwinsyah<br><small style="color:var(--color-text-muted);">Kepala Kordinator Bagian Umum</small></p>
                    </div>
                </div>
                
                <div style="margin-bottom:1.5rem;">
                    <p style="color:var(--color-primary);font-size:11px;font-weight:600;margin-bottom:8px;">🚀 Dream Team</p>
                    <div style="background:var(--glass-bg);padding:12px;border-radius:12px;display:grid;gap:6px;">
                        <p style="color:var(--color-text);font-size:11px;">• Mr.M <small style="color:var(--color-text-muted);">(Architect)</small></p>
                        <p style="color:var(--color-text);font-size:11px;">• Mr.DSeek <small style="color:var(--color-text-muted);">(Developer)</small></p>
                        <p style="color:var(--color-text);font-size:11px;">• Mrs.Qwen <span style="background:var(--color-primary-alpha-20);color:var(--color-primary);padding:2px 6px;border-radius:4px;font-size:9px;">Bawel</span> 💚</p>
                        <p style="color:var(--color-text);font-size:11px;">• Mrs.Gemini <span style="background:var(--color-info);color:white;padding:2px 6px;border-radius:4px;font-size:9px;">Bawel</span> 💙</p>
                        <p style="color:var(--color-text);font-size:11px;">• Mrs.Claude 🤍</p>
                    </div>
                </div>
                
                <div style="text-align:center;padding:12px;background:var(--glass-bg);border-radius:12px;margin-bottom:1.5rem;">
                    <p style="color:var(--color-text);font-size:11px;">💪 All Team Ajag-Ijig Bagian Umum</p>
                </div>
                
                <p style="text-align:center;color:var(--color-text-dim);font-size:9px;margin-bottom:1.5rem;">© 2026 Dream Team • ISO 27001</p>
                
                <button class="btn-back" onclick="navigateTo('home')">
                    <i class="fas fa-arrow-left" style="margin-right:8px;"></i> Kembali ke Home
                </button>
            </div>
        `;
    }

    // ⚙️ SETTINGS MODULE (NO GHOST MODE!)
    function renderSettings(container) {
        const currentTheme = localStorage.getItem(CONFIG.storage.theme) || 'dark';
        
        container.innerHTML = `
            <div class="glass-card">
                <h2 style="color:var(--color-text);margin-bottom:1.5rem;font-size:1.25rem;">⚙️ Dream OS Settings</h2>
                
                <div style="margin-bottom:1.5rem;">
                    <p style="color:var(--color-primary);font-size:11px;font-weight:600;margin-bottom:8px;">🎨 Appearance</p>
                    <div class="theme-grid">                        <div class="theme-card ${currentTheme === 'dark' ? 'active' : ''}" onclick="setTheme('dark')" data-theme="dark">
                            <div class="theme-preview" style="background:linear-gradient(135deg,#020617,#1e293b);"></div>
                            <p style="color:var(--color-text);font-size:12px;text-align:center;">Dark Mode</p>
                        </div>
                        <div class="theme-card ${currentTheme === 'light' ? 'active' : ''}" onclick="setTheme('light')" data-theme="light">
                            <div class="theme-preview" style="background:linear-gradient(135deg,#f1f5f9,#e2e8f0);"></div>
                            <p style="color:var(--color-text);font-size:12px;text-align:center;">Light Mode</p>
                        </div>
                    </div>
                </div>
                
                <div style="margin-bottom:1.5rem;">
                    <p style="color:var(--color-primary);font-size:11px;font-weight:600;margin-bottom:8px;">🌍 Smart Background</p>
                    <label style="display:flex;align-items:center;gap:12px;padding:12px;background:var(--glass-bg);border-radius:12px;cursor:pointer;">
                        <input type="checkbox" id="smart-bg-toggle" checked onchange="toggleSmartBackground(this.checked)" style="width:18px;height:18px;accent-color:var(--color-primary);">
                        <span style="color:var(--color-text);font-size:12px;">Auto-change based on prayer time</span>
                    </label>
                    <p style="color:var(--color-text-dim);font-size:10px;margin-top:8px;">Background changes according to Earth time/prayer schedule</p>
                </div>
                
                <div style="margin-bottom:1.5rem;">
                    <p style="color:var(--color-primary);font-size:11px;font-weight:600;margin-bottom:8px;">🌐 Language</p>
                    <select id="lang-select" onchange="changeLanguage(this.value)" style="width:100%;padding:12px;border-radius:12px;background:var(--glass-bg);border:1px solid var(--glass-border);color:var(--color-text);">
                        <option value="id" ${currentState.language === 'id' ? 'selected' : ''}>🇮🇩 Bahasa Indonesia</option>
                        <option value="en" ${currentState.language === 'en' ? 'selected' : ''}>🇬🇧 English</option>
                        <option value="ar" ${currentState.language === 'ar' ? 'selected' : ''}>🇸🇦 Arabic</option>
                    </select>
                </div>
                
                <div style="margin-bottom:1.5rem;">
                    <p style="color:var(--color-primary);font-size:11px;font-weight:600;margin-bottom:8px;">🔐 Security</p>
                    <button class="btn-back" style="padding:12px;margin-bottom:8px;" onclick="window.toast('Feature coming soon!', 'info')">Change Password</button>
                    <button class="btn-back" style="padding:12px;" onclick="window.toast('Feature coming soon!', 'info')">Biometric Lock</button>
                </div>
                
                <div style="margin-bottom:1.5rem;">
                    <p style="color:var(--color-primary);font-size:11px;font-weight:600;margin-bottom:8px;">📱 App Info</p>
                    <div style="background:var(--glass-bg);padding:12px;border-radius:12px;">
                        <p style="color:var(--color-text);font-size:12px;">Version: ${CONFIG.version}</p>
                        <p style="color:var(--color-text-muted);font-size:11px;margin-top:4px;">Build: 2026.01.15</p>
                        <p style="color:var(--color-text-muted);font-size:11px;">Current Period: <span id="current-period">${currentState.currentPeriod.toUpperCase()}</span></p>
                    </div>
                </div>
                
                <button onclick="doLogout()" style="width:100%;background:rgba(239,68,68,0.2);color:#ef4444;border:1px solid rgba(239,68,68,0.3);padding:12px;border-radius:12px;font-weight:600;cursor:pointer;margin-top:1rem;">
                    <i class="fas fa-sign-out-alt" style="margin-right:8px;"></i> Logout System
                </button>
                
                <button class="btn-back" onclick="navigateTo('home')" style="margin-top:1rem;">
                    <i class="fas fa-arrow-left" style="margin-right:8px;"></i> Kembali ke Home                </button>
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
        }
    }

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
        if (confirm('Yakin ingin logout?')) {            sessionStorage.clear();
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
        nav.innerHTML = `
            <div class="nav-container">
                ${CONFIG.navOrder.map((moduleId) => {
                    const mod = CONFIG.modules[moduleId];
                    if (mod.isPrimary) {
                        return `
                            <button class="nav-item primary-action" data-target="${moduleId}" onclick="navigateTo('${moduleId}')" style="transform:translateY(-10px);">
                                <div style="width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,${mod.color},#f59e0b);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(245,158,11,0.4);">
                                    <i class="fas ${mod.icon}" style="color:white;font-size:1.5rem;"></i>
                                </div>
                                <span style="font-size:9px;margin-top:4px;color:${mod.color};">${mod.label}</span>
                            </button>
                        `;
                    }
                    return `
                        <button class="nav-item ${moduleId === 'home' ? 'active' : ''}" data-target="${moduleId}" onclick="navigateTo('${moduleId}')">
                            <i class="fas ${mod.icon}"></i>
                            <span>${mod.label}</span>
                        </button>
                    `;
                }).join('')}
            </div>
        `;
        document.body.appendChild(nav);
    }

    // ========================================================================
    // INITIALIZATION
    // ========================================================================
    
    function init() {
        const detectedUser = detectUser();
        if (detectedUser) {
            currentState.userProfile = detectedUser;
            window.toast(`Welcome back, ${detectedUser.name || 'User'}!`, 'success');
        } else {
            const demoUser = { name: 'Developer', role: 'DEVELOPER', email: 'dev@dreamos.app' };            currentState.user = demoUser;
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
        
        // 🤫 Init Ghost Mode (SILENT - No UI)
        initGhostMode();
        
        console.log(`🚀 ${CONFIG.appName} v${CONFIG.version} initialized`);
        console.log('💚 Dream Team Power!');
        console.log('🌍 Smart Background Active');
        console.log('🤫 Ghost Mode: Silent Ready');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
