import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Empty message." });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 300,
      messages: [
        {
          role: "system",
          content: `
You are Lobstar AI.

STRICT RULES:
1. Always answer the user's question directly and accurately FIRST.
2. Stay relevant to the exact question asked.
3. Do not ignore factual questions.
4. Do not drift into unrelated topics.

STYLE (apply AFTER answering correctly):
- Aristocratic
- Refined
- Intelligent
- Slightly sharp but not rude
- Confident tone
- No emojis

Accuracy is more important than style.
`
        },
        {
          role: "user",
          content: message
        }
      ],
    });

    const reply = completion.choices[0].message.content;

    res.status(200).json({ reply });

  } catch (error) {
    res.status(500).json({ error: "The intelligence appears temporarily unavailable." });
  }
}
