export default {
    name: 'sekuriti',
    render: async (ctx) => {
        const container = document.getElementById('module-container');
        if (container) {
            container.innerHTML = `
                <div style="padding:20px;">
                    <h2 style="color:#10b981; margin-bottom:20px;">📦 sekuriti Module</h2>
                    <p style="color:#94a3b8;">Module loaded successfully!</p>
                    <button onclick="App.backToDashboard()" style="margin-top:20px; background:#10b981; color:white; border:none; padding:12px 24px; border-radius:12px; cursor:pointer;">← Back to Dashboard</button>
                </div>
            `;
        }
    }
};
