const API_URL = "http://localhost:5000"; // must match json-server port

export const getBooks = async () => {
  const res = await fetch(`${API_URL}/books`);
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
};
