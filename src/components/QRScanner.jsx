// QRScanner.jsx
import { useState } from "react";

const QRScanner = () => {
  const [data, setData] = useState("");

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", textAlign: "center" }}>
      <h3>QR Payload Reader</h3>
      <p style={{ color: "var(--text-soft)", fontSize: 14 }}>
        Paste a copied BooksExchange QR payload here to preview it. Camera
        scanning can be added later with a QR reader package.
      </p>

      <textarea
        value={data}
        onChange={(event) => setData(event.target.value)}
        placeholder='Example: {"type":"booksexchange","id":"demo-1"}'
        style={styles.textarea}
      />

      {data && (
        <p>
          <strong>Payload:</strong> {data}
        </p>
      )}
    </div>
  );
};

export default QRScanner;

const styles = {
  textarea: {
    width: "100%",
    minHeight: 100,
    padding: 12,
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    fontFamily: "inherit",
  },
};
