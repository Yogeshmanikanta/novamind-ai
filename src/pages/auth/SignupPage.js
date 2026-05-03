import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true); setError("");
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message.includes("email-already-in-use") ? "Email already in use." : "Signup failed. Try again.");
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch { setError("Google sign-in failed."); }
  };

  const box = { maxWidth: 420, margin: "60px auto", padding: "0 24px" };
  const card = { background: isDark ? "#1a1a2e" : "#fff", border: `1px solid ${isDark ? "#2a2a3d" : "#e2e8f0"}`, borderRadius: 16, padding: "36px 32px" };
  const inp = { width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${isDark ? "#3a3a5c" : "#e2e8f0"}`, background: isDark ? "#0f0f1c" : "#f8fafc", color: isDark ? "#e2e8f0" : "#1a202c", fontSize: 14, boxSizing: "border-box", marginTop: 6 };
  const lbl = { fontSize: 13, fontWeight: 500, color: isDark ? "#94a3b8" : "#475569" };

  return (
    <div style={box}>
      <div style={card}>
        <h2 style={{ margin: "0 0 6px", fontSize: 24, fontWeight: 800, color: isDark ? "#f1f5f9" : "#0f172a" }}>Create account</h2>
        <p style={{ margin: "0 0 28px", color: isDark ? "#94a3b8" : "#64748b", fontSize: 14 }}>Join NovaMind — it's free forever</p>

        {error && <div style={{ background: "#fee2e2", color: "#991b1b", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 16 }}>{error}</div>}

        <button onClick={handleGoogle} style={{ width: "100%", padding: "11px", borderRadius: 8, border: `1px solid ${isDark ? "#3a3a5c" : "#e2e8f0"}`, background: isDark ? "#1e1e3a" : "#f8fafc", cursor: "pointer", fontWeight: 600, fontSize: 14, color: isDark ? "#e2e8f0" : "#1a202c", marginBottom: 20 }}>
          Sign up with Google
        </button>

        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Full Name</label>
            <input style={inp} value={name} onChange={e => setName(e.target.value)} placeholder="Yogesh Manikanta" required />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Email</label>
            <input style={inp} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" required />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={lbl}>Password</label>
            <input style={inp} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters" required />
          </div>
          <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px", background: "#7c3aed", color: "white", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: isDark ? "#64748b" : "#94a3b8" }}>
          Already have an account? <Link to="/login" style={{ color: "#7c3aed", fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;