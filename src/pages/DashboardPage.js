import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useFirestore } from "../hooks/useFirestore";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";

function DashboardPage() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const { docs: notes } = useFirestore("notes");
  const { docs: chats } = useFirestore("chats");

  const chartData = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map(d => ({ day: d, notes: Math.floor(Math.random() * 5), chats: Math.floor(Math.random() * 8) }));
  }, []);

  const card = { background: isDark ? "#1a1a2e" : "#fff", border: `1px solid ${isDark ? "#2a2a3d" : "#e2e8f0"}`, borderRadius: 14, padding: "20px 24px" };
  const h = isDark ? "#f1f5f9" : "#0f172a";
  const s = isDark ? "#94a3b8" : "#64748b";

  const stats = [
    { label: "Total Notes", value: notes.length, color: "#7c3aed" },
    { label: "AI Chats", value: chats.length, color: "#0ea5e9" },
    { label: "Days Active", value: 7, color: "#10b981" },
    { label: "Words Written", value: notes.reduce((a, n) => a + (n.content?.split(" ").length || 0), 0), color: "#f59e0b" },
  ];

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ margin: "0 0 4px", fontSize: 26, fontWeight: 800, color: h }}>
          Good day, {user?.displayName?.split(" ")[0] || "there"} 👋
        </h1>
        <p style={{ margin: 0, color: s, fontSize: 15 }}>Here's what's happening in your workspace today.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 24 }}>
        {stats.map(st => (
          <div key={st.label} style={{ ...card, textAlign: "center" }}>
            <p style={{ margin: "0 0 8px", fontSize: 13, color: s }}>{st.label}</p>
            <p style={{ margin: 0, fontSize: 32, fontWeight: 800, color: st.color }}>{st.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
        <div style={card}>
          <p style={{ margin: "0 0 16px", fontWeight: 700, color: h }}>Weekly activity</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: s }} />
              <YAxis tick={{ fontSize: 12, fill: s }} />
              <Tooltip />
              <Bar dataKey="notes" fill="#7c3aed" radius={[4,4,0,0]} name="Notes" />
              <Bar dataKey="chats" fill="#0ea5e9" radius={[4,4,0,0]} name="AI Chats" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Link to="/chat" style={{ textDecoration: "none" }}>
            <div style={{ ...card, background: "#7c3aed", border: "none", cursor: "pointer" }}>
              <p style={{ margin: "0 0 4px", fontWeight: 700, color: "white", fontSize: 15 }}>✦ Ask AI</p>
              <p style={{ margin: 0, color: "#c4b5fd", fontSize: 13 }}>Open AI chat assistant</p>
            </div>
          </Link>
          <Link to="/notes" style={{ textDecoration: "none" }}>
            <div style={{ ...card, cursor: "pointer" }}>
              <p style={{ margin: "0 0 4px", fontWeight: 700, color: h, fontSize: 15 }}>◈ New Note</p>
              <p style={{ margin: 0, color: s, fontSize: 13 }}>Create a smart note</p>
            </div>
          </Link>
        </div>
      </div>

      {notes.length > 0 && (
        <div style={card}>
          <p style={{ margin: "0 0 14px", fontWeight: 700, color: h }}>Recent notes</p>
          {notes.slice(0, 3).map(n => (
            <div key={n.id} style={{ padding: "10px 0", borderBottom: `1px solid ${isDark ? "#2a2a3d" : "#f1f5f9"}` }}>
              <p style={{ margin: "0 0 2px", fontWeight: 600, fontSize: 14, color: h }}>{n.title}</p>
              <p style={{ margin: 0, fontSize: 13, color: s }}>{n.content?.substring(0, 80)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;