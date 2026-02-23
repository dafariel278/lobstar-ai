async function sendMessage() {
  const input = document.getElementById("input");
  const output = document.getElementById("output");

  const message = input.value.trim();
  if (!message) return;

  output.innerHTML = "Thinking...";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    if (data.reply) {
      output.innerHTML = data.reply;
    } else {
      output.innerHTML = "No response from server.";
    }

  } catch (error) {
    console.error(error);
    output.innerHTML = "Connection error.";
  }
}
