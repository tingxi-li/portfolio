import React from "react";

export default function ResearchInterests() {
  return (
    <>
      <h2 className="title">Research Interests</h2>

      <p className="section-text">
        i am broadly interested in <span style={{textDecoration: "underline"}}>Efficient Machine Learning Systems</span> during the <span style={{textDecoration: "underline"}}>Inference</span> stage.
      </p>

      <p className="section-text">
        specifically, my research focuses on analyzing the efficiency of deep learning pipeline systems under malicious inputs, as well as on the machine learning compilation process, including compiler design and automated kernel generation.
      </p>

      <p className="section-text">
        <span style={{fontStyle: "italic"}}>keywords: efficient ml; mlsys</span>
      </p>

      <p className="section-text section-text--highlight">
        *** i am actively looking for internship opportunities in <span style={{textDecoration: "underline"}}>Machine Learning Compilation</span> starting from summer 2026.
      </p>
    </>
  );
}
