# Rodrigo Corrêa — Resume Site

Single-page React + Vite resume, framed as a controlled engineering document. Light + dark theme, fully static output.

## Develop

```bash
npm install
npm run dev      # http://127.0.0.1:5173
```

## Build

```bash
npm run build    # → dist/
npm run preview  # preview the build locally
```

## Docker

```bash
# build
docker build -t rodrigo-resume:latest .

# run (default port 8080 → container port 80)
docker run --rm -d -p 8080:80 --name resume rodrigo-resume:latest

# browse
open http://localhost:8080
```

Multi-stage build (`node:22-alpine` builder → `nginx:1.27-alpine` server), final image ≈ 25 MB.

### docker compose

```bash
docker compose up -d --build
docker compose down
```

## Edit content

All resume data lives in `src/data.js` (name, skills, experience, education, contact).

## Theming

- First load: respects `prefers-color-scheme`
- Manual toggle (top-right) persists to `localStorage["rc-theme"]`
- Inline script in `<head>` applies theme before first paint — no FOUC

## Deploy

`dist/` is a fully static bundle. Drop on any host:
- Nginx/Caddy static
- Vercel / Netlify / Cloudflare Pages / GitHub Pages
- Any container (Docker image included)

## Tech

React 19 · Vite 8 · IBM Plex Sans + IBM Plex Mono · zero runtime CSS frameworks.