# Brutalist Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio as a Swiss-brutalist single-page homepage with strict monochrome palette, extreme typographic contrast, collapsible sections, and fixed navigation.

**Architecture:** Single App.jsx with all content inline. Two new components: Nav.jsx (fixed navigation with mobile hamburger) and Section.jsx (reusable wrapper with optional collapse). CSS split into three files: variables.css, fonts.css, layout.css. Light theme only.

**Tech Stack:** React 19, Vite, Space Grotesk (self-hosted woff2), IBM Plex Mono (self-hosted ttf)

---

### Task 1: Download and Set Up Space Grotesk Font

**Files:**
- Create: `public/SpaceGrotesk-Variable.woff2`
- Modify: `src/css/fonts.css`

- [ ] **Step 1: Download Space Grotesk woff2**

Run:
```bash
curl -L -o public/SpaceGrotesk-Variable.woff2 "https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mPb54C_k3HqUtEw.woff2"
```

- [ ] **Step 2: Rewrite fonts.css**

Replace the entire contents of `src/css/fonts.css` with:

```css
/* Space Grotesk — variable weight (300–700), self-hosted */
@font-face {
  font-family: "Space Grotesk";
  src: url("/SpaceGrotesk-Variable.woff2") format("woff2");
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}

/* IBM Plex Mono — self-hosted */
@font-face {
  font-family: "IBM Plex Mono";
  src: url("/IBM_Plex_Mono/IBMPlexMono-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "IBM Plex Mono";
  src: url("/IBM_Plex_Mono/IBMPlexMono-Italic.ttf") format("truetype");
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "IBM Plex Mono";
  src: url("/IBM_Plex_Mono/IBMPlexMono-SemiBold.ttf") format("truetype");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
```

- [ ] **Step 3: Commit**

```bash
git add public/SpaceGrotesk-Variable.woff2 src/css/fonts.css
git commit -m "feat: add Space Grotesk font, update font declarations"
```

---

### Task 2: Rewrite CSS Variables

**Files:**
- Modify: `src/css/variables.css`

- [ ] **Step 1: Replace variables.css with monochrome brutalist variables**

Replace the entire contents of `src/css/variables.css` with:

```css
:root {
  /* Fonts */
  --font-heading: "Space Grotesk", "Helvetica Neue", Arial, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;

  /* Monochrome palette */
  --black: #000;
  --white: #fff;
  --gray-dark: #333;
  --gray-mid: #555;
  --gray-light: #888;
  --gray-rule: #ccc;

  /* Semantic tokens */
  --bg: var(--white);
  --fg: var(--black);
  --muted: var(--gray-mid);

  /* Borders */
  --border-thick: 3px solid var(--black);
  --border-thin: 1px solid var(--black);

  /* Spacing */
  --page-pad: clamp(16px, 4vw, 40px);
  --section-pad: clamp(20px, 4vw, 40px);

  /* Type sizes */
  --size-hero: clamp(48px, 10vw, 100px);
  --size-heading: clamp(18px, 3vw, 24px);
  --size-body: clamp(14px, 1.8vw, 16px);
  --size-small: clamp(12px, 1.5vw, 14px);
  --size-label: clamp(10px, 1.2vw, 11px);
  --size-nav: 11px;
}

*, *::before, *::after {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--fg);
}

html {
  scroll-behavior: smooth;
}

#root {
  width: 100%;
  margin: 0;
  padding: 0;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/css/variables.css
git commit -m "feat: rewrite CSS variables for monochrome brutalist theme"
```

---

### Task 3: Write Main Layout CSS

**Files:**
- Modify: `src/css/layout.css`

- [ ] **Step 1: Replace layout.css with brutalist layout styles**

Replace the entire contents of `src/css/layout.css` with:

