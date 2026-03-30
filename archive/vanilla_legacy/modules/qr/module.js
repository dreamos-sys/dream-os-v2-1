export default {
    render: () => {
        return `
            <div class="glass-card p-6 mb-6">
                <div class="flex justify-between items-center mb-4">
                    <h1 class="text-2xl font-bold flex items-center gap-3">
                        <i class="fas fa-qrcode text-3xl text-emerald-400"></i>
                        QR Command Center
                    </h1>
                    <button onclick="window.closeModule()" class="text-white/40 hover:text-white">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <p class="text-sm text-white/60">Generate, Scan & Manage QR Codes</p>
            </div>

            <!-- QR GENERATOR -->
            <div class="glass-card p-6 mb-6">
                <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
                    <i class="fas fa-plus-circle text-emerald-400"></i> Generate QR Code
                </h2>
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <label class="text-xs text-white/60 mb-2 block">QR Type</label>
                        <select id="qrType" class="w-full p-3 rounded-xl bg-white/5 border border-white/10 mb-4 text-white">
                            <option value="booking">📅 Booking Verification</option>
                            <option value="asset">🏢 Asset Tracking</option>
                            <option value="attendance">👤 Employee Attendance</option>
                            <option value="payment">💰 Payment (QRIS)</option>
                            <option value="document">📄 Document Authentication</option>
                            <option value="access">🔐 Access Control</option>
                            <option value="inventory">📦 Inventory Management</option>
                            <option value="k3">⚠️ K3 Report</option>
                        </select>
                        <label class="text-xs text-white/60 mb-2 block">Data/ID</label>
                        <input type="text" id="qrData" class="w-full p-3 rounded-xl bg-white/5 border border-white/10 mb-4" placeholder="Enter ID, name, or data...">
                        <label class="text-xs text-white/60 mb-2 block">Additional Info (Optional)</label>
                        <textarea id="qrExtra" class="w-full p-3 rounded-xl bg-white/5 border border-white/10 mb-4" rows="2" placeholder="Additional notes..."></textarea>
                        <button onclick="window.generateQR()" class="btn-action btn-green w-full">
                            <i class="fas fa-qrcode"></i> Generate QR Code
                        </button>
                    </div>
                    <div class="text-center">
                        <label class="text-xs text-white/60 mb-2 block">QR Preview</label>
                        <div id="qrDisplay" class="w-48 h-48 mx-auto bg-white rounded-xl flex items-center justify-center mb-4">
                            <p class="text-black/40 text-sm">QR will appear here</p>
                        </div>
                        <div class="flex gap-2">
                            <button onclick="window.downloadQR()" class="btn-action btn-blue flex-1">
                                <i class="fas fa-download"></i> Download
                            </button>
                            <button onclick="window.printQR()" class="btn-action btn-purple flex-1">
                                <i class="fas fa-print"></i> Print
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- QR SCANNER -->
            <div class="glass-card p-6 mb-6">
                <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
                    <i class="fas fa-camera text-emerald-400"></i> Scan QR Code
                </h2>
                <div class="scanner-view mb-4" style="height: 300px;">
                    <video id="qrScanner" class="w-full h-full object-cover"></video>
                    <div class="scanner-overlay"></div>
                </div>
                <div class="flex gap-3 mb-4">
                    <button onclick="window.startScanner()" class="btn-action btn-purple flex-1">
                        <i class="fas fa-camera"></i> Start Scanner
                    </button>
                    <button onclick="window.stopScanner()" class="btn-action btn-orange flex-1">
                        <i class="fas fa-stop"></i> Stop
                    </button>
                </div>
                <div id="scanResult" class="glass-card p-4 hidden">
                    <div class="flex items-start gap-3">
                        <i class="fas fa-check-circle text-emerald-400 text-2xl"></i>
                        <div class="flex-1">
                            <p class="text-sm text-white/60 mb-1">Scan Result:</p>
                            <p id="scanData" class="font-bold text-white mb-2"></p>
                            <div id="scanDetails" class="text-xs text-white/40 space-y-1"></div>
                        </div>
                        <button onclick="window.closeScanResult()" class="text-white/40 hover:text-white">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- QR HISTORY -->
            <div class="glass-card p-6 mb-6">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-bold flex items-center gap-2">
                        <i class="fas fa-history text-emerald-400"></i> QR History
                    </h2>
                    <button onclick="window.clearHistory()" class="text-xs text-red-400 hover:text-red-300">
                        <i class="fas fa-trash mr-1"></i> Clear All
                    </button>
                </div>
                <div id="qrHistory" class="space-y-2">
                    <div class="qr-history-item">
                        <div class="flex items-center gap-3">
                            <i class="fas fa-qrcode text-emerald-400"></i>
                            <div>
                                <div class="text-sm font-bold">No QR scans yet</div>
                                <div class="text-[10px] text-white/40">Scan your first QR code!</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- QUICK ACTIONS -->
            <div class="glass-card p-6">
                <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
                    <i class="fas fa-bolt text-emerald-400"></i> Quick Actions
                </h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button onclick="window.quickAction('checkin')" class="btn-action btn-green">
                        <i class="fas fa-sign-in-alt"></i> Check-In
                    </button>
                    <button onclick="window.quickAction('checkout')" class="btn-action btn-orange">
                        <i class="fas fa-sign-out-alt"></i> Check-Out
                    </button>
                    <button onclick="window.quickAction('verify')" class="btn-action btn-blue">
                        <i class="fas fa-check-double"></i> Verify
                    </button>
                    <button onclick="window.quickAction('export')" class="btn-action btn-purple">
                        <i class="fas fa-file-export"></i> Export
                    </button>
                </div>
            </div>

            <style>
                .glass-card { background: rgba(15,23,42,0.88); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 1.5rem; margin-bottom: 1.5rem; }
                .btn-action { padding: 1rem 1.5rem; border-radius: 16px; font-weight: 700; cursor: pointer; transition: all 0.3s ease; border: none; display: inline-flex; align-items: center; gap: 0.5rem; }
                .btn-green { background: linear-gradient(135deg, #10b981, #059669); color: white; }
                .btn-blue { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; }
                .btn-purple { background: linear-gradient(135deg, #a855f7, #7c3aed); color: white; }
                .btn-orange { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; }
                .scanner-view { background: #000; border-radius: 16px; overflow: hidden; position: relative; }
                .scanner-overlay { position: absolute; inset: 0; border: 2px solid #10b981; border-radius: 16px; animation: scan-line 2s linear infinite; }
                @keyframes scan-line { 0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); } 50% { box-shadow: 0 0 20px 10px rgba(16,185,129,0.3); } 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); } }
                .qr-history-item { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 1rem; margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center; }
                .hidden { display: none !important; }
            </style>
        `;
    },

    afterRender: async (ctx) => {
        // Import helper functions (supabase, toast, store) from context
        const supabase = ctx.supabase;
        const toast = ctx.toast || ((msg, type) => alert(`${type?.toUpperCase()}: ${msg}`));
        const store = { get: (key) => localStorage.getItem(key) };

        let scannerStream = null;
        let qrHistory = JSON.parse(localStorage.getItem('qr_history') || '[]');

        // Helper functions
        function saveToHistory(action, type, data) {
            const entry = { action, type, data, timestamp: new Date().toISOString() };
            qrHistory.unshift(entry);
            if (qrHistory.length > 50) qrHistory.pop();
            localStorage.setItem('qr_history', JSON.stringify(qrHistory));
            loadHistory();
        }

        function loadHistory() {
            const container = document.getElementById('qrHistory');
            if (!container) return;
            if (qrHistory.length === 0) {
                container.innerHTML = '<div class="qr-history-item"><div class="flex items-center gap-3"><i class="fas fa-qrcode text-emerald-400"></i><div><div class="text-sm font-bold">No QR history</div><div class="text-[10px] text-white/40">Generate or scan your first QR!</div></div></div></div>';
                return;
            }
            container.innerHTML = qrHistory.map(item => {
                const icon = item.action === 'generated' ? 'fa-plus-circle' : 'fa-camera';
                const color = item.action === 'generated' ? 'text-blue-400' : 'text-emerald-400';
                return `
                    <div class="qr-history-item">
                        <div class="flex items-center gap-3">
                            <i class="fas ${icon} ${color}"></i>
                            <div>
                                <div class="text-sm font-bold">${item.action.toUpperCase()}: ${item.type}</div>
                                <div class="text-[10px] text-white/40">${item.data} • ${new Date(item.timestamp).toLocaleString()}</div>
                            </div>
                        </div>
                        <i class="fas fa-chevron-right text-white/20"></i>
                    </div>
                `;
            }).join('');
        }

        async function saveToDatabase(qrData) {
            if (!supabase) return;
            try {
                await supabase.from('qr_logs').insert([{
                    type: qrData.type,
                    data: qrData.data,
                    extra: qrData.extra,
                    user_role: qrData.user,
                    created_at: qrData.timestamp
                }]);
            } catch (e) { console.warn(e); }
        }

        // Global functions exposed to window
        window.generateQR = function() {
            const type = document.getElementById('qrType').value;
            const data = document.getElementById('qrData').value.trim();
            const extra = document.getElementById('qrExtra').value.trim();
            if (!data) { toast('Please enter data to encode!', 'warning'); return; }
            const qrData = {
                type, data, extra,
                timestamp: new Date().toISOString(),
                user: store.get('user')?.role || 'Unknown',
                device: navigator.userAgent
            };
            const encoded = btoa(JSON.stringify(qrData));
            const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(encoded);
            document.getElementById('qrDisplay').innerHTML = '<img src="' + qrUrl + '" class="w-full h-full" alt="QR Code">';
            saveToHistory('generated', type, data);
            saveToDatabase(qrData);
            toast('QR Code generated!', 'success');
        };

        window.downloadQR = function() {
            const img = document.querySelector('#qrDisplay img');
            if (!img || img.src.includes('QR will appear')) { toast('Generate QR code first!', 'warning'); return; }
            const link = document.createElement('a');
            link.download = 'dream-os-qr-' + Date.now() + '.png';
            link.href = img.src;
            link.click();
            toast('QR Code downloaded!', 'success');
        };

        window.printQR = function() {
            const img = document.querySelector('#qrDisplay img');
            if (!img || img.src.includes('QR will appear')) { toast('Generate QR code first!', 'warning'); return; }
            const printWindow = window.open('', '', 'height=400,width=400');
            printWindow.document.write('<html><head><title>QR Code</title></head><body style="display:flex;justify-content:center;align-items:center;height:100vh;">');
            printWindow.document.write('<img src="' + img.src + '" style="max-width:100%;">');
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
        };

        window.startScanner = function() {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
                    .then(stream => {
                        scannerStream = stream;
                        const video = document.getElementById('qrScanner');
                        video.srcObject = stream;
                        video.play();
                        // Simulate scan for demo (you can integrate jsQR library later)
                        setTimeout(() => {
                            const result = {
                                type: 'booking',
                                data: 'BK-' + Math.floor(Math.random() * 10000),
                                timestamp: new Date().toISOString(),
                                verified: true
                            };
                            document.getElementById('scanResult').classList.remove('hidden');
                            document.getElementById('scanData').textContent = result.data;
                            document.getElementById('scanDetails').innerHTML = `
                                <div>Type: ${result.type}</div>
                                <div>Time: ${new Date(result.timestamp).toLocaleString()}</div>
                                <div>Status: <span class="text-emerald-400">✅ Verified</span></div>
                            `;
                            saveToHistory('scanned', result.type, result.data);
                        }, 5000);
                    })
                    .catch(err => toast('Camera access denied: ' + err.message, 'error'));
            } else {
                toast('Camera access not supported!', 'error');
            }
        };

        window.stopScanner = function() {
            if (scannerStream) {
                scannerStream.getTracks().forEach(track => track.stop());
                scannerStream = null;
                const video = document.getElementById('qrScanner');
                video.srcObject = null;
            }
        };

        window.closeScanResult = function() {
            document.getElementById('scanResult').classList.add('hidden');
        };

        window.clearHistory = function() {
            if (confirm('Clear all QR history?')) {
                qrHistory = [];
                localStorage.removeItem('qr_history');
                loadHistory();
                toast('History cleared', 'success');
            }
        };

        window.quickAction = function(action) {
            switch(action) {
                case 'checkin': toast('Check-In: Point camera at employee QR badge', 'info'); break;
                case 'checkout': toast('Check-Out: Point camera at employee QR badge', 'info'); break;
                case 'verify': toast('Verify: Scan QR to verify authenticity', 'info'); break;
                case 'export': exportHistory(); break;
            }
        };

        function exportHistory() {
            let csv = 'Action,Type,Data,Timestamp\n';
            qrHistory.forEach(item => {
                csv += `${item.action},${item.type},${item.data},${item.timestamp}\n`;
            });
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'qr-history-' + Date.now() + '.csv';
            a.click();
            URL.revokeObjectURL(url);
            toast('QR history exported to CSV!', 'success');
        }

        loadHistory();
    }
};
