import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const nav = {
    background: isDark ? "#12121e" : "#ffffff",
    borderBottom: `1px solid ${isDark ? "#2a2a3d" : "#e2e8f0"}`,
    padding: "0 32px", display: "flex", alignItems: "center",
    height: 64, position: "sticky", top: 0, zIndex: 100,
  };
  const logo = { fontWeight: 800, fontSize: 20, color: "#7c3aed", textDecoration: "none" };
  const linkS = { textDecoration: "none", fontSize: 14, color: isDark ? "#94a3b8" : "#64748b", padding: "6px 12px", borderRadius: 8 };
  const btn = (bg, c) => ({ padding: "8px 18px", borderRadius: 8, border: "none", background: bg, color: c, fontWeight: 600, cursor: "pointer", fontSize: 14 });

  return (
    <nav style={nav}>
      <Link to="/" style={logo}>✦ NovaMind</Link>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
        {user ? (
          <>
            <Link to="/dashboard" style={linkS}>Dashboard</Link>
            <Link to="/chat" style={linkS}>AI Chat</Link>
            <Link to="/notes" style={linkS}>Notes</Link>
            <Link to="/profile" style={linkS}>Profile</Link>
            <button onClick={handleLogout} style={btn("#fee2e2", "#991b1b")}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkS}>Login</Link>
            <Link to="/signup"><button style={btn("#7c3aed", "white")}>Get Started</button></Link>
          </>
        )}
        <button onClick={toggle} style={{ background: "none", border: `1px solid ${isDark ? "#3a3a5c" : "#e2e8f0"}`, borderRadius: 8, padding: "7px 12px", cursor: "pointer", fontSize: 16 }}>
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;