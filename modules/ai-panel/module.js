/**
 * modules/ai-panel/module.js
 * Dream OS v2.1 - Dedicated AI Panel
 * Plug & Play AI Core System
 */

export default async function({ container, services, supabase, user, i18n, lang }) {
    console.log('[AI PANEL MODULE] Initializing...');
    
    container.innerHTML = `
        <div class="ai-panel-module" style="padding: 1rem; max-width: 900px; margin: 0 auto;">
            
            <!-- AI Panel Header -->
            <div class="glass-card p-6 mb-6" style="
                background: rgba(15, 23, 42, 0.6);
                backdrop-filter: blur(16px);
                border: 1px solid rgba(16, 185, 129, 0.15);
                border-radius: 16px;
                padding: 1.5rem;
            ">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <div style="
                        width: 60px; height: 60px;
                        background: linear-gradient(135deg, #10b981, #06b6d4);
                        border-radius: 16px;
                        display: flex; align-items: center; justify-content: center;
                        font-size: 2rem;
                    ">🤖</div>
                    <div>
                        <h2 class="text-2xl font-bold" style="color: var(--dream-primary);">
                            Dream AI Core
                        </h2>
                        <p class="text-sm" style="color: var(--dream-text-muted);">
                            Version ${window.AI_CONFIG.personality.version} · 
                            ${window.AI_CONFIG.permanentAPI.enabled ? 'Permanent API' : 'Multi-AI Fallback'}
                        </p>
                    </div>
                </div>
                
                <!-- AI Status -->
                <div id="ai-status" style="
                    background: rgba(16, 185, 129, 0.1);
                    border: 1px solid rgba(16, 185, 129, 0.3);
                    border-radius: 12px;
                    padding: 1rem;
                    margin-bottom: 1rem;
                ">
                    <div style="color: #10b981; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem;">
                        🟢 AI System Status
                    </div>                    <div id="ai-status-content" style="color: var(--dream-text); font-size: 0.85rem;">
                        Loading...
                    </div>
                </div>
                
                <!-- API Configuration (Admin Only) -->
                ${user?.role === 'admin' ? `
                    <div style="
                        background: rgba(139, 92, 246, 0.1);
                        border: 1px solid rgba(139, 92, 246, 0.3);
                        border-radius: 12px;
                        padding: 1rem;
                        margin-bottom: 1rem;
                    ">
                        <div style="color: #a855f7; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem;">
                            ⚙️ API Configuration (Admin)
                        </div>
                        <p style="color: var(--dream-text-muted); font-size: 0.85rem; margin-bottom: 0.75rem;">
                            Jika sudah punya permanent AI API, masukkan disini:
                        </p>
                        <button onclick="window.openAIConfig()" style="
                            background: rgba(139, 92, 246, 0.2);
                            color: #a855f7;
                            padding: 0.5rem 1rem;
                            border-radius: 8px;
                            border: 1px solid rgba(139, 92, 246, 0.3);
                            font-weight: 600;
                            cursor: pointer;
                        ">🔧 Configure API</button>
                    </div>
                ` : ''}
            </div>
            
            <!-- AI Chat Interface -->
            <div class="glass-card" style="
                background: rgba(15, 23, 42, 0.6);
                backdrop-filter: blur(16px);
                border: 1px solid rgba(16, 185, 129, 0.15);
                border-radius: 16px;
                padding: 1.5rem;
                margin-bottom: 1rem;
            ">
                <!-- Chat Messages -->
                <div id="ai-chat-messages" style="
                    min-height: 400px;
                    max-height: 500px;
                    overflow-y: auto;
                    margin-bottom: 1rem;
                    padding: 1rem;
                    background: rgba(0, 0, 0, 0.2);                    border-radius: 12px;
                ">
                    <div style="color: var(--dream-text-muted); text-align: center; padding: 2rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🤖</div>
                        <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem;">
                            Dream AI Assistant
                        </p>
                        <p style="font-size: 0.9rem;">
                            Silakan tanya sesuatu tentang Dream OS atau fasilitas...
                        </p>
                    </div>
                </div>
                
                <!-- Input Area -->
                <div style="display: flex; gap: 0.75rem;">
                    <input 
                        id="ai-chat-input" 
                        type="text" 
                        placeholder="Ketik pertanyaan..." 
                        style="
                            flex: 1;
                            background: rgba(255, 255, 255, 0.08);
                            border: 1px solid rgba(16, 185, 129, 0.2);
                            border-radius: 12px;
                            padding: 0.75rem 1rem;
                            color: var(--dream-text);
                            font-size: 0.95rem;
                            outline: none;
                        "
                        onkeydown="if(event.key==='Enter') window.sendAIMessage()"
                    />
                    <button 
                        onclick="window.sendAIMessage()"
                        id="ai-send-btn"
                        style="
                            background: linear-gradient(135deg, #10b981, #06b6d4);
                            color: white;
                            padding: 0.75rem 1.5rem;
                            border-radius: 12px;
                            border: none;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        "
                    >
                        📤 Kirim
                    </button>
                    <button 
                        onclick="window.clearAIChat()"
                        style="                            background: rgba(239, 68, 68, 0.15);
                            color: #ef4444;
                            padding: 0.75rem 1rem;
                            border-radius: 12px;
                            border: 1px solid rgba(239, 68, 68, 0.3);
                            font-weight: 600;
                            cursor: pointer;
                        "
                    >
                        🗑️ Clear
                    </button>
                </div>
                
                <!-- Voice Command (Future) -->
                <div style="margin-top: 0.75rem; text-align: center;">
                    <button 
                        onclick="window.startVoiceCommand()"
                        id="ai-voice-btn"
                        style="
                            background: rgba(59, 130, 246, 0.15);
                            color: #3b82f6;
                            padding: 0.5rem 1rem;
                            border-radius: 20px;
                            border: 1px solid rgba(59, 130, 246, 0.3);
                            font-weight: 600;
                            font-size: 0.85rem;
                            cursor: pointer;
                        "
                    >
                        🎤 Voice Command (Coming Soon)
                    </button>
                </div>
            </div>
            
            <!-- Quick Actions -->
            <div style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 0.75rem;
            ">
                <button onclick="window.askAI('Apa itu Dream OS?')" style="
                    background: rgba(16, 185, 129, 0.1);
                    border: 1px solid rgba(16, 185, 129, 0.2);
                    border-radius: 12px;
                    padding: 0.75rem;
                    color: var(--dream-text);
                    cursor: pointer;
                    text-align: left;
                    font-size: 0.85rem;
                ">❓ Apa itu Dream OS?</button>                
                <button onclick="window.askAI('Cara menggunakan modul Booking?')" style="
                    background: rgba(59, 130, 246, 0.1);
                    border: 1px solid rgba(59, 130, 246, 0.2);
                    border-radius: 12px;
                    padding: 0.75rem;
                    color: var(--dream-text);
                    cursor: pointer;
                    text-align: left;
                    font-size: 0.85rem;
                ">📅 Cara pakai Booking?</button>
                
                <button onclick="window.askAI('Fitur apa saja yang tersedia?')" style="
                    background: rgba(139, 92, 246, 0.1);
                    border: 1px solid rgba(139, 92, 246, 0.2);
                    border-radius: 12px;
                    padding: 0.75rem;
                    color: var(--dream-text);
                    cursor: pointer;
                    text-align: left;
                    font-size: 0.85rem;
                ">✨ Fitur tersedia?</button>
                
                <button onclick="window.askAI('Bismillah - Doa sebelum kerja')" style="
                    background: rgba(16, 185, 129, 0.1);
                    border: 1px solid rgba(16, 185, 129, 0.2);
                    border-radius: 12px;
                    padding: 0.75rem;
                    color: var(--dream-text);
                    cursor: pointer;
                    text-align: left;
                    font-size: 0.85rem;
                ">🕌 Doa Bismillah</button>
            </div>
            
        </div>
    `;
    
    // Update AI Status
    updateAIStatus();
    
    console.log('[AI PANEL MODULE] Initialized successfully');
    
    return function cleanup() {
        console.log('[AI PANEL MODULE] Cleaned up');
    };
};

