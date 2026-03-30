/**
 * DREAM CORE ENGINE 2026 - ENTERPRISE EDITION
 * Main Application Core & Module Orchestrator
 * 
 * Features:
 * - Dynamic module loading
 * - State management
 * - Navigation system
 * - Error handling
 * - Performance monitoring
 * 
 * Bi idznillah 💚
 */

'use strict';

// ============================================================================
// GLOBAL DREAM OBJECT - Main API
// ============================================================================

window.DREAM = {
    version: '2026.1.0',
    env: 'production', // tambahkan properti env
    state: {
        currentModule: 'home',
        user: null,
        config: {},
        modules: new Map(),
        history: []
    },
    
    // Module loading
    load: null,
    
    // Utilities
    utils: {
        showToast: null,
        showModal: null,
        escapeHTML: null
    },
    
    // Config
    config: {
        modules: {
            home: { path: './modules/home/module.js', title: 'Home' },
            sekuriti: { path: './modules/sekuriti/module.js', title: 'Sekuriti' },
            qr: { path: './modules/qr-scanner/module.js', title: 'QR Scanner' },
            settings: { path: './modules/settings/module.js', title: 'Settings' }
        }
    }
};

// ============================================================================
// LOGGING SYSTEM (untuk Ghost Module)
// ============================================================================

// Override console untuk menyimpan log ke localStorage
const originalError = console.error;
const originalWarn = console.warn;
const originalLog = console.log;

function saveLog(level, args) {
    try {
        const logs = JSON.parse(localStorage.getItem('dreamos-logs') || '[]');
        logs.push({
            timestamp: new Date().toLocaleTimeString(),
            level,
            message: args.map(a => String(a)).join(' ')
        });
        if (logs.length > 100) logs.shift();
        localStorage.setItem('dreamos-logs', JSON.stringify(logs));
    } catch (e) {}
}

console.error = (...args) => {
    saveLog('ERROR', args);
    originalError.apply(console, args);
};

console.warn = (...args) => {
    saveLog('WARN', args);
    originalWarn.apply(console, args);
};

