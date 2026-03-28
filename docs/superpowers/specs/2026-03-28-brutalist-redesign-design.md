# Brutalist Grid Redesign — Design Spec

## Context

The current portfolio is a single long-scroll page with 9 sections. Users must scroll up and down to browse content, which is suboptimal for a personal academic site. This redesign replaces the scroll layout with a brutalist grid-based design inspired by sigmaphoto.com/lenses — a full-viewport tile grid as the landing page, with section content accessible via overlays.

## Visual Direction

- **Style:** Brutalism — sharp rectangles, bold type, high contrast, no rounded corners
- **Colors:** Off-white (#eaeaea) / near-black (#0b0b0b) base + electric blue (#0000FF) accent
- **Typography:** Space Grotesk 700 (display/headings), IBM Plex Mono (body text)
- **Dark/light theme toggle preserved**, restyled to match brutalist aesthetic

## Landing Page — Tile Grid

Full-viewport CSS Grid of 8 section tiles (home section absorbed into grid header).

**Layout:**
- Header row spanning full width: site title "tingxi's homepage" in Space Grotesk uppercase
- 4×2 grid of tiles below (desktop), 2×4 (tablet ≤900px), 1×8 (mobile ≤480px)
- Thin 2px gap between tiles, colored as border/seam
- Each tile shows: section number (01–08) in mono font, section name in bold uppercase

**Hover effects:**
- Background/foreground color inversion (0.1s snap)
- Section number turns electric blue
- 4px blue accent bar slides in from left along bottom edge (0.2s)

**Sections mapped to tiles:**
1. Bio → 01
2. Research Interests → 02
3. Education → 03
4. Google Scholar → 04
5. Experience → 05
6. Teaching → 06
7. Contact → 07
8. Misc → 08

## Overlay / Modal

Clicking a tile opens a full-screen overlay with that section's content.

**Structure:**
- Fixed position covering full viewport, z-index 5000
- Sticky header with close button (X) — square, thick border, 48×48px
- Scrollable body area: max-width 72ch, centered, with responsive padding
- Content is the existing page component rendered as-is

**Behavior:**
- Open animation: fade + slide-up (0.25s ease)
- Close animation: reverse (0.2s), triggered by X button or Escape key
- URL hash synced: opening Bio pushes #bio, closing pushes /
- Direct navigation to /#bio opens the overlay on load
- Focus trapped within overlay for accessibility

## Component Architecture

**New components:**
- `src/components/TileGrid.jsx` — grid landing page
- `src/components/Overlay.jsx` — full-screen overlay modal

**Removed components:**
- `src/components/SectionDots.jsx` — replaced by grid
- `src/components/BackHome.jsx` — replaced by overlay close
- `src/pages/home.jsx` — absorbed into grid header

**Modified:**
- `src/App.jsx` — complete rewrite: renders TileGrid + conditional Overlay based on activeSection state
- `src/components/ThemeToggle.jsx` — CSS-only restyle (square, thicker border)

**Unchanged:** All 8 page components (bio through misc), EntryItem, EmLink

## CSS Architecture

**File structure:**
- `src/css/fonts.css` — swap Chelsea Market → Space Grotesk
- `src/css/variables.css` — new color tokens, font vars, remove obsolete vars
- `src/css/global.css` — gut old layout styles, restyle remaining components
- `src/css/grid.css` — NEW: tile grid layout, hover effects, responsive breakpoints
- `src/css/overlay.css` — NEW: overlay positioning, animation keyframes, scroll area

**Key CSS changes:**
- #root: full viewport (100vw × 100dvh), overflow hidden
- All border-radius → 0 (tags, buttons, toast, toggle)
- .title uses --font-display (Space Grotesk) instead of Chelsea Market
- Remove: section-dots, back-home, aligned-links, home-layout styles

## Typography

**Space Grotesk** (self-hosted woff2):
- Bold 700: tile labels, section titles, grid header, overlay close button
- Loading: font-display swap (no FOUT-blocking needed for brutalist style)
- Remove Chelsea Market font file and font-load blocking script from index.html

**IBM Plex Mono** (unchanged): body text, entry items, tags, captions

## Theme System

| Token | Light | Dark |
|-------|-------|------|
| --bg | #eaeaea | #0b0b0b |
| --fg | #0b0b0b | #eaeaea |
| --accent | #0000FF | #0000FF |
| --border | #0b0b0b | #eaeaea |
| --muted | #666666 | #aaaaaa |

Blue accent consistent across both themes. index.html critical CSS updated accordingly.

## Accessibility

- Escape key closes overlay
- Focus trap within overlay when open
- prefers-reduced-motion: reduce disables all animations
- Tiles are button elements, overlay uses role="dialog" with aria-modal="true"

## Files to Delete

- `src/components/SectionDots.jsx`
- `src/components/BackHome.jsx`
- `src/pages/home.jsx`
- `public/ChelseaMarket-Regular.woff2`
