export default {
    name: 'QR Scanner',
    icon: 'fa-qrcode',
    color: '#06b6d4',
    description: 'Scan QR code for attendance & asset tracking',
    async render(context) {
        return `
            <div style="padding:20px; text-align:center;">
                <h3 style="color:#06b6d4; margin-bottom:15px;">📱 QR Scanner</h3>
                <div style="background:rgba(15,23,42,0.5); border-radius:20px; padding:25px;">
                    <i class="fas fa-qrcode" style="font-size:64px; color:#06b6d4; margin-bottom:15px;"></i>
                    <p>Scan QR code untuk absensi & asset tracking</p>
                    <button class="btn" style="margin-top:20px; background:#06b6d4;" onclick="window.DREAM.toast('Fitur scan QR segera hadir', 'info')">
                        <i class="fas fa-camera"></i> Scan QR
                    </button>
                </div>
            </div>
        `;
    }
};
