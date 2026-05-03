export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { prompt } = req.body;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://novamind-ai.vercel.app",
      "X-Title": "NovaMind AI"
    },
    body: JSON.stringify({
      model: "openrouter/free",
      messages: [
        { role: "system", content: "You are NovaMind, a helpful AI assistant." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "No reply.";
  res.status(200).json({ reply });
}