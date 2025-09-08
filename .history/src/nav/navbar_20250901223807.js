import React from "react";
import "../index.css"; // or put nav CSS in a separate CSS module

export default function NavBar() {
  return (
    <nav className="nav">
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