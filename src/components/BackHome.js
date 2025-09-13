import React, { useCallback } from "react";

export default function BackHome({ title = "", style }) {
  const onClick = useCallback((e) => {
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    // Go to root path ("/") and scroll to the home section without hash
    try {
      if (window.location.pathname !== "/" || window.location.hash) {
        window.history.replaceState({}, "", "/");
      }
      const homeEl = document.getElementById("home");
      if (homeEl) homeEl.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      try {
        window.location.assign("/");
      } catch (_) {
        // no-op
      }
    }
  }, []);

  return (
    <div className="back-home" style={style}>
      <a
        href="/"
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
