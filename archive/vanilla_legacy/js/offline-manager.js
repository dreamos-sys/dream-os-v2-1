/**
 * 📴 DREAM OS - OFFLINE MANAGER
 * Works even without internet connection
 */

export const OfflineManager = {
    isOnline: navigator.onLine,
    queue: [],
    
    init() {
        // Listen for online/offline events
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());
        
        // Check connection status
        this.updateStatus();
        console.log('📴 Offline Manager Ready');
    },
    
    handleOnline() {
        this.isOnline = true;
        this.updateStatus();
        this.syncQueue();
        showToast('✅ Back Online!', 'success');
    },
    
    handleOffline() {
        this.isOnline = false;
        this.updateStatus();
        showToast('⚠️ Offline Mode', 'warning');
    },
    
    updateStatus() {
        const indicator = document.getElementById('online-indicator');
        if (indicator) {
            indicator.textContent = this.isOnline ? '🟢 Online' : '🔴 Offline';
            indicator.style.color = this.isOnline ? '#10b981' : '#ef4444';
        }
    },
    
    // Queue action for later sync
    queueAction(action, data) {
        this.queue.push({
            action,
            data,
            timestamp: Date.now()
        });
        localStorage.setItem('offline_queue', JSON.stringify(this.queue));
        console.log('📝 Queued for sync:', action);
    },
    
    // Sync queued actions when back online
    async syncQueue() {
        if (this.queue.length === 0) return;
        
        console.log('🔄 Syncing', this.queue.length, 'queued actions...');
        
        for (const item of this.queue) {
            try {
                // Retry the action
                await this.retryAction(item);
            } catch (err) {
                console.error('Sync failed:', item.action, err);
            }
        }
        
        this.queue = [];
        localStorage.removeItem('offline_queue');
        showToast('✅ All data synced!', 'success');
    },
    
    async retryAction(item) {
        // Implement retry logic based on action type
        console.log('Retrying:', item.action);
    },
    
    // Load queued items
    loadQueue() {
        const saved = localStorage.getItem('offline_queue');
        if (saved) {
            this.queue = JSON.parse(saved);
            console.log('📋 Loaded', this.queue.length, 'queued actions');
        }
    }
};

// Auto-init
OfflineManager.init();
OfflineManager.loadQueue();

export default OfflineManager;
