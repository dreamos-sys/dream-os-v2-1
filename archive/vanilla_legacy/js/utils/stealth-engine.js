window.StealthEngine = {
    activatePanicMode: function() {
        const body = document.body;
        body.innerHTML = `
            <div id="panic-ui" style="background:#000; color:#0f0; height:100vh; padding:20px; font-family:serif;">
                <h1 id="restore-trigger" style="font-size:1.5rem; border-bottom:1px solid #333;">SCIENTIFIC CALCULATOR</h1>
                <div style="margin-top:20px; font-size:2rem; text-align:right;">0.00000000</div>
                <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; margin-top:20px;">
                    ${Array(16).fill(0).map((_,i) => `<div style="border:1px solid #333; padding:15px; text-align:center;">${i}</div>`).join('')}
                </div>
            </div>
        `;
        let clicks = 0;
        document.getElementById('restore-trigger').onclick = () => {
            clicks++;
            if(clicks >= 4) location.reload();
        };
    }
};
