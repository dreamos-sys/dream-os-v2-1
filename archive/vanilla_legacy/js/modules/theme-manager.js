/**
 * Dream OS v2.1 - Theme Manager
 * Multi-Theme Support with Smooth Transitions
 * Integrated with GhostArchitect & DREAM_SYS
 */

export const ThemeManager = {
    themes: {
        'dark-glass': {
            name: '🌙 Dark Glass',
            colors: {
                '--bg-primary': '#020617',
                '--bg-secondary': '#0f172a',
                '--bg-tertiary': '#1e293b',
                '--text-primary': '#e2e8f0',
                '--text-muted': '#94a3b8',
                '--text-subtle': '#64748b',
                '--color-primary': '#10b981',
                '--color-primary-light': '#34d399',
                '--color-primary-dark': '#059669',
                '--color-primary-glow': 'rgba(16, 185, 129, 0.4)',
                '--color-secondary': '#06b6d4',
                '--color-accent': '#8b5cf6',
                '--glass-bg': 'rgba(15, 23, 42, 0.65)',
                '--glass-bg-heavy': 'rgba(15, 23, 42, 0.85)',
                '--glass-border': '1px solid rgba(16, 185, 129, 0.2)',
                '--glass-shadow': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                '--card-bg': 'rgba(15, 23, 42, 0.6)',
                '--shadow': '0 8px 32px rgba(0, 0, 0, 0.4)'
            }
        },
        'light-minimal': {
            name: '☀️ Light Minimal',
            colors: {
                '--bg-primary': '#ffffff',
                '--bg-secondary': '#f5f5f7',
                '--bg-tertiary': '#e8e8ed',
                '--text-primary': '#1d1d1f',
                '--text-muted': '#86868b',
                '--text-subtle': '#a1a1a6',
                '--color-primary': '#0071e3',
                '--color-primary-light': '#2997ff',
                '--color-primary-dark': '#005bb5',
                '--color-primary-glow': 'rgba(0, 113, 227, 0.3)',
                '--color-secondary': '#00c7fd',
                '--color-accent': '#bf5af2',
                '--glass-bg': 'rgba(255, 255, 255, 0.8)',
                '--glass-bg-heavy': 'rgba(255, 255, 255, 0.95)',
                '--glass-border': '1px solid rgba(0, 0, 0, 0.1)',
                '--glass-shadow': '0 4px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)',                '--card-bg': 'rgba(255, 255, 255, 0.8)',
                '--shadow': '0 4px 24px rgba(0, 0, 0, 0.08)'
            }
        },
        'cyberpunk': {
            name: '🤖 Cyberpunk',
            colors: {
                '--bg-primary': '#0a0a0f',
                '--bg-secondary': '#12121a',
                '--bg-tertiary': '#1a1a2e',
                '--text-primary': '#ffffff',
                '--text-muted': '#b0b0b0',
                '--text-subtle': '#808080',
                '--color-primary': '#00ff88',
                '--color-primary-light': '#00ffaa',
                '--color-primary-dark': '#00cc6a',
                '--color-primary-glow': 'rgba(0, 255, 136, 0.5)',
                '--color-secondary': '#00ffff',
                '--color-accent': '#ff00ff',
                '--glass-bg': 'rgba(18, 18, 26, 0.9)',
                '--glass-bg-heavy': 'rgba(18, 18, 26, 0.95)',
                '--glass-border': '1px solid rgba(0, 255, 136, 0.3)',
                '--glass-shadow': '0 0 20px rgba(0, 255, 136, 0.3), inset 0 1px 0 rgba(0, 255, 136, 0.1)',
                '--card-bg': 'rgba(18, 18, 26, 0.9)',
                '--shadow': '0 0 40px rgba(0, 255, 136, 0.4)'
            }
        },
        'islamic-modern': {
            name: '🕌 Islamic Modern',
            colors: {
                '--bg-primary': '#1a1f2e',
                '--bg-secondary': '#242b3d',
                '--bg-tertiary': '#2d3548',
                '--text-primary': '#ffffff',
                '--text-muted': '#94a3b8',
                '--text-subtle': '#64748b',
                '--color-primary': '#d4af37',
                '--color-primary-light': '#f4d03f',
                '--color-primary-dark': '#b8941f',
                '--color-primary-glow': 'rgba(212, 175, 55, 0.5)',
                '--color-secondary': '#10b981',
                '--color-accent': '#06b6d4',
                '--glass-bg': 'rgba(36, 43, 61, 0.9)',
                '--glass-bg-heavy': 'rgba(36, 43, 61, 0.95)',
                '--glass-border': '1px solid rgba(212, 175, 55, 0.3)',
                '--glass-shadow': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(212, 175, 55, 0.1)',
                '--card-bg': 'rgba(36, 43, 61, 0.9)',
                '--shadow': '0 8px 32px rgba(0, 0, 0, 0.4)'
            }
        },        'material': {
            name: '📱 Material',
            colors: {
                '--bg-primary': '#121212',
                '--bg-secondary': '#1e1e1e',
                '--bg-tertiary': '#2d2d2d',
                '--text-primary': '#ffffff',
                '--text-muted': '#b0b0b0',
                '--text-subtle': '#808080',
                '--color-primary': '#bb86fc',
                '--color-primary-light': '#d4a5ff',
                '--color-primary-dark': '#9965d4',
                '--color-primary-glow': 'rgba(187, 134, 252, 0.4)',
                '--color-secondary': '#03dac6',
                '--color-accent': '#cf6679',
                '--glass-bg': 'rgba(45, 45, 45, 0.9)',
                '--glass-bg-heavy': 'rgba(45, 45, 45, 0.95)',
                '--glass-border': '1px solid rgba(255, 255, 255, 0.1)',
                '--glass-shadow': '0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                '--card-bg': '#2d2d2d',
                '--shadow': '0 4px 20px rgba(0, 0, 0, 0.4)'
            }
        }
    },

    getCurrent() {
        return localStorage.getItem('dreamos-theme') || 'dark-glass';
    },

    async set(themeName) {
        const theme = this.themes[themeName];
        if (!theme) {
            console.error('❌ [THEME] Theme not found:', themeName);
            return false;
        }

        document.documentElement.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        document.body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

        Object.entries(theme.colors).forEach(([property, value]) => {
            document.documentElement.style.setProperty(property, value);
        });

        localStorage.setItem('dreamos-theme', themeName);

        if (window.GhostArchitect) {
            await window.GhostArchitect.save({
                type: 'theme_change',
                module: 'settings',
                theme: themeName,                timestamp: new Date().toISOString()
            });
        }

        if (window.DREAM_SYS) {
            window.DREAM_SYS.log('info', `Theme changed to: ${theme.name}`);
            window.DREAM_SYS.toast(`🎨 Theme: ${theme.name}`, 'success');
        }

        console.log(`✅ [THEME] Changed to: ${theme.name}`);
        return true;
    },

    getAvailable() {
        return Object.entries(this.themes).map(([key, value]) => ({
            id: key,
            name: value.name,
            colors: value.colors
        }));
    },

    toggle() {
        const current = this.getCurrent();
        const next = current === 'dark-glass' ? 'light-minimal' : 'dark-glass';
        return this.set(next);
    },

    init() {
        const saved = this.getCurrent();
        this.set(saved);
        console.log(`✅ [THEME] Initialized: ${this.themes[saved].name}`);
    }
};

ThemeManager.init();

console.log('✅ [THEME MANAGER] Loaded - 5 themes available');
