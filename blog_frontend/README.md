# Ocean Blog Frontend (React)

Minimalist personal blog UI following the "Ocean Professional" theme.

## Features
- Browse all blog posts
- Read individual posts
- Admin: Add / Edit / Delete posts
- Sidebar with About and Categories
- Header and Footer with clean, minimalist styling
- REST API client with placeholders

## Quick Start
- Copy .env.example to .env and set REACT_APP_API_BASE_URL
- Install deps and run:
  - npm install
  - npm start

Open http://localhost:3000

## API Integration
This UI expects a REST backend (blog_database service or gateway):
- GET    /posts
- GET    /posts/:id
- POST   /posts
- PUT    /posts/:id
- DELETE /posts/:id
- GET    /categories (optional)

Configure REACT_APP_API_BASE_URL in your .env.

## Theme
Ocean Professional palette:
- Primary: #374151
- Secondary: #9CA3AF
- Success: #10B981
- Error: #EF4444
- Background: #FFFFFF
- Surface: #F9FAFB
- Text: #111827

All tokens are defined in src/index.css and applied consistently to keep a minimalist, whitespace-first aesthetic.

## Structure
- src/api/client.js: Fetch helpers and endpoints
- src/components: UI components (Sidebar, PostCard, PostEditor)
- src/pages: Home, Post, Admin, NotFound
- src/App.js: Router and top-level layout (header, footer)
- src/index.css: Theme and minimalist styles

## Notes
- No authentication is implemented; integrate your auth flow in Admin as needed.
- Public interfaces are documented in code comments.
