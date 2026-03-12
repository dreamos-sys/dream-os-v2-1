/**
 * supabase-bridge.js – Dream OS v2.1
 * GhostAudit Cloud Sync (ISO 27001 Real-time Audit Trail)
 */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Konfigurasi Supabase (ambil dari window.DREAM.config)
const getSupabaseClient = () => {
    const config = window.DREAM?.config?.supabase;
    if (!config?.url || !config?.key) {
        console.warn('⚠️ [SUPABASE] Missing configuration');
        return null;
    }
    return createClient(config.url, config.key);
};

export const SupabaseBridge = {
    _queue: [], // Antrean log yang belum terkirim
    _isSending: false,

    // Kirim satu log
    async sendLog(logEntry) {
        const supabase = getSupabaseClient();
        if (!supabase) {
            this._queue.push(logEntry);
            this._persistQueue();
            return false;
        }

        try {
            const { error } = await supabase
                .from('audit_logs')
                .insert([{
                    id: logEntry.id,
                    user: logEntry.user,
                    action: logEntry.action,
                    details: logEntry.details,
                    device_fingerprint: logEntry.device,
                    timestamp: new Date(logEntry.time).toISOString(),
                    created_at: new Date().toISOString()
                }]);

            if (error) throw error;
            console.log('✅ [SUPABASE] Log sent:', logEntry.id);
            return true;
        } catch (err) {
            console.error('❌ [SUPABASE] Failed to send log:', err);
            this._queue.push(logEntry);
            this._persistQueue();
            return false;
        }
    },

    // Proses antrean (dipanggil saat online kembali)
    async flushQueue() {
        if (this._isSending || this._queue.length === 0) return;
        this._isSending = true;

        const queue = [...this._queue];
        this._queue = []; // Kosongkan sementara
        this._persistQueue();

        for (const log of queue) {
            await this.sendLog(log);
            // Beri jeda kecil agar tidak overload
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        this._isSending = false;
    },

    // Simpan antrean ke localStorage jika offline
    _persistQueue() {
        try {
            localStorage.setItem('supabase_audit_queue', JSON.stringify(this._queue));
        } catch (e) {
            console.warn('[SUPABASE] Failed to persist queue');
        }
    },

    // Muat antrean dari localStorage
    _loadQueue() {
        try {
            const saved = localStorage.getItem('supabase_audit_queue');
            if (saved) {
                this._queue = JSON.parse(saved);
                localStorage.removeItem('supabase_audit_queue');
            }
        } catch (e) {}
    },

    // Inisialisasi: muat antrean dan pasang event listener online/offline
    init() {
        this._loadQueue();
        window.addEventListener('online', () => {
            console.log('[SUPABASE] Online, flushing queue...');
            this.flushQueue();
        });
    }
};

// Inisialisasi otomatis
SupabaseBridge.init();
