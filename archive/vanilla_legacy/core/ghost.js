/**
 * 👻 DREAM OS v2.1 - GHOST IMMUNE SYSTEM
 * Integrated: Tiny (Phagocyte) + Baby Agent (Antibody)
 * Concept: Bug → Vaccine → Stronger System
 */

const GHOST_MASTER_PASSWORD = 'GhostArchitect2026!@#';
const GHOST_PASSWORDS = {
    'tahajud': 'dreamos02',
    'subuh': 'dreamos02',
    'dhuha': 'dreamos02',
    'dzuhur': 'dreamos04',
    'ashar': 'dreamos04',
    'maghrib': 'dreamos03',
    'isya': 'dreamos04'
};

class GhostImmune {
    constructor() {
        this.isActive = false;
        this.vaccineCount = 0;
        this.lastActivation = null;
        this.immunityLevel = 0;
        this.vaccines = [];
    }

    // Get current prayer time password
    getPrayerPass() {
        const hour = new Date().getHours();
        if (hour >= 0 && hour < 6) return GHOST_PASSWORDS.tahajud;
        if (hour >= 6 && hour < 12) return GHOST_PASSWORDS.dhuha;
        if (hour >= 12 && hour < 15) return GHOST_PASSWORDS.dzuhur;
        if (hour >= 15 && hour < 18) return GHOST_PASSWORDS.ashar;
        if (hour >= 18 && hour < 19) return GHOST_PASSWORDS.maghrib;
        return GHOST_PASSWORDS.isya;
    }

    // Verify password & activate
    verify(password) {
        console.log('[Ghost] Password verification...');
        const isMaster = password === GHOST_MASTER_PASSWORD;
        const isPrayer = password === this.getPrayerPass();
        
        if (isMaster || isPrayer) {
            console.log('[Ghost] Password verified!');
            this.activate();            return true;
        }
        console.log('[Ghost] Password failed!');
        return false;
    }

    // Activate immune system
    activate() {
        this.isActive = true;
        this.lastActivation = new Date().toISOString();
        sessionStorage.setItem('dream_ghost', 'ACTIVE');
        console.log('👻 Ghost Immune System ACTIVATED');
        
        // Run immune protocol
        this.runImmuneProtocol();
        
        // Auto-deactivate after 10 minutes
        setTimeout(() => this.deactivate(), 600000);
    }

    // Deactivate immune system
    deactivate() {
        this.isActive = false;
        sessionStorage.removeItem('dream_ghost');
        console.log('👻 Ghost Immune System DEACTIVATED');
    }

    // 🧬 IMMUNE PROTOCOL: Bug → Vaccine
    async runImmuneProtocol() {
        console.log('🛡️ GHOST IMMUNITY: Protokol Vaksinasi Aktif...');
        
        try {
            // 🦾 TINY: Phagocyte Action (Eat cache bugs)
            if ('caches' in window) {
                const names = await caches.keys();
                for (const name of names) {
                    console.log('🦾 Tiny: Memakan bug di cache → ' + name);
                    await caches.delete(name);
                    this.vaccineCount++;
                    this.addVaccine('cache_bug', name);
                }
            }

            // 🧠 BABY AGENT: Antibody Production (Analyze errors)
            const errors = JSON.parse(localStorage.getItem('girangati_errors') || '[]');
            if (errors.length > 0) {
                console.log(`🧠 Baby Agent: Mengubah ${errors.length} Error jadi Antibody...`);
                errors.forEach(err => {
                    this.analyzeError(err);
                });                localStorage.removeItem('girangati_errors');
                this.vaccineCount += errors.length;
            }

            // Clean corrupted sessions
            const sessions = JSON.parse(localStorage.getItem('dream_sessions') || '[]');
            if (sessions.length > 0) {
                console.log(`🧹 Cleaning ${sessions.length} corrupted sessions...`);
                localStorage.removeItem('dream_sessions');
                this.vaccineCount += sessions.length;
            }

            // Update immunity level
            this.immunityLevel = Math.min(100, this.vaccineCount * 5);
            
            console.log(`✅ VAKSIN TERBENTUK: ${this.vaccineCount} Sel Imun Baru`);
            console.log(`🛡️ IMMUNITY LEVEL: ${this.immunityLevel}%`);

            // Save vaccine data
            this.saveVaccines();

        } catch (error) {
            console.error('❌ Immune protocol error:', error);
        }
    }

    // Analyze error and create vaccine rule
    analyzeError(error) {
        const vaccine = {
            id: 'vaccine_' + Date.now(),
            type: 'error_antibody',
            source: error.error || 'unknown',
            timestamp: error.timestamp || new Date().toISOString(),
            rule: this.generateRule(error),
            status: 'active'
        };
        
        this.vaccines.push(vaccine);
        console.log('🧬 Vaccine created:', vaccine.id);
    }

    // Generate protective rule from error
    generateRule(error) {
        const rules = {
            'NetworkError': 'retry_with_backup',
            'AuthError': 'force_relogin',
            'CacheError': 'bypass_cache',
            'ModuleError': 'load_fallback',
            'default': 'log_and_continue'
        };        
        const errorType = Object.keys(rules).find(k => 
            (error.error || '').includes(k)
        ) || 'default';
        
        return rules[errorType];
    }

    // Add vaccine to collection
    addVaccine(type, source) {
        this.vaccines.push({
            id: 'vaccine_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            type: type,
            source: source,
            timestamp: new Date().toISOString(),
            rule: 'prevent_recurrence',
            status: 'active'
        });
    }

    // Save vaccines to localStorage
    saveVaccines() {
        localStorage.setItem('dream_vaccines', JSON.stringify({
            count: this.vaccineCount,
            immunityLevel: this.immunityLevel,
            lastActivation: this.lastActivation,
            vaccines: this.vaccines.slice(-50) // Keep last 50
        }));
    }

    // Load vaccines from storage
    loadVaccines() {
        const data = JSON.parse(localStorage.getItem('dream_vaccines') || '{}');
        this.vaccineCount = data.count || 0;
        this.immunityLevel = data.immunityLevel || 0;
        this.lastActivation = data.lastActivation || null;
        this.vaccines = data.vaccines || [];
    }

    // Get immunity status
    getStatus() {
        return {
            isActive: this.isActive,
            vaccineCount: this.vaccineCount,
            immunityLevel: this.immunityLevel,
            lastActivation: this.lastActivation,
            activeVaccines: this.vaccines.filter(v => v.status === 'active').length
        };
    }
    // Reset immune system (for testing)
    reset() {
        this.vaccineCount = 0;
        this.immunityLevel = 0;
        this.vaccines = [];
        localStorage.removeItem('dream_vaccines');
        console.log('🔄 Immune system reset');
    }
}

const ghost = new GhostImmune();
ghost.loadVaccines(); // Load on init

export { ghost, GHOST_MASTER_PASSWORD, GHOST_PASSWORDS };
