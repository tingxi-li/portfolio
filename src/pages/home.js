import React from "react";

// Keep the component signature to avoid touching imports/usages.
export default function Home() {
  return (
    <div className="aligned-links">
      <a href="/#research-interests" className="aligned-link">
        <span className="pre">Research In</span>
        <span className="align">t</span>
        <span className="post">erests</span>
      </a>
      <a href="/#bio" className="aligned-link">
        <span className="pre">B</span>
        <span className="align">i</span>
        <span className="post">o</span>
      </a>
      <a href="/#education" className="aligned-link">
        <span className="pre">Educatio</span>
        <span className="align">n</span>
        <span className="post"></span>
      </a>
      <a href="/#google-scholar" className="aligned-link">
        <span className="pre">Goo</span>
        <span className="align">g</span>
        <span className="post">le Scholar</span>
      </a>
      <a href="/#experience" className="aligned-link">
        <span className="pre">E</span>
        <span className="align">x</span>
        <span className="post">perience</span>
      </a>
      <a href="/#teaching" className="aligned-link">
        <span className="pre">Teach</span>
        <span className="align">i</span>
        <span className="post">ng</span>
      </a>
      <a href="/#top" className="aligned-link">
        <span className="pre"></span>
        <span className="align" style={{ '--align-bg': '#111' }}></span>
        <span className="post"></span>
      </a>
      <a href="/#contact" className="aligned-link">
        <span className="pre">CV / E-mail /</span>
        <span className="align">l</span>
        <span className="post">inkedin</span>
      </a>
      <a href="/#misc" className="aligned-link">
        <span className="pre">M</span>
        <span className="align">i</span>
        <span className="post">sc.</span>
      </a>
    </div>
  );
}
