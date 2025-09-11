import React, { useCallback } from "react";

export default function BackHome({ title = "", style }) {
  const onClick = useCallback((e) => {
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    // Smoothly scroll to the top instead of route-changing
    try {
      const topEl = document.getElementById("top");
      if (topEl) {
        topEl.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="back-home" style={style}>
      <a
        href="/#top"
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
