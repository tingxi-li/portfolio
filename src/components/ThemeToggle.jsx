import React, { useCallback, useEffect, useMemo, useState } from 'react';

function getSystemPrefersDark() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function ThemeToggle({ fixed = true }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {}
    return getSystemPrefersDark() ? 'dark' : 'light';
  });

  // Apply theme to <html data-theme>
  useEffect(() => {
    try {
      document.documentElement.dataset.theme = theme;
      localStorage.setItem('theme', theme);
    } catch {}
  }, [theme]);

  // Optional: reflect system changes only if user never set a preference
  useEffect(() => {
    let media;
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return;
      media = window.matchMedia('(prefers-color-scheme: dark)');
      const onChange = () => setTheme(media.matches ? 'dark' : 'light');
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    } catch {}
  }, []);

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  const label = useMemo(() => (theme === 'dark' ? 'Switch to light' : 'Switch to dark'), [theme]);

  return (
    <button
      className={fixed ? 'theme-toggle theme-toggle--fixed' : 'theme-toggle'}
      type="button"
      aria-label={label}
      title={label}
      onClick={toggle}
    >
      {theme === 'dark' ? (
        // Sun (stroke-only, minimal)
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="2" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="19" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ) : (
        // Moon (stroke-only, minimal, feather-like)
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
}
