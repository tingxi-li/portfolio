import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="content">
        <p className="footer-line">© {year} Tingxi Li. All rights reserved.</p>
        <p className="footer-line">
          Fonts and third‑party assets are used under their respective licenses. See <a href="/licenses.html">Licenses</a>.
        </p>
        <p className="footer-line">
          Powered by <a href="https://react.dev" rel="noopener noreferrer" target="_blank">React</a>. Hosted on <a href="https://pages.github.com/" rel="noopener noreferrer" target="_blank">GitHub Pages</a>.
        </p>
      </div>
    </footer>
  );
}
