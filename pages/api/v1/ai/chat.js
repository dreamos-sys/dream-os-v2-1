export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { prompt, spiritual = true } = req.body;
  const key = process.env.OLLAMA_KEY;
  if (!key) return res.status(500).json({ error: 'AI not configured' });
  try {
    const apiRes = await fetch('https://ollama.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gemma3:4b',
        messages: [{ role: 'user', content: spiritual ? `Bismillah bi idznillah. ${prompt}` : prompt }],
        stream: false
      })
    });
    const data = await apiRes.json();
    res.status(200).json({ response: data.choices?.[0]?.message?.content, model: data.model });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
