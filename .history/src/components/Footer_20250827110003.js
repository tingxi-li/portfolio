import React from "react";

export default function Footer(){
  return (
    <footer className="footer">
      <div className="footer-inner small">
        <span>© {new Date().getFullYear()} Tingxi Li</span>
        <span>
          <a href="mailto:you@example.com">Email</a> ·
          <a href="https://github.com/yourname" target="_blank" rel="noreferrer"> GitHub</a> ·
          <a href="https://x.com/yourname" target="_blank" rel="noreferrer"> X</a>
        </span>
      </div>
    </footer>
  );
}