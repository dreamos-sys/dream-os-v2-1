/**
 * AI Provider Handler
 * Dream OS v2.1 - Multi-Provider Support
 */

class AIProvider {
    constructor(config) {
        this.config = config;
        this.currentProvider = null;
        this.fallbackQueue = [];
    }
    
    // ════════════════════════════════════════════
    // Get Active Provider
    // ════════════════════════════════════════════
    
    getActiveProvider() {
        // Check if permanent API is enabled
        if (this.config.permanentAPI.enabled) {
            return this.config.permanentAPI;
        }
        
        // Fallback to multi-AI providers
        const providers = Object.values(this.config.providers)
            .filter(p => p.enabled)
            .sort((a, b) => a.priority - b.priority);
        
        return providers[0] || null;
    }
    
    // ════════════════════════════════════════════
    // Send Request to AI
    // ════════════════════════════════════════════
    
    async sendRequest(message, context = {}) {
        const provider = this.getActiveProvider();
        
        if (!provider) {
            throw new Error('No AI provider configured');
        }
        
        console.log('[AI PROVIDER] Using:', provider.name);
        
        try {
            // Permanent API
            if (this.config.permanentAPI.enabled) {
                return await this._callPermanentAPI(message, context);
            }
            
            // Multi-AI Fallback
            return await this._callWithFallback(message, context);
            
        } catch (error) {
            console.error('[AI PROVIDER] Error:', error);
            throw error;
        }
    }
    
    // ════════════════════════════════════════════
    // Call Permanent API
    // ════════════════════════════════════════════
    
    async _callPermanentAPI(message, context) {
        const api = this.config.permanentAPI;
        
        const response = await fetch(api.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api.apiKey}`
            },
            body: JSON
