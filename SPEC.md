# Personal Homepage — Design Spec
## Early WWW Academic Style (1991–94), White Ground

---

## Aesthetic Direction

First-generation academic web page aesthetic — CERN, MIT, Stanford faculty pages
circa 1991–1994. Before CSS was invented. The browser renders the document;
the author writes the content. Structure and typography do all the work.

Two modern concessions applied intentionally:
1. **White background** instead of browser-default gray — cleaner, more readable.
2. **Inline SVG icons** for contact links and publication action links —
   period-inspired pixel/outline style. Replace the era's GIF icons with a
   scalable equivalent that preserves visual character without external assets.

Everything else is authentic to the period.

---

## Visual Vocabulary

| Property | Value |
|---|---|
| Background | `#ffffff` white |
| Body text | `"Times New Roman", Times, serif`, 16px, `#000000`, `line-height: 1.6` |
| Links (unvisited) | `#0000ee` blue, underlined |
| Links (visited) | `#551a8b` purple, underlined |
| Headings | Browser default bold serif — `<h1>` ~28px, `<h2>` ~20px |
| Dividers | `<hr>` with `border-top: 2px inset #999` — beveled, period-accurate |
| Layout | Single column, `max-width: 740px`, centered, `padding: 24px 32px 40px` |
| Contact icons | 18×18px inline SVG, `stroke="currentColor"`, `stroke-width="1.5"` |
| Section icons | 16×16px inline SVG, `stroke="#000"`, `stroke-width="1.5"`, inline before `<h2>` |
| Pub action icons | 13×13px inline SVG, `stroke="#0000ee"` |

---

## Page Structure

Single column, top to bottom. No grid, no flexbox for page layout.

```
<h1>  Your Name
      PhD Candidate — Computer Science, UT Dallas

      [✉ Email]  [◎ Google Scholar]  [in LinkedIn]  [doc CV]

<hr>

<p>   Bio paragraph. 2–3 sentences.

<h2>  ⊙ Research Interests
<p>   Prose paragraph. 3–5 sentences.

<hr>

<h2>  ◫ Publications

      2025  ← monospace year label

        Paper Title                     ← bold, 16px
        Authors                         ← 14px, your name bolded
        Venue, Year                     ← 14px italic muted
        [doc PDF]  [+ arXiv]  [<> Code] ← 13px monospace links

      2024
        ...

<hr>

<h2>  ⌂ Teaching
<ul>  Course — Role — Semester

<hr>

<h2>  ⊡ Experience
<ul>  Role — Org — Year

<hr>

<address>  Last modified: Month Year · email
```

---

## Contact Block

Immediately below name and affiliation. `display: flex`, `gap: 18px`, `flex-wrap: wrap`.
Each item is `<a>` with inline SVG + text label, `color: #0000ee`.

```html
<div style="display:flex; align-items:center; gap:18px; flex-wrap:wrap; margin-top:8px;">
  <a href="mailto:..." style="display:flex; align-items:center; gap:5px; color:#0000ee;">
    <!-- 18x18 envelope SVG -->  Email
  </a>
  <a href="..." style="display:flex; align-items:center; gap:5px; color:#0000ee;">
    <!-- 18x18 globe SVG -->  Google Scholar
  </a>
  <a href="..." style="display:flex; align-items:center; gap:5px; color:#0000ee;">
    <!-- 18x18 linkedin SVG -->  LinkedIn
  </a>
  <a href="/cv.pdf" style="display:flex; align-items:center; gap:5px; color:#0000ee;">
    <!-- 18x18 document SVG -->  CV
  </a>
</div>
```

---

## Icon Specifications

All icons: inline SVG, `fill="none"`, `stroke-width="1.5"`, `stroke-linecap="round"`,
`stroke-linejoin="round"`. No external libraries.

### Contact icons (18×18px)

| Link | Paths |
|---|---|
| Email | `<rect x="2" y="4" width="14" height="10" rx="1"/>` + `<path d="M2 5l7 5 7-5"/>` |
| Google Scholar | `<circle cx="9" cy="8" r="5"/>` + horizontal + curved vertical latitude paths |
| LinkedIn | `<rect x="2" y="2" width="14" height="14" rx="2"/>` + vertical bar + L-shape |
| CV | `<path d="M4 2h7l3 3v11H4V2z"/>` + `<path d="M11 2v3h3"/>` + horizontal line strokes |

### Publication action icons (13×13px, `stroke="#0000ee"`)

| Action | Paths |
|---|---|
| PDF | `<path d="M2 1h6l3 3v8H2V1z"/>` + `<path d="M8 1v3h3"/>` |
| arXiv | `<circle cx="6.5" cy="6.5" r="5"/>` + `<path d="M4 6.5h5M6.5 4v5"/>` |
| Code | `<rect x="1" y="2" width="11" height="9" rx="1"/>` + `<path d="M4 5l2 2-2 2M7 9h3"/>` |

### Section heading icons (16×16px, `stroke="#000"`, placed inline before `<h2>` text)

| Section | Paths |
|---|---|
| Research Interests | `<circle cx="8" cy="8" r="6"/>` + `<path d="M8 5v3l2 2"/>` |
| Publications | `<path d="M3 2h10l1 2H2L3 2z"/>` + `<rect x="2" y="4" width="12" height="9" rx="1"/>` + `<circle cx="8" cy="8.5" r="2"/>` |
| Teaching | `<path d="M2 13V5l6-3 6 3v8"/>` + `<rect x="6" y="9" width="4" height="4"/>` + `<path d="M2 5l6 3 6-3"/>` |
| Experience | `<rect x="2" y="4" width="12" height="9" rx="1"/>` + handle path + center dot |

