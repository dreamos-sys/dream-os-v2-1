export default {
    async render() {
        const hasNFC = 'NDEFReader' in window;
        return `
            <div class="p-6 animate-up h-full flex flex-col">
                <div class="flex justify-between items-center mb-8">
                    <h2 class="text-white font-black text-xl tracking-[4px] uppercase">Sensor Hub</h2>
                    <button onclick="DREAM.navigate('home')" class="text-zinc-500"><i class="fas fa-times text-xl"></i></button>
                </div>

                <div class="relative w-full aspect-square glass rounded-[45px] overflow-hidden mb-8 border-2 border-purple-500/20 flex items-center justify-center">
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent animate-pulse"></div>
                    <i class="fas fa-expand text-6xl text-zinc-800"></i>
                    <div class="absolute bottom-6 bg-black/60 px-6 py-2 rounded-full backdrop-blur-md">
                        <p class="text-[9px] text-purple-400 font-black tracking-widest uppercase">Scanning for QR Code...</p>
                    </div>
                </div>

                <div class="space-y-4">
                    <div class="glass p-6 rounded-[35px] flex items-center justify-between border-l-4 ${hasNFC ? 'border-emerald-500' : 'border-red-500'}">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center shadow-inner">
                                <i class="fas fa-id-card ${hasNFC ? 'text-emerald-500' : 'text-zinc-700'} text-xl"></i>
                            </div>
                            <div>
                                <h4 class="text-white font-black text-xs uppercase tracking-wider">NFC Reader</h4>
                                <p class="text-[8px] text-zinc-500 font-bold uppercase">${hasNFC ? 'Ready to Scan' : 'Hardware Not Detected'}</p>
                            </div>
                        </div>
                        ${hasNFC ? '<button onclick="alert(\'NFC Active: Dekatkan Kartu Ke Belakang HP\')" class="bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest">Activate</button>' : ''}
                    </div>

                    <div class="glass p-6 rounded-[35px] bg-zinc-900/40">
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-[8px] text-zinc-500 font-black uppercase tracking-[3px]">Nearby Devices</span>
                            <span class="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                        </div>
                        <div class="flex gap-4">
                            <i class="fas fa-print text-zinc-700 hover:text-purple-400 transition-colors"></i>
                            <i class="fas fa-tv text-zinc-700 hover:text-purple-400 transition-colors"></i>
                            <i class="fas fa-laptop text-zinc-700 hover:text-purple-400 transition-colors"></i>
                        </div>
                    </div>
                </div>

                <div class="mt-auto pb-10">
                    <p class="text-[7px] text-zinc-700 text-center font-black tracking-[4px] uppercase">Dream OS Security Layer v13.2</p>
                </div>
            </div>
        `;
    }
};
