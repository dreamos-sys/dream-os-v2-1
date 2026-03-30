/**
 * 🔔 DREAM OS - NOTIFICATION CENTER
 * Real-time notifications across all modules
 */

export const NotificationCenter = {
    notifications: [],
    listeners: [],
    
    // Add notification
    add(title, message, type = 'info', module = null) {
        const notif = {
            id: Date.now(),
            title,
            message,
            type,
            module,
            timestamp: new Date().toISOString(),
            read: false
        };
        this.notifications.unshift(notif);
        this.notify();
        return notif;
    },
    
    // Subscribe to notifications
    subscribe(callback) {
        this.listeners.push(callback);
    },
    
    // Notify all listeners
    notify() {
        this.listeners.forEach(cb => cb(this.notifications));
    },
    
    // Mark as read
    markRead(id) {
        const notif = this.notifications.find(n => n.id === id);
        if (notif) notif.read = true;
    },
    
    // Clear all
    clear() {
        this.notifications = [];
        this.notify();
    },
    
    // Get unread count
    getUnreadCount() {        return this.notifications.filter(n => !n.read).length;
    }
};

// Toast notification helper
export function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
    };
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: ${colors[type] || colors.info};
        color: white;
        padding: 12px 24px;
        border-radius: 30px;
        font-weight: 700;
        z-index: 10000;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        animation: slideUp 0.3s ease;
    `;
    toast.innerHTML = `${icons[type] || icons.info} ${message}`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Add animation
if (!document.getElementById('notif-animations')) {
    const style = document.createElement('style');
    style.id = 'notif-animations';
    style.textContent = `
        @keyframes slideUp {            from { transform: translateX(-50%) translateY(20px); opacity: 0; }
            to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

export default NotificationCenter;
