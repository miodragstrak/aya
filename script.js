document.getElementById('sendBtn').addEventListener('click', () => {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (message) {
    const chatBox = document.getElementById('chatMessages');
    const userMsg = document.createElement('div');
    userMsg.textContent = "You: " + message;
    chatBox.appendChild(userMsg);
    input.value = "";

    fetch('https://your-n8n-webhook-url.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    })
    .then(response => response.json())
    .then(data => {
      const aiMsg = document.createElement('div');
      aiMsg.textContent = "AYA: " + (data.reply || "Thank you, we will get back to you!");
      chatBox.appendChild(aiMsg);
    });
  }
});