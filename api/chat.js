export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
    const API_TOKEN = process.env.CF_API_TOKEN;

    if (!ACCOUNT_ID || !API_TOKEN) {
      return res.status(500).json({ reply: "Missing API credentials." });
    }

    const { message } = req.body;

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are Lobstar AI. Respond in English clearly and accurately."
            },
            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!data.success) {
      return res.status(500).json({ reply: "AI error." });
    }

    return res.status(200).json({
      reply: data.result.response
    });

  } catch (error) {
    return res.status(500).json({ reply: "Server error." });
  }
}
