// ════════════════════════════════════════════
// FILE: js/utils/icons.js
// ════════════════════════════════════════════

export const ModuleIcons = {
    // Match Golden D Logo Style
    style: {
        size: '70px',
        borderRadius: '50%',
        shadow: '0 8px 20px rgba(0,0,0,0.3)',
        gradient: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))'
    },
    
    // All Module Icons
    icons: {
        // AI & Intelligence
        'ai-panel': { icon: 'fa-brain', color: '#8b5cf6', label: 'AI Panel', subtitle: 'Neural Control' },
        'ai-speak': { icon: 'fa-microchip', color: '#06b6d4', label: 'AI Speak', subtitle: 'Voice Synthesis' },
        'prediction': { icon: 'fa-chart-line', color: '#10b981', label: 'Prediction', subtitle: 'Forecast Analytics' },
        
        // Operations
        'booking': { icon: 'fa-calendar-check', color: '#3b82f6', label: 'Booking', subtitle: 'Pemesanan Ruangan' },
        'asset': { icon: 'fa-cubes', color: '#f59e0b', label: 'Asset', subtitle: 'Inventaris & Gudang' },
        'stok': { icon: 'fa-boxes', color: '#ef4444', label: 'Stok', subtitle: 'Peralatan & Inventaris' },
        'maintenance': { icon: 'fa-wrench', color: '#64748b', label: 'Maintenance', subtitle: 'Perbaikan & Kerusakan' },
        
        // Security & Safety
        'sekuriti': { icon: 'fa-shield-halved', color: '#0ea5e9', label: 'Sekuriti', subtitle: 'Keamanan & Kehilangan' },
        'k3': { icon: 'fa-triangle-exclamation', color: '#eab308', label: 'K3', subtitle: 'Keselamatan & Kesehatan' },
        'k3-officer': { icon: 'fa-user-shield', color: '#059669', label: 'K3 Officer', subtitle: 'Safety Personnel' },
        
        // Facility
        'janitor-indoor': { icon: 'fa-broom', color: '#84cc16', label: 'Janitor In', subtitle: 'Kebersihan Indoor' },
        'janitor-outdoor': { icon: 'fa-leaf', color: '#22c55e', label: 'Janitor Out', subtitle: 'Kebersihan Outdoor' },
        'weather': { icon: 'fa-cloud-sun', color: '#f97316', label: 'Weather', subtitle: 'Climate Monitor' },
        
        // System
        'command-center': { icon: 'fa-chess-queen', color: '#a855f7', label: 'Command Center', subtitle: 'Pusat Kendali' },
        'settings': { icon: 'fa-sliders', color: '#64748b', label: 'Settings', subtitle: 'System Config' },
        'profile': { icon: 'fa-user', color: '#ec4899', label: 'Profile', subtitle: 'User Account' },
        'qr': { icon: 'fa-qrcode', color: '#14b8a6', label: 'QR Scanner', subtitle: 'Scan & Generate' },
        'reports': { icon: 'fa-file-lines', color: '#3b82f6', label: 'Reports', subtitle: 'Laporan Terpusat' },
        
        // Special
        'ghost': { icon: 'fa-ghost', color: '#8b5cf6', label: 'Ghost Core', subtitle: 'Developer Access' },
        'login': { icon: 'fa-right-to-bracket', color: '#10b981', label: 'Login', subtitle: 'Authentication' }
    },
    
    // Render Icon Card
    renderCard(key, onClick) {
        const mod = this.icons[key];
        if (!mod) return '';
        
        return `
            <div class="glass-card" onclick="${onClick}">
                <div class="module-icon" style="
                    width: ${this.style.size};
                    height: ${this.style.size};
                    background: ${mod.color};
                    border-radius: ${this.style.borderRadius};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 12px;
                    box-shadow: ${this.style.shadow};
                ">
                    <i class="fas ${mod.icon}" style="color: white; font-size: 2rem;"></i>
                </div>
                <div style="font-size: 13px; font-weight: 700; color: var(--text-primary); text-align: center;">
                    ${mod.label}
                </div>
                <div style="font-size: 10px; color: var(--text-muted); text-align: center;">
                    ${mod.subtitle}
                </div>
            </div>
        `;
    },
    
    // Get Icon by Key
    get(key) {
        return this.icons[key] || null;
    },
    
    // Get All Icons
    getAll() {
        return this.icons;
    }
};

// Make global
window.ModuleIcons = ModuleIcons;
