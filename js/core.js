// core.js - Intelligent Engine
window.SIC = {
    checkAccess: (role) => ({ 'hanung': 'APPROVER', 'erwinsyah': 'APPLICANT', 'admin': 'GHOST' }[role] || 'GUEST'),
    generateHash: async (data) => {
        const msg = new TextEncoder().encode(JSON.stringify(data));
        const hash = await crypto.subtle.digest('SHA-256', msg);
        return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
};

window.GhostStealthEngine = class {
    constructor() {
        this.status = 'active';
        console.log("Stealth Engine Ready.");
    }
};
