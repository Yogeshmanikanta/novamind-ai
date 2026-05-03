
import { useState, useRef, useEffect } from "react";
import { useGemini } from "../hooks/useGemini";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "model", text: "Hi! I'm your AI assistant powered by Gemini. Ask me anything — I can help with writing, coding, analysis, and more." }
  ]);
  const [input, setInput] = useState("");
  const { generate, loading } = useGemini();
  const { isDark } = useTheme();
  const { user } = useAuth();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", text: input };
    const history = messages.filter(m => m.role !== "model" || messages.indexOf(m) > 0);
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    const reply = await generate(input, history);
    if (reply) {
      setMessages(prev => [...prev, { role: "model", text: reply }]);
    }
  };

  const wrap = { display: "flex", flexDirection: "column", height: "calc(100vh - 64px)" };
  const chatArea = { flex: 1, overflowY: "auto", padding: "24px 32px", maxWidth: 780, margin: "0 auto", width: "100%" };
  const inputArea = { borderTop: `1px solid ${isDark ? "#2a2a3d" : "#e2e8f0"}`, padding: "16px 32px", background: isDark ? "#12121e" : "#fff" };

  const bubble = (isUser) => ({
    maxWidth: "75%", padding: "12px 16px", borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
    background: isUser ? "#7c3aed" : isDark ? "#1a1a2e" : "#f1f5f9",
    color: isUser ? "white" : isDark ? "#e2e8f0" : "#1a202c",
    fontSize: 14, lineHeight: 1.6, alignSelf: isUser ? "flex-end" : "flex-start",
    border: isUser ? "none" : `1px solid ${isDark ? "#2a2a3d" : "#e2e8f0"}`,
    whiteSpace: "pre-wrap",
  });

  return (
    <div style={wrap}>
      <div style={chatArea}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              {m.role === "model" && (
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, marginRight: 8, flexShrink: 0 }}>✦</div>
              )}
              <div style={bubble(m.role === "user")}>{m.text}</div>
              {m.role === "user" && (
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#0ea5e9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white", marginLeft: 8, flexShrink: 0 }}>
                  {user?.displayName?.[0] || "Y"}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✦</div>
              <div style={{ ...bubble(false), color: isDark ? "#64748b" : "#94a3b8" }}>Thinking...</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <div style={inputArea}>
        <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", gap: 10 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Ask NovaMind anything..."
            style={{ flex: 1, padding: "12px 16px", borderRadius: 10, border: `1px solid ${isDark ? "#3a3a5c" : "#e2e8f0"}`, background: isDark ? "#1a1a2e" : "#f8fafc", color: isDark ? "#e2e8f0" : "#1a202c", fontSize: 14 }}
          />
          <button onClick={handleSend} disabled={loading || !input.trim()} style={{ padding: "12px 24px", background: "#7c3aed", color: "white", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
            Send →
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;