console.log = (...args) => {
    saveLog('INFO', args);
    originalLog.apply(console, args);
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Show toast notification
 */
function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) {
        console.warn('[DREAM] Toast container not found');
        return;
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    toast.innerHTML = `
        <div style="display:flex;align-items:center;gap:0.75rem;padding:1rem;background:rgba(15,23,42,0.95);border-radius:12px;border-left:4px solid ${
            type === 'error' ? '#ef4444' : 
            type === 'warning' ? '#f59e0b' : 
            type === 'success' ? '#10b981' : '#3b82f6'
        };backdrop-filter:blur(10px);box-shadow:0 10px 40px rgba(0,0,0,0.3);max-width:350px;">
            <span style="font-size:1.5rem;">${icons[type] || icons.info}</span>
            <div style="flex:1;">
                <div style="font-weight:700;font-size:0.75rem;text-transform:uppercase;color:${
                    type === 'error' ? '#ef4444' : 
                    type === 'warning' ? '#f59e0b' : 
                    type === 'success' ? '#10b981' : '#3b82f6'
                };margin-bottom:0.25rem;">${type}</div>
                <div style="color:#e2e8f0;font-size:0.875rem;">${message}</div>
            </div>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease-out';
    }, 10);
    
    // Remove after duration
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Show modal (placeholder)
 */
function showModal(title, content, options = {}) {
    console.log('[DREAM] Modal:', title, content, options);
    // TODO: Implement modal UI
}

// Expose utilities
window.DREAM.utils.showToast = showToast;
window.DREAM.utils.escapeHTML = escapeHTML;
window.DREAM.utils.showModal = showModal;

// ============================================================================
// MODULE LOADER
// ============================================================================

/**
 * Load a module dynamically
 * @param {string} moduleName - Name of the module to load
 */
async function loadModule(moduleName) {
    console.log(`[DREAM] Loading module: ${moduleName}`);
    
    const container = document.getElementById('dynamic-stage');
    const breadcrumb = document.getElementById('breadcrumb-container');
    const currentModuleName = document.getElementById('current-module-name');
    
    if (!container) {
        console.error('[DREAM] Container #dynamic-stage not found');
        showToast('Error: Container not found', 'error');
        return;
    }
    
    try {
        // Show loading state
        container.innerHTML = `
            <div style="text-align:center;padding:4rem 1rem;">
                <div style="width:50px;height:50px;margin:0 auto 1rem;border:4px solid rgba(16,185,129,0.2);border-top-color:#10b981;border-radius:50%;animation:spin 1s linear infinite;"></div>
                <p style="color:#94a3b8;font-size:0.875rem;">Loading module...</p>
            </div>
        `;
        
        // Update navigation active state
        updateNavigationState(moduleName);
        
        // Get module config
        const moduleConfig = window.DREAM.config.modules[moduleName];
        
        if (!moduleConfig) {
            throw new Error(`Module "${moduleName}" not found in config`);
        }
        
        // Try to load module
        let module;
        
        try {
            module = await import(moduleConfig.path);
        } catch (importError) {
            console.warn(`[DREAM] Failed to load from ${moduleConfig.path}, trying fallback...`);
            
            // Fallback: Try to load from different paths
            const fallbackPaths = [
                `./modules/${moduleName}/module.js`,
                `/modules/${moduleName}/module.js`,
                `../modules/${moduleName}/module.js`
            ];
            
            for (const fallbackPath of fallbackPaths) {
                try {
                    module = await import(fallbackPath);
                    console.log(`[DREAM] Loaded from fallback: ${fallbackPath}`);
                    break;
                } catch (e) {
                    console.warn(`[DREAM] Fallback failed: ${fallbackPath}`);
                }
            }
            
            if (!module) {
                throw new Error(`Could not load module from any path`);
            }
        }
        
        // Get module content
        let content;
        
        if (module.default) {
            // Module has default export (function)
            if (typeof module.default === 'function') {
                content = await module.default({
                    container,
                    utils: window.DREAM.utils,
                    state: window.DREAM.state
                });
            } else {
                content = module.default;
            }
        } else if (module.render) {
            // Module has render function
            content = await module.render({
                container,
                utils: window.DREAM.utils,
                state: window.DREAM.state
            });
        } else {
            throw new Error('Module must export default function or render function');
        }
        
        // Inject content
        if (typeof content === 'string') {
            container.innerHTML = content;
        }
        
        // Update breadcrumb
        if (breadcrumb && currentModuleName) {
            breadcrumb.classList.remove('hidden');
            currentModuleName.textContent = moduleConfig.title || moduleName;
        }
        
        // Update state
        window.DREAM.state.currentModule = moduleName;
        window.DREAM.state.history.push({
            module: moduleName,
            timestamp: Date.now()
        });
        
        // Cache module
        window.DREAM.state.modules.set(moduleName, module);
        
        // Animate in
        setTimeout(() => {
            container.style.opacity = '1';
        }, 50);
        
        console.log(`[DREAM] Module "${moduleName}" loaded successfully`);
        
    } catch (error) {
        console.error('[DREAM] Module load error:', error);
        
        // Show error UI
        container.innerHTML = `
            <div style="max-width:400px;margin:4rem auto;text-align:center;">
                <div style="font-size:3rem;margin-bottom:1rem;">⚠️</div>
                <h3 style="font-size:1.25rem;font-weight:700;color:#ef4444;margin-bottom:0.5rem;">
                    Module Load Error
                </h3>
                <p style="font-size:0.875rem;color:#94a3b8;margin-bottom:1.5rem;">
                    Could not load module: <strong>${moduleName}</strong>
                </p>
                <div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:12px;padding:1rem;margin-bottom:1.5rem;text-align:left;">
                    <code style="font-size:0.75rem;color:#ef4444;word-break:break-all;">
                        ${escapeHTML(error.message)}
                    </code>
                </div>
                <button 
                    onclick="DREAM.load('home')" 
                    style="background:#10b981;color:#020617;padding:0.75rem 1.5rem;border:none;border-radius:8px;font-weight:700;cursor:pointer;">
                    Back to Home
                </button>
            </div>
        `;
        
        showToast(`Failed to load ${moduleName}`, 'error');
    }
}

/**
 * Update navigation active state
 */
function updateNavigationState(activeModule) {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const itemModule = item.getAttribute('data-module');
        
        if (itemModule === activeModule) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Expose load function
window.DREAM.load = loadModule;

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize DREAM Core
 */
async function initDreamCore() {
    console.log('[DREAM] Initializing Core Engine v' + window.DREAM.version);
    
    try {
        // Load default module (home)
        await loadModule('home');
        
        // Setup event listeners
        setupEventListeners();
        
        // Ghost mode activation (5 taps on header)
        let ghostTapCount = 0;
        const header = document.getElementById('app-header');
        if (header) {
            header.addEventListener('click', () => {
                ghostTapCount++;
                if (ghostTapCount === 5) {
                    ghostTapCount = 0;
                    const pwd = prompt('👻 Developer access:');
                    if (pwd === 'dreamos2026') {
                        if (!DREAM.config.modules.ghost) {
                            DREAM.config.modules.ghost = { 
                                path: '../modules/ghost/module.js', 
                                title: 'Ghost' 
                            };
                        }
                        DREAM.load('ghost');
                        DREAM.utils.showToast('Ghost mode activated', 'info');
                    } else {
                        alert('Access denied');
                    }
                }
                setTimeout(() => ghostTapCount = 0, 3000);
            });
        }
        
        // Initialize features
        initBatteryMonitor();
        initNetworkMonitor();
        initPrayerTimeMonitor();
        
        console.log('[DREAM] ✅ Core Engine initialized successfully');
        
    } catch (error) {
        console.error('[DREAM] Initialization error:', error);
        showToast('System initialization failed', 'error');
    }
}

/**
 * Setup global event listeners
 */
function setupEventListeners() {
    // AI Button
    const aiButton = document.getElementById('btn-magic-ai');
    if (aiButton) {
        aiButton.addEventListener('click', () => {
            showToast('AI Assistant coming soon! 🤖', 'info');
        });
    }
    
    // Back button (browser)
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.module) {
            loadModule(event.state.module);
        }
    });
}

/**
 * Initialize battery monitor
 */
async function initBatteryMonitor() {
    const batteryLevel = document.getElementById('battery-level');
    
    if (!batteryLevel) return;
    
    try {
        if ('getBattery' in navigator) {
            const battery = await navigator.getBattery();
            
            const updateBattery = () => {
                const level = Math.round(battery.level * 100);
                batteryLevel.textContent = `${level}%`;
                
                // Update icon based on level
                const batteryIcon = document.querySelector('#battery-indicator i');
                if (batteryIcon) {
                    if (level > 80) batteryIcon.className = 'fas fa-battery-full';
                    else if (level > 50) batteryIcon.className = 'fas fa-battery-three-quarters';
                    else if (level > 20) batteryIcon.className = 'fas fa-battery-half';
                    else batteryIcon.className = 'fas fa-battery-quarter';
                }
            };
            
            updateBattery();
            battery.addEventListener('levelchange', updateBattery);
            battery.addEventListener('chargingchange', updateBattery);
        }
    } catch (error) {
        console.warn('[DREAM] Battery API not available:', error);
    }
}

/**
 * Initialize network monitor
 */
function initNetworkMonitor() {
    const networkType = document.getElementById('network-type');
    
    if (!networkType) return;
    
    const updateNetwork = () => {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        if (connection) {
            const type = connection.effectiveType || connection.type;
            networkType.textContent = type ? type.toUpperCase() : 'WiFi';
        } else {
            networkType.textContent = navigator.onLine ? 'WiFi' : 'Offline';
        }
    };
    
    updateNetwork();
    
    window.addEventListener('online', updateNetwork);
    window.addEventListener('offline', updateNetwork);
    
    if (navigator.connection) {
        navigator.connection.addEventListener('change', updateNetwork);
    }
}

/**
 * Initialize prayer time monitor
 */
function initPrayerTimeMonitor() {
    const prayerDisplay = document.getElementById('prayer-time-display');
    
    if (!prayerDisplay) return;
    
    const updatePrayerTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        
        let prayerName;
        if (hours >= 4 && hours < 6) prayerName = 'Subuh';
        else if (hours >= 6 && hours < 12) prayerName = 'Dhuha';
        else if (hours >= 12 && hours < 15) prayerName = 'Dzuhur';
        else if (hours >= 15 && hours < 18) prayerName = 'Ashar';
        else if (hours >= 18 && hours < 19) prayerName = 'Maghrib';
        else if (hours >= 19 && hours < 21) prayerName = "Isya'";
        else prayerName = 'Tahajud';
        
        prayerDisplay.textContent = `${prayerName} ${hours}:${minutes}`;
    };
    
    updatePrayerTime();
    setInterval(updatePrayerTime, 60000); // Update every minute
}

// ============================================================================
// AUTO-INITIALIZE ON DOM READY
// ============================================================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDreamCore);
} else {
    // DOM already loaded
    initDreamCore();
}

// ============================================================================
// EXPORT FOR MODULES
// ============================================================================

export default window.DREAM;
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
/**
 * 📦 DREAM OS - SMART STOCK MANAGEMENT
 * Feature: Real-time Inventory, Auto-Critical Warning
 * Standard: ISO 55001 Asset Management
 * Bismillah bi idznillah.
 */
console.log('📦 Stock Module Loaded');

(function() {
    'use strict';
    const supabase = window.supabase;
    if (!supabase) return console.error('❌ Stock: Supabase Missing');

    // 1. Load & Render Stock with Analytics
    async function loadStok() {
        const listDiv = document.getElementById('stok-list');
        if (!listDiv) return;
        
        listDiv.innerHTML = '<div class="p-6 text-center animate-pulse font-mono text-[10px] opacity-50 text-cyan-400">📡 SYNCING INVENTORY...</div>';

        try {
            const { data, error } = await supabase
                .from('stok')
                .select('*')
                .order('nama_barang', { ascending: true });

            if (error) throw error;

            if (!data?.length) {
                listDiv.innerHTML = '<div class="p-10 text-center opacity-40 text-xs italic font-mono">GUDANG KOSONG</div>';
                return;
            }

            listDiv.innerHTML = `
                <div class="grid grid-cols-1 gap-2">
                    ${data.map(item => {
                        const isCritical = item.jumlah <= (item.minimal_stok || 0);
                        const statusClass = isCritical ? 'border-red-500/50 bg-red-500/10' : 'border-white/5 bg-white/5';
                        const textClass = isCritical ? 'text-red-400 animate-pulse font-black' : 'text-emerald-400 font-bold';
                        
                        return `
                        <div class="p-3 rounded-xl border ${statusClass} flex justify-between items-center transition-all hover:bg-white/10">
                            <div class="flex-1">
                                <div class="flex items-center gap-2">
                                    <span class="text-sm font-bold text-slate-200 tracking-tight">${item.nama_barang}</span>
                                    ${isCritical ? '<span class="text-[8px] bg-red-600 text-white px-1 rounded font-black italic">LOW!</span>' : ''}
                                </div>
                                <div class="text-[10px] opacity-50 font-mono mt-1 uppercase">
                                    ${item.kategori || 'General'} • Loc: ${item.lokasi || '-'}
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-sm ${textClass}">${item.jumlah} <span class="text-[10px] opacity-60 font-normal">${item.satuan || 'Pcs'}</span></div>
                                <div class="text-[8px] opacity-40 font-mono italic">Min: ${item.minimal_stok || 0}</div>
                            </div>
                        </div>`;
                    }).join('')}
                </div>`;
        } catch (err) {
            listDiv.innerHTML = `<div class="p-4 text-red-500 text-center text-xs font-mono italic">❌ GAGAL SYNC: ${err.message}</div>`;
        }
    }

    // 2. Insert Logic with Validation
    const stokForm = document.getElementById('stokForm');
    if (stokForm) {
        stokForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const res = document.getElementById('form-result');
            const btn = e.target.querySelector('button[type="submit"]');

            if (res) res.innerHTML = '<span class="text-cyan-500 animate-pulse font-mono text-[10px]">📡 UPDATING LEDGER...</span>';
            if (btn) btn.disabled = true;

            const formData = {
                nama_barang: document.getElementById('nama_barang').value.trim(),
                kategori: document.getElementById('kategori').value,
                jumlah: parseInt(document.getElementById('jumlah').value),
                satuan: document.getElementById('satuan').value.trim(),
                lokasi: document.getElementById('lokasi').value.trim(),
                minimal_stok: parseInt(document.getElementById('minimal_stok').value) || 0,
                updated_at: new Date()
            };

            try {
                const { error } = await supabase.from('stok').insert([formData]);
                if (error) throw error;

                if (res) res.innerHTML = '<span class="text-green-500 font-black text-xs">✅ STOK BERHASIL DITAMBAHKAN!</span>';
                e.target.reset();
                loadStok();
                setTimeout(() => { if (res) res.innerHTML = ''; }, 3000);
            } catch (err) {
                if (res) res.innerHTML = `<span class="text-red-500 text-[10px]">❌ ERROR: ${err.message}</span>`;
            } finally {
                if (btn) btn.disabled = false;
            }
        });
    }

    // Initialize
    loadStok();
    // Refresh otomatis setiap 1 menit
    setInterval(loadStok, 60000);
})();
// ==================== modules/booking.js ====================
/**
 * DREAM OS NANO - Booking System Module
 * Smart Calendar | Double Booking Prevention | Islamic Rules
 */

class DreamBooking {
  constructor() {
    this.bookings = JSON.parse(localStorage.getItem('dreamos_bookings') || '[]');
    this.facilities = [
      { id: 1, name: 'Aula SMP', includes: 'sound, lighting, ac, projector', status: 'available' },
      { id: 2, name: 'Aula SMA', includes: 'sound, projector', status: 'available' },
      { id: 3, name: 'Saung Besar', includes: 'sound', status: 'available' },
      { id: 4, name: 'Saung Kecil', includes: '-', status: 'available' },
      { id: 5, name: 'Masjid', includes: 'sound', status: 'maintenance', note: 'Maintenance/Renovasi' },
      { id: 6, name: 'Serbaguna', includes: 'sound', status: 'available' },
      { id: 7, name: 'Labkom SD', includes: '-', status: 'available' },
      { id: 8, name: 'Labkom SMP', includes: '-', status: 'available' },
      { id: 9, name: 'Labkom SMA', includes: '-', status: 'available' },
      { id: 10, name: 'Lapangan Volley', includes: '-', status: 'available' },
      { id: 11, name: 'Lapangan Basket', includes: '-', status: 'available' },
      { id: 12, name: 'Lapangan SMA', includes: '-', status: 'available' },
      { id: 13, name: 'Lapangan Tanah', includes: '-', status: 'available' },
      { id: 14, name: 'Kantin SMP', includes: '-', status: 'available' },
      { id: 15, name: 'Kantin SMA', includes: '-', status: 'available' },
      { id: 16, name: 'Perpus SD', includes: '-', status: 'available' },
      { id: 17, name: 'Perpus SMP', includes: '-', status: 'available' },
      { id: 18, name: 'Perpus SMA', includes: '-', status: 'available' }
    ];
    
    this.rules = {
      normalHours: { start: '07:30', end: '16:00' },
      fridayHours: { start: '10:30', end: '13:00' },
      fridayBlacklist: ['Aula SMP', 'Serbaguna'],
      maintenance: ['Masjid'],
      maxDaysAhead: 7,
      maxBookingPerUser: 3
    };
    
    this.init();
  }
  
  init() {
    console.log('📅 Booking System Initializing...');
    this.setupEventListeners();
    console.log('✅ Booking System Ready');
  }
  
  setupEventListeners() {
    // Listen for language changes to update UI
    document.addEventListener('languageChanged', () => {
      this.renderFacilityList();
      this.renderUserBookings();
    });
  }
  
  // ========== SMART AVAILABILITY CHECK ==========
  checkAvailability(facilityName, date, timeSlot) {
    const facility = this.facilities.find(f => f.name === facilityName);
    
    // 1. Check maintenance
    if (facility.status === 'maintenance') {
      return {
        available: false,
        reason: DreamI18n.translate('booking.maintenance')
      };
    }
    
    // 2. Check Friday rules
    const bookingDate = new Date(date);
    const dayOfWeek = bookingDate.getDay(); // 0=Sunday, 5=Friday
    
    if (dayOfWeek === 5) { // Friday
      if (this.rules.fridayBlacklist.includes(facilityName)) {
        return {
          available: false,
          reason: DreamI18n.translate('booking.friday.blacklist')
        };
      }
    }
    
    // 3. Check double booking
    const isDoubleBooked = this.bookings.some(booking => {
      return booking.facility === facilityName &&
             booking.date === date &&
             this.isTimeOverlap(booking.time, timeSlot);
    });
    
    if (isDoubleBooked) {
      return {
        available: false,
        reason: DreamI18n.translate('booking.double.booked')
      };
    }
    
    // 4. Check user booking limit
    const userBookings = this.bookings.filter(b => 
      b.user === DreamOS?.currentUser?.name
    );
    
    if (userBookings.length >= this.rules.maxBookingPerUser) {
      return {
        available: false,
        reason: DreamI18n.translate('booking.limit.reached')
      };
    }
    
    // 5. Check date range (max 7 days ahead)
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + this.rules.maxDaysAhead);
    
    if (bookingDate > maxDate) {
      return {
        available: false,
        reason: DreamI18n.translate('booking.too.far.ahead')
      };
    }
    
    // All checks passed
    return {
      available: true,
      facility: facility,
      timeSlot: this.getTimeSlotForDay(dayOfWeek, timeSlot)
    };
  }
  
  isTimeOverlap(time1, time2) {
    const [start1, end1] = time1.split('-').map(t => this.timeToMinutes(t.trim()));
    const [start2, end2] = time2.split('-').map(t => this.timeToMinutes(t.trim()));
    
    return !(end1 <= start2 || end2 <= start1);
  }
  
  timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }
  
  getTimeSlotForDay(dayOfWeek, requestedTime) {
    let defaultTime = `${this.rules.normalHours.start}-${this.rules.normalHours.end}`;
    
    if (dayOfWeek === 5) { // Friday
      defaultTime = `${this.rules.fridayHours.start}-${this.rules.fridayHours.end}`;
    }
    
    return requestedTime || defaultTime;
  }
  
  // ========== BOOKING CREATION ==========
  createBooking(facilityName, date, time, purpose) {
    const availability = this.checkAvailability(facilityName, date, time);
    
    if (!availability.available) {
      DreamAccessibility.announce(availability.reason);
      return { success: false, message: availability.reason };
    }
    
    const booking = {
      id: 'BK-' + Date.now().toString().slice(-6),
      facility: facilityName,
      date: date,
      time: availability.timeSlot,
      purpose: purpose || '',
      user: DreamOS.currentUser?.name || 'Unknown',
      status: 'pending',
      createdAt: new Date().toISOString(),
      includes: availability.facility?.includes || '-'
    };
    
    this.bookings.push(booking);
    this.saveBookings();
    
    // Send WhatsApp notification
    this.sendWhatsAppNotification(booking);
    
    DreamAccessibility.announce(
      DreamI18n.translate('booking.created.success')
    );
    
    return {
      success: true,
      booking: booking,
      message: DreamI18n.translate('booking.created.success')
    };
  }
  
  sendWhatsAppNotification(booking) {
    const message = `📅 BOOKING BARU - DREAM OS\n\n` +
      `🏢 Sarana: ${booking.facility}\n` +
      `📅 Tanggal: ${booking.date}\n` +
      `⏰ Waktu: ${booking.time}\n` +
      `📝 Keperluan: ${booking.purpose}\n` +
      `👤 Pemesan: ${booking.user}\n` +
      `🆔 ID: ${booking.id}\n` +
      `📋 Fasilitas Include: ${booking.includes}\n\n` +
      `_*Auto-generated from Dream OS*_`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/628886183954?text=${encodedMessage}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
    
    console.log('📱 WhatsApp notification sent');
  }
  
  // ========== USER BOOKING MANAGEMENT ==========
  getUserBookings() {
    if (!DreamOS?.currentUser) return [];
    
    return this.bookings.filter(booking => 
      booking.user === DreamOS.currentUser.name
    );
  }
  
  cancelBooking(bookingId) {
    const index = this.bookings.findIndex(b => b.id === bookingId);
    
    if (index === -1) {
      return { success: false, message: 'Booking tidak ditemukan' };
    }
    
    // Check if booking belongs to current user
    if (this.bookings[index].user !== DreamOS.currentUser?.name) {
      return { success: false, message: 'Anda tidak memiliki akses' };
    }
    
    // Remove booking
    const cancelled = this.bookings.splice(index, 1)[0];
    this.saveBookings();
    
    // Send cancellation notification
    this.sendCancellationNotification(cancelled);
    
    return {
      success: true,
      message: 'Booking berhasil dibatalkan',
      booking: cancelled
    };
  }
  
  sendCancellationNotification(booking) {
    const message = `❌ BOOKING DIBATALKAN - DREAM OS\n\n` +
      `🏢 Sarana: ${booking.facility}\n` +
      `📅 Tanggal: ${booking.date}\n` +
      `👤 Pembatal: ${DreamOS.currentUser?.name}\n` +
      `🆔 ID: ${booking.id}\n\n` +
      `_*Auto-generated from Dream OS*_`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/628886183954?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  }
  
  // ========== SMART CALENDAR ==========
  generateCalendar(year, month) {
    const now = new Date();
    const currentYear = year || now.getFullYear();
    const currentMonth = month || now.getMonth();
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const calendar = {
      year: currentYear,
      month: currentMonth,
      monthName: this.getMonthName(currentMonth),
      days: []
    };
    
    // Generate days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayBookings = this.bookings.filter(b => b.date === dateStr);
      
      calendar.days.push({
        date: dateStr,
        day: day,
        dayOfWeek: date.getDay(),
        isToday: this.isSameDate(date, now),
        isPast: date < now,
        bookings: dayBookings
      });
    }
    
    return calendar;
  }
  
  getMonthName(monthIndex) {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return months[monthIndex];
  }
  
  isSameDate(date1, date2) {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }
  
  // ========== UI RENDER METHODS ==========
  renderFacilityList() {
    const container = document.getElementById('facility-list');
    if (!container) return;
    
    const availableFacilities = this.facilities.filter(f => f.status === 'available');
    
    const html = availableFacilities.map(facility => `
      <div class="facility-card" data-facility="${facility.name}">
        <div class="facility-header">
          <h3>${facility.name}</h3>
          <span class="status-badge available">
            ${DreamI18n.translate('booking.available')}
          </span>
        </div>
        <div class="facility-details">
          <p><small>${DreamI18n.translate('booking.includes')}: ${facility.includes}</small></p>
        </div>
        <button class="btn-select-facility" 
                onclick="DreamBooking.selectFacility('${facility.name}')"
                data-i18n="booking.select">
          Pilih
        </button>
      </div>
    `).join('');
    
    container.innerHTML = html;
    
    // Translate all i18n elements
    DreamI18n.translatePage();
  }
  
  renderUserBookings() {
    const container = document.getElementById('user-bookings');
    if (!container) return;
    
    const userBookings = this.getUserBookings();
    
    if (userBookings.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <p data-i18n="booking.no.bookings">Belum ada booking</p>
        </div>
      `;
      return;
    }
    
    const html = userBookings.map(booking => `
      <div class="booking-card" data-booking-id="${booking.id}">
        <div class="booking-header">
          <h4>${booking.facility}</h4>
          <span class="status-badge ${booking.status}">
            ${booking.status === 'pending' ? 
              DreamI18n.translate('booking.status.pending') : 
              DreamI18n.translate('booking.status.approved')}
          </span>
        </div>
        <div class="booking-details">
          <p><strong data-i18n="booking.date">Tanggal:</strong> ${booking.date}</p>
          <p><strong data-i18n="booking.time">Waktu:</strong> ${booking.time}</p>
          ${booking.purpose ? `<p><strong data-i18n="booking.purpose">Keperluan:</strong> ${booking.purpose}</p>` : ''}
          <p><small><strong data-i18n="booking.includes">Include:</strong> ${booking.includes}</small></p>
        </div>
        <div class="booking-actions">
          ${booking.status === 'pending' ? `
            <button class="btn-cancel" 
                    onclick="DreamBooking.showCancelDialog('${booking.id}')"
                    data-i18n="booking.cancel">
              Batalkan
            </button>
          ` : ''}
          <button class="btn-details" 
                  onclick="DreamBooking.showDetails('${booking.id}')"
                  data-i18n="booking.details">
            Detail
          </button>
        </div>
      </div>
    `).join('');
    
    container.innerHTML = html;
    DreamI18n.translatePage();
  }
  
  // ========== UI INTERACTION METHODS ==========
  selectFacility(facilityName) {
    // Store selected facility for booking form
    sessionStorage.setItem('selectedFacility', facilityName);
    
    // Show booking form
    this.showBookingForm(facilityName);
  }
  
  showBookingForm(facilityName = null) {
    const facility = facilityName || sessionStorage.getItem('selectedFacility');
    
    const formHtml = `
      <div class="booking-form-modal" id="booking-form-modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2 data-i18n="booking.new">Booking Baru</h2>
            <button class="btn-close" onclick="this.closest('.booking-form-modal').remove()">
              ×
            </button>
          </div>
          
          <div class="modal-body">
            <div class="form-group">
              <label data-i18n="booking.facility">Sarana</label>
              <input type="text" value="${facility || ''}" 
                     id="booking-facility" 
                     readonly
                     class="form-input">
            </div>
            
            <div class="form-group">
              <label data-i18n="booking.date">Tanggal</label>
              <input type="date" 
                     id="booking-date"
                     class="form-input"
                     min="${this.getMinDate()}"
                     max="${this.getMaxDate()}">
            </div>
            
            <div class="form-group">
              <label data-i18n="booking.time">Waktu (opsional)</label>
              <input type="text" 
                     id="booking-time"
                     class="form-input"
                     placeholder="Contoh: 07:30-16:00"
                     data-i18n-placeholder="booking.time.placeholder">
              <small data-i18n="booking.time.note">
                Kosongkan untuk waktu default sesuai hari
              </small>
            </div>
            
            <div class="form-group">
              <label data-i18n="booking.purpose">Keperluan</label>
              <textarea id="booking-purpose" 
                        class="form-textarea"
                        rows="3"
                        placeholder="Jelaskan keperluan booking..."
                        data-i18n-placeholder="booking.purpose.placeholder"></textarea>
            </div>
            
            <div id="availability-check-result"></div>
          </div>
          
          <div class="modal-footer">
            <button class="btn-secondary" 
                    onclick="document.getElementById('booking-form-modal').remove()"
                    data-i18n="common.cancel">
              Batal
            </button>
            <button class="btn-primary" 
                    onclick="DreamBooking.submitBookingForm()"
                    id="btn-submit-booking"
                    data-i18n="booking.submit">
              Ajukan Booking
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Remove existing modal
    const existingModal = document.getElementById('booking-form-modal');
    if (existingModal) existingModal.remove();
    
    // Add new modal
    document.body.insertAdjacentHTML('beforeend', formHtml);
    
    // Add change listeners
    document.getElementById('booking-date').addEventListener('change', () => {
      this.checkAvailabilityInForm();
    });
    
    document.getElementById('booking-time').addEventListener('input', () => {
      this.checkAvailabilityInForm();
    });
    
    // Initial check
    this.checkAvailabilityInForm();
    
    DreamI18n.translatePage();
    DreamAccessibility.focusFirstElement(document.getElementById('booking-form-modal'));
  }
  
  checkAvailabilityInForm() {
    const facility = document.getElementById('booking-facility')?.value;
    const date = document.getElementById('booking-date')?.value;
    const time = document.getElementById('booking-time')?.value;
    
    if (!facility || !date) return;
    
    const result = this.checkAvailability(facility, date, time);
    const resultDiv = document.getElementById('availability-check-result');
    const submitBtn = document.getElementById('btn-submit-booking');
    
    if (result.available) {
      resultDiv.innerHTML = `
        <div class="alert alert-success">
          ✅ <span data-i18n="booking.available">Tersedia</span>
        </div>
      `;
      submitBtn.disabled = false;
    } else {
      resultDiv.innerHTML = `
        <div class="alert alert-error">
          ❌ ${result.reason}
        </div>
      `;
      submitBtn.disabled = true;
    }
    
    DreamI18n.translatePage();
  }
  
  submitBookingForm() {
    const facility = document.getElementById('booking-facility')?.value;
    const date = document.getElementById('booking-date')?.value;
    const time = document.getElementById('booking-time')?.value;
    const purpose = document.getElementById('booking-purpose')?.value;
    
    if (!facility || !date) {
      DreamAccessibility.announce(
        DreamI18n.translate('booking.form.incomplete')
      );
      return;
    }
    
    const result = this.createBooking(facility, date, time, purpose);
    
    if (result.success) {
      // Close modal
      const modal = document.getElementById('booking-form-modal');
      if (modal) modal.remove();
      
      // Refresh bookings list
      this.renderUserBookings();
      
      // Show success message
      DreamAccessibility.announce(result.message);
      
      // Trigger notification check
      if (DreamNotification) {
        DreamNotification.checkUpcomingBookings();
      }
    } else {
      DreamAccessibility.announce(result.message);
    }
  }
  
  showCancelDialog(bookingId) {
    if (!confirm(DreamI18n.translate('booking.cancel.confirm'))) return;
    
    const result = this.cancelBooking(bookingId);
    
    if (result.success) {
      this.renderUserBookings();
      DreamAccessibility.announce(result.message);
    } else {
      DreamAccessibility.announce(result.message);
    }
  }
  
  showDetails(bookingId) {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) return;
    
    const detailsHtml = `
      <div class="details-modal">
        <div class="modal-content">
          <h2 data-i18n="booking.details">Detail Booking</h2>
          <div class="details-content">
            <p><strong data-i18n="booking.facility">Sarana:</strong> ${booking.facility}</p>
            <p><strong data-i18n="booking.date">Tanggal:</strong> ${booking.date}</p>
            <p><strong data-i18n="booking.time">Waktu:</strong> ${booking.time}</p>
            <p><strong data-i18n="booking.status">Status:</strong> ${booking.status}</p>
            <p><strong data-i18n="booking.includes">Include:</strong> ${booking.includes}</p>
            ${booking.purpose ? `<p><strong data-i18n="booking.purpose">Keperluan:</strong> ${booking.purpose}</p>` : ''}
            <p><small><strong data-i18n="booking.created">Dibuat:</strong> ${new Date(booking.createdAt).toLocaleString()}</small></p>
          </div>
          <button onclick="this.closest('.details-modal').remove()"
                  data-i18n="common.close">
            Tutup
          </button>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', detailsHtml);
    DreamI18n.translatePage();
  }
  
  // ========== UTILITY METHODS ==========
  getMinDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
  
  getMaxDate() {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + this.rules.maxDaysAhead);
    return maxDate.toISOString().split('T')[0];
  }
  
  saveBookings() {
    localStorage.setItem('dreamos_bookings', JSON.stringify(this.bookings));
  }
}

window.DreamBooking = new DreamBooking();