```css
/* ===== NAV ===== */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px var(--page-pad);
  background: var(--bg);
  border-bottom: var(--border-thick);
  font-family: var(--font-mono);
  font-size: var(--size-nav);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.nav__name {
  font-weight: 700;
  text-decoration: none;
  color: var(--fg);
}

.nav__links {
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav__link {
  color: var(--fg);
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: none;
  font: inherit;
  text-transform: inherit;
  letter-spacing: inherit;
  padding: 0;
}

.nav__link:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 2px;
}

.nav__link--active {
  font-weight: 700;
}

/* Hamburger */
.nav__hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: var(--fg);
}

.nav__hamburger svg {
  display: block;
}

/* Mobile overlay */
.nav__overlay {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 99;
  background: var(--bg);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
}

.nav__overlay--open {
  display: flex;
}

.nav__overlay-link {
  font-family: var(--font-heading);
  font-size: clamp(24px, 6vw, 40px);
  font-weight: 700;
  color: var(--fg);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.nav__overlay-link:hover {
  text-decoration: underline;
}

.nav__overlay-close {
  position: absolute;
  top: 12px;
  right: var(--page-pad);
  background: none;
  border: none;
  font-family: var(--font-mono);
  font-size: 24px;
  cursor: pointer;
  color: var(--fg);
}

/* ===== HERO ===== */
.hero {
  margin-top: 48px; /* offset for fixed nav */
  padding: 60px var(--page-pad) 24px;
  border-bottom: var(--border-thick);
}

.hero__name {
  font-family: var(--font-heading);
  font-size: var(--size-hero);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -2px;
  margin: 0;
  text-transform: uppercase;
}

.hero__subtitle {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--muted);
  margin-top: 12px;
}

/* ===== SECTION (always visible) ===== */
.section {
  border-bottom: var(--border-thick);
}

.section__label {
  font-family: var(--font-mono);
  font-size: var(--size-label);
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--gray-light);
  margin-bottom: 16px;
}

.section__content {
  padding: var(--section-pad) var(--page-pad);
}

/* Two-column split (bio + research) */
.section--split {
  display: flex;
}

.section--split > .section__content {
  width: 50%;
}

.section--split > .section__content:first-child {
  border-right: var(--border-thick);
}

/* ===== COLLAPSIBLE SECTION ===== */
.collapse__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px var(--page-pad);
  border-bottom: var(--border-thick);
  cursor: pointer;
  user-select: none;
  background: var(--bg);
}

.collapse__bar:hover {
  background: #f5f5f5;
}

.collapse__toggle {
  font-family: var(--font-mono);
  font-size: 18px;
  font-weight: 700;
}

.collapse__body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.collapse__body--open {
  max-height: 2000px;
  transition: max-height 0.5s ease;
}

.collapse__inner {
  padding: var(--section-pad) var(--page-pad);
  border-bottom: var(--border-thick);
}

/* ===== CONTENT ELEMENTS ===== */

/* Photo */
.bio-photo {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 2px solid var(--black);
  display: block;
  margin-bottom: 12px;
}

.photo-caption {
  font-family: var(--font-mono);
  font-size: var(--size-label);
  color: var(--gray-light);
  margin-bottom: 12px;
}

/* Body text */
.body-text {
  font-family: var(--font-mono);
  font-size: var(--size-body);
  line-height: 1.7;
  margin: 0 0 8px;
}

.body-text--muted {
  color: var(--muted);
  font-size: var(--size-small);
}

.body-text--bold {
  font-weight: 600;
}

.body-text--highlight {
  font-weight: 600;
  border-left: 3px solid var(--black);
  padding-left: 12px;
  margin-top: 16px;
}

/* Research keywords */
.keywords {
  font-family: var(--font-mono);
  font-size: var(--size-small);
  color: var(--gray-light);
  font-style: italic;
  margin-top: 16px;
}

/* Education entry */
.edu-entry {
  margin-bottom: 8px;
}

.edu-entry__school {
  font-family: var(--font-mono);
  font-size: var(--size-body);
  font-weight: 600;
}

.edu-entry__detail {
  font-family: var(--font-mono);
  font-size: var(--size-small);
  color: var(--muted);
}

/* Links */
a {
  color: var(--fg);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 2px;
}

a:hover {
  text-decoration-thickness: 3px;
}

/* EntryItem overrides for brutalist style */
.entry {
  margin: 0 0 20px;
}

.entry-title {
  font-family: var(--font-mono);
  font-size: var(--size-body);
  font-weight: 600;
  line-height: 1.4;
  margin: 0;
}

.entry-tags {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  margin: 4px 0;
}

.entry-desc {
  font-family: var(--font-mono);
  font-size: var(--size-small);
  line-height: 1.6;
  margin-top: 4px;
  color: var(--muted);
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border: 1px solid var(--black);
  background: transparent;
  color: var(--fg);
  font-size: var(--size-label);
  font-family: var(--font-mono);
  text-decoration: none;
  line-height: 1.2;
}

.tag--time,
.tag--role {
  background: var(--black);
  color: var(--white);
  border-color: var(--black);
}

.tag--link {
  background: var(--bg);
}

.tag--link:hover {
  background: var(--black);
  color: var(--white);
}

.mark-me {
  font-weight: 700;
  text-decoration: underline;
}

/* Misc photo */
.misc-photo {
  max-width: 240px;
  display: block;
  border: 2px solid var(--black);
}

.misc-caption {
  font-family: var(--font-mono);
  font-size: var(--size-small);
  color: var(--gray-light);
  margin-top: 8px;
}

/* Contact items */
.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-item {
  font-family: var(--font-mono);
  font-size: var(--size-body);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-item button {
  background: none;
  border: none;
  font: inherit;
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 2px;
  cursor: pointer;
  padding: 0;
}

.contact-item button:hover {
  text-decoration-thickness: 3px;
}

/* Toast */
.toast {
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%) translateY(8px);
  background: var(--black);
  color: var(--white);
  border: none;
  padding: 8px 16px;
  font-family: var(--font-mono);
  font-size: 12px;
  opacity: 0;
  pointer-events: none;
  z-index: 200;
  transition: opacity 150ms ease, transform 150ms ease;
}

.toast--show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
  .section--split {
    flex-direction: column;
  }

  .section--split > .section__content {
    width: 100%;
  }

  .section--split > .section__content:first-child {
    border-right: none;
    border-bottom: var(--border-thick);
  }

  .nav__links {
    display: none;
  }

  .nav__hamburger {
    display: block;
  }

  .hero__name {
    font-size: clamp(36px, 10vw, 64px);
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .collapse__body {
    transition: none;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/css/layout.css
git commit -m "feat: write brutalist layout CSS"
```

