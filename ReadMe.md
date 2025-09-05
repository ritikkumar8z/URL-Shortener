# URL Shortener (MERN)

## Features
- Submit a long URL → get a short URL.
- Visiting short URL redirects to original.
- Admin page lists all URLs and total clicks; supports delete.

## Quick Start

### 1) Backend
```bash
cd backend 
cp .env.example .env   # edit MONGO_URI if needed (Atlas recommended)
npm install
npm run dev 
```
Backend runs on http://localhost:5000

### 2) Frontend
In a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173 and calls backend via `/api` proxy.

### Short URL format
The backend returns short links like: `http://localhost:5000/abc123` (BASE_URL).
Open that URL in the browser to get redirected.

### API Summary
- `POST /api/shorten` body `{ longUrl }` → { _id, code, originalUrl, shortUrl, clicks, createdAt }
- `GET /:code` → redirects
- `GET /api/urls` → list all (for admin page)
- `DELETE /api/urls/:id` → delete one

### Notes
- Requires MongoDB (local or Atlas). If local MongoDB is not running, set `MONGO_URI` to an Atlas connection string.
- For a production build, use `npm run build` in frontend and serve the static files with a production server; backend can be deployed separately.
