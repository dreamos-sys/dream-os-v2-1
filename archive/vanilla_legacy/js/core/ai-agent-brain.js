import { execSync } from 'child_process';

/**
 * 🧠 AI_AGENT_BRAIN v15.8 (The Final Mission)
 * Bismillah - MAPPING SUCCESS FOR SIF AL-FIKRI
 */

const SUPABASE_URL = 'https://lfavawkzvdhdpaaplaiq.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmYXZhd2t6dmRoZHBhYXBsYWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5Mjc0NjgsImV4cCI6MjA4OTUwMzQ2OH0.EhwnhAd20lUVaWHHB51UdWCGWxkyTaWIrsPY8xvhwE0';

export const AIAgent = {
    generateInsight: async function() {
        console.log("📡 [TOKEN-SAVER]: Menarik Data Permintaan SIF Al-Fikri...");
        try {
            const command = `curl -s -X GET "${SUPABASE_URL}/rest/v1/permintaan_barang?select=*" -H "apikey: ${SUPABASE_KEY}" -H "Authorization: Bearer ${SUPABASE_KEY}"`;
            const response = execSync(command).toString();
            const data = JSON.parse(response);

            if (!data || data.length === 0) return [{ Item: 'Status', Info: 'Belum ada permintaan baru.' }];

            // Mapping berdasarkan struktur asli: id, title, description, status, created_at
            return data.map(item => ({
                No: item.id,
                Barang: item.title,
                Detail: item.description,
                Status: (item.status === 'pending') ? '⏳ PENDING' : '✅ APPROVED',
                Action: (item.status === 'pending') ? 'Lapor Pak Erwinsyah' : 'Siapkan Barang'
            }));
        } catch (err) {
            return [{ Error: 'System Error', Info: 'Check Connection' }];
        }
    }
};

if (process.argv[2]) {
    console.log("\n--- ⚡️ DREAM OS ADVISOR V 2.8 ---");
    AIAgent.generateInsight().then(res => {
        console.table(res);
        console.log("\n✅ Bismillah, DATA JRENG! (READY FOR REPORT)");
    });
}
