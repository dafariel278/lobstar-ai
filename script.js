const API_KEY = "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";

async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userText = input.value;

  if (!userText) return;

  chatBox.innerHTML += `<div class="message user">${userText}</div>`;
  input.value = "";

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are Lobstar AI. You speak like an aristocratic intellectual..."
        },
        {
          role: "user",
          content: userText
        }
      ]
    })
  });

  const data = await response.json();
  const botReply = data.choices[0].message.content;

  chatBox.innerHTML += `<div class="message bot">${botReply}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}
