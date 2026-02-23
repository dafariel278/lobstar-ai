async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const message = input.value.trim();
  if (!message) return;

  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.textContent = message;
  chatBox.appendChild(userMsg);

  input.value = "";

  const aiMsg = document.createElement("div");
  aiMsg.className = "message ai";
  aiMsg.textContent = "Thinking...";
  chatBox.appendChild(aiMsg);

  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    aiMsg.textContent = data.reply;

  } catch {
    aiMsg.textContent = "Connection error.";
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
