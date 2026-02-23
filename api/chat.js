export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env.HF_TOKEN) {
      return res.status(500).json({ reply: "HF token not found." });
    }

    const { message } = req.body;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-large",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: message
        })
      }
    );

    const result = await response.json();

    let reply = "No response.";

    if (Array.isArray(result) && result[0]?.generated_text) {
      reply = result[0].generated_text;
    }

    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({ reply: error.message });
  }
}
