import React, { useEffect, useState, useCallback } from 'react';
import Home from './pages/home';
import ResearchInterests from './pages/research-interests';
import Bio from './pages/bio';
import Education from './pages/education';
import GoogleScholar from './pages/google-scholar';
import Experience from './pages/experience';
import Teaching from './pages/teaching';
import Contact from './pages/contact';
import Misc from './pages/misc';

function navigate(to) {
  if (window.location.pathname !== to) {
    window.history.pushState({}, "", to);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
}

function usePathname() {
  const [path, setPath] = useState(() => window.location.pathname || "/");
  useEffect(() => {
    const handler = () => setPath(window.location.pathname || "/");
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);
  return path;
}

function AppHome() {
  const handleNav = useCallback((e, to) => {
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return; // let new tab etc.
    e.preventDefault();
    navigate(to);
  }, []);

  return <Home onNav={handleNav} />;
}



export default function App() {
  const path = usePathname();

  switch (path) {
    case "/research-interests":
      return <ResearchInterests />;
    case "/bio":
      return <Bio />;
    case "/education":
      return <Education />;
    case "/google-scholar":
      return <GoogleScholar />;
    case "/experience":
      return <Experience />;
    case "/teaching":
      return <Teaching />;
    case "/contact":
      return <Contact />;
    case "/misc":
      return <Misc />;
    default:
      return <AppHome />;
  }
}
