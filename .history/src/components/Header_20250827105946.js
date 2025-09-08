import React from "react";

export default function Header(){
  return (
    <header className="header">
      <nav className="nav">
        <div className="brand">TINGXI</div>
        <div>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="/tingxi-cv.pdf" target="_blank" rel="noreferrer">CV</a>
        </div>
      </nav>
    </header>
  );
}