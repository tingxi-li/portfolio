import React from "react";
import "../global.css";
import BackHome from "../components/BackHome";
export default function ResearchInterests() {
  return (
    <main>
      <BackHome />
      <p className="title" style={{fontFamily: "var(--font-chelsea)", fontSize: "var(--title-font-size)" }}>Research Interests</p>

      <p className="content" style={{fontFamily: "var(--font-mono)", fontSize: "var(--smaller-text-font-size)" , fontWeight: 400}}>
        <br />

        i am broadly interested in <span style={{textDecoration: "underline", fontStyle: "italic"}}>artificial intelligence</span> and <span style={{textDecoration: "underline", fontStyle: "italic"}}>software engineering</span>, particularly at the intersection 
        of the two. </p> 

      <p className="content" style={{fontFamily: "var(--font-mono)", fontSize: "var(--smaller-text-font-size)" , fontWeight: 400}}>more specifically, i focus on enhancing 
        the efficiency and robustness of deep learning systems 
        against malicious inputs, as well as leveraging large 
        language models for software testing.</p>

      <p className="content" style={{fontFamily: "var(--font-mono)", fontSize: "var(--smaller-text-font-size)" , fontWeight: 400, color: "var(--highlight-font-color)"}}>
        *** i am actively looking for internship opportunities in these areas starting from summer 2026.
      </p>
      <br />
      <br />
      <br />
    </main>
  );
}
