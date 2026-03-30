// Dream OS - Main Configuration
export const APP_CONFIG = {
    name: 'Dream OS',
    version: '2.1.0',
    build: 'enterprise-2026',
    debug: true,
    
    // Security
    security: {
        idleTimeout: 120000,
        maxLoginAttempts: 3,
        sessionExpiry: 3600000
    },
    
    // Ghost Stealth Mode
    ghost: {
        enabled: true,
        tapCount: 5,
        timeout: 2000,
        code: 'dreamos2026',
        masterCode: 'b15m1ll4h_012443410',
        adminCode: '4dm1n_AF6969@00'
    },
    
    // Supabase
    supabase: {
        url: 'https://lfavawkzvdhdpaaplaiq.supabase.co',
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmYXZhd2t6dmRoZHBhYXBsYWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5Mjc0NjgsImV4cCI6MjA4OTUwMzQ2OH0.EhwnhAd20lUVaWHHB51UdWCGWxkyTaWIrsPY8xvhwE00'
    },
    
    // Modules
    modules: {
        enabled: ['auth', 'dashboard', 'command-center', 'stok', 'maintenance', 'security', 'booking', 'k3', 'asset', 'janitor', 'qr', 'settings'],
        core: ['auth', 'dashboard'],
        hidden: ['ghost']
    }
};
