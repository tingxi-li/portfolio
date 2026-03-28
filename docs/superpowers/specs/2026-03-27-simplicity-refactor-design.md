# Portfolio Simplicity Refactor

## Goal

Refactor the portfolio project for simplicity and clarity: clean up dead code, modernize the build toolchain (CRA to Vite), and standardize component patterns — all while keeping the visual design identical.

## 1. CRA to Vite Migration

- Replace `react-scripts` with `vite` + `@vitejs/plugin-react`
- Add `vite.config.js` at project root
- Move `public/index.html` to root `index.html` (Vite convention), updating asset paths
- Inline scripts (theme flash prevention, font loading, GA4) stay in `index.html`
- Remove CRA-specific boilerplate: `cra-template` dependency, `eslintConfig` and `browserslist` from `package.json`
- Update npm scripts: `start` → `vite`, `build` → `vite build`, `test` → remove (no tests exist)

## 2. Dependency Purge

**Remove** (unused in source code):
- `antd`
- `firebase`
- `framer-motion`
- `react-terminal-ui`
- `@mui/material`, `@mui/icons-material`, `@mui/system`
- `@emotion/react`, `@emotion/styled`
- `ajv`, `ajv-keywords`
- `cra-template`
- `typescript`
- `web-vitals`
- `@babel/plugin-proposal-private-property-in-object` (devDep)

**Keep**: `react`, `react-dom`, `lucide-react`

## 3. CSS Cleanup

### Font-face trimming
Reduce IBM Plex Mono from 16 `@font-face` declarations to 3:
- Regular (400, normal)
- Regular Italic (400, italic)
- SemiBold (600, normal)

These are the only weights referenced in the codebase.

### Dead CSS removal
- Commented-out DM Serif Text font-faces
- `--font-serif` and `--font-serif-italic` custom properties (everything uses `--font-mono`)
- `.content em, .content i` rule (serif italic override for a font family no longer used)
- `.use-italic` and `.use-oblique` utility classes (never used in JSX)
- `.content` class itself (replaced by `.section-text`, see below)

### File organization
Split the current monolithic `global.css` into:
- `src/css/fonts.css` — `@font-face` declarations only
- `src/css/variables.css` — custom properties, theme overrides, reset (`html, body`), root layout (`#root`)
- `src/css/global.css` — all component/utility styles (section dots, entries, tags, aligned links, etc.)

Import order in `index.js`: fonts → variables → global.

### Spacing
Replace `<br />` tags used for vertical spacing with CSS margins:
- Add `.section-content` class with appropriate top margin for section body content
- Add bottom padding on `<section>` elements instead of trailing `<br />` tags

## 4. Component Cleanup

### New CSS classes
- `.section-text` — replaces the repeated inline style `{fontFamily: "var(--font-mono)", fontSize: "var(--smaller-text-font-size)", fontWeight: 400}` used across most pages
- `.section-text--lg` — variant with `font-size: var(--text-font-size)` for the few pages that use the larger size
- `.section-text--highlight` — adds `color: var(--highlight-font-color)` for the internship callout
- `.section-text--center` — adds `text-align: center` for education page entries

### Redundant import removal
Remove `import "../global.css"` from individual page components. It is already imported once in `index.js`.

### Page structure standardization
Every page component follows this pattern:
```jsx
export default function PageName() {
  return (
    <>
      <h2 className="title">Page Title</h2>
      {/* content */}
    </>
  );
}
```
- Use `<h2>` instead of `<p className="title">` (semantically correct — each section heading)
- Remove wrapping `<main>` tags (the sections in `App.js` provide the landmarks)
- Remove all inline style overrides that duplicate what CSS classes already provide

### HTML fix
Fix invalid nested `<p>` inside `<p>` in `research-interests.js`.

## 5. Contact Page: Theme-Aware Buttons

`.circle-btn` currently hardcodes:
```css
border: 2px solid #000;
background: #fff;
color: #000;
```
Change to:
```css
border: 2px solid var(--border);
background: var(--bg);
color: var(--fg);
```
Same for `:hover` state — use `var(--fg)` / `var(--bg)` instead of `#000` / `#fff`.

## 6. index.html Updates

- Move from `public/index.html` to root `index.html`
- Add `<script type="module" src="/src/index.js"></script>` in `<body>` (Vite entry point)
- Update font preload paths if needed (Vite serves `public/` at root)
- Remove CRA's `%PUBLIC_URL%` template syntax (not present currently, but verify)

## Out of Scope

- No visual/design changes
- No new features
- No routing changes
- No content changes
- No deployment pipeline changes (GitHub Actions config stays as-is, just needs `npm run build` to still work)
