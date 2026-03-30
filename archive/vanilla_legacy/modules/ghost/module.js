export default {
    name: 'Ghost Stealth',
    icon: 'fa-ghost',
    color: '#a855f7',
    version: '2.0.0',

    render(context) {
        return `
            <div style="padding:20px; background:#0f172a; border-radius:28px; border:1px solid #a855f7;">
                <h2 style="color:#a855f7;"><i class="fas fa-ghost"></i> Ghost Stealth Mode</h2>
                <p style="color:#94a3b8;">Advanced development & debugging suite. All actions are logged.</p>

                <div class="ghost-tabs" style="display:flex; gap:8px; margin:20px 0; flex-wrap:wrap;">
                    <button class="ghost-tab active" data-tool="eruda">🕵️ Eruda Console</button>
                    <button class="ghost-tab" data-tool="terminal">🐉 Kali Terminal</button>
                    <button class="ghost-tab" data-tool="docker">🐳 Docker Control</button>
                    <button class="ghost-tab" data-tool="monitor">📊 System Monitor</button>
                    <button class="ghost-tab" data-tool="network">🌐 Network Inspector</button>
                    <button class="ghost-tab" data-tool="logger">📜 Ghost Logger</button>
                    <button class="ghost-tab" data-tool="debug">🔧 Debug Tools</button>
                </div>

                <div id="ghost-content" style="background:#0f0f1f; border-radius:16px; padding:16px; min-height:450px;">
                    <p>Pilih alat di atas.</p>
                </div>

                <div style="margin-top:16px; font-size:12px; color:#64748b; text-align:center;">
                    <i class="fas fa-skull"></i> Ghost mode aktif – semua aktivitas dicatat secara anonim.
                </div>
            </div>

            <style>
                .ghost-tab {
                    background: #1e293b;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 20px;
                    cursor: pointer;
                    color: #94a3b8;
                    transition: all 0.3s;
                }
                .ghost-tab.active {
                    background: #a855f7;
                    color: #000;
                }
                .ghost-tab:hover {
                    background: #a855f7;
                    color: #000;
                }
                #ghost-content {
                    overflow-y: auto;
                    max-height: 500px;
                }
                .terminal {
                    background: #000;
                    color: #0f0;
                    font-family: monospace;
                    padding: 10px;
                    border-radius: 8px;
                    height: 300px;
                    overflow-y: auto;
                }
                .terminal-input {
                    display: flex;
                    gap: 8px;
                    margin-top: 10px;
                }
                .terminal-input input {
                    flex: 1;
                    background: #1e293b;
                    border: 1px solid #334155;
                    color: #0f0;
                    padding: 8px;
                    border-radius: 8px;
                }
                .docker-card, .monitor-card, .logger-card, .network-card {
                    background: #0f172a;
                    border-radius: 12px;
                    padding: 12px;
                    margin-bottom: 12px;
                }
                .progress-bar {
                    background: #334155;
                    border-radius: 10px;
                    height: 8px;
                    overflow: hidden;
                    margin: 5px 0;
                }
                .progress-fill {
                    background: #10b981;
                    height: 100%;
                    width: 0%;
                }
            </style>
        `;
    },

    afterRender(context) {
        // Log activity
        function logGhostActivity(action, details = '') {
            const logs = JSON.parse(localStorage.getItem('ghost_logs') || '[]');
            logs.push({ timestamp: new Date().toISOString(), action, details });
            localStorage.setItem('ghost_logs', JSON.stringify(logs.slice(-100))); // keep last 100
            console.log(`[GHOST] ${action}: ${details}`);
        }

        // ========== ERUDA ==========
        function loadEruda() {
            if (typeof window.eruda === 'undefined') {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/eruda';
                script.onload = () => {
                    window.eruda.init();
                    window.eruda.show();
                    logGhostActivity('Eruda', 'Loaded and shown');
                };
                document.head.appendChild(script);
            } else {
                window.eruda.show();
                logGhostActivity('Eruda', 'Shown');
            }
        }

        // ========== TERMINAL ADVANCED ==========
        let terminalHistory = [];
        function initTerminal(container) {
            const termDiv = document.createElement('div');
            termDiv.className = 'terminal';
            termDiv.innerHTML = `
                <div>Kali Linux Simulation (type 'help' for commands)</div>
                <div id="term-output"></div>
                <div class="terminal-input">
                    <span style="color:#0f0;">$</span>
                    <input type="text" id="term-input" placeholder="Masukkan perintah...">
                </div>
            `;
            container.innerHTML = '';
            container.appendChild(termDiv);

            const outputDiv = termDiv.querySelector('#term-output');
            const inputField = termDiv.querySelector('#term-input');

            const addLine = (text, isError = false) => {
                const line = document.createElement('div');
                line.textContent = text;
                line.style.color = isError ? '#f00' : '#0f0';
                outputDiv.appendChild(line);
                outputDiv.scrollTop = outputDiv.scrollHeight;
                logGhostActivity('Terminal', `Command output: ${text.substring(0, 100)}`);
            };

            const processCommand = async (cmd) => {
                const trimmed = cmd.trim().toLowerCase();
                addLine(`$ ${cmd}`);

                // Simulasi perintah
                const commands = {
                    help: () => {
                        addLine('Perintah tersedia:');
                        addLine('  whoami, pwd, ls, ls -la, cat <file>, echo <text>');
                        addLine('  history, clear, nmap <ip>, sqlmap -u <url>, hydra -l <user> -P <pass> <target>');
                    },
                    whoami: () => addLine('ghost@kali'),
                    pwd: () => addLine('/home/ghost'),
                    ls: () => addLine('Desktop  Documents  Downloads  Pictures  Videos  tools  docker'),
                    'ls -la': () => addLine('total 48\ndrwxr-xr-x 5 ghost ghost 4096 Mar 28 12:00 .\ndrwxr-xr-x 3 root root 4096 Mar 28 11:59 ..\n-rw-r--r-- 1 ghost ghost  220 Mar 28 11:59 .bashrc'),
                    cat: () => addLine('File not found: ' + cmd.slice(4), true),
                    echo: () => addLine(cmd.slice(5)),
                    history: () => addLine(terminalHistory.map((c, i) => `${i+1}  ${c}`).join('\n')),
                    clear: () => { outputDiv.innerHTML = ''; },
                    nmap: () => addLine('Starting Nmap 7.80 ( https://nmap.org ) at 2025-03-28 12:00 UTC\nNmap scan report for ' + (cmd.split(' ')[1] || '192.168.1.1') + '\nHost is up (0.0012s latency).\nNot shown: 997 filtered ports\nPORT     STATE SERVICE\n22/tcp   open  ssh\n80/tcp   open  http\n443/tcp  open  https'),
                    sqlmap: () => addLine('[*] testing connection to the target URL\n[*] checking if the target is vulnerable\n[!] the target URL is not vulnerable to SQL injection (simulated)'),
                    hydra: () => addLine('Hydra v9.1 (c) 2024 by van Hauser/THC\n[DATA] attacking ssh://192.168.1.1:22\n[STATUS] 16.00 tries/min, 16 tries in 00:01h\n[22][ssh] host: 192.168.1.1   login: root   password: toor'),
                };

                const parts = trimmed.split(' ');
                const baseCmd = parts[0];
                if (commands[baseCmd]) {
                    if (baseCmd === 'cat' && parts[1]) commands.cat();
                    else if (baseCmd === 'echo' && parts[1]) commands.echo();
                    else if (baseCmd === 'ls' && trimmed === 'ls -la') commands['ls -la']();
                    else commands[baseCmd]();
                } else {
                    addLine(`Command not found: ${cmd}`, true);
                }
                terminalHistory.push(cmd);
                if (terminalHistory.length > 50) terminalHistory.shift();
            };

            inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const cmd = inputField.value;
                    if (cmd.trim()) processCommand(cmd);
                    inputField.value = '';
                }
            });
            logGhostActivity('Terminal', 'Initialized');
        }

        // ========== DOCKER ENHANCED ==========
        let containers = [
            { id: 'abc123', image: 'kali-rolling', status: 'running', ports: '22->22/tcp' },
            { id: 'def456', image: 'alpine:latest', status: 'running', ports: '' }
        ];
        let images = [
            { name: 'kali-rolling', size: '2.3GB' },
            { name: 'alpine:latest', size: '5.6MB' },
            { name: 'ubuntu:22.04', size: '77MB' },
            { name: 'nginx:latest', size: '142MB' },
            { name: 'node:18-alpine', size: '112MB' }
        ];

        function renderDocker(container) {
            const html = `
                <div class="docker-card">
                    <h3>🐳 Docker Status</h3>
                    <p>Docker Engine: <span style="color:#10b981;">● Running</span></p>
                    <p>Version: 24.0.7</p>
                    <p>Containers: ${containers.filter(c => c.status === 'running').length} running, ${containers.filter(c => c.status === 'stopped').length} stopped</p>
                    <p>Images: ${images.length}</p>
                    <hr>
                    <h4>Containers</h4>
                    <div id="docker-containers-list">
                        ${containers.map(c => `
                            <div style="margin-bottom:8px;">
                                <span style="color:${c.status === 'running' ? '#10b981' : '#ef4444'}">●</span>
                                <strong>${c.image}</strong> (${c.id}) - ${c.status}
                                ${c.ports ? `<span style="font-size:12px;"> Ports: ${c.ports}</span>` : ''}
                                <button class="docker-start-stop" data-id="${c.id}" data-status="${c.status}">
                                    ${c.status === 'running' ? 'Stop' : 'Start'}
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <h4>Images</h4>
                    <ul>
                        ${images.map(i => `<li>${i.name} (${i.size})</li>`).join('')}
                    </ul>
                    <button id="docker-pull" style="background:#a855f7; border:none; padding:6px 12px; border-radius:20px;">Pull Image (simulasi)</button>
                </div>
            `;
            container.innerHTML = html;

            // Start/Stop buttons
            document.querySelectorAll('.docker-start-stop').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = btn.dataset.id;
                    const currentStatus = btn.dataset.status;
                    const containerObj = containers.find(c => c.id === id);
                    if (containerObj) {
                        containerObj.status = currentStatus === 'running' ? 'stopped' : 'running';
                        renderDocker(container); // re-render
                        logGhostActivity('Docker', `${containerObj.image} ${containerObj.status}`);
                    }
                });
            });

            const pullBtn = container.querySelector('#docker-pull');
            if (pullBtn) {
                pullBtn.addEventListener('click', () => {
                    alert('Simulasi: Pulling image... (tidak ada koneksi Docker nyata)');
                    logGhostActivity('Docker', 'Simulated pull image');
                });
            }
            logGhostActivity('Docker', 'Rendered');
        }

        // ========== SYSTEM MONITOR ==========
        let monitorInterval;
        function initMonitor(container) {
            container.innerHTML = `
                <div class="monitor-card">
                    <h3>📊 System Monitor (Simulasi)</h3>
                    <div>CPU Usage: <span id="cpu-usage">0</span>%</div>
                    <div class="progress-bar"><div id="cpu-fill" class="progress-fill"></div></div>
                    <div>Memory Usage: <span id="mem-usage">0</span>%</div>
                    <div class="progress-bar"><div id="mem-fill" class="progress-fill"></div></div>
                    <div>Network (RX/TX): <span id="net-rx">0</span> KB/s / <span id="net-tx">0</span> KB/s</div>
                    <button id="stop-monitor" style="margin-top:10px;">Stop Monitor</button>
                </div>
            `;

            let cpu = 0, mem = 0, rx = 0, tx = 0;
            const cpuSpan = document.getElementById('cpu-usage');
            const memSpan = document.getElementById('mem-usage');
            const cpuFill = document.getElementById('cpu-fill');
            const memFill = document.getElementById('mem-fill');
            const rxSpan = document.getElementById('net-rx');
            const txSpan = document.getElementById('net-tx');
            const stopBtn = document.getElementById('stop-monitor');

            const update = () => {
                cpu = Math.floor(Math.random() * 100);
                mem = Math.floor(Math.random() * 100);
                rx = Math.floor(Math.random() * 500);
                tx = Math.floor(Math.random() * 500);
                cpuSpan.innerText = cpu;
                memSpan.innerText = mem;
                cpuFill.style.width = cpu + '%';
                memFill.style.width = mem + '%';
                rxSpan.innerText = rx;
                txSpan.innerText = tx;
            };
            update();
            monitorInterval = setInterval(update, 2000);

            stopBtn.addEventListener('click', () => {
                clearInterval(monitorInterval);
                logGhostActivity('System Monitor', 'Stopped');
                stopBtn.disabled = true;
                stopBtn.innerText = 'Stopped';
            });
            logGhostActivity('System Monitor', 'Started');
        }

        // ========== NETWORK INSPECTOR ==========
        function initNetwork(container) {
            container.innerHTML = `
                <div class="network-card">
                    <h3>🌐 Network Inspector</h3>
                    <p>Daftar request jaringan yang tercatat (simulasi):</p>
                    <ul id="network-list">
                        <li>GET https://dreamos-sys.github.io/dream/shell-simple.js (200)</li>
                        <li>GET https://dreamos-sys.github.io/dream/modules-list.js (200)</li>
                        <li>POST https://lfavawkzvdhdpaaplaiq.supabase.co/functions/v1/ai-chat (200)</li>
                    </ul>
                    <p><small>Catatan: Ini adalah contoh statis. Untuk melihat request real, gunakan tab Network di Eruda.</small></p>
                </div>
            `;
            logGhostActivity('Network Inspector', 'Loaded');
        }

        // ========== GHOST LOGGER ==========
        function initLogger(container) {
            const logs = JSON.parse(localStorage.getItem('ghost_logs') || '[]');
            container.innerHTML = `
                <div class="logger-card">
                    <h3>📜 Ghost Logger</h3>
                    <p>Total log entries: ${logs.length}</p>
                    <div id="log-list" style="max-height:300px; overflow-y:auto; background:#0f172a; padding:8px; border-radius:8px;">
                        ${logs.slice().reverse().map(l => `<div><small>[${new Date(l.timestamp).toLocaleString()}]</small> ${l.action}: ${l.details}</div>`).join('')}
                    </div>
                    <button id="clear-logs" style="margin-top:8px;">Clear Logs</button>
                    <button id="export-logs" style="margin-left:8px;">Export Logs (JSON)</button>
                </div>
            `;
            const clearBtn = container.querySelector('#clear-logs');
            clearBtn.addEventListener('click', () => {
                localStorage.removeItem('ghost_logs');
                initLogger(container);
                logGhostActivity('Logger', 'Logs cleared');
            });
            const exportBtn = container.querySelector('#export-logs');
            exportBtn.addEventListener('click', () => {
                const data = JSON.stringify(logs, null, 2);
                const blob = new Blob([data], {type: 'application/json'});
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `ghost_logs_${new Date().toISOString()}.json`;
                a.click();
                URL.revokeObjectURL(url);
                logGhostActivity('Logger', 'Exported logs');
            });
        }

        // ========== DEBUG TOOLS ==========
        function initDebug(container) {
            container.innerHTML = `
                <div class="docker-card">
                    <h3>🔧 Debug Tools</h3>
                    <p><strong>LocalStorage:</strong> <button id="show-storage">Tampilkan</button></p>
                    <p><strong>SessionStorage:</strong> <button id="show-session">Tampilkan</button></p>
                    <p><strong>Network Info:</strong> <button id="network-info">Cek Koneksi</button></p>
                    <p><strong>Browser Info:</strong> <span id="browser-info"></span></p>
                    <p><strong>User Agent:</strong> <span id="user-agent"></span></p>
                    <hr>
                    <h4>Performance</h4>
                    <p>Load time: ${(performance.timing.loadEventEnd - performance.timing.navigationStart)} ms</p>
                </div>
            `;
            document.getElementById('browser-info').innerText = navigator.userAgent;
            document.getElementById('user-agent').innerText = navigator.userAgent;

            const showStorage = container.querySelector('#show-storage');
            showStorage.addEventListener('click', () => {
                let str = '';
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    str += `${key}: ${localStorage.getItem(key)}\n`;
                }
                alert(str || 'Kosong');
                logGhostActivity('Debug', 'Viewed localStorage');
            });

            const showSession = container.querySelector('#show-session');
            showSession.addEventListener('click', () => {
                let str = '';
                for (let i = 0; i < sessionStorage.length; i++) {
                    const key = sessionStorage.key(i);
                    str += `${key}: ${sessionStorage.getItem(key)}\n`;
                }
                alert(str || 'Kosong');
                logGhostActivity('Debug', 'Viewed sessionStorage');
            });

            const networkInfo = container.querySelector('#network-info');
            networkInfo.addEventListener('click', () => {
                if (navigator.onLine) {
                    alert('Koneksi internet aktif');
                } else {
                    alert('Tidak ada koneksi internet');
                }
                logGhostActivity('Debug', 'Checked network');
            });
        }

        // ========== TAB SWITCHING ==========
        const tabs = document.querySelectorAll('.ghost-tab');
        const contentDiv = document.getElementById('ghost-content');

        const switchTool = (tool) => {
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelector(`.ghost-tab[data-tool="${tool}"]`).classList.add('active');

            if (tool === 'eruda') {
                contentDiv.innerHTML = '<p>Mengaktifkan Eruda...</p>';
                loadEruda();
                setTimeout(() => {
                    contentDiv.innerHTML = '<p>Eruda sudah aktif. Gunakan ikon di pojok kanan bawah.</p>';
                }, 500);
            } else if (tool === 'terminal') {
                initTerminal(contentDiv);
            } else if (tool === 'docker') {
                renderDocker(contentDiv);
            } else if (tool === 'monitor') {
                if (monitorInterval) clearInterval(monitorInterval);
                initMonitor(contentDiv);
            } else if (tool === 'network') {
                initNetwork(contentDiv);
            } else if (tool === 'logger') {
                initLogger(contentDiv);
            } else if (tool === 'debug') {
                initDebug(contentDiv);
            }
            logGhostActivity('Tab', `Switched to ${tool}`);
        };

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tool = tab.dataset.tool;
                switchTool(tool);
            });
        });

        // Default: terminal
        switchTool('terminal');
    }
};
