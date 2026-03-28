import React from "react";
import "../global.css";
export default function ResearchInterests() {
  return (
    <main>
      <p className="title" style={{fontFamily: "var(--font-chelsea)", fontSize: "var(--title-font-size)" }}>Research Interests</p>

      <p className="content" style={{fontFamily: "var(--font-mono)", fontSize: "var(--smaller-text-font-size)" , fontWeight: 400}}>
        <br />

        i am broadly interested in <span style={{textDecoration: "underline"}}>Efficient Machine Learning Systems</span> during the <span style={{textDecoration: "underline"}}>Inference</span> stage.

        <br />
        <br />

        <p className="content" style={{fontFamily: "var(--font-mono)", fontSize: "var(--smaller-text-font-size)" , fontWeight: 400}}>specifically, my research 
          focuses on analyzing the efficiency of deep learning pipeline systems under malicious inputs, as well as on the machine learning 
          compilation process, including compiler design and automated kernel generation.</p>

       <span style={{fontStyle: "italic"}}>keywords: efficient ml; mlsys</span> 
          
        </p> 

      <p className="content" style={{fontFamily: "var(--font-mono)", fontSize: "var(--smaller-text-font-size)" , fontWeight: 400, color: "var(--highlight-font-color)"}}>
        *** i am actively looking for internship opportunities in <span style={{textDecoration: "underline"}}>Machine Learning Compilation</span> starting from summer 2026.
      </p>
      <br />
      <br />
      <br />
    </main>
  );
}
