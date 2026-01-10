import { useMemo, useState } from "react";
import { createBook, listBooks } from "../utils/fakeApi";
import MapView from "./MapView";

export default function Dashboard() {
  const [books, setBooks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("books_exchange_books_v1") || "[]");
    } catch {
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [condition, setCondition] = useState("Good");

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [query, setQuery] = useState("");
  const [condFilter, setCondFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const pointsFromCondition = (c) => (c === "New" ? 15 : c === "Worn" ? 5 : 10);

  const validateForm = () => {
    const t = title.trim();
    const a = author.trim();
    if (!t || !a) return "Title and Author are required.";
    if (t.length < 2) return "Title is too short.";
    if (a.length < 2) return "Author is too short.";
    return "";
  };

  const addBook = async () => {
    setFormError("");
    const v = validateForm();
    if (v) {
      setFormError(v);
      return;
    }

    setSaving(true);

    try {
      const newBook = {
        title: title.trim(),
        author: author.trim(),
        condition,
        pointsValue: pointsFromCondition(condition),
        history: [
          {
            event: "Book added to exchange",
            date: new Date().toLocaleDateString(),
          },
        ],
      };

      await createBook(newBook);
      const data = await listBooks();
      setBooks(data);

      setTitle("");
      setAuthor("");
      setCondition("Good");
    } finally {
      setSaving(false);
    }
  };

  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setCondition("Good");
    setFormError("");
  };

  const filteredBooks = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = [...books];

    if (q) {
      list = list.filter((b) => {
        const t = (b.title || "").toLowerCase();
        const a = (b.author || "").toLowerCase();
        return t.includes(q) || a.includes(q);
      });
    }

    if (condFilter !== "All") {
      list = list.filter((b) => b.condition === condFilter);
    }

    if (sortBy === "title") {
      list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else if (sortBy === "points") {
      list.sort((a, b) => (b.pointsValue || 0) - (a.pointsValue || 0));
    }

    return list;
  }, [books, query, condFilter, sortBy]);

  const badgeStyleFor = (c) => {
    if (c === "New") return { background: "#dcfce7", color: "#166534" };
    if (c === "Worn") return { background: "#fee2e2", color: "#991b1b" };
    return { background: "#e0e7ff", color: "#3730a3" };
  };

  const copyQRPayload = async (book) => {
    const payload = JSON.stringify({
      type: "booksexchange",
      id: book.id,
      title: book.title,
      author: book.author,
    });

    try {
      await navigator.clipboard.writeText(payload);
      alert("Copied.");
    } catch {
      alert("Could not copy.");
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.h1}>BooksExchange</h1>
        <p style={styles.subtitle}>
          Give books • Earn points • Discover stories behind every book
        </p>
      </header>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h2 style={styles.h2}>Add a Book to Exchange</h2>
            <p style={styles.muted}>
              Each physical book has one digital identity. Its history stays
              forever.
            </p>
          </div>
          <div style={styles.cardActions}>
            <button
              onClick={clearForm}
              style={styles.secondaryBtn}
              disabled={saving}
            >
              Clear
            </button>
            <button
              onClick={addBook}
              style={styles.primaryBtn}
              disabled={saving}
            >
              {saving ? "Adding..." : "Add Book"}
            </button>
          </div>
        </div>

        {formError && <p style={styles.formError}>{formError}</p>}

        <div style={styles.formGrid}>
          <input
            style={styles.input}
            placeholder="Book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <select
            style={styles.input}
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option>New</option>
            <option>Good</option>
            <option>Worn</option>
          </select>

          <div style={styles.previewBox}>
            <div style={styles.previewLabel}>Points preview</div>
            <div style={styles.previewValue}>
              +{pointsFromCondition(condition)} points
            </div>
          </div>
        </div>
      </div>

      <div style={styles.controls}>
        <input
          style={styles.search}
          placeholder="Search by title or author..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          style={styles.controlSelect}
          value={condFilter}
          onChange={(e) => setCondFilter(e.target.value)}
        >
          <option value="All">All conditions</option>
          <option value="New">New</option>
          <option value="Good">Good</option>
          <option value="Worn">Worn</option>
        </select>

        <select
          style={styles.controlSelect}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Sort: newest</option>
          <option value="title">Sort: title (A–Z)</option>
          <option value="points">Sort: points (high)</option>
        </select>
      </div>

      <h2 style={{ marginTop: 18, ...styles.h2 }}>
        Available Books{" "}
        <span style={styles.smallMuted}>({filteredBooks.length} shown)</span>
      </h2>

      <div style={styles.grid}>
        {filteredBooks.length === 0 && (
          <p style={styles.muted}>
            No matches. Try clearing filters or add the first book.
          </p>
        )}

        {filteredBooks.map((book) => (
          <div key={book.id} style={styles.bookCard}>
            <div style={styles.bookTop}>
              <div>
                <h3 style={styles.h3}>{book.title}</h3>
                <p style={styles.muted}>by {book.author}</p>
              </div>

              <span
                style={{ ...styles.badge, ...badgeStyleFor(book.condition) }}
              >
                {book.condition}
              </span>
            </div>

            <div style={styles.pointsRow}>
              <div style={styles.points}>+{book.pointsValue} points</div>
              <button
                style={styles.smallBtn}
                onClick={() => copyQRPayload(book)}
              >
                Copy QR payload
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 30, ...styles.h2 }}>Nearby Exchange Location</h2>
      <MapView />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: 20,
    fontFamily: "system-ui, sans-serif",
  },
  header: { textAlign: "center", marginBottom: 20 },
  h1: { margin: 0, fontSize: 34, letterSpacing: "-0.5px" },
  subtitle: { marginTop: 8, marginBottom: 12, color: "#374151" },
  muted: { color: "#6b7280", fontSize: 14, margin: 0 },
  smallMuted: { color: "#6b7280", fontSize: 13, fontWeight: 500 },
  card: {
    background: "#ffffff",
    padding: 20,
    borderRadius: 14,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  cardHeader: {
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  cardActions: { display: "flex", gap: 10, alignItems: "center" },
  h2: { margin: 0, fontSize: 20 },
  h3: { margin: 0, fontSize: 16, lineHeight: 1.2 },
  formError: {
    marginTop: 10,
    marginBottom: 0,
    color: "#991b1b",
    background: "#fee2e2",
    padding: "8px 10px",
    borderRadius: 10,
    fontSize: 13,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: 12,
    marginTop: 14,
  },
  input: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    outline: "none",
    fontSize: 14,
  },
  previewBox: {
    border: "1px dashed #d1d5db",
    borderRadius: 12,
    padding: "10px 12px",
    background: "#fafafa",
  },
  previewLabel: { fontSize: 12, color: "#6b7280", marginBottom: 4 },
  previewValue: { fontWeight: 800, color: "#065f46" },
  primaryBtn: {
    border: "none",
    padding: "10px 14px",
    borderRadius: 12,
    cursor: "pointer",
    background: "#111827",
    color: "#ffffff",
    fontWeight: 700,
  },
  secondaryBtn: {
    border: "1px solid #e5e7eb",
    padding: "10px 14px",
    borderRadius: 12,
    cursor: "pointer",
    background: "#ffffff",
    color: "#111827",
    fontWeight: 700,
  },
  controls: {
    display: "grid",
    gridTemplateColumns: "1fr 180px 180px",
    gap: 12,
    marginTop: 16,
    alignItems: "center",
  },
  search: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    outline: "none",
    fontSize: 14,
  },
  controlSelect: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    background: "#fff",
    fontSize: 14,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 16,
    marginTop: 14,
  },
  bookCard: {
    background: "#fff",
    padding: 16,
    borderRadius: 14,
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
    border: "1px solid #f3f4f6",
  },
  bookTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "flex-start",
  },
  badge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  pointsRow: {
    marginTop: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  points: { fontWeight: 800, color: "#047857" },
  smallBtn: {
    border: "1px solid #e5e7eb",
    background: "#ffffff",
    padding: "6px 10px",
    borderRadius: 999,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 700,
  },
};
