export async function render() {
    return `
        <div class="p-4">
            <h2 class="text-xl text-emerald-400 mb-4">⚙️ Settings</h2>
            <p class="text-muted">Pengaturan sistem dalam pengembangan.</p>
            <button class="btn btn-primary mt-4" onclick="DREAM.load('home')">Kembali</button>
        </div>
    `;
}
