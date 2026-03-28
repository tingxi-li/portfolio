# Portfolio Simplicity Refactor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modernize the build toolchain (CRA to Vite), purge unused dependencies, and clean up CSS/component patterns — all while keeping the visual design identical.

**Architecture:** Single-page React app served by Vite. CSS split into three logical files (fonts, variables, global). Page components standardized to use CSS classes instead of inline styles.

**Tech Stack:** Vite, React 19, lucide-react

---

## File Map

### New files
- `vite.config.js` — Vite configuration with React plugin
- `index.html` — root HTML (moved from `public/index.html`, adapted for Vite)
- `src/css/fonts.css` — font-face declarations (Chelsea Market + 3 IBM Plex Mono weights)
- `src/css/variables.css` — custom properties, theme overrides, reset, root layout

### Modified files
- `package.json` — purge deps, update scripts
- `.gitignore` — replace `/build` with `/dist`
- `firebase.json` — change `"public": "build"` to `"public": "dist"`
- `.github/workflows/deploy-prod.yml` — remove `--force` flag
- `.github/workflows/firebase-hosting-pull-request.yml` — no change needed (uses `npm ci && npm run build`)
- `src/css/global.css` — (renamed from `src/global.css`) trimmed: no font-faces, no variables, no dead CSS
- `src/index.js` — updated imports (3 CSS files, remove antd import)
- `src/App.js` — no changes
- `src/pages/home.js` — no changes
- `src/pages/research-interests.js` — fix nested `<p>`, replace inline styles with classes
- `src/pages/bio.js` — replace inline styles with classes, remove redundant import
- `src/pages/education.js` — replace inline styles with classes, remove redundant import
- `src/pages/google-scholar.js` — replace inline styles with classes, remove redundant import
- `src/pages/experience.js` — replace inline styles with classes, remove redundant import
- `src/pages/teaching.js` — replace inline styles with classes, remove redundant import
- `src/pages/contact.js` — remove redundant import
- `src/pages/misc.js` — remove redundant import
- `src/components/BackHome.js` — no changes
- `src/components/EmLink.js` — no changes
- `src/components/EntryItem.js` — no changes
- `src/components/SectionDots.js` — no changes
- `src/components/ThemeToggle.js` — no changes

### Deleted files
- `public/index.html` — replaced by root `index.html`
- `src/global.css` — split into 3 files under `src/css/`

---

## Task 1: Purge unused dependencies and update package.json

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Rewrite package.json**

Replace the entire `package.json` with:

```json
{
  "name": "portfolio",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.468.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.4.1",
    "vite": "^6.3.5"
  }
}
```

- [ ] **Step 2: Create vite.config.js**