---

### Task 4: Create Nav Component

**Files:**
- Create: `src/components/Nav.jsx`

- [ ] **Step 1: Create Nav.jsx**

Create `src/components/Nav.jsx`:

```jsx
import React, { useCallback, useEffect, useState } from "react";

const SECTIONS = [
  { id: "bio", label: "Bio" },
  { id: "research", label: "Research" },
  { id: "education", label: "Education" },
  { id: "publications", label: "Publications" },
  { id: "experience", label: "Experience" },
  { id: "teaching", label: "Teaching" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback((id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <nav className="nav">
        <span className="nav__name">Tingxi Li</span>

        <ul className="nav__links">
          {SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <button
                className={`nav__link${active === id ? " nav__link--active" : ""}`}
                onClick={() => handleClick(id)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="nav__hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      <div className={`nav__overlay${menuOpen ? " nav__overlay--open" : ""}`}>
        <button
          className="nav__overlay-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            className="nav__overlay-link"
            onClick={() => handleClick(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Nav.jsx
git commit -m "feat: add Nav component with mobile hamburger"
```

---

### Task 5: Create Section Component

**Files:**
- Create: `src/components/Section.jsx`

- [ ] **Step 1: Create Section.jsx**

Create `src/components/Section.jsx`:

```jsx
import React, { useState } from "react";

export default function Section({ id, number, label, collapsible = false, children }) {
  const [open, setOpen] = useState(false);

  if (collapsible) {
    return (
      <div id={id}>
        <div className="collapse__bar" onClick={() => setOpen((o) => !o)}>
          <span className="section__label" style={{ marginBottom: 0 }}>
            {number} — {label}
          </span>
          <span className="collapse__toggle">[{open ? "−" : "+"}]</span>
        </div>
        <div className={`collapse__body${open ? " collapse__body--open" : ""}`}>
          <div className="collapse__inner">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div id={id} className="section__content">
      <div className="section__label">
        {number} — {label}
      </div>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Section.jsx
git commit -m "feat: add Section component with collapsible support"
```

