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
