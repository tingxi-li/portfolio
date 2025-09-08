// /src/App.js
import NavBar from "./nav/navbar";
import Bio from "./home/bio";

// src/App.js

import './index.css';

function App() {
  return (
    
    // Use a fragment or a main container div
    <>
      {/* 1. DEFINE THE SVG FILTER (it will be hidden) */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="suede-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
            <feDiffuseLighting in="noise" lighting-color="#ffffff" surfaceScale="5" result="light">
              <feDistantLight azimuth="225" elevation="60" />
            </feDiffuseLighting>
            <feComposite in="light" in2="noise" operator="arithmetic" k1="1" k2="1" k3="1" k4="0" result="composite" />
            <feBlend in="SourceGraphic" in2="composite" mode="multiply" />
          </filter>
        </defs>
      </svg>

      {/* 2. CREATE A DEDICATED BACKGROUND ELEMENT */}
      <div className="suede-background"></div>

      {/* 3. YOUR APP'S CONTENT GOES HERE */}
      <div className="content">
        <h1>Suede Texture Background</h1>
        <p>This text is not affected by the filter.</p>
      </div>
    </>
  );
}

export default App;