Create `vite.config.js` at the project root:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});
```

- [ ] **Step 3: Commit**

```bash
git add package.json vite.config.js
git commit -m "chore: replace CRA with Vite, purge unused dependencies"
```

---

## Task 2: Move and adapt index.html for Vite

**Files:**
- Create: `index.html` (project root)
- Delete: `public/index.html`

Vite uses a root-level `index.html` and requires a `<script type="module">` entry point. Assets in `public/` are served at `/` by Vite, so font paths change from `/public/...` to `/...`.

- [ ] **Step 1: Create root index.html**

Create `index.html` at the project root with this content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tingxi's Homepage</title>
    <meta name="color-scheme" content="light dark" />
    <link rel="icon" href="/favicon.ico" />
    <!-- Critical theme paint to prevent white flash before JS/CSS load -->
    <style>
      html { --bg: #ffffff; --fg: #111111; background: var(--bg); color: var(--fg); }
      html[data-theme="dark"] { --bg: #0b0b0b; --fg: #eaeaea; }
      @media (prefers-color-scheme: dark) {
        html:not([data-theme]) { --bg: #0b0b0b; --fg: #eaeaea; }
      }
    </style>
    <script>
      // Apply saved/system theme ASAP to avoid white flash on dark
      (function() {
        try {
          var t = localStorage.getItem('theme');
          if (t === 'dark' || t === 'light') {
            document.documentElement.setAttribute('data-theme', t);
          } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
          }
        } catch (e) {}
      })();
    </script>
    <style>
      html.fonts-loading body { opacity: 0; }
      html.fonts-ready body { opacity: 1; transition: opacity 150ms ease; }
    </style>
    <script>
      // Hide content until Chelsea Market is ready to avoid fallback flash
      document.documentElement.classList.add('fonts-loading');
      (function() {
        if (document.fonts && document.fonts.load) {
          Promise.all([
            document.fonts.load('1em "Chelsea Market"')
          ]).then(function(results) {
            if (Array.isArray(results) && results.length > 0) {
              document.documentElement.classList.remove('fonts-loading');
              document.documentElement.classList.add('fonts-ready');
            }
          }).catch(function() {
            // Keep hidden to avoid displaying fallback, per preference
          });
        } else {
          window.addEventListener('load', function() {
            document.documentElement.classList.remove('fonts-loading');
            document.documentElement.classList.add('fonts-ready');
          });
        }
      })();
    </script>
    <!-- Google Analytics (GA4) -->
    <script>
      (function(){
        var isLocal = /(^localhost$|^127\.|^\[::1\]$)/.test(location.hostname);
        if (isLocal) return;
        var GA_ID = 'G-84PH5CSDKL';
        if (!/^G-[A-Z0-9]+$/.test(GA_ID)) return;
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);} window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', GA_ID, { anonymize_ip: true });
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.jsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Delete old public/index.html**

```bash
rm public/index.html
```

- [ ] **Step 3: Rename src/index.js to src/index.jsx**

Vite expects JSX files to use `.jsx` extension:

```bash
mv src/index.js src/index.jsx
```

- [ ] **Step 4: Commit**

```bash
git add index.html src/index.jsx
git rm public/index.html src/index.js
git commit -m "chore: move index.html to root for Vite, rename entry to .jsx"
```

---

## Task 3: Split and clean up CSS

**Files:**
- Create: `src/css/fonts.css`
- Create: `src/css/variables.css`
- Create: `src/css/global.css`
- Delete: `src/global.css`

- [ ] **Step 1: Create src/css/fonts.css**

```css
@font-face {
  font-family: "Chelsea Market";
  src: local("Chelsea Market"), url('/ChelseaMarket-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: block;
}

@font-face {
  font-family: "IBM Plex Mono";
  src: url('/IBM_Plex_Mono/IBMPlexMono-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "IBM Plex Mono";
  src: url('/IBM_Plex_Mono/IBMPlexMono-Italic.ttf') format('truetype');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "IBM Plex Mono";
  src: url('/IBM_Plex_Mono/IBMPlexMono-SemiBold.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
```

Note: The Chelsea Market `format` is corrected from `'truetype'` to `'woff2'` since the file is `.woff2`. Font paths drop the `/public` prefix because Vite serves `public/` at root.

- [ ] **Step 2: Create src/css/variables.css**

```css
:root {
  --font-chelsea: "Chelsea Market", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  --page-pad: clamp(12px, 4vw, 24px);
  --title-font-size: clamp(42px, 6vw, 60px);
  --toc-font-size: clamp(20px, 4.5vw, 38px);
  --text-font-size: clamp(16px, 2.5vw, 18px);
  --smaller-text-font-size: clamp(13px, 2vw, 15px);
  --caption-font-size: clamp(12px, 2vw, 14px);
  --tag-font-size: clamp(11px, 1.8vw, 12px);
  --title-weight: 600;
  --title-line-height: 1.1;
  --text-line-height: 2;
  --highlight-font-color: blue;

  /* Theme: light defaults */
  --bg: #ffffff;
  --fg: #111111;
  --muted: #666666;
  --border: #111111;
  --tooltip-bg: var(--fg);
  --tooltip-fg: #ffffff;
  --dot-hover-bg: var(--fg);
  --dot-active-bg: var(--fg);
  --back-border: var(--fg);
  --back-bg: var(--bg);
  --back-fg: var(--fg);
  --back-bg-hover: var(--fg);
  --back-fg-hover: var(--bg);
  --tag-bg-default: transparent;
  --tag-fg-default: var(--fg);
  --tag-border-default: var(--border);
}

html, body { margin: 0; padding: 0; background: var(--bg); }
body { color: var(--fg); }
html { scroll-behavior: smooth; }

/* Dark theme override */
html[data-theme="dark"] {
  --bg: #0b0b0b;
  --fg: #eaeaea;
  --muted: #aaaaaa;
  --border: #eaeaea;
  --tooltip-bg: #eaeaea;
  --tooltip-fg: #0b0b0b;
  --dot-hover-bg: #eaeaea;
  --dot-active-bg: #eaeaea;
  --back-border: var(--fg);
  --back-bg: var(--bg);
  --back-fg: var(--fg);
  --back-bg-hover: var(--fg);
  --back-fg-hover: var(--bg);
  --highlight-font-color: yellow;
}

@media (prefers-color-scheme: dark) {
  html:not([data-theme]) {
    --bg: #0b0b0b;
    --fg: #eaeaea;
    --muted: #aaaaaa;
    --border: #eaeaea;
    --tooltip-bg: #eaeaea;
    --tooltip-fg: #0b0b0b;
    --dot-hover-bg: #eaeaea;
    --dot-active-bg: #eaeaea;
    --back-border: var(--fg);
    --back-bg: var(--bg);
    --back-fg: var(--fg);
    --back-bg-hover: var(--fg);
    --back-fg-hover: var(--bg);
    --highlight-font-color: yellow;
  }
}

#root {
  width: min(92vw, 72ch);
  margin: 0 auto;
  padding: var(--page-pad);
}

@media (max-width: 640px) {
  #root {
    padding-top: calc(var(--page-pad) + 68px);
  }
}
```

- [ ] **Step 3: Create src/css/global.css**

This file contains everything from the old `src/global.css` EXCEPT: font-face declarations, CSS custom properties, theme overrides, `html/body` reset, `#root` layout, commented-out DM Serif faces, `.content` class, `.content em` rule, `.use-italic`, `.use-oblique`, and `--font-serif`/`--font-serif-italic` variables.

Add new utility classes for section text:

```css
/* Scroll offset for in-page anchors */
section[id] {
  scroll-margin-top: calc(68px + var(--page-pad));
}
#top {
  scroll-margin-top: calc(68px + var(--page-pad));
}

/* Section spacing — replaces <br /> tags */
section {
  padding-bottom: clamp(24px, 4vw, 48px);
}

/* Section text — replaces repeated inline styles on page components */
.section-text {
  font-family: var(--font-mono);
  font-size: var(--smaller-text-font-size);
  font-weight: 400;
  line-height: var(--text-line-height);
}

.section-text--lg {
  font-size: var(--text-font-size);
}

.section-text--center {
  text-align: center;
}

.section-text--bold {
  font-weight: 800;
}

.section-text--italic {
  font-style: italic;
}

.section-text--highlight {
  color: var(--highlight-font-color);
}

/* Right-side vertical section dots */
.section-dots {
  position: fixed;
  right: clamp(8px, 3vw, 24px);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 2000;
}
.section-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--border, currentColor);
  background: var(--bg);
  display: inline-block;
  position: relative;
}
.section-dot:hover, .section-dot:focus {
  background: var(--dot-hover-bg);
}
.section-dot[aria-current="true"] {
  background: var(--dot-active-bg);
}

.section-dot__tooltip {
  position: absolute;
  right: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%) scale(0.98);
  transform-origin: right center;
  background: var(--tooltip-bg);
  color: var(--tooltip-fg);
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.2;
  padding: 6px 8px;
  border-radius: 6px;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  opacity: 0;
  pointer-events: none;
  z-index: 10;
  transition: opacity 120ms ease, transform 120ms ease;
}
.section-dot__tooltip::after {
  content: "";
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: transparent transparent transparent var(--tooltip-bg);
}
.section-dot:hover .section-dot__tooltip,
.section-dot:focus-visible .section-dot__tooltip {
  opacity: 1;
  transform: translateY(-50%) scale(1);
}

@media (prefers-reduced-motion: reduce) {
  .section-dot__tooltip { transition: none; }
}

.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0 0 0 0);
  white-space: nowrap; border: 0;
}

@media (max-width: 640px) {
  .section-dots { right: 8px; gap: 8px; }
  .section-dot { width: 10px; height: 10px; }
}

@media (max-width: 480px) {
  .section-dots { display: none; }
}

/* Page typography */
.title {
  font-family: var(--font-chelsea);
  font-size: var(--title-font-size);
  font-weight: var(--title-weight);
  line-height: var(--title-line-height);
  margin: 0 0 clamp(8px, 2vw, 12px);
}

/* Inline link: italic + underline */
.em-link {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 0.08em;
  text-decoration-thickness: 0.08em;
  font-style: italic;
}
.em-link:hover {
  background: var(--fg);
  color: var(--bg);
  text-decoration-color: var(--bg);
  transition: background-color 0.2s ease, color 0.2s ease, text-decoration-color 0.2s ease;
}

/* Home page: aligned link grid */
.home-layout {
  min-height: calc(100dvh - 2 * var(--page-pad));
  display: grid;
  grid-template-rows: auto 1fr;
}
.home-title {
  margin: 0 0 clamp(10px, 2vw, 16px);
}
.aligned-links {
  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  width: 100%;
  align-content: center;
  align-items: center;
  min-height: calc(100dvh - 2 * var(--page-pad));
  row-gap: 12px;
  font-family: "Chelsea Market";
}
.home-layout .aligned-links {
  min-height: initial;
}
.aligned-link { display: contents; color: inherit; text-decoration: none; font-size: var(--toc-font-size); line-height: 1; font-weight: 500; }
.aligned-link .pre { grid-column: 1; justify-self: end; }
.aligned-link .align {
  grid-column: 2;
  justify-self: start;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5em;
  height: 1.5em;
  line-height: 1;
  text-align: center;
  background: var(--align-bg, transparent);
  color: var(--align-fg, currentColor);
  border-style: solid;
  border-color: var(--align-border, currentColor);
  border-width: clamp(2px, 0.12em, 5px);
  border-radius: 50%;
  box-sizing: border-box;
  margin: 0 6px;
  vertical-align: middle;
}
.aligned-link .pre, .aligned-link .post { line-height: 1; align-self: center; }
.aligned-link .post { grid-column: 3; justify-self: start; white-space: nowrap; }
.aligned-link:hover .pre, .aligned-link:hover .align, .aligned-link:hover .post { text-decoration: underline; }

/* Back to Home button */
.back-home {
  position: fixed;
  top: clamp(12px, 4vw, 24px);
  left: clamp(12px, 3vw, 24px);
  z-index: 1500;
}
.back-home__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid var(--back-border, #000);
  background: var(--back-bg, #fff);
  color: var(--back-fg, #000);
  text-decoration: none;
  font-size: 32px;
  line-height: 1;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.back-home__btn:hover {
  background: var(--back-bg-hover, #000);
  color: var(--back-fg-hover, #fff);
  border-color: var(--back-border-hover, #000);
}

/* Theme toggle */
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 999px;
  border: 2px solid var(--border, currentColor);
  background: var(--bg);
  color: var(--fg);
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.08s ease;
}
.theme-toggle:hover { text-decoration: none; }
.theme-toggle:active { transform: scale(0.96); }
.theme-toggle--fixed {
  position: fixed;
  top: clamp(12px, 4vw, 24px);
  right: clamp(12px, 4vw, 24px);
  z-index: 1200;
}

/* Timeline range label */
.tl-range { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; font-family: var(--font-mono); font-size: 0.9em; }
.tl-range .tl-connector { align-self: stretch; height: 10px; border-left: 1.5px solid currentColor; opacity: 0.5; margin: 1px 0; }

/* EntryItem styles */
.entry { margin: clamp(10px, 2vw, 16px) 0; }
.entry-title { margin: 0; font-family: var(--font-mono); font-size: var(--text-font-size); font-weight: 600; line-height: 1.2; }
.entry-tags { display: inline-flex; gap: 8px; align-items: center; flex-wrap: wrap; margin: 6px 0; }
.entry-desc { margin-top: 6px; font-family: var(--font-mono); font-size: var(--caption-font-size); line-height: var(--text-line-height); }

/* Tags */
.tag { display: inline-flex; align-items: center; justify-content: center; padding: 2px 8px; border-radius: 999px; border: 1px solid var(--tag-border, var(--tag-border-default, currentColor)); background: var(--tag-bg, var(--tag-bg-default, transparent)); color: var(--tag-fg, var(--tag-fg-default, currentColor)); font-size: var(--tag-font-size); font-family: var(--font-mono); text-decoration: none; line-height: 1.2; }
.tag:hover { text-decoration: none; }
.tag--time { --tag-bg: var(--fg); --tag-border: var(--fg); --tag-fg: var(--bg); }
.tag--role { --tag-bg: var(--fg); --tag-border: var(--fg); --tag-fg: var(--bg); }
.tag--link { --tag-bg: var(--bg); --tag-border: var(--fg); --tag-fg: var(--fg); }
.tag--link:hover { background: var(--fg); color: var(--bg); border-color: var(--fg); transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease; }

.mark-me { font-weight: 700; text-decoration: underline; }

/* Contact page */
.circle-buttons { display: flex; flex-direction: column; gap: 14px; align-items: center; }
.circle-center { display: grid; place-items: center; min-height: 60vh; }
.circle-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(52px, 8vw, 68px);
  height: clamp(52px, 8vw, 68px);
  border-radius: 50%;
  border: 2px solid var(--border);
  background: var(--bg);
  color: var(--fg);
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: clamp(16px, 2.8vw, 22px);
  line-height: 1;
}
.circle-btn:hover { background: var(--fg); color: var(--bg); transition: background-color 0.2s ease, color 0.2s ease; }

/* Misc page */
.media { margin: clamp(8px, 2vw, 16px) 0; }
.misc-img { max-width: 100%; height: auto; display: block; border-radius: 8px; }
.img-caption { margin-top: 6px; font-size: var(--caption-font-size); opacity: 0.8; font-family: var(--font-mono); }

/* Toast */
.toast {
  position: fixed;
  left: 50%;
  bottom: clamp(16px, 4vw, 28px);
  transform: translateX(-50%) translateY(8px);
  background: var(--fg);
  color: var(--bg);
  border: 1px solid var(--border, currentColor);
  border-radius: 8px;
  padding: 6px 10px;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.2;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  opacity: 0;
  pointer-events: none;
  z-index: 3000;
  transition: opacity 150ms ease, transform 150ms ease;
}
.toast.toast--show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
```

- [ ] **Step 4: Delete old global.css**

```bash
rm src/global.css
```

- [ ] **Step 5: Commit**

```bash
git add src/css/
git rm src/global.css
git commit -m "refactor: split global.css into fonts, variables, and global; remove dead CSS"
```

---

## Task 4: Update src/index.jsx imports

**Files:**
- Modify: `src/index.jsx`

- [ ] **Step 1: Rewrite src/index.jsx**

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./css/fonts.css";
import "./css/variables.css";
import "./css/global.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

Changes: removed `antd/dist/reset.css` import, replaced single `global.css` with 3 CSS imports, removed unnecessary fragment wrapper.

- [ ] **Step 2: Commit**

```bash
git add src/index.jsx
git commit -m "refactor: update index.jsx imports for split CSS, remove antd"
```

---

## Task 5: Rename page/component .js files to .jsx

**Files:**
- Rename all `.js` files under `src/` to `.jsx`

Vite expects files containing JSX to use the `.jsx` extension.

- [ ] **Step 1: Rename all source files**

```bash
cd /Users/tingxi/Github/portfolio
for f in src/App.js src/pages/*.js src/components/*.js; do
  git mv "$f" "${f%.js}.jsx"
done
```

- [ ] **Step 2: Update imports in App.jsx**

Update all import paths in `src/App.jsx` from `.js` to omit extensions (Vite resolves `.jsx` automatically). The current imports don't use extensions, so no changes needed — verify this.

- [ ] **Step 3: Commit**

```bash
git add -A src/
git commit -m "chore: rename .js to .jsx for Vite compatibility"
```

---

## Task 6: Clean up page components — remove inline styles and redundant imports

**Files:**
- Modify: `src/pages/research-interests.jsx`
- Modify: `src/pages/bio.jsx`
- Modify: `src/pages/education.jsx`
- Modify: `src/pages/google-scholar.jsx`
- Modify: `src/pages/experience.jsx`
- Modify: `src/pages/teaching.jsx`
- Modify: `src/pages/contact.jsx`
- Modify: `src/pages/misc.jsx`

- [ ] **Step 1: Rewrite research-interests.jsx**

Fix the nested `<p>` bug and replace inline styles with CSS classes:

```jsx
import React from "react";
import EmLink from "../components/EmLink";

export default function ResearchInterests() {
  return (
    <>
      <h2 className="title">Research Interests</h2>

      <p className="section-text">
        i am broadly interested in <span style={{textDecoration: "underline"}}>Efficient Machine Learning Systems</span> during the <span style={{textDecoration: "underline"}}>Inference</span> stage.
      </p>

      <p className="section-text">
        specifically, my research focuses on analyzing the efficiency of deep learning pipeline systems under malicious inputs, as well as on the machine learning compilation process, including compiler design and automated kernel generation.
      </p>

      <p className="section-text">
        <span style={{fontStyle: "italic"}}>keywords: efficient ml; mlsys</span>
      </p>

      <p className="section-text section-text--highlight">
        *** i am actively looking for internship opportunities in <span style={{textDecoration: "underline"}}>Machine Learning Compilation</span> starting from summer 2026.
      </p>
    </>
  );
}
```

- [ ] **Step 2: Rewrite bio.jsx**

```jsx
import React from "react";
import EmLink from "../components/EmLink";

export default function Bio() {
  return (
    <>
      <h2 className="title">Bio</h2>

      <figure className="media">
        <img
          className="misc-img"
          alt="me"
          loading="lazy"
          src="https://ik.imagekit.io/tingxi/myphoto2.jpeg"
          srcSet="
            https://ik.imagekit.io/tingxi/myphoto2.jpeg 480w,
            https://ik.imagekit.io/tingxi/myphoto2.jpeg 768w,
            https://ik.imagekit.io/tingxi/myphoto2.jpeg 1200w
          "
          style={{maxWidth: "240px", borderRadius: "8px"}}
        />
        <figcaption className="img-caption">Yosemite NP, California</figcaption>
      </figure>

      <p className="section-text">
        i'm a <s>1st</s> 2nd year phd student in computer science
        at <EmLink href="https://www.utdallas.edu/">ut dallas</EmLink>, advised by <EmLink href="https://www.youngwei.com/">prof. wei yang</EmLink>.
      </p>

      <p className="section-text">
        prior to that, i earned my bachelor's degree at <EmLink href="https://en.dlut.edu.cn/">dalian university of technology</EmLink>, and was a visiting student at <EmLink href="https://www.tum.de/en/">technical university of munich</EmLink>.
      </p>
    </>
  );
}
```

- [ ] **Step 3: Rewrite education.jsx**

```jsx
import React from "react";

export default function Education() {
  return (
    <>
      <h2 className="title">Education</h2>

      <p className="section-text section-text--lg section-text--bold section-text--center">
        The University of Texas at Dallas
      </p>
      <p className="section-text section-text--italic section-text--center">
        Doctor of Philosophy<br />
        Aug. 2024 - present
      </p>

      <p className="section-text section-text--lg section-text--bold section-text--center">
        Dalian University of Technology
      </p>
      <p className="section-text section-text--italic section-text--center">
        Bachelor of Science<br />
        Sept. 2019 - Jun. 2024
      </p>

      <p className="section-text section-text--lg section-text--bold section-text--center">
        Technical University of Munich
      </p>
      <p className="section-text section-text--italic section-text--center">
        Visiting Student<br />
        Apr. 2022 - Oct. 2022
      </p>
    </>
  );
}
```

- [ ] **Step 4: Rewrite google-scholar.jsx**

```jsx
import React from "react";
import EmLink from "../components/EmLink";
import EntryItem from "../components/EntryItem";

export default function GoogleScholar() {
  return (
    <>
      <h2 className="title">Google Scholar</h2>

      <p className="section-text section-text--lg">
        Full list of publications and citations
        can be found <EmLink href="https://scholar.google.com/citations?user=a_XpeY0AAAAJ&hl=en">HERE</EmLink>.
      </p>

      <EntryItem
        title="Identify then Exploit: Degrading Performance of Vision-based Deep Learning Systems"
        description="Tingxi Li*, Mingfang Ji*, Ravishka Rathnasuriya, Simin Chen, Yitao Hu, Wei Yang"
        time="2025"
        role="under review at a major cv/ai conference"
        highlightMe="Tingxi Li"
      />

      <EntryItem
        title="Efficiency Attack and Defences Towards Deep Learning Systems"
        description="Ravishka Rathnasuriya, Tingxi Li, Zexin Xu, Zihe Song, Jun Ren, Mirazul Haque, Simin Chen, Wei Yang"
        time="2025"
        role="usenix security"
        highlightMe="Tingxi Li"
        links={[
          { href: 'https://www.usenix.org/system/files/usenixsecurity25-rathnasuriya.pdf', label: 'PDF' },
          { href: "https://zenodo.org/records/15649771", label: "Code" }
        ]}
      />

      <EntryItem
        title="COMET: Closed-loop Orchestration for Malicious Elicitation Techniques in Code Models"
        description="Zexin Xu, Tingxi Li, Ravishka Rathnasuriya, Zihe Song, Jun Ren, Bhavesh Mandalapu, Soroush Setayeshpour, Xinya Du, Wei Yang"
        time="2025"
        role="technical report"
        highlightMe="Tingxi Li"
        links={[
          { href: 'https://assets.amazon.science/6f/16/076dff834864823e4f09322d1495/astro-comet-closed-loop-orchestration-for-malicious-elicitation-techniques-in-code-models.pdf', label: 'PDF' },
        ]}
      />
    </>
  );
}
```

- [ ] **Step 5: Rewrite experience.jsx**

```jsx
import React from "react";
import EntryItem from "../components/EntryItem";

export default function Experience() {
  return (
    <>
      <h2 className="title">Experience</h2>

      <p className="section-text section-text--lg">
        My industrial & competition experiences.
      </p>

      <EntryItem
        title="SOPHGO"
        description="refactor c++ code, test the refactored code to ensure compilation and functionality, and write documentation."
        time="May 2024 - Aug. 2024"
        role="research intern"
      />

      <EntryItem
        title="Amazon Nova AI Challenge: Trusted AI"
        description="team member of one of the red teaming finalists. develop surrogate model to help evaluating adversarial probes and refine attack strategies based on the findings."
        time="Nov. 2024 - Jul. 2025"
        role="finalist team member"
      />
    </>
  );
}
```

- [ ] **Step 6: Rewrite teaching.jsx**

```jsx
import React from "react";
import EntryItem from "../components/EntryItem";

export default function Teaching() {
  return (
    <>
      <h2 className="title">Teaching</h2>

      <p className="section-text section-text--lg">
        Courses I teach, as a TA.
      </p>

      <EntryItem
        title="CS 4375: Introduction to Machine Learning"
        description="host office hours, design exam questions and deliver review lectures for the course."
        time="fall 2024"
        role="teaching assistant"
      />

      <EntryItem
        title="CS 4375: Introduction to Machine Learning"
        description="host office hours; teach introductory level of machine learning compilation, triton programming; design coding assignments/exam questions."
        time="fall 2025"
        role="teaching assistant"
        links={[
          { href: 'https://github.com/tingxi-li/portfolio/releases/download/v1.0/ml-compilation-triton.pdf', label: 'Download Slides' },
        ]}
      />
    </>
  );
}
```

- [ ] **Step 7: Rewrite contact.jsx**

Remove redundant `import "../global.css"`:

```jsx
import React, { useCallback, useEffect, useState } from "react";
import { Mail, Linkedin } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copyEmail = useCallback(async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const email = "tingxi.li@utdallas.edu";
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const ta = document.createElement('textarea');
        ta.value = email;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
    } catch (err) {
      setCopied(true);
    }
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1400);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <>
      <h2 className="title">Contact</h2>
      <div className="circle-center">
        <div className="circle-buttons">
          <button className="circle-btn" onClick={copyEmail} aria-label="Copy email">
            <Mail size={28} strokeWidth={2} />
          </button>
          <a className="circle-btn" href="/cv.pdf" target="_blank" rel="noopener noreferrer" aria-label="CV">
            CV
          </a>
          <a className="circle-btn" href="https://www.linkedin.com/in/tingxi-l-352a45297/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={28} strokeWidth={2} />
          </a>
        </div>
      </div>
      <div className={"toast" + (copied ? " toast--show" : "")} role="status" aria-live="polite">
        Email copied
      </div>
    </>
  );
}
```

- [ ] **Step 8: Rewrite misc.jsx**

```jsx
import React from "react";

export default function Misc() {
  return (
    <>
      <h2 className="title">Miscellaneous</h2>
      <figure className="media">
        <img
          className="misc-img"
          alt="A moment I like"
          loading="lazy"
          src="https://ik.imagekit.io/tingxi/twocats.jpeg"
          srcSet="
            https://ik.imagekit.io/tingxi/twocats.jpeg 480w,
            https://ik.imagekit.io/tingxi/twocats.jpeg 768w,
            https://ik.imagekit.io/tingxi/twocats.jpeg 1200w
          "
          sizes="(max-width: 600px) 92vw, 72ch"
        />
        <figcaption className="img-caption">Jolly-B (Left) and Chick-fil-A (Right) (Jan. 2026)</figcaption>
      </figure>
    </>
  );
}
```

- [ ] **Step 9: Commit**

```bash
git add src/pages/
git commit -m "refactor: clean up page components — replace inline styles with CSS classes, fix nested <p>"
```

---

## Task 7: Update deployment config for Vite

**Files:**
- Modify: `firebase.json`
- Modify: `.github/workflows/deploy-prod.yml`
- Modify: `.gitignore`

- [ ] **Step 1: Update firebase.json**

Change `"public": "build"` to `"public": "dist"`. Also remove the `/static/**` cache header rule since Vite uses `assets/` not `static/`:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache, no-store, must-revalidate"
          }
        ]
      },
      {
        "source": "/assets/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  }
}
```

- [ ] **Step 2: Update deploy-prod.yml**

```yaml
name: Deploy to Live Channel

