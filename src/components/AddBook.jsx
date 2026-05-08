// AddBook.jsx
import { useState } from "react";
import { createBook } from "../utils/api";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("");

  const addBook = async () => {
    const t = title.trim();
    const a = author.trim();
    if (!t || !a) {
      setStatus("Title and Author required.");
      return;
    }

    await createBook({
      title: t,
      author: a,
      condition: "Good",
      pointsValue: 10,
      history: [],
    });

    setTitle("");
    setAuthor("");
    setStatus("Added.");
    setTimeout(() => setStatus(""), 1200);
  };

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 420 }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
      />
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
      />
      <button
        onClick={addBook}
        style={{
          padding: 10,
          borderRadius: 10,
          border: "none",
          background: "#111827",
          color: "#fff",
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        Add Book
      </button>
      {status && <small style={{ color: "#6b7280" }}>{status}</small>}
    </div>
  );
}