---

### Task 6: Rewrite App.jsx

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Replace App.jsx with full brutalist homepage**

Replace the entire contents of `src/App.jsx` with:

```jsx
import React, { useCallback, useEffect, useState } from "react";
import Nav from "./components/Nav";
import Section from "./components/Section";
import EntryItem from "./components/EntryItem";

export default function App() {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const email = "tingxi.li@utdallas.edu";
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
    } catch {
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
      <Nav />

      {/* Hero */}
      <header className="hero">
        <h1 className="hero__name">Tingxi Li</h1>
        <p className="hero__subtitle">
          PhD Student · Computer Science · University of Texas at Dallas
        </p>
      </header>

      {/* 01 Bio + 02 Research (side by side) */}
      <div className="section section--split" style={{ borderBottom: "none" }}>
        <Section id="bio" number="01" label="Bio">
          <img
            className="bio-photo"
            alt="Tingxi Li"
            loading="lazy"
            src="https://ik.imagekit.io/tingxi/myphoto2.jpeg"
          />
          <p className="photo-caption">Yosemite NP, California</p>
          <p className="body-text">
            2nd year PhD student at{" "}
            <a href="https://www.utdallas.edu/" target="_blank" rel="noopener noreferrer">
              UT Dallas
            </a>
            , advised by{" "}
            <a href="https://www.youngwei.com/" target="_blank" rel="noopener noreferrer">
              Prof. Wei Yang
            </a>
            .
          </p>
          <p className="body-text">
            B.S. from{" "}
            <a href="https://en.dlut.edu.cn/" target="_blank" rel="noopener noreferrer">
              Dalian University of Technology
            </a>
            . Visiting student at{" "}
            <a href="https://www.tum.de/en/" target="_blank" rel="noopener noreferrer">
              TU Munich
            </a>
            .
          </p>
        </Section>

        <Section id="research" number="02" label="Research Interests">
          <p className="body-text body-text--bold">Efficient ML Systems</p>
          <p className="body-text body-text--bold">ML Compilation</p>
          <p className="body-text body-text--bold">Adversarial Attacks on DNNs</p>
          <p className="body-text body-text--muted" style={{ marginTop: 12 }}>
            Analyzing efficiency of DL pipeline systems under malicious inputs;
            compiler design and automated kernel generation.
          </p>
          <p className="keywords">Keywords: Efficient ML · MLSys</p>
          <p className="body-text body-text--highlight">
            Looking for internship in ML Compilation, summer 2026
          </p>
        </Section>
      </div>

      {/* 03 Education */}
      <div className="section">
        <Section id="education" number="03" label="Education">
          <div className="edu-entry">
            <span className="edu-entry__school">University of Texas at Dallas</span>
            {" — "}
            <span className="edu-entry__detail">PhD in Computer Science · Aug 2024 – Present</span>
          </div>
          <div className="edu-entry">
            <span className="edu-entry__school">Dalian University of Technology</span>
            {" — "}
            <span className="edu-entry__detail">Bachelor of Science · Sep 2019 – Jun 2024</span>
          </div>
          <div className="edu-entry">
            <span className="edu-entry__school">Technical University of Munich</span>
            {" — "}
            <span className="edu-entry__detail">Visiting Student · Apr 2022 – Oct 2022</span>
          </div>
        </Section>
      </div>

      {/* 04 Publications (collapsible) */}
      <Section id="publications" number="04" label="Publications" collapsible>
        <p className="body-text body-text--muted" style={{ marginBottom: 16 }}>
          Full list on{" "}
          <a
            href="https://scholar.google.com/citations?user=a_XpeY0AAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Scholar
          </a>
          .
        </p>
        <EntryItem
          title="Identify then Exploit: Degrading Performance of Vision-based Deep Learning Systems"
          description="Tingxi Li*, Mingfang Ji*, Ravishka Rathnasuriya, Simin Chen, Yitao Hu, Wei Yang"
          time="2025"
          role="under review"
          highlightMe="Tingxi Li"
        />
        <EntryItem
          title="Efficiency Attack and Defences Towards Deep Learning Systems"
          description="Ravishka Rathnasuriya, Tingxi Li, Zexin Xu, Zihe Song, Jun Ren, Mirazul Haque, Simin Chen, Wei Yang"
          time="2025"
          role="USENIX Security"
          highlightMe="Tingxi Li"
          links={[
            {
              href: "https://www.usenix.org/system/files/usenixsecurity25-rathnasuriya.pdf",
              label: "PDF",
            },
            { href: "https://zenodo.org/records/15649771", label: "Code" },
          ]}
        />
        <EntryItem
          title="COMET: Closed-loop Orchestration for Malicious Elicitation Techniques in Code Models"
          description="Zexin Xu, Tingxi Li, Ravishka Rathnasuriya, Zihe Song, Jun Ren, Bhavesh Mandalapu, Soroush Setayeshpour, Xinya Du, Wei Yang"
          time="2025"
          role="technical report"
          highlightMe="Tingxi Li"
          links={[
            {
              href: "https://assets.amazon.science/6f/16/076dff834864823e4f09322d1495/astro-comet-closed-loop-orchestration-for-malicious-elicitation-techniques-in-code-models.pdf",
              label: "PDF",
            },
          ]}
        />
      </Section>

      {/* 05 Experience (collapsible) */}
      <Section id="experience" number="05" label="Experience" collapsible>
        <EntryItem
          title="SOPHGO"
          description="Refactor C++ code, test the refactored code to ensure compilation and functionality, and write documentation."
          time="May – Aug 2024"
          role="Research Intern"
        />
        <EntryItem
          title="Amazon Nova AI Challenge: Trusted AI"
          description="Team member of one of the red teaming finalists. Develop surrogate model to help evaluating adversarial probes and refine attack strategies based on the findings."
          time="Nov 2024 – Jul 2025"
          role="Finalist"
        />
      </Section>

      {/* 06 Teaching (collapsible) */}
      <Section id="teaching" number="06" label="Teaching" collapsible>
        <EntryItem
          title="CS 4375: Introduction to Machine Learning"
          description="Host office hours, design exam questions and deliver review lectures for the course."
          time="Fall 2024"
          role="Teaching Assistant"
        />
        <EntryItem
          title="CS 4375: Introduction to Machine Learning"
          description="Host office hours; teach introductory level of machine learning compilation, Triton programming; design coding assignments/exam questions."
          time="Fall 2025"
          role="Teaching Assistant"
          links={[
            {
              href: "https://github.com/tingxi-li/portfolio/releases/download/v1.0/ml-compilation-triton.pdf",
              label: "Download Slides",
            },
          ]}
        />
      </Section>

      {/* 07 Contact (collapsible) */}
      <Section id="contact" number="07" label="Contact" collapsible>
        <ul className="contact-list">
          <li className="contact-item">
            Email:{" "}
            <button onClick={copyEmail}>
              tingxi.li@utdallas.edu {copied ? "(copied!)" : "(click to copy)"}
            </button>
          </li>
          <li className="contact-item">
            CV:{" "}
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
              Download PDF
            </a>
          </li>
          <li className="contact-item">
            Scholar:{" "}
            <a
              href="https://scholar.google.com/citations?user=a_XpeY0AAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Scholar
            </a>
          </li>
          <li className="contact-item">
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/tingxi-l-352a45297/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Profile
            </a>
          </li>
        </ul>
      </Section>

      {/* 08 Misc (collapsible) */}
      <Section id="misc" number="08" label="Misc" collapsible>
        <img
          className="misc-photo"
          alt="Jolly-B and Chick-fil-A"
          loading="lazy"
          src="https://ik.imagekit.io/tingxi/twocats.jpeg"
        />
        <p className="misc-caption">
          Jolly-B (Left) and Chick-fil-A (Right) (Jan. 2026)
        </p>
      </Section>

      {/* Toast */}
      <div
        className={`toast${copied ? " toast--show" : ""}`}
        role="status"
        aria-live="polite"
      >
        Email copied
      </div>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/App.jsx
git commit -m "feat: rewrite App.jsx as brutalist single-page layout"
```

