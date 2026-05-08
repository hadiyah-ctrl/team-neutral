# BooksExchange 📚

BooksExchange is a beginner-friendly React/Vite book exchange app. It lets a demo user sign up or log in, add books, browse available books, search/filter/sort them, copy a QR-style JSON payload, and view a nearby exchange location with an OpenStreetMap embed.

The frontend is intentionally local-first: book and user data are stored in the browser's `localStorage`, so the app can run without a database or backend server.

## Features

- Dummy signup/login using `localStorage`
- Add and browse books
- Search, filter by condition, and sort books
- Simple points value based on book condition
- Book history helpers in the utility API
- Copyable QR-style book payloads
- OpenStreetMap exchange location embed
- Optional Express demo API using `src/db.json` seed data

## Tech Stack

- React + Vite
- React Router
- Browser `localStorage`
- Express demo API (optional)
- OpenStreetMap iframe embed

## Run the frontend locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite, usually <http://localhost:5173/>.

## Optional: run the demo API

The React app does not require the API server. If you want to try the standalone Express API routes, copy the example environment file and start the server manually:

```bash
cp .env.example .env
node server.js
```

The server reads only `PORT` from `.env` and defaults to port `5000`.

## Environment files and secrets

Do not commit real `.env` files. Keep local values in `.env`, which is ignored by Git. Use `.env.example` for safe documentation of required variables.
