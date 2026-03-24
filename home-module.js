/**
 * 🏠 DREAM OS v13.4 - HOME MODULE (ENTERPRISE REVISION)
 * Dashboard & Quick Insights - ISO 27001 Standard
 * Bismillah bi idznillah.
 */

(function() {
    'use strict';
    const log = window.log || console.log;
    log('🏠 Home Module Loaded - Enterprise Grade');

    const CONFIG = {
        refreshInterval: 30000,
        maxRecentActivity: 10,
        safeCore: { lat: -6.4, lng: 106.8 } // Depok Area
    };

    // Helper: Update UI safely
    const setUI = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    };

    // 1. Stats Loader with Error Immunity
    async function loadStats() {
        if (!window.supabase) return log('❌ Stats: Supabase Missing');
        try {
            const queries = [
                window.supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
                window.supabase.from('k3_reports').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
                window.supabase.from('inventaris').select('*', { count: 'exact', head: true }),
                window.supabase.from('gudang_stok').select('*', { count: 'exact', head: true })
            ];

            const results = await Promise.all(queries);
            setUI('stat-booking', results[0].count || 0);
            setUI('stat-k3', results[1].count || 0);
            setUI('stat-inventory', results[2].count || 0);
            setUI('stat-warehouse', results[3].count || 0);
            log('📊 Dashboard stats synchronized.');
        } catch (err) {
            log('⚠️ Stats Sync Error: ' + err.message);
        }
    }

    // 2. Activity Stream (Unified)
    async function loadRecentActivity() {
        const container = document.getElementById('recent-activity');
        if (!container) return;

        try {
            const [bookings, k3] = await Promise.all([
                window.supabase.from('bookings').select('nama_peminjam,ruang,created_at,status').order('created_at', { ascending: false }).limit(5),
                window.supabase.from('k3_reports').select('lokasi,jenis_laporan,created_at,status').order('created_at', { ascending: false }).limit(5)
            ]);

            let stream = [];
            if (bookings.data) bookings.data.forEach(b => stream.push({
                icon: b.status === 'approved' ? '✅' : '⏳',
                title: 'Booking ' + (b.status === 'approved' ? 'Disetujui' : 'Baru'),
                desc: `${b.nama_peminjam} - ${b.ruang}`,
                rawDate: new Date(b.created_at)
            }));
            if (k3.data) k3.data.forEach(k => stream.push({
                icon: k.status === 'verified' ? '🛡️' : '⚠️',
                title: 'K3 ' + (k.status === 'verified' ? 'Verified' : 'Report'),
                desc: `${k.jenis_laporan} @ ${k.lokasi}`,
                rawDate: new Date(k.created_at)
            }));

            stream.sort((a, b) => b.rawDate - a.rawDate);
            
            container.innerHTML = stream.slice(0, CONFIG.maxRecentActivity).map(a => `
                <div class="flex items-center gap-3 bg-slate-800/40 p-3 rounded-xl border border-white/5 hover:border-white/10 transition">
                    <div class="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-xl">${a.icon}</div>
                    <div class="flex-1">
                        <p class="text-sm font-bold text-white">${a.title}</p>
                        <p class="text-[10px] text-slate-400 uppercase tracking-tighter">${a.desc}</p>
                    </div>
                    <div class="text-[9px] font-mono text-slate-500">${a.rawDate.toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'})}</div>
                </div>
            `).join('') || '<p class="text-center text-slate-500">No activity today.</p>';

        } catch (err) { log('❌ Activity Error: ' + err.message); }
    }

    // 3. AI Insights (The Logic Engine)
    async function generateAIInsights() {
        const container = document.getElementById('ai-insights');
        if (!container) return;

        const hour = new Date().getHours();
        const { count: bCount } = await window.supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending');
        
        let insight = { msg: "Sistem Optimal", color: "border-emerald-500", icon: "💎" };

        if (bCount > 5) insight = { msg: `${bCount} Antrian Booking butuh Approval segera.`, color: "border-orange-500", icon: "⚡" };
        if (hour >= 15) insight = { msg: "Sudah sore, jangan lupa submit Laporan SPJ & K3.", color: "border-blue-500", icon: "📝" };

        container.innerHTML = `
            <div class="bg-slate-800/60 p-4 rounded-xl border-l-4 ${insight.color} animate-pulse">
                <p class="text-sm font-medium text-slate-200">${insight.icon} ${insight.msg}</p>
            </div>
        `;
    }

    // Initialize
    loadStats();
    loadRecentActivity();
    generateAIInsights();
    setInterval(() => { loadStats(); loadRecentActivity(); }, CONFIG.refreshInterval);
})();
