/* ============================================
   🕌 DREAM OS 2026 - AI ORCHESTRATOR
   Magic Logic Engine
   Version: 2026.1.0
   ============================================ */

class AIOrchestrator {
  constructor() {
    this.isActive = false;
    this.isListening = false;
    this.conversationHistory = [];
    this.maxHistory = 10;
    this.apiEndpoint = (DREAM.config?.cloudflare?.workerUrl || '') + '/ai';
    
    this.init();
  }

  async init() {
    console.log('🤖 [AI] Orchestrator initialized');
    
    // Bind AI button
    const aiButton = document.getElementById('btn-magic-ai');
    if (aiButton) {
      aiButton.addEventListener('click', () => this.toggle());
    }
    
    // Load conversation history
    await this.loadHistory();
  }

  // ============================================
  // TOGGLE AI ASSISTANT
  // ============================================
  async toggle() {
    this.isActive = !this.isActive;
    
    if (this.isActive) {
      await this.open();
    } else {
      await this.close();
    }
    
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate([10, 50, 10]);
    }
  }

  async open() {
    console.log('🤖 [AI] Opening AI Assistant');    
    // Create AI panel if not exists
    this.createPanel();
    
    // Show panel
    const panel = document.getElementById('ai-panel');
    if (panel) {
      panel.classList.add('active');
    }
    
    // Load suggestions
    await this.loadSuggestions();
    
    // Track event
    DREAM.trackEvent('ai_opened', { timestamp: Date.now() });
  }

  async close() {
    console.log('🤖 [AI] Closing AI Assistant');
    
    const panel = document.getElementById('ai-panel');
    if (panel) {
      panel.classList.remove('active');
      setTimeout(() => panel.remove(), 300);
    }
    
    // Save history
    await this.saveHistory();
  }

  // ============================================
  // CREATE AI PANEL
  // ============================================
  createPanel() {
    if (document.getElementById('ai-panel')) return;
    
    const panel = document.createElement('div');
    panel.id = 'ai-panel';
    panel.className = 'ai-panel';
    panel.innerHTML = `
      <div class="ai-panel-header">
        <div class="ai-title">
          <span class="ai-icon">🤖</span>
          <span>Dream AI Assistant</span>
        </div>
        <button class="ai-close" onclick="DREAM.ai.close()">
          <i class="fas fa-times"></i>
        </button>
      </div>
            <div class="ai-messages" id="ai-messages">
        <div class="ai-message ai-message-bot">
          <div class="ai-message-content">
            <p>Assalamu'alaikum! 👋</p>
            <p>How can I help you today?</p>
          </div>
        </div>
      </div>
      
      <div class="ai-suggestions" id="ai-suggestions">
        <!-- Quick suggestions -->
      </div>
      
      <div class="ai-input-container">
        <input 
          type="text" 
          id="ai-input" 
          placeholder="Ask me anything..." 
          class="ai-input"
          autocomplete="off"
        />
        <button class="ai-send" id="ai-send">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    `;
    
    document.body.appendChild(panel);
    
    // Bind input
    const input = document.getElementById('ai-input');
    const sendBtn = document.getElementById('ai-send');
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
    
    sendBtn.addEventListener('click', () => this.sendMessage());
    
    // Add styles
    this.addStyles();
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .ai-panel {
        position: fixed;
        bottom: calc(var(--safe-bottom) + 100px);
        left: 50%;        transform: translateX(-50%) translateY(20px);
        width: 90%;
        max-width: 400px;
        max-height: 60vh;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid rgba(16, 185, 129, 0.2);
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .ai-panel.active {
        opacity: 1;
        pointer-events: all;
        transform: translateX(-50%) translateY(0);
      }
      
      .ai-panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid rgba(16, 185, 129, 0.1);
      }
      
      .ai-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        color: #10b981;
      }
      
      .ai-close {
        background: transparent;
        border: none;
        color: #94a3b8;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 8px;
        transition: all 0.2s ease;
      }
            .ai-close:hover {
        background: rgba(16, 185, 129, 0.1);
        color: #10b981;
      }
      
      .ai-messages {
        flex: 1;
        overflow-y: auto;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      
      .ai-message {
        display: flex;
        max-width: 80%;
      }
      
      .ai-message-user {
        align-self: flex-end;
        flex-direction: row-reverse;
      }
      
      .ai-message-bot {
        align-self: flex-start;
      }
      
      .ai-message-content {
        background: rgba(16, 185, 129, 0.15);
        border: 1px solid rgba(16, 185, 129, 0.2);
        border-radius: 12px;
        padding: 0.75rem 1rem;
        font-size: 0.875rem;
        line-height: 1.5;
      }
      
      .ai-message-user .ai-message-content {
        background: rgba(6, 182, 212, 0.15);
        border-color: rgba(6, 182, 212, 0.2);
      }
      
      .ai-suggestions {
        display: flex;
        gap: 0.5rem;
        padding: 0.75rem 1rem;
        overflow-x: auto;
        border-top: 1px solid rgba(16, 185, 129, 0.1);
      }
            .ai-suggestion {
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.2);
        border-radius: 20px;
        padding: 0.5rem 1rem;
        font-size: 0.75rem;
        white-space: nowrap;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .ai-suggestion:hover {
        background: rgba(16, 185, 129, 0.2);
        border-color: rgba(16, 185, 129, 0.4);
      }
      
      .ai-input-container {
        display: flex;
        gap: 0.5rem;
        padding: 1rem;
        border-top: 1px solid rgba(16, 185, 129, 0.1);
      }
      
      .ai-input {
        flex: 1;
        background: rgba(15, 23, 42, 0.5);
        border: 1px solid rgba(16, 185, 129, 0.2);
        border-radius: 12px;
        padding: 0.75rem 1rem;
        color: #e2e8f0;
        font-size: 0.875rem;
        outline: none;
        transition: all 0.2s ease;
      }
      
      .ai-input:focus {
        border-color: rgba(16, 185, 129, 0.4);
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
      }
      
      .ai-send {
        background: linear-gradient(135deg, #10b981, #06b6d4);
        border: none;
        border-radius: 12px;
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .ai-send:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
      }
    `;
    
    document.head.appendChild(style);
  }

  // ============================================
  // SEND MESSAGE
  // ============================================
  async sendMessage() {
    const input = document.getElementById('ai-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    this.addMessage(message, 'user');
    input.value = '';
    
    // Add to history
    this.conversationHistory.push({ role: 'user', content: message });
    
    // Show typing indicator
    this.showTypingIndicator();
    
    try {
      // Send to AI API
      const response = await this.queryAI(message);
      
      // Remove typing indicator
      this.removeTypingIndicator();
      
      // Add bot response
      this.addMessage(response, 'bot');
      
      // Add to history
      this.conversationHistory.push({ role: 'bot', content: response });
      
      // Limit history
      if (this.conversationHistory.length > this.maxHistory) {
        this.conversationHistory.shift();
      }
          } catch (error) {
      console.error('❌ [AI] Query failed:', error);
      this.removeTypingIndicator();
      this.addMessage('Sorry, I\'m having trouble connecting. Please try again.', 'bot');
    }
  }

  async queryAI(message) {
    // Try Cloudflare Worker first
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          context: DREAM.state.currentModule,
          history: this.conversationHistory.slice(-5)
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.response || data.message || 'I received your message.';
      }
    } catch (error) {
      console.warn('⚠️ [AI] Cloudflare API failed, using fallback');
    }
    
    // Fallback responses
    return this.getFallbackResponse(message);
  }

  getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('prayer') || lowerMessage.includes('shalat')) {
      return 'You can check prayer times in the Home module. Would you like me to open it?';
    }
    
    if (lowerMessage.includes('security') || lowerMessage.includes('sekuriti')) {
      return 'Security module shows real-time monitoring. Tap the Security icon in the navigation.';
    }
    
    if (lowerMessage.includes('scan') || lowerMessage.includes('qr')) {
      return 'QR Scanner is available in the navigation. Tap the Scanner icon to start scanning.';
    }
    
    if (lowerMessage.includes('assalam') || lowerMessage.includes('salam')) {
      return 'Wa\'alaikumsalam! 🕌 How can I assist you today?';
    }    
    if (lowerMessage.includes('thank')) {
      return 'You\'re welcome! Is there anything else I can help with?';
    }
    
    return 'I understand you\'re asking about "' + message + '". Let me connect you with the right module for this.';
  }

  // ============================================
  // UI HELPERS
  // ============================================
  addMessage(content, type) {
    const messagesContainer = document.getElementById('ai-messages');
    if (!messagesContainer) return;
    
    const messageEl = document.createElement('div');
    messageEl.className = `ai-message ai-message-${type}`;
    messageEl.innerHTML = `
      <div class="ai-message-content">
        <p>${content}</p>
      </div>
    `;
    
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  showTypingIndicator() {
    const messagesContainer = document.getElementById('ai-messages');
    if (!messagesContainer) return;
    
    const indicator = document.createElement('div');
    indicator.id = 'ai-typing';
    indicator.className = 'ai-message ai-message-bot';
    indicator.innerHTML = `
      <div class="ai-message-content">
        <div class="typing-indicator">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    
    messagesContainer.appendChild(indicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  removeTypingIndicator() {
    const indicator = document.getElementById('ai-typing');
    if (indicator) indicator.remove();
  }
  async loadSuggestions() {
    const container = document.getElementById('ai-suggestions');
    if (!container) return;
    
    const suggestions = [
      '🕌 Prayer times',
      '🛡️ Security status',
      '📷 Scan QR',
      '⚙️ Settings',
      '📊 Dashboard'
    ];
    
    container.innerHTML = suggestions.map(s => 
      `<span class="ai-suggestion" onclick="DREAM.ai.quickAsk('${s}')">${s}</span>`
    ).join('');
  }

  async quickAsk(suggestion) {
    const input = document.getElementById('ai-input');
    input.value = suggestion.replace(/[^\w\s]/gi, '');
    this.sendMessage();
  }

  // ============================================
  // HISTORY MANAGEMENT
  // ============================================
  async loadHistory() {
    try {
      const history = localStorage.getItem('dreamos-ai-history');
      if (history) {
        this.conversationHistory = JSON.parse(history);
      }
    } catch (error) {
      console.warn('⚠️ [AI] Failed to load history:', error);
    }
  }

  async saveHistory() {
    try {
      localStorage.setItem('dreamos-ai-history', JSON.stringify(this.conversationHistory));
    } catch (error) {
      console.warn('⚠️ [AI] Failed to save history:', error);
    }
  }

  async clearHistory() {
    this.conversationHistory = [];
    localStorage.removeItem('dreamos-ai-history');
        const messagesContainer = document.getElementById('ai-messages');
    if (messagesContainer) {
      messagesContainer.innerHTML = `
        <div class="ai-message ai-message-bot">
          <div class="ai-message-content">
            <p>Assalamu'alaikum! 👋</p>
            <p>How can I help you today?</p>
          </div>
        </div>
      `;
    }
  }
}

// ============================================
// INITIALIZE AI
// ============================================
DREAM.ai = new AIOrchestrator();

export { AIOrchestrator };
