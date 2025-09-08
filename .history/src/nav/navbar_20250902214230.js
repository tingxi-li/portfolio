import React from "react";
import "./navbar.css";


export default function NavBar() {
  return (
    <nav className="site-nav">
      <div className="nav__inner">
        <ul className="nav__links nav__left">
          <li><a href="#home">Home</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#cv">CV</a></li>
        </ul>
        <div className="nav__logo">Tingxi Li \\ a</div>
        <ul className="nav__links nav__right">
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#misc">Misc.</a></li>
        </ul>
      </div>
    </nav>
  );
}