// ════════════════════════════════════════════════
// Global Functions// ════════════════════════════════════════════════

function updateAIStatus() {
    const statusEl = document.getElementById('ai-status-content');
    if (!statusEl) return;
    
    const status = window.AIProvider.getStatus();
    
    statusEl.innerHTML = `
        <div style="margin-bottom: 0.5rem;">
            <strong>Mode:</strong> ${status.mode}
        </div>
        <div style="margin-bottom: 0.5rem;">
            <strong>Current Provider:</strong> ${status.currentProvider || 'None yet'}
        </div>
        <div style="margin-bottom: 0.5rem;">
            <strong>Available Providers:</strong> ${status.availableProviders.map(p => p.name).join(', ')}
        </div>
        <div>
            <strong>Settings:</strong> Max ${window.AI_CONFIG.settings.maxTokens} tokens, 
            Temp ${window.AI_CONFIG.settings.temperature}
        </div>
    `;
}

window.sendAIMessage = async function() {
    const input = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-send-btn');
    const messagesDiv = document.getElementById('ai-chat-messages');
    
    if (!input || !sendBtn || !messagesDiv) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    // Add user message to chat
    messagesDiv.innerHTML += `
        <div style="
            background: rgba(59, 130, 246, 0.15);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 12px;
            padding: 1rem;
            margin-bottom: 1rem;
            color: var(--dream-text);
        ">
            <div style="font-size: 0.75rem; color: #3b82f6; margin-bottom: 0.25rem; font-weight: 600;">
                👤 You
            </div>
            <div>${message}</div>
        </div>    `;
    
    input.value = '';
    input.disabled = true;
    sendBtn.disabled = true;
    sendBtn.innerHTML = '⏳ Sending...';
    
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    try {
        // Call AI Provider
        const response = await window.AIProvider.sendRequest(message, {
            user: window.DREAM.state.user,
            module: 'ai-panel'
        });
        
        // Add AI response to chat
        messagesDiv.innerHTML += `
            <div style="
                background: rgba(16, 185, 129, 0.15);
                border: 1px solid rgba(16, 185, 129, 0.3);
                border-radius: 12px;
                padding: 1rem;
                margin-bottom: 1rem;
                color: var(--dream-text);
            ">
                <div style="font-size: 0.75rem; color: #10b981; margin-bottom: 0.25rem; font-weight: 600;">
                    🤖 Dream AI
                </div>
                <div>${response}</div>
            </div>
        `;
        
        window.DREAM.showToast('AI response received', 'success');
        
    } catch (error) {
        messagesDiv.innerHTML += `
            <div style="
                background: rgba(239, 68, 68, 0.15);
                border: 1px solid rgba(239, 68, 68, 0.3);
                border-radius: 12px;
                padding: 1rem;
                margin-bottom: 1rem;
                color: #ef4444;
            ">
                <div style="font-size: 0.75rem; font-weight
