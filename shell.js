window.onload = () => {
    const loading = document.getElementById('loading-screen');
    if(loading) loading.style.display = 'none';

    document.getElementById('app-shell').innerHTML = `
        <header id="islamic-header" style="border:1px solid #d4af37;border-radius:24px;padding:25px;margin:16px;text-align:center;background:rgba(212,175,55,0.05);">
            <p style="font-size:24px;color:#d4af37;margin:0;">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            <p style="color:#64748b;font-size:10px;letter-spacing:4px;margin-top:10px;">THE POWER SOUL OF SHALAWAT</p>
        </header>

        <div style="padding:20px;text-align:center;">
            <img src="./assets/img/icon-512.png" style="width:120px;filter:drop-shadow(0 0 10px #d4af37);margin-bottom:20px;">
            <h3 style="color:#d4af37;">Sovereign Operational</h3>
        </div>

        <nav style="position:fixed;bottom:0;left:0;right:0;background:rgba(2,6,23,0.95);border-top:1px solid #d4af37;display:flex;justify-content:space-around;padding:15px;backdrop-filter:blur(10px);">
            <button onclick="location.reload()" style="background:none;border:none;color:#d4af37;"><i class="fas fa-home"></i><br><span style="font-size:10px;">Home</span></button>
            <button style="background:none;border:none;color:#64748b;"><i class="fas fa-qrcode"></i><br><span style="font-size:10px;">QR</span></button>
            <button style="background:none;border:none;color:#64748b;"><i class="fas fa-user-shield"></i><br><span style="font-size:10px;">User</span></button>
            <button style="background:none;border:none;color:#64748b;"><i class="fas fa-cog"></i><br><span style="font-size:10px;">Setup</span></button>
            <button onclick="location.reload()" style="background:none;border:none;color:#ef4444;"><i class="fas fa-power-off"></i><br><span style="font-size:10px;">Exit</span></button>
        </nav>
    `;

    // Ghost Mode 5x Tap
    let taps = 0;
    document.getElementById('islamic-header').onclick = () => {
        taps++;
        if(taps === 5) { alert('Ghost Mode Active!'); taps = 0; }
        setTimeout(() => taps = 0, 2000);
    };
};
