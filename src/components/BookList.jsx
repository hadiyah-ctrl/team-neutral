// BookList.jsx
import { useEffect, useState } from "react";
import { listBooks } from "../utils/api";

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    let alive = true;
    listBooks().then((data) => {
      if (alive) setBooks(data);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="container">
      <h2>All Books</h2>

      <div style={{ display: "grid", gap: 16 }}>
        {books.map((book) => (
          <div key={book.id} className="card">
            <strong>{book.title}</strong>
            <p style={{ color: "var(--text-soft)" }}>{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
