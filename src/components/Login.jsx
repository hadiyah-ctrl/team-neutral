// Login.jsx (dummy auth)
import { useState } from "react";

const KEY = "books_exchange_user_v1";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const saved = JSON.parse(localStorage.getItem(KEY) || "null");
    const e = email.trim().toLowerCase();
    const p = password;

    if (!saved) {
      alert("No account found. Please sign up first.");
      return;
    }

    if (saved.email === e && saved.password === p) {
      alert("Logged in!");
      return;
    }

    alert("Invalid email or password.");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
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
        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 380,
    padding: 32,
    borderRadius: 14,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  title: { textAlign: "center" },
  input: {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ddd",
    fontSize: 14,
    outline: "none",
  },
  button: {
    marginTop: 10,
    padding: 12,
    borderRadius: 8,
    border: "none",
    backgroundColor: "#6c63ff",
    color: "#fff",
    cursor: "pointer",
  },
};