---

### Task 7: Update index.html and index.jsx

**Files:**
- Modify: `index.html`
- Modify: `src/index.jsx`

- [ ] **Step 1: Replace index.html**

Replace the entire contents of `index.html` with:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tingxi Li</title>
    <link rel="icon" href="/favicon.ico" />
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

- [ ] **Step 2: Replace index.jsx**

Replace the entire contents of `src/index.jsx` with:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./css/fonts.css";
import "./css/variables.css";
import "./css/layout.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

- [ ] **Step 3: Commit**

```bash
git add index.html src/index.jsx
git commit -m "feat: simplify index.html and index.jsx for light-only brutalist theme"
```

---

### Task 8: Remove Unused Files

**Files:**
- Delete: `src/components/ThemeToggle.jsx`
- Delete: `src/components/EmLink.jsx`
- Delete: `src/css/global.css`
- Delete: `src/pages/bio.jsx`
- Delete: `src/pages/research-interests.jsx`
- Delete: `src/pages/education.jsx`
- Delete: `src/pages/experience.jsx`
- Delete: `src/pages/teaching.jsx`
- Delete: `src/pages/contact.jsx`
- Delete: `src/pages/misc.jsx`
- Delete: `src/pages/google-scholar.jsx`
- Delete: `public/ChelseaMarket-Regular.woff2` (if exists)

