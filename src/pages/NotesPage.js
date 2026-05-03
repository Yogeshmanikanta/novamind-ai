import { useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { useTheme } from "../context/ThemeContext";

function NotesPage() {
  const { docs: notes, addDocument, deleteDocument, loading } = useFirestore("notes");
  const { isDark } = useTheme();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");

  const handleAdd = async () => {
    if (!title.trim()) return;
    await addDocument({ title, content });
    setTitle(""); setContent("");
  };

  const filtered = notes.filter(n =>
    n.title?.toLowerCase().includes(search.toLowerCase()) ||
    n.content?.toLowerCase().includes(search.toLowerCase())
  );

  const card = { background: isDark ? "#1a1a2e" : "#fff", border: `1px solid ${isDark ? "#2a2a3d" : "#e2e8f0"}`, borderRadius: 12, padding: "20px" };
  const inp = { width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${isDark ? "#3a3a5c" : "#e2e8f0"}`, background: isDark ? "#0f0f1c" : "#f8fafc", color: isDark ? "#e2e8f0" : "#1a202c", fontSize: 14, boxSizing: "border-box" };
  const h = isDark ? "#f1f5f9" : "#0f172a";
  const s = isDark ? "#94a3b8" : "#64748b";

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1000, margin: "0 auto" }}>
      <h1 style={{ margin: "0 0 24px", fontSize: 26, fontWeight: 800, color: h }}>◈ My Notes</h1>

      <div style={{ ...card, marginBottom: 20 }}>
        <p style={{ margin: "0 0 14px", fontWeight: 700, color: h }}>Create new note</p>
        <input style={{ ...inp, marginBottom: 10 }} placeholder="Note title..." value={title} onChange={e => setTitle(e.target.value)} />
        <textarea style={{ ...inp, minHeight: 100, resize: "vertical", marginBottom: 14 }} placeholder="Write your note here..." value={content} onChange={e => setContent(e.target.value)} />
        <button onClick={handleAdd} style={{ padding: "10px 24px", background: "#7c3aed", color: "white", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>
          + Save Note
        </button>
      </div>

      <input style={{ ...inp, marginBottom: 20 }} placeholder="Search notes..." value={search} onChange={e => setSearch(e.target.value)} />

      {loading ? (
        <p style={{ color: s, textAlign: "center" }}>Loading notes...</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: s, textAlign: "center" }}>No notes yet. Create your first one above!</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {filtered.map(note => (
            <div key={note.id} style={card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: h, flex: 1 }}>{note.title}</p>
                <button onClick={() => deleteDocument(note.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: 16, padding: 0, marginLeft: 8 }}>✕</button>
              </div>
              <p style={{ margin: "0 0 12px", fontSize: 13, color: s, lineHeight: 1.6 }}>{note.content?.substring(0, 150)}{note.content?.length > 150 ? "..." : ""}</p>
              <p style={{ margin: 0, fontSize: 11, color: isDark ? "#3a3a5c" : "#cbd5e1" }}>
                {note.createdAt?.toDate?.()?.toLocaleDateString() || "Just now"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotesPage;