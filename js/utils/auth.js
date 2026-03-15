// ════════════════════════════════════════════
// FILE: js/utils/auth.js
// ════════════════════════════════════════════

export const Auth = {
    user: null,
    session: null,
    
    init() {
        this.loadSession();
        console.log('✅ [AUTH] Initialized');
    },
    
    async login(email, password) {
        // Demo mode (replace with Supabase Auth)
        const users = JSON.parse(localStorage.getItem('dreamos_users') || '[]');
        
        // Default admin account
        const defaultAdmin = {
            id: '1',
            email: 'admin@dreamos.com',
            password: 'admin123',
            name: 'Administrator',
            role: 'admin'
        };
        
        const user = users.find(u => u.email === email) || 
                     (email === defaultAdmin.email && password === defaultAdmin.password ? defaultAdmin : null);
        
        if (!user) {
            return { success: false, error: 'Invalid credentials' };
        }
        
        // Create session
        this.user = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        };
        
        this.session = {
            token: crypto.randomUUID(),
            expires: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
            created: Date.now()
        };
        
        this.saveSession();
        
        console.log('✅ [AUTH] Logged in:', this.user.name);        return { success: true, user: this.user };
    },
    
    logout() {
        this.user = null;
        this.session = null;
        sessionStorage.removeItem('dreamos_session');
        sessionStorage.removeItem('dreamos_user');
        
        console.log('✅ [AUTH] Logged out');
        return { success: true };
    },
    
    isLoggedIn() {
        if (!this.session) return false;
        
        // Check expiration
        if (Date.now() > this.session.expires) {
            this.logout();
            return false;
        }
        
        return true;
    },
    
    hasRole(requiredRole) {
        if (!this.user) return false;
        
        const adminRoles = ['admin', 'developer', 'architect', 'master'];
        
        if (Array.isArray(requiredRole)) {
            return requiredRole.includes(this.user.role) ||
                   (adminRoles.includes(this.user.role) && requiredRole.some(r => adminRoles.includes(r)));
        }
        
        return this.user.role === requiredRole ||
               (adminRoles.includes(this.user.role) && adminRoles.includes(requiredRole));
    },
    
    saveSession() {
        sessionStorage.setItem('dreamos_session', JSON.stringify(this.session));
        sessionStorage.setItem('dreamos_user', JSON.stringify(this.user));
    },
    
    loadSession() {
        const sessionData = sessionStorage.getItem('dreamos_session');
        const userData = sessionStorage.getItem('dreamos_user');
        
        if (sessionData && userData) {
            this.session = JSON.parse(sessionData);            this.user = JSON.parse(userData);
            
            // Check expiration
            if (Date.now() > this.session.expires) {
                this.logout();
            }
        }
    },
    
    getCurrentUser() {
        return this.user;
    }
};

// Auto-init
Auth.init();

// Make global for modules
window.Auth = Auth;
