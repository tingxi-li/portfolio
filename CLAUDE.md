# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Dev server at http://localhost:3000 (hot reload)
npm run build      # Production build -> dist/
npm run preview    # Preview production build locally
npm ci             # Clean install (used in CI)
```

Deployment is automatic: pushing to the `home` branch triggers GitHub Actions → Firebase Hosting (`tingxi-portfolio` project).

## Architecture

Single-page React app (Vite + React) functioning as an academic portfolio. No React Router — navigation uses **URL hash fragments** (`/#section-id`) with smooth scrolling. Legacy direct paths (`/bio`) are rewritten to hash routes via Firebase SPA rewrites.

### Structure

- `src/App.js` — root component; owns layout and hash-based section rendering
- `src/pages/` — one file per section (home, bio, research-interests, education, experience, teaching, contact, misc, google-scholar)
- `src/components/` — shared UI: `EntryItem` (structured list rows), `ThemeToggle`, `SectionDots`, `EmLink`, `BackHome`
- `public/index.html` — critical inline CSS to prevent theme flash on load; font-load detection; GA4 setup
- `public/cv.pdf` — served directly as a static asset

### Theming

Dark/light mode uses CSS custom properties (`--bg`, `--fg`, etc.) set on `<html>`. Theme preference persists in `localStorage` with `prefers-color-scheme` as fallback. The toggle logic lives in `src/components/ThemeToggle.js`; the critical path (flash prevention) is in `public/index.html`.

### Content Updates

All personal content (publications, experience, teaching, bio) lives directly in the page components under `src/pages/`. The `EntryItem` component is the standard way to render structured entries (title, date, description, links).

### Fonts

Chelsea Market (custom, `public/ChelseaMarket-Regular.woff2`) and IBM Plex Mono (`public/IBM_Plex_Mono/`) are self-hosted. `public/index.html` hides body content until Chelsea Market loads to avoid FOUT.
