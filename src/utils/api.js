// src/utils/api.js
const KEY = "books_exchange_books_v1";

const seed = [
  {
    id: "demo-1",
    title: "Atomic Habits",
    author: "James Clear",
    condition: "Good",
    pointsValue: 10,
    history: [],
  },
  {
    id: "demo-2",
    title: "The Alchemist",
    author: "Paulo Coelho",
    condition: "New",
    pointsValue: 15,
    history: [],
  },
  {
    id: "demo-3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    condition: "Worn",
    pointsValue: 5,
    history: [],
  },
];

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    return parsed;
  } catch {
    return seed;
  }
}

function write(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function listBooks() {
  return Promise.resolve(read());
}

export function getBook(id) {
  const book = read().find((b) => String(b.id) === String(id)) || null;
  return Promise.resolve(book);
}

export function createBook(book) {
  const list = read();
  const created = {
    id: `b-${Date.now()}`,
    title: book.title,
    author: book.author,
    condition: book.condition || "Good",
    pointsValue: book.pointsValue ?? 10,
    history: Array.isArray(book.history) ? book.history : [],
  };
  const next = [created, ...list];
  write(next);
  return Promise.resolve(created);
}

export function updateBook(id, updated) {
  const list = read();
  const next = list.map((b) =>
    String(b.id) === String(id) ? { ...b, ...updated, id: b.id } : b
  );
  write(next);
  const book = next.find((b) => String(b.id) === String(id)) || null;
  return Promise.resolve(book);
}
