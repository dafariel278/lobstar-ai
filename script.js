// Load WebLLM script
const webllmScript = document.createElement("script");
webllmScript.src = "https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm/dist/index.js";
document.head.appendChild(webllmScript);

let engine;
let modelReady = false;

// Initialize model
webllmScript.onload = async () => {
  try {
    engine = new webllm.MLCEngine();

    // 🔥 Model ringan & lebih cepat
    await engine.reload("TinyLlama-1.1B-Chat-v1.0-q4f16_1");

    modelReady = true;
    console.log("TinyLlama model loaded successfully.");
  } catch (err) {
    console.error("Model load error:", err);
  }
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

  // Add AI placeholder
  const aiMessage = document.createElement("div");
  aiMessage.className = "message ai";
  aiMessage.textContent = modelReady
    ? "Thinking..."
    : "Model loading... please wait.";
  chatBox.appendChild(aiMessage);

  chatBox.scrollTop = chatBox.scrollHeight;

  if (!modelReady) return;

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
      ],
      temperature: 0.8,
      max_tokens: 200
    });

    aiMessage.textContent = reply.choices[0].message.content;
  } catch (error) {
    aiMessage.textContent = "Error generating response.";
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
