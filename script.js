document.getElementById('sendBtn').addEventListener('click', async () => {
  const input = document.getElementById('chatInput');
  const chatBox = document.getElementById('chatMessages');
  const message = input.value.trim();

  if (!message) return;

  // Show user message
  const userMsg = document.createElement('div');
  userMsg.className = 'message user';
  userMsg.textContent = "You: " + message;
  chatBox.appendChild(userMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  input.value = "";

  try {
    const response = await fetch('https://mstrak.app.n8n.cloud/webhook-test/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    const aiMsg = document.createElement('div');
    aiMsg.className = 'message ai';
    aiMsg.textContent = "AYA: " + (data.reply || "Thank you! We will follow up soon.");
    chatBox.appendChild(aiMsg);
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (error) {
    const errorMsg = document.createElement('div');
    errorMsg.className = 'message error';
    errorMsg.textContent = "Error: could not reach our team.";
    chatBox.appendChild(errorMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
    console.error("Chat fetch error:", error);
  }
});
