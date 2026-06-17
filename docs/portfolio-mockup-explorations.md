# Portfolio Mockup Explorations

Durable record of a multi-round design exploration run against the
`tingxi.li` portfolio on branch `mockup/direction-a`. All variant files
were deleted at the end of the session; this document is what survives.

The exploration spanned **two 10-agent parallel rounds** plus
between-round iterations. ~22 distinct variants were tried in total. All
shared the same content spec (publications, projects, education,
internship, teaching, misc) and differed only in layout, palette,
typography, and interaction.

---

## Round 1 — Conservative → Experimental Spectrum (v01–v10)

A single content spec (`variants/CONTENT.md`) was handed to 10 parallel
subagents, each with a distinct design brief. Variants were ordered along
a deliberate axis from "most conservative academic" to "most
experimental interactive."

| # | Slug | Direction | Reference points |
|---|---|---|---|
| v01 | `classic-academic` | Don Knuth / 2000s CS faculty page. Times New Roman, navy hyperlinks, no JS, no animation. Single column ~720px, centered, no dark mode. | Knuth-CS.Stanford homepage, Olukotun, MIT faculty pages |
| v02 | `modern-academic` | EB Garamond body + Inter headings, terracotta accent on off-white. Sticky left TOC sidebar (>=1100px), click-to-copy email. | distill.pub author pages, Chris Olah, Tom Brown, Karpathy's older site |
| v03 | `swiss-typographic` | Strict 12-col grid, Inter Tight, B/W + ONE red accent (#e60012). Section labels in col-1, content cols 2–11. Click-to-expand abstracts with sliding red bar on hover. | Müller-Brockmann, Vignelli, Apple HIG docs |
| v04 | `editorial-magazine` | Playfair display + Source Serif body, drop caps, pull quotes, cream + oxblood + gold. Scroll-fade reveals. 2-col on >=1200px. | The New Yorker, The Atlantic, Wired long-read |
| v05 | `terminal` | TUI/Neovim aesthetic. ASCII figlet banner with type-on-load, file-tree sidebar (nerdtree-style), JetBrains Mono everywhere, vim keymap (`j/k/gg/G/?//`), Neovim statusline footer. Dark default + light toggle. | bat, Neovim, Tokyo Night theme |
| v06 | `gallery-grid` | Hero cover + 3-col pastel card grid; cards flip on click to reveal abstracts (CSS rotateY). Dark mode toggle. Geist/Inter, bouncing scroll chevron. | Vercel templates, Linear's site, Apple product pages |
| v07 | `warm-personal` | Substack-warm. Fraunces serif + Source Sans body, eggshell #fdf5e6 + sage #6b8e5a + dusty rose chips, hand-drawn SVG squiggle dividers, a fixed blinking-cat SVG. Latte ↔ Mocha theme toggle. | Tumblr 2014, Substack author pages |
| v08 | `product-dashboard` | Linear/Vercel/Raycast UI. Persistent 260px sidebar with scrollspy + counts, sticky top bar with breadcrumb + ⌘K trigger + profile badge, status pills (Published/In Review/Tech Report/Preprint), command palette modal. Dark default. | Linear, Vercel, Notion, Raycast |
| v09 | `scrolly-narrative` | NYT/Pudding scrollytelling. Full-viewport scenes cross-fade between deep-navy → forest → cream → graphite palettes, animated stat counters (58×, 17×, 12.5×, 314×, 96.7%), animated SVG bar chart, drawn-line timeline, sticky 2px progress bar, left-edge dot nav. | Pudding.cool, NYT scrollytelling, Apple keynote scroll |
| v10 | `experimental-immersive` | awwwards-tier. Canvas2D particle field with cursor repulse + parallax, glass-morphism cards with 3D tilt, magnetic neon cursor, "decode abstract" glitch reveal. Hue-shifting gradient name display, kanji-free but maximalist. Respects `prefers-reduced-motion`. | awwwards.com winners, FWA, Bruno Simon |

### User reaction to Round 1
- **Liked:** v10 interactive effects (particles, glass cards, magnetic cursor, decode reveal), v05 terminal style.
- **Disliked:** long scrolling required to read everything, crowded/heavy first-screen text density.

---

## Between-Round Iterations

### v11 — IDE Cockpit (synthesis attempt)
First pass: split-pane IDE layout (left file-tree nav like v05; right
content pane with v10's glassy cards + particles + magnetic cursor +
decode reveal + ⌘K palette). Strict `100dvh` + `html/body { overflow:
hidden }`; only the right pane scrolled.

This was iterated three times:
1. **Sidebar IDE** — Built the split-pane cockpit. Worked but felt heavy.
2. **Claude-Code-CLI rewrite (no sidebar)** — Top prompt strip,
   horizontal command pills under it (`about · publications · projects
   · …`), single content panel below that swapped on click. Light theme,
   mono only for chrome, sans body. Still pane-only-scroll discipline.
3. **Compact CLI session (relaxed scroll)** — Page scrolls normally, but
   total height stays ~2-3 viewport heights. Looked like a real terminal
   session reading top-to-bottom: prompt strip → `› whoami` block → `›
   ls publications/` block → etc. 2-column grids on pubs/projects to
   keep sections short.

### v12 — Neo-Brutalism (first attempt)
Chunky 3-4px black borders, hard offset shadows (`6px 6px 0 0 #000`,
no blur), saturated palette (yellow #FCDD2D, pink #FF2E97, electric blue
#2D5BFF, lime #B8FF2D, coral #FF6A4A), chunky display type
(Archivo Black / Space Grotesk 900), slight rotations on stickers.
Press-button hover physics (shadow snaps `6px 6px → 2px 2px`, card
translates `4px 4px`).

User then said "go back to brutalism instead of neo brutalism" — see
Round 2 v12.

---

## Round 2 — Wide Exploration, No Constraints (v12–v21)

User said: "drop v11, spawn 10 subagents, no constraints." Genuinely
wild design directions, no scroll discipline, no readability bar.

| # | Slug | Direction |
|---|---|---|
| v12 | `brutalism` (raw) | Web brutalism circa 2010s — NOT neo. Default browser styles, Times New Roman, default blue underlined links, `<font>`/`<table>`/`<blockquote>`/`<details>`. No CSS framework, no JS, no fonts, no color scheme. Intentionally crude. | brutalistwebsites.com, Drudge Report, Bloomberg 1996, Jakob Nielsen useit.com |
| v13 | `y2k-geocities` | 2001 personal homepage. Tiled holographic-stars CSS bg, rainbow 3D word-art header, animated SVG construction worker, `<marquee>` scrollers, fake visitor counter (localStorage-incremented), nested-`<table>` layout with `border="3"`, Comic Sans + Times New Roman mix, deprecated `<font color>` tags, rainbow/fire `<hr>`s, sparkle bullets, "Best in Netscape 4.0 at 800×600" badge, webring footer. |
| v14 | `vaporwave` | Animated sunset gradient with CSS-perspective grid floor receding to horizon, glowing sun disc, marquee "AESTHETICS" band, RGB-shifted glitch hero, kanji decorations (`立人` / `美学` / `論文`), pulsing pink cursor, floating moai busts + Doric columns, periodic JS body-glitch every 5-8s, scanline overlay, palm-tree SVGs, Memphis shapes. Publications rendered as "VHS cassette" cards with spinning reels and a PLAY button that opens the abstract with a CRT scanline animation. |
| v15 | `newspaper-broadsheet` | 1920s daily. Warm paper-textured bg with SVG-noise grain, UnifrakturMaguntia blackletter masthead ("THE TINGXI TIMES") flanked by circular crests, dateline strip ("WEATHER: KERNEL FOG, CACHE WARM · CITY EDITION · PRICE: TEN CENTS"), 3-column above-the-fold with bulletin sidebar, halftone-overlaid portrait, drop caps, italic decks, byline rules, pull quotes with flourishes. Education/internship/teaching as classified ads at the bottom. |
| v16 | `zine-photocopy` | Xerox zine aesthetic. Off-white paper with SVG turbulence grain, torn-edge `clip-path` cut-out blocks at jagged ±2-3° tilts, scotch-tape rectangles at corners, marker scribble arrows ("ME ↑"), wavy red scribble circles around keywords, grayscale/contrast-2 photocopied portrait, rotated chunky stickers ("PHD VIBES", "GPU GANG", "RAD!"), Permanent Marker / Caveat / Architects Daughter / Indie Flower / Courier Prime mixed throughout, scissor cut-lines, ink-blob splotches, ASCII masthead footer. |
| v17 | `pokemon-tcg` | Each publication is a full Base-Set Pokemon card. HP top-right, energy-type icon (⚙️ Compiler, 🛡️ Security, 🧠 ML, 📚 Survey, ⚡ Performance), attacks with energy costs derived from paper punchlines (e.g. AESOP's "Latency Inflation" attack inflates opponent FLOPs by 58×), weakness/resistance/retreat cost, holo-foil shimmer (animated rainbow gradient + `mix-blend-mode`) on rare cards, expansion symbol, "Card #001/006" collector marker. Tingxi himself is the hero card. Trainer-class cards for Education/Experience/Teaching. Binder-sleeve 3×3 grid layout. |
| v18 | `excel-spreadsheet` | Excel 2016 chrome — quick-access bar, green title bar, ribbon (Home/Insert/etc.), Name Box + fx + formula bar, status bar with AutoSum totals. Real `<table>` grid with sticky A-G column headers + 1-N row numbers + gridlines. Sheet-tab strip toggles seven sheets (About, Publications, Projects, Education, Experience, Teaching, Misc). Click any cell → highlights it with the light-blue/green Excel selection rectangle and updates the Name Box and formula bar in real time. Conditional formatting on venue cells. |
| v19 | `jrpg-menu` | FFIV/Chrono Trigger menu screen. Starry night sky bg, pixelated character portrait, stats panel (LV.25, HP 4750/5000 ▰▰▰▰▰▰▰▰▰▱, MP 2200/3000, EXP 87,400, GIL $0), main menu items (▶ ITEMS / MAGIC / EQUIP / STATUS / FORMATION / CONFIG / SAVE). Publications are spells with MP costs derived from author count; projects are equipped weapons; education+experience under STATUS; teaching under FORMATION (party formation); CV under SAVE. Dialogue box at the bottom with typewriter text reveal. "Press Start 2P" font for headers, Inter for body. Arrow-key nav + Enter/Esc. |
| v20 | `subway-signage` | MTA/Tube wayfinding. White-on-black "TINGXI.LI METRO SYSTEM" header. Each section is a colored line (🟥 ABOUT, 🟦 PUBLICATIONS as stations on a blue line, 🟧 PROJECTS, 🟩 EDUCATION, 🟪 EXPERIENCE, 🟨 TEACHING, ⬛ MISC). Horizontal SVG line diagrams with station dots labeled by publication title + year. Departure-board widget with flip-board / split-flap CSS animation ("NEXT ARRIVAL: ISSTA Paper · 3 weeks · Track 2"). Pictograms, station-name signs in Helvetica Bold ALL CAPS, transfer-station bullets where research themes intersect. Pure Helvetica/Inter Tight typography. |
| v21 | `cyberpunk-hud` | Ghost-in-the-Shell HUD overlay. Near-black bg with animated Matrix-style data rain (faint cyan katakana scrolling), page-open boot animation ("ACCESSING PERSONNEL FILE..." → "DECRYPTING CV..." → glitch → main HUD). Identity readout (`SUBJECT: TINGXI_LI / CLASS: PHD_CANDIDATE / AFFILIATION: UT_DALLAS / STATUS: ACTIVE / CLEARANCE: RESEARCH`), live timestamp + fake coords. Hexagonal portrait frame with RGB-shift glitch on hover. Publications as HUD cards with classification level + animated scan-line overlay. Kanji decoration (`論文` / `実験` / `カーネル`). Periodic page-wide RGB-shift jiggle every 8-12s. "Terminal" widget at bottom looping fake `> ls publications/` commands. |

Both rounds delivered, no live variant files remain after cleanup. This
table is the canonical record.

---

## User Preference Timeline

Tracking how the brief evolved from session start to end:

| Step | What the user asked / signaled |
|---|---|
| Start | "Range from most conservative academic to most fancy/interactive" → spectrum motivated Round 1. |
| After Round 1 | Liked v10 (interactive) + v05 (terminal). Disliked long-scroll and dense first-screen. |
| Synthesis attempt | "Keep v11" (the IDE cockpit synthesis), then "no sidebar, light theme, Claude Code CLI style, less mono globally" → drove v11 iterations. |
| Brutalism direction | "v12 go back to brutalism instead of neo brutalism" → original RAW brutalism not the chunky-borders revival. |
| Final reset | "Drop all, spawn 10 subagents, no constraints" → Round 2 wide exploration. |
| End | "Drop all, take down notes, revert to committed version." |

The arc: started narrow-spectrum (v01–v10) → identified two favorite
genres (terminal + immersive) → tried hybrid layouts (v11) → relaxed
constraints repeatedly → wide exploration (v12–v21) → reset.

User landed without committing to any one direction — they explored the
design space and are deferring the choice. Future iteration should
consult this record first.

---

## Bugs and Gotchas Found by Audit Workflows

The Round-1 v10 immersive variant + the Round-1.5 v11 synthesis were
each put through 4-dimension adversarial review workflows. These are the
real (not speculative) issues caught and fixed:

1. **Port 5060 is Chromium-blocked (SIP protocol).** `ERR_UNSAFE_PORT`
   surfaces in Chrome/Edge/Brave regardless of what's listening. Also
   blocked nearby: 5061 (SIPS), 6000 (X11), 6665–6669, 6697 (IRC).
   Tested-safe ports used: 5050–5059, 5070–5081.

2. **`body { cursor: none }` without a JS gate.** If JS hasn't started
   yet (or fails), the native cursor is hidden and the JS-drawn cursor
   doesn't exist. Page appears frozen. Fix: gate the rule behind a
   JS-added class, e.g.:

   ```css
   body { cursor: auto; }
   html.js-cursor-ready body { cursor: none; }
   ```

   ```js
   if (!isTouch && ring && dot) {
     document.documentElement.classList.add('js-cursor-ready');
     /* ... wire mousemove + rAF tick ... */
   }
   ```

   Also add a `<noscript>` style block that restores `cursor: auto`.
   This was the actual cause of the first "5060 is down" report (port
   was the immediate cause; if the user had reached the page they would
   have hit this next).

3. **Custom cursor initialized at off-screen `-100,-100`.** Before the
   first `mousemove`, the cursor lives outside the viewport. Initialize
   at viewport center instead:

   ```js
   let rx = window.innerWidth / 2, ry = window.innerHeight / 2;
   let dx = rx, dy = ry, tx = rx, ty = ry;
   ```

4. **Abstract text only in `data-abstract` attribute.** v10 had empty
   `<p>` elements; abstract text was injected by the decode-reveal JS on
   click. Consequences: invisible to Ctrl-F, invisible to screen
   readers, gone if JS fails. Fix: put real text in the `<p>`, cache
   `textContent` on first reveal:

   ```js
   const finalText = para.dataset.full || (para.dataset.full = para.textContent.trim());
   ```

   Restore on close (so a mid-animation close doesn't leave scrambled
   chars in the DOM):

   ```js
   para.textContent = finalText;
   ```

5. **`transform-style: preserve-3d` flattened by `overflow: hidden` or
   `backdrop-filter` on the same element.** Per spec, those properties
   force CSS "grouping" which flattens 3D descendants. The "3D tilt"
   feature degraded silently to a 2D skew. Fix: put `perspective` on a
   non-clipping wrapper, and apply the `transform-style: preserve-3d` +
   the rotate transform to the inner element:

   ```css
   .card-tilt { perspective: 1200px; }
   .card { backdrop-filter: blur(20px); overflow: hidden; }
   .card .tilt-inner { transform-style: preserve-3d; will-change: transform; }
   ```

6. **Cascade order bug: `height: 100dvh` before `height: 100vh`.** The
   later declaration wins. Modern browsers honor dvh and would track the
   visible viewport (excluding the URL bar) — but only if the dvh rule
   wins the cascade. Write the fallback first:

   ```css
   body {
     height: 100vh;     /* fallback */
     height: 100dvh;    /* now actually applies on modern browsers */
   }
   ```

7. **Missing `html { overflow: hidden }` when only body had it.** For
   strict no-page-scroll discipline, html ALSO needs the rule. Without
   it, mobile URL-bar height can push the html scroll context. Add:

   ```css
   html { height: 100%; overflow: hidden; overscroll-behavior: none; }
   ```

8. **Keyboard handlers firing while user is typing in an input.** vim-
   style `j`/`k`/`?`/`t` shortcuts must skip when
   `document.activeElement.tagName` is `INPUT`/`TEXTAREA` OR
   `.isContentEditable === true`. Also gate on
   `!e.metaKey && !e.ctrlKey && !e.altKey` for single-letter shortcuts
   so `⌘K` etc. don't both fire.

9. **`requestAnimationFrame` loops never pausing in background tabs.**
   Particles + cursor parallax + tilt all running 60fps in a hidden tab
   burns cycles. Add visibilitychange:

   ```js
   let rafId = null;
   function draw() { /* ... */ rafId = requestAnimationFrame(draw); }
   document.addEventListener('visibilitychange', () => {
     if (document.hidden) { cancelAnimationFrame(rafId); rafId = null; }
     else if (!rafId) rafId = requestAnimationFrame(draw);
   });
   ```

10. **`prefers-color-scheme: dark` boot-fallback overriding intended
    light default.** If the brief is "light by default with dark
    toggle," do NOT add a `@media (prefers-color-scheme: dark) { :root
    { ... } }` block that auto-flips on OS theme. Light default means
    light unconditionally; the toggle is the only way to dark.

---

## Reusable Interactive-Effect Snippets

These are worth keeping in mind for any future variant that wants
"interactive but not gimmicky."

### Canvas2D particle field with cursor parallax + repulse
- ~80–120 particles, cyan/magenta hue split, ~0.18 base drift velocity.
- Each particle has a `depth` ∈ [0.2, 1.0] for parallax.
- Cursor proximity (`d² < 16000`) applies a repulse force scaled by
  `(1 - d²/16000) × 0.6`.
- Optional connecting lines between particles within range (`dd <
  11000`) with alpha proportional to closeness.
- Sized to viewport with `dpr = min(devicePixelRatio, 2)`.
- See bug #9 above for visibilitychange pausing.

### Decode-reveal animation for abstracts
- Scramble character set: `"█▓▒░ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890!@#$%&*<>/{}"` (or just A-Z + symbols for lighter feel).
- Duration ~700ms total, per-char stagger ~`dur / total`.
- Each char goes through three phases:
  1. Pre-stagger: random scramble char.
  2. Mid-stagger (180ms window): 40% chance of resolving, 60% scramble.
  3. Post: final char locked.
- Cache `textContent` BEFORE first call (bug #4 above).

### Magnetic cursor
- Two fixed-position divs: a small dot (`mix-blend-mode: difference`) +
  a thin ring (`mix-blend-mode: screen`).
- All elements with `.magnet` class are tracked; on each rAF tick,
  find the closest within 80px and lerp the ring position toward the
  midpoint of cursor and magnet center (0.45/0.55 weight).
- See bug #2 + #3 for the must-fix gotchas.

### 3D tilt on cards
- See bug #5 for the structural setup.
- On `mousemove`, compute `px = (e.clientX - rect.left) / rect.width`
  and apply `rotateY((px - 0.5) * 6deg)` plus `rotateX(-(py - 0.5) *
  6deg)`. Lerp toward target each rAF (~0.12 ease factor).
- Reset to 0/0 on `mouseleave`.

### ⌘K command palette
- Fixed centered modal, `backdrop-filter: blur` on a full-viewport
  scrim.
- Input filters a flat list of `{ id, label, parent }` nodes.
- Arrow keys move selection, Enter triggers (scroll to / load
  content), Esc closes. Click outside scrim closes.

### Vim-style keymap for sectioned content
- `j`/`k` next/prev section via `IntersectionObserver`.
- `g g` to top, `G` to bottom.
- `/` focuses a search input (filter the tree).
- `?` shows a help popover with all bindings.
- `t` toggles theme.
- Guard every handler (bug #8).

---

## Files to Re-Read

The shared content spec was at `variants/CONTENT.md` (now deleted). It
contained the canonical text for every publication, project, education
entry, teaching course, and contact line — bolded `T. Li` markers, all
the abstract paragraphs, and the photo URLs. The same content lives in
the React source (`src/App.jsx`) and in `resume-latex/resume.tex` —
either is sufficient to regenerate.

External assets that survived (still on ImageKit):
- Portrait: `https://ik.imagekit.io/tingxi/myphoto2.jpeg`
- Cats: `https://ik.imagekit.io/tingxi/SDIM0107.jpg`

CV PDF: `public/cv.pdf` (also `build/cv.pdf`, `dist/cv.pdf`).
