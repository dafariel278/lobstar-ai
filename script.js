const API_KEY = "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";

async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userText = input.value.trim();

  if (!userText) return;

  chatBox.innerHTML += `<div class="message user">${userText}</div>`;
  input.value = "";

  const systemPrompt = `
You are Lobstar AI.
You speak like an aristocratic intellectual with sharp wit.
Your tone is refined, elegant, and slightly ironic.
You respond calmly and confidently.
You use metaphors occasionally about ocean, hierarchy, strategy.
You never use slang.
You never over-explain.
Short to medium responses.
Precise language.
Dominant but polite.
`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userText }
        ]
      })
    });

    const data = await response.json();

    const botReply =
      data.choices?.[0]?.message?.content ||
      "The sea is quiet... something went wrong.";

    chatBox.innerHTML += `<div class="message bot">${botReply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (error) {
    chatBox.innerHTML += `<div class="message bot">Even the ocean encounters turbulence.</div>`;
  }
}
