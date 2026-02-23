export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method Not Allowed" });
  }

  try {
    const { message } = req.body || {};

    if (!message) {
      return res.status(400).json({ reply: "No message provided." });
    }

    const text = message.toLowerCase();
    let reply = "";

    if (text.includes("artificial intelligence")) {
      reply = "Artificial Intelligence is the science of building systems capable of reasoning, learning, and making decisions. Power lies in intelligence.";
    } 
    else if (text.includes("who are you")) {
      reply = "I am Lobstar AI — an aristocratic intelligence built to respond with precision.";
    }
    else if (text.includes("indonesia")) {
      reply = "Indonesia is a sovereign nation in Southeast Asia, composed of more than 17,000 islands.";
    }
    else {
      reply = `You said: "${message}". Lobstar acknowledges your words. Ask with clarity for greater answers.`;
    }

    return res.status(200).json({ reply });

  } catch (error) {
    console.error("Function error:", error);
    return res.status(500).json({ reply: "Server error occurred." });
  }
}
