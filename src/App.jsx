import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

const KEY = "books_exchange_user_v1";
const isLoggedIn = () => !!localStorage.getItem(KEY);

function App() {
  return (
    <Router>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Login</Link>
        <Link to="/signup" style={styles.link}>Signup</Link>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={isLoggedIn() ? <Dashboard /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

const styles = {
  nav: {
    display: "flex",
    gap: 20,
    padding: 10,
    backgroundColor: "#222",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
