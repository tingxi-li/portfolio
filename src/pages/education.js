import React from "react";
import "../global.css";
import BackHome from "../components/BackHome";

export default function Education() {
  return (
    <main>
      <BackHome />
      <p className="title">Education</p>
      <p className="content" style={{fontFamily: "var(--font-mono)", fontSize: "var(--text-font-size)" , fontWeight: 800}}>
        <br />
        The University of Texas at Dallas
      </p>
      <p className="content" style={{fontFamily: "var(--font-mono)", fontSize: "20px"  , fontWeight: 400, fontStyle: "italic"}}>
        Doctor of Philosophy <br />
        Aug. 2024 - present <br />
      </p>
      <p className="content" style={{fontFamily: "var(--font-mono)", fontSize: "var(--text-font-size)" , fontWeight: 800}}>
        <br />
        Dalian University of Technology
      </p>
      <p className="content" style={{fontFamily: "var(--font-mono)", fontSize: "20px" , fontWeight: 400, fontStyle: "italic"}}>
        Bachelor of Science <br />
        Sept. 2019 - Jun. 2024 <br />
      </p>
      <p className="content" style={{fontFamily: "var(--font-mono)", fontSize: "var(--text-font-size)" , fontWeight: 800}}>
        <br />
        Technical University of Munich
      </p>
      <p className="content" style={{fontFamily: "var(--font-mono)", fontSize: "20px" , fontWeight: 400, fontStyle: "italic"}}>
        Visiting Student <br />
        Apr. 2022 - Oct. 2022 <br />
      </p>
    </main>
  );
}
