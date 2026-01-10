// BookDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBook, updateBook } from "../utils/fakeApi";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    let alive = true;
    getBook(id).then((b) => {
      if (alive) setBook(b);
    });
    return () => {
      alive = false;
    };
  }, [id]);

  const addHistory = async () => {
    const n = note.trim();
    if (!n || !book) return;

    const nextHistory = [
      ...(book.history || []),
      { note: n, city: "Unknown", date: new Date().toLocaleDateString() },
    ];

    const updated = await updateBook(id, { history: nextHistory });
    setBook(updated);
    setNote("");
    setStatus("Saved.");
    setTimeout(() => setStatus(""), 1200);
  };

  if (!book) return <p className="container">Not found.</p>;

  return (
    <div className="container">
      <div className="card">
        <h1>{book.title}</h1>
        <p style={{ color: "var(--text-soft)" }}>by {book.author}</p>

        <span style={badge}>Book ID: {book.id}</span>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <h2>Book History</h2>

        {(!book.history || book.history.length === 0) && (
          <p style={{ color: "var(--text-soft)" }}>
            No history yet. You are the first reader.
          </p>
        )}

        {book.history?.map((entry, index) => (
          <div key={index} style={historyItem}>
            <strong>{entry.city}</strong>
            <p>{entry.note}</p>
            <small>{entry.date}</small>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <h3>Add Your Reading Entry</h3>
        <textarea
          placeholder="Thoughts, notes, or tips for next reader…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={textarea}
        />
        <button onClick={addHistory}>Add to History</button>
        {status && <small style={{ color: "var(--text-soft)" }}>{status}</small>}
      </div>
    </div>
  );
}

const badge = {
  display: "inline-block",
  marginTop: 10,
  background: "#e0f2fe",
  color: "#0369a1",
  padding: "4px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
};

const historyItem = {
  borderLeft: "3px solid #ec4899",
  paddingLeft: 12,
  marginTop: 16,
};

const textarea = {
  width: "100%",
  minHeight: 80,
  padding: 10,
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  marginBottom: 12,
};
