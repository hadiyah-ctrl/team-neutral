// Signup.jsx (dummy auth)
import { useState } from "react";

const KEY = "books_exchange_user_v1";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const n = name.trim();
    const e = email.trim().toLowerCase();
    const p = password;

    if (!n || !e || !p) {
      alert("Fill all fields.");
      return;
    }

    localStorage.setItem(KEY, JSON.stringify({ name: n, email: e, password: p }));
    alert("Account created!");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} onClick={handleSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 420,
    padding: 36,
    borderRadius: 16,
    boxShadow: "0 12px 35px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  title: { textAlign: "center" },
  input: {
    padding: 12,
    borderRadius: 9,
    border: "1px solid #ddd",
    fontSize: 14,
    outline: "none",
  },
  button: {
    marginTop: 12,
    padding: 13,
    borderRadius: 9,
    border: "none",
    backgroundColor: "#ff7aa2",
    color: "#fff",
    cursor: "pointer",
  },
};
