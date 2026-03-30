export default {
    render: (context) => {
        return `
            <div style="background:#0f172a; padding:20px; border-radius:12px;">
                <h3 style="color:#10b981;">📦 Stok Management</h3>
                <p>User: ${context.user}</p>
                <p>Fitur stok akan segera hadir.</p>
            </div>
        `;
    }
};
