import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import db from "./src/db.json" with { type: "json" };

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;

let users = [...db.users];
let books = [...db.books];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BooksExchange API running");
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existing = users.find((user) => user.email === normalizedEmail);

  if (existing) {
    return res.status(400).json({ message: "User exists" });
  }

  const user = {
    id: Date.now(),
    name: name.trim(),
    email: normalizedEmail,
    password,
    points: 0,
  };

  users = [...users, user];
  res.status(201).json(user);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = (email || "").trim().toLowerCase();
  const user = users.find(
    (item) => item.email === normalizedEmail && item.password === password,
  );

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json(user);
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
  const { title, author, owner, condition = "Good", pointsValue = 10 } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }

  const book = {
    id: Date.now(),
    title: title.trim(),
    author: author.trim(),
    owner,
    condition,
    pointsValue,
    history: [],
  };

  books = [book, ...books];
  res.status(201).json(book);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
