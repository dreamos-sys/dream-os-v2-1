// pages/api/ai/chat.js - Dream OS V21 PRO (Official Pinggy Bypass)
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { prompt, spiritual = true } = req.body;
  let host = process.env.OLLAMA_HOST;
  
  if (!host) return res.status(500).json({ error: 'Jalur Tunnel (OLLAMA_HOST) belum di-set!' });
  host = host.replace(/\/$/, '');

  try {
    const apiRes = await fetch(`${host}/v1/chat/completions`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-Pinggy-No-Screen': 'true', // <-- INI KUNCI ASLINYA (Sesuai Gambar 114)
        'User-Agent': 'DreamOS-V21-Pro/1.0' 
      },
      body: JSON.stringify({
        model: 'qwen2.5-coder:1.5b',
        messages: [{ role: 'user', content: spiritual ? `Bismillah bi idznillah. ${prompt}` : prompt }],
        stream: false
      })
    });

    const data = await apiRes.json();
    res.status(200).json({ response: data.choices?.[0]?.message?.content, model: data.model });
  } catch (err) {
    res.status(500).json({ error: `Gagal konek ke HP Master: ${err.message}` });
  }
}
