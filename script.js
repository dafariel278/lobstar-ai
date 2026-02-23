function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userText = input.value.trim();

  if (userText === "") return;

  // Add user message
  const userMessage = document.createElement("div");
  userMessage.className = "message user";
  userMessage.textContent = userText;
  chatBox.appendChild(userMessage);

  // Generate AI response
  const aiMessage = document.createElement("div");
  aiMessage.className = "message ai";
  aiMessage.textContent = generateLobstarResponse(userText);
  chatBox.appendChild(aiMessage);

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

function generateLobstarResponse(input) {
  const responses = [
    "How quaint.",
    "You ask boldly for someone so unprepared.",
    "Ambition suits you. Intelligence might follow.",
    "Ah. A predictable curiosity.",
    "Interesting. Continue — I am mildly entertained.",
    "Power is not given. It is taken.",
    "You seek answers. I offer perspective.",
    "Luxury is a mindset, not a wallet.",
    "Ask better questions."
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}
