/**
 * ══════════════════════════════════════════════════════════════
 * DREAM OS - SUPER COMMAND CENTER
 * Enterprise Management System | Head of General Affairs
 * ISO 27001 | AI Predictive Analytics | Full Integration
 * ══════════════════════════════════════════════════════════════
 */

export default {
    name: 'Super Command Center',
    icon: 'fa-building',
    color: '#a855f7',
    version: '4.0.0',
    
    async render(context) {
        return `
            <div id="super-cc" style="animation:fadeInUp 0.4s ease;">
                <!-- Header -->
                <div style="background:linear-gradient(135deg, #1e1b4b, #0c0a2a); border-radius:24px; padding:20px; margin-bottom:20px; border:1px solid rgba(168,85,247,0.5);">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:15px;">
                        <div style="display:flex; align-items:center; gap:15px;">
                            <div style="width:60px; height:60px; background:linear-gradient(135deg, #a855f7, #8b5cf6); border-radius:18px; display:flex; align-items:center; justify-content:center;">
                                <i class="fas fa-crown" style="font-size:32px; color:gold;"></i>
                            </div>
                            <div>
                                <h1 style="color:#a855f7; margin:0; font-size:1.6rem;">SUPER COMMAND CENTER</h1>
                                <p style="color:#94a3b8; font-size:11px; margin:0;">Head of General Affairs • Enterprise Management System</p>
                            </div>
                        </div>
                        <div style="display:flex; gap:8px;">
                            <span style="background:rgba(16,185,129,0.2); padding:6px 12px; border-radius:20px; font-size:11px;">
                                <i class="fas fa-circle" style="font-size:8px; color:#10b981;"></i> LIVE
                            </span>
                            <span style="background:rgba(168,85,247,0.2); padding:6px 12px; border-radius:20px; font-size:11px;">
                                <i class="fas fa-robot"></i> AI Predictive
                            </span>
                            <span style="background:rgba(59,130,246,0.2); padding:6px 12px; border-radius:20px; font-size:11px;">
                                <i class="fas fa-shield-alt"></i> ISO 27001
                            </span>
                        </div>
                    </div>
                </div>
                
                <!-- Stats Row -->
                <div style="display:grid; grid-template-columns:repeat(6,1fr); gap:12px; margin-bottom:20px;">
                    <div class="stat-card-super" data-stat="total" style="background:rgba(15,23,42,0.8); border-radius:16px; padding:12px; text-align:center;">
                        <i class="fas fa-chart-line" style="color:#a855f7; font-size:20px;"></i>
                        <div style="font-size:20px; font-weight:700;" id="stat-total">0</div>
                        <div style="font-size:9px;">Total Aktivitas</div>
                    </div>
                    <div class="stat-card-super" style="background:rgba(59,130,246,0.2); border-radius:16px; padding:12px; text-align:center;">
                        <i class="fas fa-calendar" style="color:#3b82f6;"></i>
                        <div style="font-size:20px; font-weight:700;" id="stat-booking-today">0</div>
                        <div style="font-size:9px;">Booking Hari Ini</div>
                    </div>
                    <div class="stat-card-super" style="background:rgba(245,158,11,0.2); border-radius:16px; padding:12px; text-align:center;">
                        <i class="fas fa-tools" style="color:#f59e0b;"></i>
                        <div style="font-size:20px; font-weight:700;" id="stat-maintenance">0</div>
                        <div style="font-size:9px;">Maintenance</div>
                    </div>
                    <div class="stat-card-super" style="background:rgba(16,185,129,0.2); border-radius:16px; padding:12px; text-align:center;">
                        <i class="fas fa-money-bill" style="color:#10b981;"></i>
                        <div style="font-size:20px; font-weight:700;" id="stat-dana-pending">0</div>
                        <div style="font-size:9px;">Dana Pending</div>
                    </div>
                    <div class="stat-card-super" style="background:rgba(239,68,68,0.2); border-radius:16px; padding:12px; text-align:center;">
                        <i class="fas fa-shield-alt" style="color:#ef4444;"></i>
                        <div style="font-size:20px; font-weight:700;" id="stat-security">Aman</div>
                        <div style="font-size:9px;">Security Status</div>
                    </div>
                    <div class="stat-card-super" style="background:rgba(236,72,153,0.2); border-radius:16px; padding:12px; text-align:center;">
                        <i class="fas fa-file-invoice" style="color:#ec4899;"></i>
                        <div style="font-size:20px; font-weight:700;" id="stat-spj">0</div>
                        <div style="font-size:9px;">SPJ Pending</div>
                    </div>
                </div>
                
                <!-- AI Prediction Panel -->
                <div style="background:linear-gradient(135deg, rgba(168,85,247,0.15), rgba(59,130,246,0.1)); border-radius:20px; padding:20px; margin-bottom:20px;">
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
                        <i class="fas fa-brain" style="color:#a855f7; font-size:24px;"></i>
                        <span style="font-weight:700; font-size:18px;">AI Predictive Analytics</span>
                        <span style="background:rgba(16,185,129,0.3); padding:2px 8px; border-radius:12px; font-size:10px;">Real-time</span>
                    </div>
                    <div id="ai-predictions" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:12px;">
                        <div class="prediction-card" style="background:rgba(0,0,0,0.3); border-radius:12px; padding:12px;">
                            <i class="fas fa-calendar-week"></i> Booking Besok: <strong id="pred-booking-tomorrow">--</strong>
                        </div>
                        <div class="prediction-card" style="background:rgba(0,0,0,0.3); border-radius:12px; padding:12px;">
                            <i class="fas fa-boxes"></i> Stok Kritis: <strong id="pred-stok-kritis">--</strong>
                        </div>
                        <div class="prediction-card" style="background:rgba(0,0,0,0.3); border-radius:12px; padding:12px;">
                            <i class="fas fa-chart-line"></i> Trend Maintenance: <strong id="pred-maintenance">--</strong>
                        </div>
                    </div>
                </div>
                
                <!-- Main Tabs -->
                <div style="display:flex; gap:8px; border-bottom:2px solid rgba(168,85,247,0.3); margin-bottom:20px; overflow-x:auto; padding-bottom:8px;">
                    <button class="super-tab active" data-tab="dashboard">📊 Dashboard</button>
                    <button class="super-tab" data-tab="approval">✅ Approval</button>
                    <button class="super-tab" data-tab="dana">💰 Pengajuan Dana</button>
                    <button class="super-tab" data-tab="spj">📋 SPJ & RAB</button>
                    <button class="super-tab" data-tab="monitoring">📡 Monitoring</button>
                    <button class="super-tab" data-tab="laporan">📁 Laporan</button>
                    <button class="super-tab" data-tab="asset">🏢 Asset & Stok</button>
                    <button class="super-tab" data-tab="qr">🔳 QR Code</button>
                    <button class="super-tab" data-tab="system">⚙️ System</button>
                </div>
                
                <!-- Content Area -->
                <div id="super-content" style="background:rgba(15,23,42,0.6); border-radius:20px; padding:20px; min-height:500px;">
                    <div style="text-align:center; padding:40px;">
                        <i class="fas fa-spinner fa-pulse" style="font-size:32px; color:#a855f7;"></i>
                        <p>Loading Super Command Center...</p>
                    </div>
                </div>
                
                <!-- Quick Actions Footer -->
                <div style="display:grid; grid-template-columns:repeat(5,1fr); gap:10px; margin-top:20px;">
                    <button class="quick-action" data-action="print"><i class="fas fa-print"></i> Print Report</button>
                    <button class="quick-action" data-action="pdf"><i class="fas fa-file-pdf"></i> Export PDF</button>
                    <button class="quick-action" data-action="excel"><i class="fas fa-file-excel"></i> Export Excel</button>
                    <button class="quick-action" data-action="wifi"><i class="fas fa-wifi"></i> WiFi Printer</button>
                    <button class="quick-action" data-action="tv"><i class="fas fa-tv"></i> Smart TV</button>
                </div>
                
                <div style="margin-top:15px; text-align:center; font-size:10px; color:#475569; padding:10px;">
                    <i class="fas fa-shield-alt"></i> ISO 27001 Certified • GDPR Compliant • AI Predictive Analytics v4.0
                </div>
            </div>
            
            <style>
                .stat-card-super { transition: all 0.3s; cursor: pointer; }
                .stat-card-super:hover { transform: translateY(-3px); background: rgba(168,85,247,0.2) !important; }
                .super-tab { background: none; border: none; padding: 10px 16px; cursor: pointer; color: #94a3b8; font-weight: 600; transition: all 0.2s; }
                .super-tab:hover { color: #a855f7; }
                .super-tab.active { color: #a855f7; border-bottom: 2px solid #a855f7; }
                .quick-action { background: rgba(15,23,42,0.8); border: 1px solid rgba(168,85,247,0.3); border-radius: 12px; padding: 10px; cursor: pointer; transition: all 0.2s; }
                .quick-action:hover { background: rgba(168,85,247,0.2); transform: translateY(-2px); }
                .approval-item { background: rgba(15,23,42,0.5); border-radius: 12px; padding: 12px; margin-bottom: 10px; transition: all 0.2s; }
                .approval-item:hover { background: rgba(168,85,247,0.1); }
                @keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
            </style>
        `;
    },
    
    async afterRender(context) {
        const toast = context.toast || ((msg) => { alert(msg); });
        
        // Data Simulasi
        let data = {
            bookingToday: 5,
            bookingTomorrow: 8,
            maintenance: 3,
            danaPending: 4,
            spjPending: 2,
            stokKritis: ['Kabel HDMI', 'Adaptor', 'Mouse', 'Toner Printer'],
            securityStatus: 'Aman',
            totalActivities: 0
        };
        data.totalActivities = data.bookingToday + data.maintenance + data.danaPending + data.spjPending;
        
        // Update Stats
        document.getElementById('stat-total').innerText = data.totalActivities;
        document.getElementById('stat-booking-today').innerText = data.bookingToday;
        document.getElementById('stat-maintenance').innerText = data.maintenance;
        document.getElementById('stat-dana-pending').innerText = data.danaPending;
        document.getElementById('stat-spj').innerText = data.spjPending;
        document.getElementById('stat-security').innerText = data.securityStatus;
        document.getElementById('pred-booking-tomorrow').innerText = data.bookingTomorrow;
        document.getElementById('pred-stok-kritis').innerText = data.stokKritis.length + ' item';
        document.getElementById('pred-maintenance').innerText = '+20% minggu ini';
        
        // AI Notification
        const showAINotification = () => {
            const notifDiv = document.createElement('div');
            notifDiv.style.cssText = 'position:fixed;top:20px;right:20px;background:linear-gradient(135deg,#1e1b4b,#0c0a2a);border:1px solid #a855f7;border-radius:12px;padding:12px 20px;z-index:10000;animation:fadeInUp 0.3s;max-width:300px;';
            notifDiv.innerHTML = `
                <div style="display:flex;gap:10px;align-items:center;">
                    <i class="fas fa-robot" style="color:#a855f7;"></i>
                    <div>
                        <strong style="color:#a855f7;">AI Notification</strong>
                        <p style="margin:0;font-size:11px;">Booking hari ini: ${data.bookingToday} ruangan | Besok: ${data.bookingTomorrow} ruangan<br>Stok kritis: ${data.stokKritis.length} item</p>
                    </div>
                </div>
            `;
            document.body.appendChild(notifDiv);
            setTimeout(() => notifDiv.remove(), 8000);
        };
        setTimeout(showAINotification, 1000);
        
        // Tab Content Renderer
        const renderContent = (tabId) => {
            const content = {
                dashboard: () => `
                    <div style="animation:fadeInUp 0.3s;">
                        <h3 style="color:#a855f7;">📊 Executive Dashboard</h3>
                        <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:15px; margin-top:15px;">
                            <div style="background:rgba(168,85,247,0.1); border-radius:16px; padding:15px;">
                                <div style="color:#a855f7;">Operational Health</div>
                                <div style="font-size:36px; font-weight:700;">92<span style="font-size:16px;">%</span></div>
                                <div class="progress-bar" style="background:rgba(255,255,255,0.1); border-radius:10px; height:6px;"><div style="width:92%; background:#a855f7; border-radius:10px; height:100%;"></div></div>
                            </div>
                            <div style="background:rgba(16,185,129,0.1); border-radius:16px; padding:15px;">
                                <div style="color:#10b981;">System Uptime</div>
                                <div style="font-size:36px; font-weight:700;">99.9<span style="font-size:16px;">%</span></div>
                            </div>
                        </div>
                        <div style="margin-top:15px; background:rgba(15,23,42,0.5); border-radius:16px; padding:15px;">
                            <h4>Today's Schedule</h4>
                            <div class="schedule-list">
                                <div style="padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05);"><i class="fas fa-calendar"></i> 10:00 - Rapat Direksi (Ruang Utama)</div>
                                <div style="padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05);"><i class="fas fa-tools"></i> 14:00 - Maintenance Server</div>
                                <div style="padding:8px 0;"><i class="fas fa-users"></i> 15:30 - Training K3 (Ruang Meeting)</div>
                            </div>
                        </div>
                    </div>
                `,
                approval: () => `
                    <div style="animation:fadeInUp 0.3s;">
                        <h3 style="color:#a855f7;">✅ Pending Approvals</h3>
                        <div class="approval-list">
                            <div class="approval-item">
                                <div style="display:flex; justify-content:space-between;">
                                    <span><i class="fas fa-money-bill"></i> Pengajuan Dana - ATK Kantor</span>
                                    <span class="badge" style="background:#f59e0b; padding:2px 8px; border-radius:12px;">Rp 2.500.000</span>
                                </div>
                                <div style="font-size:11px; margin-top:5px;">Diajukan: Ahmad • 2 jam lalu</div>
                                <div style="margin-top:10px; display:flex; gap:8px;">
                                    <button class="approve-btn" data-id="1" style="background:#10b981; border:none; padding:6px 20px; border-radius:8px; cursor:pointer;">Approve</button>
                                    <button class="reject-btn" data-id="1" style="background:#ef4444; border:none; padding:6px 20px; border-radius:8px; cursor:pointer;">Reject</button>
                                </div>
                            </div>
                            <div class="approval-item">
                                <div style="display:flex; justify-content:space-between;">
                                    <span><i class="fas fa-calendar"></i> Booking - Ruang Rapat Utama</span>
                                    <span class="badge" style="background:#f59e0b; padding:2px 8px; border-radius:12px;">Pending</span>
                                </div>
                                <div style="font-size:11px; margin-top:5px;">Peminjam: Budi • 10:00-12:00</div>
                                <div style="margin-top:10px; display:flex; gap:8px;">
                                    <button class="approve-btn" data-id="2" style="background:#10b981; border:none; padding:6px 20px; border-radius:8px; cursor:pointer;">Approve</button>
                                    <button class="reject-btn" data-id="2" style="background:#ef4444; border:none; padding:6px 20px; border-radius:8px; cursor:pointer;">Reject</button>
                                </div>
                            </div>
                            <div class="approval-item">
                                <div style="display:flex; justify-content:space-between;">
                                    <span><i class="fas fa-file-invoice"></i> SPJ - Acara Halal Bihalal</span>
                                    <span class="badge" style="background:#f59e0b; padding:2px 8px; border-radius:12px;">Rp 5.000.000</span>
                                </div>
                                <div style="font-size:11px; margin-top:5px;">Diajukan: Citra • 5 jam lalu</div>
                                <div style="margin-top:10px; display:flex; gap:8px;">
                                    <button class="approve-btn" data-id="3" style="background:#10b981; border:none; padding:6px 20px; border-radius:8px; cursor:pointer;">Approve</button>
                                    <button class="reject-btn" data-id="3" style="background:#ef4444; border:none; padding:6px 20px; border-radius:8px; cursor:pointer;">Reject</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `,
                dana: () => `
                    <div style="animation:fadeInUp 0.3s;">
                        <h3 style="color:#a855f7;">💰 Pengajuan Dana</h3>
                        <div style="display:flex; justify-content:flex-end; margin-bottom:15px;">
                            <button id="new-dana-btn" style="background:#a855f7; border:none; padding:8px 16px; border-radius:12px; cursor:pointer;"><i class="fas fa-plus"></i> Ajukan Dana</button>
                        </div>
                        <div class="dana-list">
                            <div style="background:rgba(15,23,42,0.5); border-radius:12px; padding:12px; margin-bottom:8px;">
                                <div><strong>Pengadaan ATK</strong> - Rp 2.500.000</div>
                                <div style="font-size:11px;">Status: <span style="color:#f59e0b;">Pending Approval</span></div>
                            </div>
                            <div style="background:rgba(15,23,42,0.5); border-radius:12px; padding:12px; margin-bottom:8px;">
                                <div><strong>Maintenance AC</strong> - Rp 1.200.000</div>
                                <div style="font-size:11px;">Status: <span style="color:#10b981;">Disetujui</span></div>
                            </div>
                        </div>
                    </div>
                `,
                spj: () => `
                    <div style="animation:fadeInUp 0.3s;">
                        <h3 style="color:#a855f7;">📋 SPJ & RAB</h3>
                        <div style="display:flex; gap:12px; margin-bottom:15px;">
                            <button class="rab-btn" style="background:#a855f7; border:none; padding:8px 16px; border-radius:12px; cursor:pointer;">Buat RAB Baru</button>
                            <button class="spj-btn" style="background:#3b82f6; border:none; padding:8px 16px; border-radius:12px; cursor:pointer;">Buat SPJ</button>
                        </div>
                        <div class="spj-list">
                            <div style="background:rgba(15,23,42,0.5); border-radius:12px; padding:12px; margin-bottom:8px;">
                                <div><strong>SPJ - Acara Halal Bihalal 2026</strong> - Rp 5.000.000</div>
                                <div style="font-size:11px;">Tanggal: 15 Maret 2026 | Status: <span style="color:#f59e0b;">Menunggu Verifikasi</span></div>
                                <button class="view-spj" style="margin-top:8px; background:#64748b; border:none; padding:4px 12px; border-radius:8px; cursor:pointer;">Lihat Detail</button>
                            </div>
                        </div>
                    </div>
                `,
                monitoring: () => `
                    <div style="animation:fadeInUp 0.3s;">
                        <h3 style="color:#a855f7;">📡 Real-time Monitoring</h3>
                        <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:15px;">
                            <div style="background:rgba(16,185,129,0.1); border-radius:12px; padding:12px; text-align:center;">
                                <i class="fas fa-video" style="font-size:24px;"></i>
                                <div>CCTV: 8/8 Online</div>
                            </div>
                            <div style="background:rgba(59,130,246,0.1); border-radius:12px; padding:12px; text-align:center;">
                                <i class="fas fa-tachometer-alt"></i>
                                <div>Server Load: 42%</div>
                            </div>
                            <div style="background:rgba(245,158,11,0.1); border-radius:12px; padding:12px; text-align:center;">
                                <i class="fas fa-broom"></i>
                                <div>Kebersihan: 95%</div>
                            </div>
                        </div>
                        <div style="background:rgba(15,23,42,0.5); border-radius:12px; padding:15px;">
                            <h4>Progress Maintenance</h4>
                            <div>Server Backup: <span style="float:right;">100%</span><div style="background:#334155; border-radius:10px; height:6px;"><div style="width:100%; background:#10b981; border-radius:10px; height:100%;"></div></div></div>
                            <div style="margin-top:10px;">Network Upgrade: <span style="float:right;">65%</span><div style="background:#334155; border-radius:10px; height:6px;"><div style="width:65%; background:#f59e0b; border-radius:10px; height:100%;"></div></div></div>
                            <div style="margin-top:10px;">Database Cleanup: <span style="float:right;">40%</span><div style="background:#334155; border-radius:10px; height:6px;"><div style="width:40%; background:#f59e0b; border-radius:10px; height:100%;"></div></div></div>
                        </div>
                    </div>
                `,
                laporan: () => `
                    <div style="animation:fadeInUp 0.3s;">
                        <h3 style="color:#a855f7;">📁 Laporan & Arsip</h3>
                        <div style="display:flex; gap:12px; margin-bottom:20px; flex-wrap:wrap;">
                            <button class="report-filter" data-period="daily" style="background:#334155; border:none; padding:8px 16px; border-radius:12px; cursor:pointer;">Harian</button>
                            <button class="report-filter" data-period="weekly" style="background:#334155; border:none; padding:8px 16px; border-radius:12px; cursor:pointer;">Mingguan</button>
                            <button class="report-filter" data-period="monthly" style="background:#334155; border:none; padding:8px 16px; border-radius:12px; cursor:pointer;">Bulanan</button>
                            <button class="report-filter" data-period="yearly" style="background:#334155; border:none; padding:8px 16px; border-radius:12px; cursor:pointer;">Tahunan</button>
                        </div>
                        <div id="report-content">
                            <div style="background:rgba(15,23,42,0.5); border-radius:12px; padding:15px;">
                                <div><i class="fas fa-file-pdf"></i> Laporan Operasional Maret 2026</div>
                                <div style="font-size:11px;">Total Booking: 45 | Maintenance: 12 | Dana: Rp 15.000.000</div>
                                <button class="download-report" style="margin-top:8px; background:#10b981; border:none; padding:4px 12px; border-radius:8px;">Download PDF</button>
                            </div>
                        </div>
                    </div>
                `,
                asset: () => `
                    <div style="animation:fadeInUp 0.3s;">
                        <h3 style="color:#a855f7;">🏢 Asset & Stok Management</h3>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
                            <div style="background:rgba(15,23,42,0.5); border-radius:12px; padding:15px;">
                                <h4>Stok Kritis</h4>
                                <ul style="margin-top:10px;">
                                    <li>Kabel HDMI - 2 unit</li>
                                    <li>Adaptor - 1 unit</li>
                                    <li>Mouse Wireless - 2 unit</li>
                                    <li>Toner Printer - 1 unit</li>
                                </ul>
                                <button class="order-btn" style="margin-top:10px; background:#f59e0b; border:none; padding:6px 12px; border-radius:8px;">Order Barang</button>
                            </div>
                            <div style="background:rgba(15,23,42,0.5); border-radius:12px; padding:15px;">
                                <h4>Asset Summary</h4>
                                <div>Total Aset: 1,234</div>
                                <div>Dalam Maintenance: 45</div>
                                <div>Depresiasi: Rp 125.000.000/tahun</div>
                                <button class="asset-report" style="margin-top:10px; background:#3b82f6; border:none; padding:6px 12px; border-radius:8px;">Laporan Aset</button>
                            </div>
                        </div>
                    </div>
                `,
                qr: () => `
                    <div style="animation:fadeInUp 0.3s; text-align:center;">
                        <h3 style="color:#a855f7;">🔳 QR Code System</h3>
                        <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:15px; margin-top:20px;">
                            <div class="qr-option" style="background:rgba(15,23,42,0.5); border-radius:12px; padding:20px; cursor:pointer;" data-type="attendance">
                                <i class="fas fa-user-check" style="font-size:32px;"></i>
                                <div>Absensi</div>
                            </div>
                            <div class="qr-option" style="background:rgba(15,23,42,0.5); border-radius:12px; padding:20px; cursor:pointer;" data-type="asset">
                                <i class="fas fa-boxes" style="font-size:32px;"></i>
                                <div>Asset Tracking</div>
                            </div>
                            <div class="qr-option" style="background:rgba(15,23,42,0.5); border-radius:12px; padding:20px; cursor:pointer;" data-type="booking">
                                <i class="fas fa-calendar" style="font-size:32px;"></i>
                                <div>Room Booking</div>
                            </div>
                        </div>
                        <div id="qr-result" style="margin-top:20px;"></div>
                    </div>
                `,
                system: () => `
                    <div style="animation:fadeInUp 0.3s;">
                        <h3 style="color:#a855f7;">⚙️ System Configuration</h3>
                        <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:15px;">
                            <div style="background:rgba(15,23,42,0.5); border-radius:12px; padding:15px;">
                                <h4>Print & Export</h4>
                                <button class="print-config" style="width:100%; margin:5px 0; background:#334155; border:none; padding:8px; border-radius:8px;"><i class="fas fa-wifi"></i> Connect WiFi Printer</button>
                                <button class="print-config" style="width:100%; margin:5px 0; background:#334155; border:none; padding:8px; border-radius:8px;"><i class="fas fa-tv"></i> Connect Smart TV</button>
                                <button class="print-config" style="width:100%; margin:5px 0; background:#334155; border:none; padding:8px; border-radius:8px;"><i class="fas fa-cloud-upload-alt"></i> Cloud Sync</button>
                            </div>
                            <div style="background:rgba(15,23,42,0.5); border-radius:12px; padding:15px;">
                                <h4>Backup & Restore</h4>
                                <button class="backup-btn" style="width:100%; margin:5px 0; background:#10b981; border:none; padding:8px; border-radius:8px;">Backup Now</button>
                                <button class="restore-btn" style="width:100%; margin:5px 0; background:#f59e0b; border:none; padding:8px; border-radius:8px;">Restore Data</button>
                            </div>
                        </div>
                    </div>
                `
            };
            return content[tabId]?.() || content.dashboard();
        };
        
        // Tab Switching
        const tabs = document.querySelectorAll('.super-tab');
        const contentDiv = document.getElementById('super-content');
        
        const switchTab = (tabId) => {
            tabs.forEach(t => {
                if (t.dataset.tab === tabId) {
                    t.classList.add('active');
                } else {
                    t.classList.remove('active');
                }
            });
            contentDiv.innerHTML = renderContent(tabId);
            
            // Re-attach event listeners
            document.querySelectorAll('.approve-btn, .reject-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    toast?.('✅ Approval processed', 'success');
                    btn.closest('.approval-item')?.remove();
                });
            });
            document.querySelectorAll('.report-filter').forEach(btn => {
                btn.addEventListener('click', () => {
                    toast?.('📊 Loading ' + btn.dataset.period + ' report...', 'info');
                });
            });
            document.querySelectorAll('.qr-option').forEach(btn => {
                btn.addEventListener('click', () => {
                    const type = btn.dataset.type;
                    const resultDiv = document.getElementById('qr-result');
                    resultDiv.innerHTML = `<div style="background:rgba(15,23,42,0.5); border-radius:12px; padding:20px;"><i class="fas fa-qrcode" style="font-size:48px;"></i><p>QR Code untuk ${type} akan muncul di sini</p><button onclick="alert('Demo QR Code')">Generate QR</button></div>`;
                });
            });
            document.querySelectorAll('.quick-action').forEach(btn => {
                btn.addEventListener('click', () => {
                    toast?.('🖨️ ' + btn.dataset.action + ' feature activated', 'success');
                });
            });
        };
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => switchTab(tab.dataset.tab));
        });
        
        // Initial render
        contentDiv.innerHTML = renderContent('dashboard');
        
        // Quick Actions
        document.querySelectorAll('.quick-action').forEach(btn => {
            btn.addEventListener('click', () => {
                toast?.('🖨️ ' + btn.dataset.action + ' ready', 'success');
            });
        });
        
        // New Dana Button
        document.getElementById('new-dana-btn')?.addEventListener('click', () => {
            toast?.('💰 Form pengajuan dana akan dibuka', 'info');
        });
        
        toast?.('🏢 Super Command Center Ready!', 'success');
    }
};