on:
  push:
    branches:
      - home

jobs:
  deploy_live_website:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: "${{ secrets.GITHUB_TOKEN }}"
          firebaseServiceAccount: "${{ secrets.FIREBASE_SERVICE_ACCOUNT }}"
          projectId: tingxi-portfolio
          channelId: live
```

Changes: `actions/checkout@v2` → `v4`, removed `--force` from `npm ci`.

- [ ] **Step 3: Update .gitignore**

Replace `/build` with `/dist`:

```
# production
/dist
```

- [ ] **Step 4: Commit**

```bash
git add firebase.json .github/workflows/deploy-prod.yml .gitignore
git commit -m "chore: update deployment config for Vite (dist output)"
```

---

## Task 8: Install dependencies and verify build

- [ ] **Step 1: Delete node_modules and reinstall**

```bash
rm -rf node_modules package-lock.json
npm install
```

- [ ] **Step 2: Run dev server and verify**

```bash
npm run dev
```

Verify in browser at http://localhost:3000:
- All sections render correctly
- Theme toggle works (light/dark)
- Hash navigation works (click links on home page)
- Section dots show and highlight on scroll
- Contact email copy works
- Back home button works
- No console errors

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Verify: `dist/` directory is created with `index.html` and `assets/` folder.

- [ ] **Step 4: Preview production build**

```bash
npm run preview
```

Verify same behavior as dev server.

- [ ] **Step 5: Commit lock file**

```bash
git add package-lock.json
git commit -m "chore: regenerate package-lock.json after dependency purge"
```

---

## Task 9: Clean up unused font files from public/

**Files:**
- Delete: `public/ChelseaMarket-Regular.ttf` (the `.woff2` version is used instead)
- Delete: `public/Ephidona.woff` (never referenced anywhere)
- Delete unused IBM Plex Mono weight files from `public/IBM_Plex_Mono/`

- [ ] **Step 1: Check which IBM Plex Mono files exist**

```bash
ls public/IBM_Plex_Mono/
```

- [ ] **Step 2: Keep only the 3 font files referenced in fonts.css**

Keep:
- `IBMPlexMono-Regular.ttf`
- `IBMPlexMono-Italic.ttf`
- `IBMPlexMono-SemiBold.ttf`

Delete all other `.ttf` files in the directory (Thin, ExtraLight, Light, Medium, Bold, and all remaining Italic variants).

- [ ] **Step 3: Delete unused font files**

```bash
rm public/ChelseaMarket-Regular.ttf
rm public/Ephidona.woff
cd public/IBM_Plex_Mono && ls *.ttf | grep -v -E '(IBMPlexMono-Regular|IBMPlexMono-Italic|IBMPlexMono-SemiBold)\.ttf$' | xargs rm
```

- [ ] **Step 4: Verify dev server still works**

```bash
npm run dev
```

Check that fonts render correctly in browser.

- [ ] **Step 5: Commit**

```bash
git add -A public/
git commit -m "chore: remove unused font files"
```

---

## Task 10: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update commands section**

Replace the commands section to reflect Vite:

```markdown
## Commands

\`\`\`bash
npm run dev        # Dev server at http://localhost:3000 (hot reload)
npm run build      # Production build -> dist/
npm run preview    # Preview production build locally
npm ci             # Clean install (used in CI)
\`\`\`
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for Vite migration"
```
