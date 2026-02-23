export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ reply: "API key not found." });
    }

    const { message } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role: "system",
            content: "You are Lobstar AI. Respond in English. Witty, aristocratic, confident."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    const reply =
      data.choices?.[0]?.message?.content || "No response.";

    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({ reply: error.message });
  }
}
