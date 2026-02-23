async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const message = input.value.trim();
  if (!message) return;

  const userDiv = document.createElement("div");
  userDiv.className = "message user";
  userDiv.textContent = message;
  chatBox.appendChild(userDiv);

  input.value = "";

  const aiDiv = document.createElement("div");
  aiDiv.className = "message ai";
  aiDiv.textContent = "Thinking...";
  chatBox.appendChild(aiDiv);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    aiDiv.textContent = data.reply;

  } catch {
    aiDiv.textContent = "Connection error.";
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
