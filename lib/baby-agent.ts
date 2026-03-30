/**
 * 🧠 DREAM OS - BABY SMART AGENT AI (Next.js Core)
 */
export const BabyAgent = {
    learn: (action: string, data: any) => {
        if (typeof window === 'undefined') return;
        
        const patterns = JSON.parse(localStorage.getItem('baby_agent_patterns') || '{}');
        if (!patterns[action]) patterns[action] = [];
        
        patterns[action].push({
            timestamp: Date.now(),
            data,
            time: new Date().getHours()
        });

        // Limit memory (Last 50 actions)
        if (patterns[action].length > 50) patterns[action].shift();
        
        localStorage.setItem('baby_agent_patterns', JSON.stringify(patterns));
        console.log(`🧠 AI Learned in Next.js: ${action}`);
    },

    getSuggestions: (moduleId: string) => {
        if (typeof window === 'undefined') return [];
        // Logic suggest tetap sama tapi lebih kencang
        return [{ type: 'info', message: `🤖 Baby Agent: Welcome to ${moduleId}!` }];
    }
};
