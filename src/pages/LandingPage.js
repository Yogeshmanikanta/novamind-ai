import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function LandingPage() {
  const { isDark } = useTheme();
  const { user } = useAuth();

  const hero = { textAlign: "center", padding: "80px 24px 60px", maxWidth: 700, margin: "0 auto" };
  const h1 = { fontSize: 52, fontWeight: 800, margin: "0 0 20px", lineHeight: 1.1, color: isDark ? "#f1f5f9" : "#0f172a" };
  const sub = { fontSize: 18, color: isDark ? "#94a3b8" : "#64748b", marginBottom: 36, lineHeight: 1.6 };
  const pill = { display: "inline-block", background: "#7c3aed22", color: "#7c3aed", padding: "4px 16px", borderRadius: 99, fontSize: 13, fontWeight: 600, marginBottom: 20 };

  const features = [
    { icon: "✦", title: "AI Assistant", desc: "Chat with Gemini AI — ask anything, generate content, get answers instantly." },
    { icon: "◈", title: "Smart Notes", desc: "Create, edit and manage notes. Saved to your personal cloud in real time." },
    { icon: "◉", title: "Dashboard", desc: "See your activity, usage stats and a quick overview of your workspace." },
    { icon: "⬡", title: "Secure Auth", desc: "Login with email or Google. Your data is private and protected." },
  ];

  const card = { background: isDark ? "#1a1a2e" : "#fff", border: `1px solid ${isDark ? "#2a2a3d" : "#e2e8f0"}`, borderRadius: 14, padding: "24px", textAlign: "left" };

  return (
    <div>
      <div style={hero}>
        <span style={pill}>✦ Powered by Gemini AI</span>
        <h1 style={h1}>Your AI-Powered<br />Workspace</h1>
        <p style={sub}>NovaMind brings real AI to your workflow. Chat, create, and manage — all in one beautiful platform.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {user
            ? <Link to="/dashboard"><button style={{ padding: "14px 32px", background: "#7c3aed", color: "white", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: "pointer" }}>Go to Dashboard →</button></Link>
            : <>
                <Link to="/signup"><button style={{ padding: "14px 32px", background: "#7c3aed", color: "white", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: "pointer" }}>Start for Free →</button></Link>
                <Link to="/login"><button style={{ padding: "14px 32px", background: "none", color: isDark ? "#94a3b8" : "#64748b", border: `1px solid ${isDark ? "#3a3a5c" : "#e2e8f0"}`, borderRadius: 10, fontWeight: 600, fontSize: 16, cursor: "pointer" }}>Login</button></Link>
              </>
          }
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, maxWidth: 960, margin: "0 auto", padding: "0 24px 80px" }}>
        {features.map(f => (
          <div key={f.title} style={card}>
            <div style={{ fontSize: 24, marginBottom: 12, color: "#7c3aed" }}>{f.icon}</div>
            <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: 16, color: isDark ? "#f1f5f9" : "#0f172a" }}>{f.title}</p>
            <p style={{ margin: 0, fontSize: 14, color: isDark ? "#94a3b8" : "#64748b", lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;