- [ ] **Step 1: Delete unused components and pages**

Run:
```bash
rm -f src/components/ThemeToggle.jsx src/components/EmLink.jsx
rm -f src/css/global.css
rm -f src/pages/bio.jsx src/pages/research-interests.jsx src/pages/education.jsx
rm -f src/pages/experience.jsx src/pages/teaching.jsx src/pages/contact.jsx
rm -f src/pages/misc.jsx src/pages/google-scholar.jsx
rm -f public/ChelseaMarket-Regular.woff2
```

- [ ] **Step 2: Remove pages directory if empty**

Run:
```bash
rmdir src/pages 2>/dev/null || true
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove unused components, pages, and CSS"
```

---

### Task 9: Verify Build and Visual Check

- [ ] **Step 1: Run dev server**

Run:
```bash
npm run dev
```

Expected: Vite starts on http://localhost:3000 with no build errors.

- [ ] **Step 2: Visual check in browser**

Open http://localhost:3000 and verify:
- Fixed nav bar at top with section links
- Hero with large "TINGXI LI" name
- Bio and Research side-by-side with thick black border separator
- Education section below
- Collapsible sections for Publications, Experience, Teaching, Contact, Misc
- Click [+] to expand, [−] to collapse
- Mobile: resize to narrow width, hamburger menu appears
- All links work (Scholar, LinkedIn, CV, paper PDFs)
- Email copy toast works
- Monochrome only, no color

- [ ] **Step 3: Run production build**

Run:
```bash
npm run build
```

Expected: Build succeeds, output in `dist/`.

- [ ] **Step 4: Commit any fixes**

If any adjustments were needed, commit them:
```bash
git add -A
git commit -m "fix: post-build visual adjustments"
```

---

### Task 10: Remove lucide-react Dependency

**Files:**
- Modify: `package.json`

The old Contact page used lucide-react icons. The new design uses text-only contact links, so this dependency is no longer needed.

- [ ] **Step 1: Uninstall lucide-react**

Run:
```bash
npm uninstall lucide-react
```

- [ ] **Step 2: Verify no remaining imports**

Run:
```bash
grep -r "lucide-react" src/
```

Expected: No results.

- [ ] **Step 3: Verify build still works**

Run:
```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: remove unused lucide-react dependency"
```
