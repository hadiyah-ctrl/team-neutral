import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(
  "mongodb+srv://hadiyahawan26_db_user:0lM1217wplkxSU5i@cluster0.th9jdco.mongodb.net/booksExchangeDB?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Schemas
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  points: { type: Number, default: 0 }
});

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  owner: String, // user email or id
  condition: String,
  history: { type: Array, default: [] },
  pointsValue: { type: Number, default: 10 }
});

// Models
const User = mongoose.model("User", userSchema);
const Book = mongoose.model("Book", bookSchema);

// Routes
app.get("/", (req, res) => res.send("Server running"));

// Signup
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "User exists" });
  const user = await User.create({ name, email, password });
  res.json(user);
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });
  res.json(user);
});

// Get books
app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Add book
app.post("/books", async (req, res) => {
  const { title, author, owner, condition } = req.body;
  const book = await Book.create({ title, author, owner, condition });
  res.json(book);
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
