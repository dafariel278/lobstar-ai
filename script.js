function generateResponse(message) {
  const text = message.toLowerCase();

  // What is artificial intelligence?
  if (text.includes("what is artificial intelligence")) {
    return "Artificial intelligence is the simulation of human intelligence in machines that can think, learn, and solve problems.";
  }

  // Who is Albert Einstein?
  if (text.includes("who is albert einstein")) {
    return "Albert Einstein was a theoretical physicist best known for developing the theory of relativity and the equation E = mc².";
  }

  // What is the capital of Japan?
  if (text.includes("capital of japan")) {
    return "The capital of Japan is Tokyo.";
  }

  // Explain quantum physics simply.
  if (text.includes("quantum physics")) {
    return "Quantum physics studies how very tiny particles behave. At this level, particles can act both like waves and particles, and their behavior can be unpredictable.";
  }

  // What is blockchain?
  if (text.includes("what is blockchain")) {
    return "Blockchain is a secure digital ledger that records transactions across many computers so that the data cannot easily be changed.";
  }

  // How does the internet work?
  if (text.includes("how does the internet work")) {
    return "The internet works by connecting computers worldwide through networks. Data is broken into small packets and sent between devices using communication protocols.";
  }

  // Write a poem about the ocean.
  if (text.includes("poem about the ocean")) {
    return "The ocean whispers in silver light,\nWaves that shimmer through the night.\nEndless blue both calm and wild,\nNature’s vast and restless child.";
  }

  // Create a short story about a king.
  if (text.includes("short story about a king")) {
    return "Once there was a wise king who ruled with fairness and courage. Instead of ruling by fear, he listened to his people, and his kingdom flourished in peace and prosperity.";
  }

  // Invent a philosophy called Lobstarism.
  if (text.includes("lobstarism")) {
    return "Lobstarism is a philosophy of growth through challenge. Like a lobster that sheds its shell to grow, people must embrace discomfort to become stronger and wiser.";
  }

  // If I earn $100 per day, how much per year?
  if (text.includes("100 per day") && text.includes("year")) {
    return "If you earn $100 per day, you earn $36,500 per year (100 × 365).";
  }

  // What is 25 × 16?
  if (text.includes("25") && text.includes("16")) {
    return "25 × 16 equals 400.";
  }

  return "I am a demo AI. I can answer selected predefined questions for demonstration purposes.";
}

function sendMessage() {
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

  setTimeout(() => {
    aiDiv.textContent = generateResponse(message);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 500);
}
