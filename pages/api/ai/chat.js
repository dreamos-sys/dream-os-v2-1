export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { prompt, useLocal = false, spiritual = true } = req.body;
  
  // 🔍 Debug: Cek env vars
  const hasLocalUrl = !!process.env.LOCAL_OLLAMA_URL;
  const hasCloudKey = !!process.env.OLLAMA_KEY;
  const isLocal = useLocal === true && hasLocalUrl;
  
  // 🎯 Pilih jalur
  const apiUrl = isLocal 
    ? `${process.env.LOCAL_OLLAMA_URL}/api/chat` 
    : "https://ollama.com/v1/chat/completions";
    
  const headers = { 'Content-Type': 'application/json' };
  if (!isLocal && hasCloudKey) {
    headers['Authorization'] = `Bearer ${process.env.OLLAMA_KEY}`;
  } else if (isLocal) {
    headers['X-Pinggy-No-Screen'] = 'true';
  }
  
  const modelName = isLocal ? "qwen2.5-coder:1.5b" : "gemma3:4b";
  
  try {
    const apiRes = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: modelName,
        messages: [{ 
          role: 'user', 
          content: spiritual ? `Bismillah bi idznillah. ${prompt}` : prompt 
        }],
        stream: false,
        options: isLocal ? { temperature: 0, num_predict: 20 } : undefined
      }),
      next: { revalidate: 0 }
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      throw new Error(`${apiRes.status}: ${errText}`);
    }
    
    const data = await apiRes.json();
    const finalReply = isLocal 
      ? data.message?.content 
      : data.choices?.[0]?.message?.content;
    
    // 🎁 RETURN DEBUG INFO
    res.status(200).json({ 
  response: finalReply || '🧘 AI sedang berpikir...', 
  model: modelName,
  source: isLocal ? 'local' : 'cloud'
});
    
  } catch (err) {
    res.status(500).json({ 
      error: err.message,
      debug: {
        useLocal_param: useLocal,
        LOCAL_OLLAMA_URL_set: hasLocalUrl,
        isLocal_result: isLocal
      }
    });
  }
}
