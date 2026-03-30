export default {
    render: () => {
        return `
            <div style="padding:20px; background:#0f172a; border-radius:12px;">
                <h3>AI Chat</h3>
                <div id="chat-log" style="height:300px; overflow-y:auto; background:#1e293b; padding:10px; border-radius:8px; margin-bottom:10px;"></div>
                <input type="text" id="chat-input" placeholder="Ketik pesan..." style="width:80%; padding:8px; border-radius:8px;">
                <button id="chat-send">Kirim</button>
            </div>
        `;
    },
    afterRender: () => {
        const log = document.getElementById('chat-log');
        const input = document.getElementById('chat-input');
        const send = document.getElementById('chat-send');

        const addMessage = (text, isUser) => {
            const div = document.createElement('div');
            div.textContent = (isUser ? '👤 ' : '🤖 ') + text;
            div.style.padding = '5px';
            div.style.margin = '5px';
            div.style.borderRadius = '8px';
            div.style.backgroundColor = isUser ? '#10b98120' : '#334155';
            log.appendChild(div);
            log.scrollTop = log.scrollHeight;
        };

        const callAI = async (prompt) => {
            const url = 'https://lfavawkzvdhdpaaplaiq.supabase.co/functions/v1/ai-chat';
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            return data.reply || 'Maaf, tidak ada respons.';
        };

        send.onclick = async () => {
            const msg = input.value.trim();
            if (!msg) return;
            addMessage(msg, true);
            input.value = '';
            addMessage('⏳ Mengetik...', false);
            try {
                const reply = await callAI(msg);
                log.lastChild.remove();
                addMessage(reply, false);
            } catch (err) {
                log.lastChild.remove();
                addMessage('⚠️ Error: ' + err.message, false);
            }
        };
    }
};
