// pages/api/ai/chat.js - FINAL VERSION ✨
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { prompt, spiritual = true } = req.body;
  const key = process.env.OLLAMA_KEY;
  
  // 🔐 Validasi key
  if (!key) {
    console.error('❌ OLLAMA_KEY not set');
    return res.status(500).json({ error: 'AI not configured' });
  }
  
  try {
    // 🌐 PAKAI OLLAMA CLOUD, BUKAN LOCALHOST!
    const apiRes = await fetch('https://ollama.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,  // ✅ Key dari env var
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gemma3:4b',  // ✅ Model yang udah work
        messages: [{ 
          role: 'user', 
          content: spiritual ? `Bismillah bi idznillah. ${prompt}` : prompt 
        }],
        stream: false
      })
    });
    
    if (!apiRes.ok) {
      const errText = await apiRes.text();
      console.error('🚫 Ollama Cloud Error:', apiRes.status, errText);
      return res.status(apiRes.status).json({ error: 'AI service error' });
    }
    
    const data = await apiRes.json();
    return res.status(200).json({ 
      response: data.choices?.[0]?.message?.content,
      model: data.model 
    });
    
  } catch (err) {
    console.error('💥 API Route Error:', err.message);
    return res.status(500).json({ error: `Gagal konek ke HP Master: ${err.message}` });
  }
}
