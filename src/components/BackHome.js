import React, { useCallback } from "react";

function navigate(to) {
  if (window.location.pathname !== to) {
    window.history.pushState({}, "", to);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
}

export default function BackHome({ title = "", style }) {
  const onClick = useCallback((e) => {
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigate("/");
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

