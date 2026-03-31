// pages/api/ai/chat.js - Dream OS V21 PRO Hybrid Mode (Debug Version)
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { prompt, spiritual = true } = req.body;
  let host = process.env.OLLAMA_HOST;
  
  if (!host) return res.status(500).json({ error: 'Jalur Tunnel (OLLAMA_HOST) belum di-set!' });
  
  // Hapus garis miring di ujung kalau ada
  host = host.replace(/\/$/, '');

  try {
    const apiRes = await fetch(`${host}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'qwen2.5-coder:1.5b', // <-- PASTIKAN SAMA DENGAN OLLAMA LIST
        messages: [{ role: 'user', content: spiritual ? `Bismillah bi idznillah. ${prompt}` : prompt }],
        stream: false
      })
    });

    const text = await apiRes.text(); // Ambil teks mentah dulu buat jaga-jaga
    try {
      const data = JSON.parse(text);
      res.status(200).json({ response: data.choices?.[0]?.message?.content, model: data.model });
    } catch (e) {
      res.status(500).json({ error: "Ollama kasih jawaban aneh", raw: text });
    }
  } catch (err) {
    res.status(500).json({ error: `Gagal konek ke HP Master: ${err.message}` });
  }
}
