// Load WebLLM
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm/dist/index.js";
document.head.appendChild(script);

let engine;

script.onload = async () => {
  engine = new webllm.MLCEngine();
  await engine.reload("Llama-3-8B-Instruct-q4f32_1");
  console.log("Model Loaded");
};

async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const message = input.value.trim();
  if (!message) return;

  // Add user message
  const userMessage = document.createElement("div");
  userMessage.className = "message user";
  userMessage.textContent = message;
  chatBox.appendChild(userMessage);

  input.value = "";

  // Add thinking message
  const thinkingMessage = document.createElement("div");
  thinkingMessage.className = "message ai";
  thinkingMessage.textContent = "Thinking...";
  chatBox.appendChild(thinkingMessage);

  chatBox.scrollTop = chatBox.scrollHeight;

  if (!engine) {
    thinkingMessage.textContent = "Model still loading. Please wait...";
    return;
  }

  try {
    const reply = await engine.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are Lobstar AI. Respond in English only. Be witty, aristocratic, confident, and sharp. No emojis."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    thinkingMessage.textContent =
      reply.choices[0].message.content;

  } catch (error) {
    thinkingMessage.textContent = "Error generating response.";
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
