import React from "react";
import "./navbar.css";

export default function NavBar() {
  return (
    <nav className="site-nav">
      <div className="nav__inner">
        <div className="nav__logo">MyPortfolio</div>
        <ul className="nav__links">
          <li><a href="#home">Home</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}