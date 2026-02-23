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

  // Add temporary thinking message
  const thinkingMessage = document.createElement("div");
  thinkingMessage.className = "message ai";
  thinkingMessage.textContent = "Thinking...";
  chatBox.appendChild(thinkingMessage);

  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    thinkingMessage.textContent = data.reply || "No response.";

  } catch (error) {
    console.error(error);
    thinkingMessage.textContent = "Connection error.";
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
