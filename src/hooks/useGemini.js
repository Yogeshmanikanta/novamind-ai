import { useState, useCallback } from "react";

export function useGemini() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = useCallback(async (prompt) => {
    console.log("generate() called with:", prompt);

    const API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;
    console.log("API key present:", !!API_KEY);

    if (!API_KEY) {
      setError("API key missing.");
      return "Error: No API key found. Check your .env file and restart the server.";
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "NovaMind AI"
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [
            {
              role: "system",
              content: "You are NovaMind, a helpful AI assistant. Be concise, friendly and helpful."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        }),
      });

      console.log("HTTP status:", res.status);
      const data = await res.json();
      console.log("AI response data:", data);

      if (!res.ok) {
        const msg = data?.error?.message || "API error";
        setError(msg);
        return `Error: ${msg}`;
      }

      return data.choices?.[0]?.message?.content || "No reply from AI.";

    } catch (e) {
      console.error("Fetch failed:", e);
      setError(e.message);
      return "Network error. Check your internet connection.";
    } finally {
      setLoading(false);
    }
  }, []);

  return { generate, loading, error };
}