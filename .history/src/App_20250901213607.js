// /src/App.js
export default function App() {
  return (
    <div className="glow">
      {/* optional content */}
    </div>
  );
}

// /src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

/* /src/index.css */
html, body, #root { height: 100%; margin: 0; }

/* Strong defaults so it's visible */
:root{
  --bg: 12 14 24;            /* dark background */
  --glow: 0, 200, 255;       /* comma-separated RGB for rgba() */
  --alpha: 0.55;             /* intensity */
  --size: 52vmin;            /* radius */
  --blur: 48px;              /* softness */
}

.glow{
  position: relative;
  min-height: 100vh;
  background: rgb(var(--bg));
  isolation: isolate;
}

/* Keep children above glow */
.glow > * { position: relative; z-index: 1; }

/* Edge + corner glow (8 radial gradients) */
.glow::before{
  content: "";
  position: fixed;           /* pin to viewport */
  inset: -12vmax;            /* extend for softness */
  pointer-events: none;
  z-index: 0;                /* above .glow background */
  filter: blur(var(--blur));
  opacity: 1;
  background:
    radial-gradient(var(--size) var(--size) at 0%   0%,   rgba(var(--glow), var(--alpha)) 0%, rgba(var(--glow), 0) 60%),
    radial-gradient(var(--size) var(--size) at 100% 0%,   rgba(var(--glow), var(--alpha)) 0%, rgba(var(--glow), 0) 60%),
    radial-gradient(var(--size) var(--size) at 0%   100%, rgba(var(--glow), var(--alpha)) 0%, rgba(var(--glow), 0) 60%),
    radial-gradient(var(--size) var(--size) at 100% 100%, rgba(var(--glow), var(--alpha)) 0%, rgba(var(--glow), 0) 60%),
    radial-gradient(var(--size) var(--size) at 50%  0%,   rgba(var(--glow), var(--alpha)) 0%, rgba(var(--glow), 0) 60%),
    radial-gradient(var(--size) var(--size) at 50%  100%, rgba(var(--glow), var(--alpha)) 0%, rgba(var(--glow), 0) 60%),
    radial-gradient(var(--size) var(--size) at 0%   50%,  rgba(var(--glow), var(--alpha)) 0%, rgba(var(--glow), 0) 60%),
    radial-gradient(var(--size) var(--size) at 100% 50%,  rgba(var(--glow), var(--alpha)) 0%, rgba(var(--glow), 0) 60%);
}

/* Optional: quick visibility test – center dot. Remove later.
.glow::after{
  content: \"\";
  position: fixed;
  inset: 0;
  background: radial-gradient(20vmin 20vmin at 50% 50%, rgba(var(--glow), 0.9), rgba(var(--glow), 0) 60%);
  pointer-events: none;
  z-index: 0;
} */