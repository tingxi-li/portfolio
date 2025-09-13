import React, { useEffect } from 'react';
import Home from './pages/home';
import ResearchInterests from './pages/research-interests';
import Bio from './pages/bio';
import Education from './pages/education';
import GoogleScholar from './pages/google-scholar';
import Experience from './pages/experience';
import Teaching from './pages/teaching';
import Contact from './pages/contact';
import Misc from './pages/misc';
import SectionDots from './components/SectionDots';
import BackHome from './components/BackHome';
import ThemeToggle from './components/ThemeToggle';

function scrollToHash(hash) {
  const id = (hash || '').replace(/^#/, '');
  if (!id) return;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function App() {
  // Support old direct paths like /bio by converting to /#bio
  useEffect(() => {
    const path = window.location.pathname;
    if (path && path !== '/') {
      const section = path.slice(1);
      window.history.replaceState({}, '', `/#${section}`);
    }
    // Initial hash scroll
    if (window.location.hash) {
      // Delay to ensure sections are in the DOM
      setTimeout(() => scrollToHash(window.location.hash), 0);
    }

    const onHash = () => scrollToHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <>
      <ThemeToggle />
      <BackHome />
      {/* Top anchor for back-to-top */}
      <div id="top" />
      <section id="home">
        <Home />
      </section>
      <SectionDots />

      <section id="research-interests">
        <ResearchInterests />
      </section>
      <section id="bio">
        <Bio />
      </section>
      <section id="education">
        <Education />
      </section>
      <section id="google-scholar">
        <GoogleScholar />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="teaching">
        <Teaching />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <section id="misc">
        <Misc />
      </section>
    </>
  );
}
