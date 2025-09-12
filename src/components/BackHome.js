import React, { useCallback } from "react";

export default function BackHome({ title = "", style }) {
  const onClick = useCallback((e) => {
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    // Navigate to home section (triggers smooth scroll via App hash handler)
    try {
      if (window.location.hash !== "#home") {
        window.location.hash = "home";
      } else {
        const homeEl = document.getElementById("home");
        if (homeEl) homeEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (err) {
      try {
        window.location.assign("/#home");
      } catch (_) {
        // no-op
      }
    }
  }, []);

  return (
    <div className="back-home" style={style}>
      <a
        href="/#home"
        onClick={onClick}
        className="back-home__btn"
        aria-label={title}
        title={title}
      >
        ←
      </a>
    </div>
  );
}
