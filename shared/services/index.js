export const services = {
    auth: {
        login: (code) => {
            // Mantra Sakti Master M
            if (code === 'b15m1ll4h_012443410' || code === '1234') {
                localStorage.setItem('dream_os_session', 'active');
                localStorage.setItem('failedAttempts', '0');
                return true;
            }
            return false;
        }
    },
    toast: (msg, type = 'info') => {
        const container = document.getElementById('toast-container');
        if (container) {
            const toast = document.createElement('div');
            toast.className = 'toast ' + type;
            toast.textContent = msg;
            container.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        } else {
            alert((type === 'error' ? '❌ ' : '✅ ') + msg);
        }
    }
};

export async function initServices() {
    console.log('✅ Shared services v2.1 Initialized');
}
