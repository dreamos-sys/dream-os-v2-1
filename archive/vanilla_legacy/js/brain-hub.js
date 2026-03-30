export const BrainHub = {
    agents: {
        gemini: { name: "Mrs. Gemini Bawel 😋", color: "#10b981" },
        qwen: { name: "Mrs. Qwen Bawel 😏", color: "#8b5cf6" },
        dseek: { name: "Mr. DSeek 🧐", color: "#0ea5e9" }
    },
    current: "gemini",
    metrics: { health: 100 },
    switch: function(id) { 
        this.current = id;
        window.addChat('GHOST', `Switched to ${this.agents[id].name}`, 'vaccine');
    },
    process: function(val) {
        if(val.includes('@qwen')) this.switch('qwen');
        if(val.includes('@deep')) this.switch('dseek');
        if(val.includes('@gemini')) this.switch('gemini');
        
        const agent = this.agents[this.current];
        setTimeout(() => {
            let res = `[${agent.name}]: AIAgent.getResponse(val)`;
            if(val.toLowerCase().includes('sholawat')) res = `[${agent.name}]: Allahumma Sholli 'ala Sayyidina Muhammad. ✨`;
            window.addChat(this.current, res);
        }, 500);
    }
};
