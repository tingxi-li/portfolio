import React from "react";
import "../global.css";

export default function Education() {
  return (
    <main>
      <p className="title">Education</p>
      <p className="content" style={{fontFamily: "var(--font-mono)", fontSize: "var(--text-font-size)" , fontWeight: 800, textAlign: "center"}}>
        <br />
        The University of Texas at Dallas
      </p>
      <p className="content" style={{fontFamily: "var(--font-mono)", fontSize: "var(--smaller-text-font-size)"  , fontWeight: 400, fontStyle: "italic", textAlign: "center"}}>
        Doctor of Philosophy <br />
        Aug. 2024 - present <br />
      </p>
      <p className="content" style={{fontFamily: "var(--font-mono)", fontSize: "var(--text-font-size)" , fontWeight: 800, textAlign: "center"}}>
        <br />
        Dalian University of Technology
      </p>
      <p className="content" style={{fontFamily: "var(--font-mono)", fontSize: "var(--smaller-text-font-size)" , fontWeight: 400, fontStyle: "italic", textAlign: "center"}}>
        Bachelor of Science <br />
        Sept. 2019 - Jun. 2024 <br />
      </p>
      <p className="content" style={{fontFamily: "var(--font-mono)", fontSize: "var(--text-font-size)" , fontWeight: 800, textAlign: "center"}}>
        <br />
        Technical University of Munich
      </p>
      <p className="content" style={{fontFamily: "var(--font-mono)", fontSize: "var(--smaller-text-font-size)" , fontWeight: 400, fontStyle: "italic", textAlign: "center"}}>
        Visiting Student <br />
        Apr. 2022 - Oct. 2022 <br />
      </p>
      <br />
      <br />
      <br />
    </main>
  );
}
