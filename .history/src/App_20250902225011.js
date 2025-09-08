// src/App.js
import NavBar from "./nav/navbar";
import Bio from "./home/bio";
import BioImage from "./home/bio-image";
import './index.css';

function App() {
  return (
    <>
      
      {/* 1. DEFINE THE SVG FILTER */}
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

      {/* 2. BACKGROUND */}
      <div className="suede-background"></div>

      {/* 3. MAIN CONTENT */}
      <div className="content">
        <NavBar />
        <Bio />
        <BioImage />
      </div>
    </>
  );
}

export default App;