export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.CF_API_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "Answer clearly and simply in English." },
            { role: "user", content: message }
          ]
        })
      }
    );

    const data = await response.json();

    return res.status(200).json({
      reply: data.result?.response || "AI error."
    });

  } catch (error) {
    return res.status(500).json({ reply: "Server error." });
  }
}
