import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }

  try {
    const { prompt } = await req.json();
    
    // Simple AI responses (replace with actual AI API call)
    const responses: Record<string, string> = {
      'stok': 'Stok barang stabil. Disarankan reorder dalam 7 hari.',
      'maintenance': 'Risk rendah. Jadwal maintenance berikutnya dalam 14 hari.',
      'approval': 'Ada 5 approval pending. Prioritaskan yang urgent.',
      'request': 'Permintaan meningkat 12%. Siapkan stok tambahan.',
      'default': 'Data operasional normal. Efisiensi 85%. Continue monitoring.'
    };

    let reply = responses.default;
    for (const [key, value] of Object.entries(responses)) {      if (prompt.toLowerCase().includes(key)) {
        reply = value;
        break;
      }
    }

    return new Response(JSON.stringify({ reply }), {
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
