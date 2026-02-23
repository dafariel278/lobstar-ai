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
      "https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `<s>[INST] ${message} [/INST]`,
          options: { wait_for_model: true }
        })
      }
    );

    const text = await response.text();

    // Coba parse JSON dengan aman
    let result;
    try {
      result = JSON.parse(text);
    } catch {
      return res.status(500).json({ reply: text });
    }

    let reply = "No response.";

    if (Array.isArray(result) && result[0]?.generated_text) {
      reply = result[0].generated_text;
    } else if (result.error) {
      reply = result.error;
    }

    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({ reply: error.message });
  }
}
