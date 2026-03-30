/**
 * 🧬 DREAM OS - SHARED CONTEXT
 * All modules share this context for data & state
 */

export const AppContext = {
    // Global state
    state: {
        currentUser: null,
        currentModule: null,
        supabase: null,
        theme: 'light',
        language: 'id'
    },

    // Shared data store    data: {
        inventory: [],
        assets: [],
        bookings: [],
        maintenance: [],
        requests: []
    },

    // Event bus for module communication
    events: {},

    // Subscribe to events
    on(event, callback) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);
    },

    // Emit events
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(cb => cb(data));
        }
    },

    // Update shared data
    update(collection, items) {
        this.data[collection] = items;
        this.emit(`${collection}:updated`, items);
    },

    // Get shared data
    get(collection) {
        return this.data[collection] || [];
    }
};

// Export for modules
export default AppContext;
