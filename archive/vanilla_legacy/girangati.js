// 🧬 GIRANGATI NEURAL CORE v2.1
// Integrated: Tiny (Muscles) + Baby Agent (Brain)

const Girangati = {
    identity: "DREAM OS v2.1",
    version: "2.1.0",
    mode: "DYNAMIC_PRO",
    status: "ACTIVE",

    // 🦾 TINY: Hardware Execution
    tiny: {
        status: "READY",
        device: typeof navigator !== 'undefined' ? (navigator.userAgent.includes('Mobile') ? 'MOBILE' : 'DESKTOP') : 'UNKNOWN',
        battery: null,
        network: typeof navigator !== 'undefined' ? (navigator.onLine ? 'ONLINE' : 'OFFLINE') : 'OFFLINE',
        
        init: async function() {
            console.log('🦾 Tiny: Initializing muscles...');
            if(typeof navigator !== 'undefined' && 'getBattery' in navigator) {
                try {
                    const battery = await navigator.getBattery();
                    this.battery = Math.round(battery.level * 100);
                    console.log('🦾 Tiny: Battery at ' + this.battery + '%');
                } catch(e) { console.log('🦾 Tiny: Battery API not available'); }
            }
            this.status = 'ACTIVE';
        },

        execute: function(cmd) {
            console.log('🦾 Tiny: Executing -> ' + cmd);
            if(cmd === 'MODULE_OPEN' && typeof navigator !== 'undefined' && navigator.vibrate) {
                this.vibrate([50, 50, 50]);
            }
        },

        vibrate: function(pattern) {
            if(typeof navigator !== 'undefined' && navigator.vibrate) {
                navigator.vibrate(pattern);
            }
        },

        getStatus: function() {
            return { status: this.status, device: this.device, battery: this.battery, network: this.network };        }
    },

    // 🧠 BABY AGENT: Smart Logic
    babyAgent: {
        intelligence: "SUPER_AGENT",
        status: "LEARNING",
        context: {},
        
        init: function() {
            console.log('🧠 Baby Agent: Waking up...');
            this.status = 'ACTIVE';
            this.loadContext();
        },

        loadContext: function() {
            if(typeof sessionStorage !== 'undefined') {
                this.context = {
                    user: sessionStorage.getItem('dream_user') || 'GUEST',
                    session: sessionStorage.getItem('dream_session') || 'INACTIVE',
                    timestamp: new Date().toISOString()
                };
            }
        },

        analyze: function(input) {
            console.log('🧠 Baby Agent Analyzing: ' + input);
            
            const routes = {
                'Command Center': 'dashboard',
                'Form Booking': 'booking',
                'K3': 'safety',
                'Sekuriti': 'security',
                'Janitor': 'cleaning',
                'Stok': 'inventory',
                'Maintenance': 'repair',
                'Asset': 'assets'
            };

            const category = routes[input] || 'general';
            console.log('🧠 Baby Agent: Routed to ' + category);
            
            return { category: category, confidence: 0.95, timestamp: Date.now() };
        },

        learn: function(input, output) {
            console.log('🧠 Baby Agent: Learning...');
            if(typeof localStorage !== 'undefined') {
                localStorage.setItem('baby_agent_learn_' + Date.now(), JSON.stringify({input, output}));
            }        },

        getStatus: function() {
            return { status: this.status, intelligence: this.intelligence, context: this.context };
        }
    },

    // 🧠 BRAIN: Event Routing
    brain: {
        emit: function(signal, data) {
            console.log('✨ [' + Girangati.identity + '] Signal: ' + signal);
            
            try {
                const analysis = Girangati.babyAgent.analyze(data);
                Girangati.tiny.execute(signal);
                Girangati.brain.route(signal, data, analysis);
                Girangati.brain.audit(signal, data);
            } catch(error) {
                console.error('❌ Brain emit error:', error);
            }
        },

        route: function(signal, data, analysis) {
            console.log('🔄 Routing:', analysis.category);
            if(typeof window !== 'undefined' && window.loadModule) {
                window.loadModule(data);
            }
        },

        audit: function(signal, data) {
            if(typeof localStorage !== 'undefined') {
                const log = {
                    timestamp: new Date().toISOString(),
                    signal: signal,
                    data: data,
                    user: Girangati.babyAgent.context.user,
                    status: 'SUCCESS'
                };
                const logs = JSON.parse(localStorage.getItem('girangati_audit') || '[]');
                logs.push(log);
                localStorage.setItem('girangati_audit', JSON.stringify(logs.slice(-100)));
            }
        }
    },

    // 📊 DIAGNOSTICS
    diagnostics: function() {
        return {
            identity: this.identity,
            version: this.version,            tiny: this.tiny.getStatus(),
            babyAgent: this.babyAgent.getStatus(),
            memory: typeof localStorage !== 'undefined' ? { localStorage: localStorage.length + ' items', sessionStorage: typeof sessionStorage !== 'undefined' ? sessionStorage.length + ' items' : 'N/A' } : 'N/A',
            network: this.tiny.network
        };
    },

    // 🚀 INIT
    init: async function() {
        console.log('🧬 Girangati Neural Core Initializing...');
        await this.tiny.init();
        this.babyAgent.init();
        this.status = 'FULLY_OPERATIONAL';
        console.log('✅ Girangati Ready!');
        return this.diagnostics();
    }
};

// Export for browser
if(typeof window !== 'undefined') {
    window.girangati = Girangati;
    // Auto-init
    if(document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => Girangati.init());
    } else {
        Girangati.init();
    }
}
