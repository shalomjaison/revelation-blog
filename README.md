# Revelation Studies Blog

A blog dedicated to in-depth studies of the Book of Revelation, with a full admin CMS for managing posts.

**Live site:** https://revelation-blog.vercel.app
**API:** https://blog-cms-api-95se.onrender.com

## Tech Stack

**Frontend**
- React 19, TypeScript, Vite
- Tailwind CSS, Lenis (smooth scroll), Lucide React
- React Router DOM — client-side routing
- react-markdown — renders bold/italic formatting in posts

**Backend**
- Express, Node.js, TypeScript
- PostgreSQL via Supabase
- JWT authentication (bcrypt + jsonwebtoken)

**Deployed on**
- Frontend → Vercel
- Backend → Render
- Database → Supabase (PostgreSQL)
- Image storage → Supabase Storage (`post-image` bucket)

## Project Structure

```
├── server/
│   ├── server.ts          # Express API
│   ├── db.ts              # PostgreSQL connection
│   ├── middleware/auth.ts # JWT middleware
│   └── createAdmin.ts     # Script to seed admin user
├── src/
│   ├── App.tsx            # Public blog + routing
│   ├── config.ts          # API_URL (dev vs prod)
│   ├── utils/auth.ts      # Token helpers
│   ├── components/
│   │   └── PrivateRoute.tsx
│   └── pages/admin/
│       ├── Login.tsx
│       ├── Dashboard.tsx
│       ├── PostForm.tsx
│       └── AdminLayout.tsx
├── setup.sql              # Database schema
└── vercel.json            # SPA rewrite rule
```

## Getting Started

**Prerequisites:** Node.js, PostgreSQL (or Supabase account)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy and fill in environment variables:
   ```bash
   cp .env.example .env
   ```
   Required variables:
   ```
   DATABASE_URL=postgresql://...
   JWT_SECRET=your-secret
   VITE_API_URL=http://localhost:3001
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. Run the database schema:
   ```bash
   psql $DATABASE_URL -f setup.sql
   ```

4. Create the admin user:
   ```bash
   npx tsx server/createAdmin.ts
   ```

5. Start the backend and frontend in separate terminals:
   ```bash
   npm run server   # Express on :3001
   npm run dev      # Vite on :3000
   ```

## Admin CMS

Visit `/admin/login` to access the CMS.

| Route | Description |
|---|---|
| `/admin/login` | Login with email + password |
| `/admin/dashboard` | View, edit, delete all posts |
| `/admin/posts/new` | Create a new post |
| `/admin/posts/edit/:id` | Edit an existing post |

**Post editor features:**
- Auto-generates slug from title
- Image upload to Supabase Storage or paste a URL
- Markdown toolbar — select text and click **B** (bold) or **I** (italic)
- Separate paragraphs with a blank line

## Public Blog Features

- Posts fetched live from the API
- Sort toggle: oldest → newest (default) or newest → oldest
- Markdown rendered in post content

## API Endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/posts` | — | List all posts |
| GET | `/api/posts/:slug` | — | Get single post by slug |
| POST | `/api/auth/login` | — | Login, returns JWT |
| POST | `/api/posts` | ✓ | Create post |
| PUT | `/api/posts/:id` | ✓ | Update post |
| DELETE | `/api/posts/:id` | ✓ | Delete post |

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server (port 3000) |
| `npm run server` | Start Express backend (port 3001) |
| `npm run build` | Build frontend for production |
| `npm run lint` | Type-check with TypeScript |
