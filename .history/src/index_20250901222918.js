/* === Rounded Nav Bar === */
.nav {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2; /* above .glow children (which are z-index:1) */
  width: calc(100% - 32px);
  max-width: 980px;
  padding: 10px 14px;
  border-radius: 9999px; /* pill / rounded-rectangle */
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.nav__logo {
  font-weight: 700;
  letter-spacing: 0.4px;
}
.nav__links {
  display: flex;
  gap: 12px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav__links a {
  display: block;
  padding: 8px 12px;
  border-radius: 9999px;
  text-decoration: none;
  color: #111;
  transition: background 160ms ease, transform 120ms ease;
}
.nav__links a:hover {
  background: rgba(0,0,0,0.06);
  transform: translateY(-1px);
}

/* Optional: compact on very small screens */
@media (max-width: 480px) {
  .nav {
    padding: 8px 10px;
  }
  .nav__links a {
    padding: 6px 10px;
  }
}