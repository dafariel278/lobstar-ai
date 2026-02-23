import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ reply: "API key not found." });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "No message provided." });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are Lobstar AI.
Respond in English only.
Witty, aristocratic, confident.
No emojis.
Short-medium length.
Answer clearly and sharply.
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.9,
    });

    return res.status(200).json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error("API ERROR:", error);

    return res.status(500).json({
      reply: error.message || "Unknown error",
      fullError: JSON.stringify(error)
    });
  }
}
