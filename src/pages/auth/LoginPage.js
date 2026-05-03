import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err) {
      setError("Google sign-in failed. Try again.");
    }
  };

  const box = { maxWidth: 420, margin: "60px auto", padding: "0 24px" };
  const card = { background: isDark ? "#1a1a2e" : "#fff", border: `1px solid ${isDark ? "#2a2a3d" : "#e2e8f0"}`, borderRadius: 16, padding: "36px 32px" };
  const inp = { width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${isDark ? "#3a3a5c" : "#e2e8f0"}`, background: isDark ? "#0f0f1c" : "#f8fafc", color: isDark ? "#e2e8f0" : "#1a202c", fontSize: 14, boxSizing: "border-box", marginTop: 6 };
  const lbl = { fontSize: 13, fontWeight: 500, color: isDark ? "#94a3b8" : "#475569" };

  return (
    <div style={box}>
      <div style={card}>
        <h2 style={{ margin: "0 0 6px", fontSize: 24, fontWeight: 800, color: isDark ? "#f1f5f9" : "#0f172a" }}>Welcome back</h2>
        <p style={{ margin: "0 0 28px", color: isDark ? "#94a3b8" : "#64748b", fontSize: 14 }}>Sign in to your NovaMind account</p>

        {error && <div style={{ background: "#fee2e2", color: "#991b1b", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 16 }}>{error}</div>}

        <button onClick={handleGoogle} style={{ width: "100%", padding: "11px", borderRadius: 8, border: `1px solid ${isDark ? "#3a3a5c" : "#e2e8f0"}`, background: isDark ? "#1e1e3a" : "#f8fafc", cursor: "pointer", fontWeight: 600, fontSize: 14, color: isDark ? "#e2e8f0" : "#1a202c", marginBottom: 20 }}>
          Continue with Google
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: isDark ? "#2a2a3d" : "#e2e8f0" }} />
          <span style={{ fontSize: 12, color: isDark ? "#4a4a6a" : "#94a3b8" }}>or</span>
          <div style={{ flex: 1, height: 1, background: isDark ? "#2a2a3d" : "#e2e8f0" }} />
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={lbl}>Email</label>
            <input style={inp} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" required />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={lbl}>Password</label>
            <input style={inp} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px", background: "#7c3aed", color: "white", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: isDark ? "#64748b" : "#94a3b8" }}>
          No account? <Link to="/signup" style={{ color: "#7c3aed", fontWeight: 600 }}>Sign up free</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;