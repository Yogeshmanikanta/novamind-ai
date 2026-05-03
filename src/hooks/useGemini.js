import { useState, useCallback } from "react";

export function useGemini() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = useCallback(async (prompt) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      return data.reply || "No reply.";
    } catch (e) {
      setError(e.message);
      return "Network error.";
    } finally {
      setLoading(false);
    }
  }, []);

  return { generate, loading, error };
}