Place with `display: inline-block; vertical-align: middle; margin-right: 6px`.

---

## Publications — Structure & Readability

Use `<ul class="pub-list">` with `list-style: none; padding: 0; margin: 0`.

### Year label
A `<li class="pub-year">` before each year group.
Style: `font-family: "Courier New", monospace; font-size: 13px; font-weight: bold;
letter-spacing: 0.06em; color: #777; text-transform: uppercase; margin: 20px 0 10px`.

### Entry
Each paper is a `<li class="pub-entry">` with:
- `padding: 14px 0 14px 16px`
- `border-left: 3px solid #ddd` — groups the four lines into one visual unit
- `margin-bottom: 16px`

**Four lines, strictly in order, each as `display: block`:**

```
1. pub-title   — font-size: 16px; font-weight: bold; margin-bottom: 4px; line-height: 1.4
2. pub-authors — font-size: 14px; color: #333; margin-bottom: 3px; line-height: 1.5
3. pub-venue   — font-size: 14px; font-style: italic; color: #555; margin-bottom: 8px
4. pub-links   — display: flex; gap: 10px; flex-wrap: wrap
```

Your name in the author list: `<b>Your Name</b>`.
Venue includes full name + abbreviation + year: e.g. `International Conference on
Machine Learning (ICML), 2025`.

### Artifact links
Each link: `display: inline-flex; align-items: center; gap: 4px; font-size: 13px;
font-family: "Courier New", monospace; color: #0000ee; text-decoration: underline`.
Format: icon + `[PDF]`, icon + `[arXiv]`, icon + `[Code]`.

### Example HTML

```html
<ul class="pub-list">

  <li class="pub-year">2025</li>

  <li class="pub-entry">
    <span class="pub-title">Paper Title in Full, Sentence Case</span>
    <span class="pub-authors"><b>Your Name</b>, Co-Author One, Co-Author Two</span>
    <span class="pub-venue">Full Venue Name (ABBREV), 2025</span>
    <div class="pub-links">
      <a href="#">[PDF icon] [PDF]</a>
      <a href="#">[arXiv icon] [arXiv]</a>
      <a href="#">[Code icon] [Code]</a>
    </div>
  </li>

  <li class="pub-year">2024</li>

  <li class="pub-entry">
    ...
  </li>

</ul>
```

---

## Teaching & Experience

`<ul>` with `<li>` entries. Each on one line:
`<b>CS XXXX — Course Name</b>, Institution — Role — Semester`

---

## Typography

| Element | Spec |
|---|---|
| Body | `"Times New Roman", Times, serif`, 16px, `#000`, `line-height: 1.6` |
| `<h1>` | ~28px bold serif, browser default |
| `<h2>` | ~20px bold serif, `margin: 20px 0 8px` |
| Affiliation line | 15px, `color: #444` |
| Pub title | 16px bold |
| Pub authors | 14px, `color: #333` |
| Pub venue | 14px italic, `color: #555` |
| Pub links | 13px monospace, `color: #0000ee` |
| Year labels | 13px monospace bold uppercase, `color: #777` |
| Footer `<address>` | 14px italic, `color: #444` |

Zero custom fonts. No Google Fonts. No `@font-face`.

---

## Complete CSS

```css
body {
  background: #ffffff;
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  color: #000000;
  max-width: 740px;
  margin: 0 auto;
  padding: 24px 32px 40px;
  line-height: 1.6;
}
hr { border: none; border-top: 2px inset #999; margin: 18px 0; }
a { color: #0000ee; text-decoration: underline; }
a:visited { color: #551a8b; }

.pub-list { list-style: none; margin: 0; padding: 0; }
.pub-year {
  font-family: "Courier New", monospace;
  font-size: 13px; font-weight: bold;
  letter-spacing: 0.06em; color: #777;
  text-transform: uppercase;
  margin: 20px 0 10px;
}
.pub-entry {
  padding: 14px 0 14px 16px;
  border-left: 3px solid #ddd;
  margin-bottom: 16px;
}
.pub-title  { display: block; font-size: 16px; font-weight: bold; margin-bottom: 4px; line-height: 1.4; }
.pub-authors{ display: block; font-size: 14px; color: #333; margin-bottom: 3px; line-height: 1.5; }
.pub-venue  { display: block; font-size: 14px; font-style: italic; color: #555; margin-bottom: 8px; }
.pub-links  { display: flex; gap: 10px; flex-wrap: wrap; }
.pub-links a {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 13px; font-family: "Courier New", monospace;
  color: #0000ee; text-decoration: underline;
}
```

---

## What NOT to Do

- Custom fonts of any kind
- CSS Grid or Flexbox for page layout (flex only for contact row and pub-links)
- `border-radius` on structural elements
- Box or drop shadows
- Colors beyond the values above
- Hover animations or transitions
- Sticky header or navbar
- Cards or box-model components
- JavaScript
- Dark mode
- Gradients

---

## Tech Stack

| | |
|---|---|
| File | Single `index.html` |
| CSS | One `<style>` block (~30 lines including pub rules) |
| Icons | Inline SVG `<path>` elements — no external library |
| JS | None |
| Fonts | System defaults only |
| Hosting | GitHub Pages, Netlify, or any static host |
| Mobile | Single column reads fine at any width — no breakpoints needed |