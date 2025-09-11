import React, { useEffect, useMemo, useState } from "react";

export default function SectionDots() {
  const [sections, setSections] = useState([]);
  const [active, setActive] = useState("");

  // Discover sections dynamically so App doesn't need to pass props.
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('section[id]'));
    const data = nodes.map((el) => ({ id: el.id }));
    setSections(data);
  }, []);

  // Observe section visibility to highlight active dot
  useEffect(() => {
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest to the top that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        root: null,
        // Trigger when the top 45% of viewport hits a section
        rootMargin: "-45% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const toLabel = (id) => id.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  const anchors = useMemo(
    () => sections.map(({ id }) => ({ id, href: `/#${id}`, label: toLabel(id) })),
    [sections]
  );

  if (!anchors.length) return null;

  return (
    <nav className="section-dots" aria-label="Section navigation">
      {anchors.map(({ id, href, label }) => (
        <a
          key={id}
          href={href}
          className="section-dot"
          aria-label={label}
          aria-current={active === id ? "true" : undefined}
        >
          <span className="sr-only">{label}</span>
          <span className="section-dot__tooltip" role="tooltip">{label}</span>
        </a>
      ))}
    </nav>
  );
}
