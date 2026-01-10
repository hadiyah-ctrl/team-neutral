// QRScanner.jsx
import { QrReader } from "react-qr-reader";
import { useState } from "react";

const QRScanner = () => {
  const [data, setData] = useState("");

  return (
    <div style={{ width: 320, margin: "0 auto", textAlign: "center" }}>
      <h3>Scan QR Code</h3>

      <QrReader
        constraints={{ facingMode: "environment" }}
        onResult={(result) => {
          if (result) setData(result.text);
        }}
        style={{ width: "100%" }}
      />

      {data && (
        <p>
          <strong>Scanned:</strong> {data}
        </p>
      )}
    </div>
  );
};

export default QRScanner;
