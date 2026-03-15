// ════════════════════════════════════════════
// FILE: js/utils/ghost-trigger.js
// ════════════════════════════════════════════

export const GhostTrigger = {
    taps: 0,
    timeout: null,
    isAuthenticated: false,
    
    init() {
        console.log('👻 [GHOST] Trigger initialized');
        this.setupListener();
    },
    
    setupListener() {
        // Wait for DOM
        setTimeout(() => {
            const zone = document.getElementById('ghost-trigger-zone');
            if (!zone) {
                console.warn('⚠️ [GHOST] Trigger zone not found!');
                return;
            }
            
            // Remove old listeners by cloning
            const newZone = zone.cloneNode(true);
            zone.parentNode.replaceChild(newZone, zone);
            
            // Add new listener
            newZone.addEventListener('click', (e) => this.handleTap(e));
            console.log('✅ [GHOST] Listener attached');
        }, 500);
    },
    
    handleTap(e) {
        this.taps++;
        console.log(`👻 [GHOST] Tap ${this.taps}/5`);
        
        // Haptic feedback
        if ('vibrate' in navigator) navigator.vibrate(30);
        
        // Visual feedback
        e.target.style.opacity = '0.7';
        setTimeout(() => e.target.style.opacity = '1', 100);
        
        // Reset timer
        if (this.timeout) clearTimeout(this.timeout);
        
        // Check for 5 taps
        if (this.taps === 5) {
            this.taps = 0;            this.showAuthPrompt();
            return;
        }
        
        // Reset after 2 seconds
        this.timeout = setTimeout(() => {
            console.log('👻 [GHOST] Reset tap counter');
            this.taps = 0;
        }, 2000);
    },
    
    showAuthPrompt() {
        setTimeout(() => {
            const code = prompt('🔑 GHOST ACCESS CODE:\n(Enter password to continue)');
            
            if (code === 'dreamos2026') {
                this.authenticate();
            } else if (code !== null) {
                this.denyAccess();
            }
        }, 200);
    },
    
    authenticate() {
        this.isAuthenticated = true;
        sessionStorage.setItem('ghost-auth', 'true');
        sessionStorage.setItem('ghost-auth-time', Date.now().toString());
        
        if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
        
        // Show success
        if (window.DREAM_SYS) {
            window.DREAM_SYS.toast('👻 Ghost Mode Activated!', 'success');
        }
        
        // Load ghost module
        setTimeout(() => {
            if (window.DREAM) {
                window.DREAM.load('ghost');
            }
        }, 500);
        
        console.log('✅ [GHOST] Authenticated');
    },
    
    denyAccess() {
        this.isAuthenticated = false;
        
        if ('vibrate' in navigator) navigator.vibrate([200, 100, 200]);
                if (window.DREAM_SYS) {
            window.DREAM_SYS.toast('❌ Access Denied', 'error');
        }
        
        console.log('❌ [GHOST] Access denied');
    },
    
    checkAuth() {
        const auth = sessionStorage.getItem('ghost-auth');
        const time = sessionStorage.getItem('ghost-auth-time');
        
        if (!auth || !time) return false;
        
        // Session expires after 1 hour
        const elapsed = Date.now() - parseInt(time);
        if (elapsed > 3600000) {
            this.logout();
            return false;
        }
        
        return true;
    },
    
    logout() {
        this.isAuthenticated = false;
        sessionStorage.removeItem('ghost-auth');
        sessionStorage.removeItem('ghost-auth-time');
        console.log('👻 [GHOST] Logged out');
    }
};

// Auto-init
GhostTrigger.init();
