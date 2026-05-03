import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function ProfilePage() {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const [name, setName] = useState(user?.displayName || "");
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await updateProfile(auth.currentUser, { displayName: name });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const card = { background: isDark ? "#1a1a2e" : "#fff", border: `1px solid ${isDark ? "#2a2a3d" : "#e2e8f0"}`, borderRadius: 16, padding: "28px 32px", maxWidth: 500 };
  const inp = { width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${isDark ? "#3a3a5c" : "#e2e8f0"}`, background: isDark ? "#0f0f1c" : "#f8fafc", color: isDark ? "#e2e8f0" : "#1a202c", fontSize: 14, boxSizing: "border-box", marginTop: 6 };
  const h = isDark ? "#f1f5f9" : "#0f172a";
  const s = isDark ? "#94a3b8" : "#64748b";

  return (
    <div style={{ padding: "28px 32px" }}>
      <h1 style={{ margin: "0 0 24px", fontSize: 26, fontWeight: 800, color: h }}>⬡ Profile</h1>

      <div style={card}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: "white" }}>
            {user?.displayName?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 17, color: h }}>{user?.displayName || "User"}</p>
            <p style={{ margin: 0, fontSize: 14, color: s }}>{user?.email}</p>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: s }}>Display Name</label>
          <input style={inp} value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: s }}>Email</label>
          <input style={{ ...inp, opacity: 0.6 }} value={user?.email || ""} disabled />
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={handleSave} style={{ padding: "10px 24px", background: "#7c3aed", color: "white", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>
            {saved ? "Saved!" : "Save Changes"}
          </button>
          <button onClick={logout} style={{ padding: "10px 24px", background: "#fee2e2", color: "#991b1b", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;