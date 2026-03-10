// modules/ghost/module.js
export async function render() {
    const modules = Array.from(DREAM.state.modules.keys());
    const logs = JSON.parse(localStorage.getItem('dreamos-logs') || '[]').slice(-30);
    
    return `
        <div class="p-4">
            <h2 class="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                👻 Ghost Architect
                <span class="text-xs bg-emerald-500/20 px-2 py-1 rounded-full">Developer Only</span>
            </h2>
            
            <div class="glass-card p-4 mb-4">
                <h3 class="text-lg font-semibold mb-2">System Info</h3>
                <div class="grid grid-cols-2 gap-2 text-sm">
                    <div>Version:</div><div class="font-mono">${DREAM.version}</div>
                    <div>Environment:</div><div class="font-mono">${DREAM.env}</div>
                    <div>Current Module:</div><div class="font-mono">${DREAM.state.currentModule}</div>
                    <div>Modules Loaded:</div><div class="font-mono">${modules.length}</div>
                </div>
            </div>
            
            <div class="glass-card p-4 mb-4">
                <h3 class="text-lg font-semibold mb-2">📋 Recent Logs</h3>
                <pre class="text-xs bg-black/50 p-2 rounded h-40 overflow-auto">${
                    logs.map(log => `[${log.timestamp}] ${log.level}: ${log.message}`).join('\n')
                }</pre>
                <button class="btn btn-glass w-full mt-2" onclick="localStorage.removeItem('dreamos-logs'); DREAM.load('ghost')">
                    Clear Logs
                </button>
            </div>
            
            <div class="glass-card p-4 mb-4">
                <h3 class="text-lg font-semibold mb-2">🛠️ Actions</h3>
                <div class="flex flex-col gap-2">
                    <button class="btn btn-primary" onclick="DREAM.utils.clearCache?.()">Clear Cache</button>
                    <button class="btn btn-glass" onclick="DREAM.load('home')">Back to Home</button>
                </div>
            </div>
            
            <div class="text-center text-xs text-dim mt-4">
                ⚡ Bi idznillah • Hidden from regular users
            </div>
        </div>
    `;
}
