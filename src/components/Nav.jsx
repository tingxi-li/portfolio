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
