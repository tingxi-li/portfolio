# Brutalist Homepage Redesign — Design Spec

## Overview

Redesign Tingxi Li's academic portfolio as a single-page brutalist homepage using the "Specimen Page" approach — a Swiss-brutalist hybrid with strict monochrome palette, extreme typographic contrast, and heavy black borders. Light theme only, no dark mode.

## Design Direction

**Style:** Swiss-brutalist hybrid — strict grid, large typography, minimal color, lots of whitespace, heavy borders. Inspired by type specimen sheets.

**Palette:** Strict monochrome — black (#000), white (#fff), and grays only. No accent colors.

**Theme:** Light only. No theme toggle.

## Layout Structure

### Fixed Navigation Bar
- Sticks to top on scroll
- 3px black bottom border
- Left: "Tingxi Li" in bold monospace
- Right: section links (Bio, Research, Education, Publications, Experience, Teaching, Contact)
- Monospace, uppercase, 11px, letter-spacing: 2px
- Mobile: collapses to name + hamburger → full-screen overlay with large stacked links
- Current section highlighted via bold or underline (no color)

### Hero
- Full-width block below nav, 3px black bottom border
- Name "TINGXI LI" at 80-100px, font-weight 900, letter-spacing -2px, line-height 1
- Subtitle below: "PhD Student · Computer Science · University of Texas at Dallas" in monospace, 13px, gray (#555)

### Primary Content (always visible)

**01 — Bio (left column, 50%)**
- Section label: monospace, 10px, uppercase, letter-spaced, gray
- Small photo (80px, bordered 2px black)
- Bio paragraph: 2nd year PhD student advised by Prof. Wei Yang, research focus, internship seeking note
- 3px black right border separates from adjacent column

**02 — Research Interests (right column, 50%)**
- Section label same style
- Research areas as bold list items: Efficient ML Systems, ML Compilation, Adversarial Attacks on DNNs
- Keywords line in monospace, smaller, gray

**03 — Education (full width)**
- 3px black top and bottom borders
- Three entries: UTD PhD (2024–Present), DUT BS (2019–2024), TUM Visiting (2022)
- Each entry: institution bold, degree and dates inline

### Secondary Content (collapsible, default closed)

Each collapsible section is a bar with:
- 3px black top border (bottom border only when it's the last section)
- Left: numbered section label (monospace, 10px, uppercase)
- Right: `[+]` / `[−]` toggle indicator, 18px bold
- Click anywhere on bar to expand/collapse
- Expanded content appears below the bar in a bordered container
- CSS transition for expand/collapse (simple slide, no spring physics)

**04 — Publications**
- 3 papers, each with: title (bold), authors, venue/year, PDF and code links
- Papers:
  1. "Identify then Exploit..." — 2025, under review
  2. "Efficiency Attack and Defences..." — USENIX Security 2025
  3. "COMET: Closed-loop Orchestration..." — 2025 technical report

**05 — Experience**
- SOPHGO Research Intern (May–Aug 2024): C++ refactoring, testing, documentation
- Amazon Nova AI Challenge (Nov 2024–Jul 2025): Finalist, red teaming, surrogate model development

**06 — Teaching**
- CS 4375 Intro to ML, TA, Fall 2024: office hours, exam design, review lectures
- CS 4375 Intro to ML, TA, Fall 2025: office hours, ML compilation/Triton, coding assignments, slide link

**07 — Contact**
- Email: tingxi.li@utdallas.edu (click to copy)
- CV: /cv.pdf download link
- Google Scholar link
- LinkedIn link

**08 — Misc**
- Cat photo (Jolly-B and Chick-fil-A) with caption

## Typography

**Headings / Name:** Space Grotesk (self-hosted, downloaded from Google Fonts as woff2)
- Name: 80-100px, weight 900
- Section headings within expanded content: 18-24px, weight 700

**Labels:** IBM Plex Mono (already self-hosted)
- Section labels: 10-11px, uppercase, letter-spacing 2px
- Nav links: 11px, uppercase, letter-spacing 2px

**Body:** IBM Plex Mono
- Body text: 15-16px, weight 400, line-height 1.6-1.7
- Metadata/subtitles: 13px, color #555

**Size contrast is intentionally extreme** — the tension between 80px+ headings and 10px labels creates the Swiss poster energy.

## Interactions

**Links:** Black text, 2px black underline with offset. Hover: underline thickens.

**Nav scroll:** Smooth scroll to section anchors. Current section highlighted in nav.

**Collapsible toggle:** Click bar → content slides open/closed with CSS transition. `[+]` ↔ `[−]`.

**Mobile nav:** Hamburger icon replaces inline links. Opens full-screen overlay with stacked navigation.

## Technical Decisions

### What Changes
- Remove ThemeToggle component (no dark mode)
- Remove SectionDots component (replaced by fixed nav)
- Remove BackHome component (single page)
- Simplify hash-fragment routing to simple scroll anchors
- Replace Chelsea Market font with Space Grotesk
- New CSS architecture: single layout.css + variables.css, no global.css complexity
- Rewrite App.jsx as single-page layout with all sections

### What Stays
- React + Vite build system
- All personal content (publications, experience, teaching, bio, etc.)
- IBM Plex Mono font (self-hosted)
- CV as static asset at /cv.pdf
- GA4 analytics (G-84PH5CSDKL)
- Firebase Hosting deployment (home branch → GitHub Actions)
- Profile photo and cat photo from ImageKit CDN

### Component Structure
- `App.jsx` — root layout: nav + hero + sections
- `Section.jsx` — reusable section wrapper (handles numbering, label, optional collapse)
- `Nav.jsx` — fixed navigation bar with mobile hamburger
- No separate page files — all content lives in App.jsx or inline in Section components
- `EntryItem.jsx` — keep for structured entries (publications, experience, teaching)

### CSS Architecture
- `variables.css` — monochrome palette, spacing scale, font stacks
- `layout.css` — grid, nav, section, collapse mechanics
- `fonts.css` — Space Grotesk + IBM Plex Mono declarations

## Content Preservation Checklist

- [x] Name and title
- [x] Bio paragraph with advisor link
- [x] Research interests with keywords
- [x] Education (3 institutions)
- [x] Publications (3 papers with links)
- [x] Experience (2 entries)
- [x] Teaching (2 entries with slide link)
- [x] Contact (email, CV, Scholar, LinkedIn)
- [x] Misc (cat photo)
- [x] GA4 analytics
- [x] CV download
