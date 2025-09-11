import React from "react";
import "../global.css";
import BackHome from "../components/BackHome";
import EntryItem from "../components/EntryItem";
export default function Experience() {
  return (
    <main>
      <BackHome />
      <p className="title" style={{ fontSize: "var(--title-font-size)" }}>Experience</p>


      <p className="content" style={{fontFamily: "var(--font-mono)", fontSize: "var(--text-font-size)" , fontWeight: 400}}>
        My industrial & competition experiences.
        <br />
        <br />
      </p>

      <EntryItem
      title="SOPHGO"
      description="refactor c++ code, test the refactored code to ensure compilation and functionality, and write documentation."
      time="May 2024 - Aug. 2024"
      role="research intern"
      />

      <br />

      <EntryItem
      title="Amazon Nova AI Challenge: Trusted AI"
      description="team member of one of the red teaming finalists. develop surrogate model to help evaluating adversarial probes and refine attack strategies based on the findings."
      time="Nov 2024 - Jul. 2025"
      role="finalist team member"
      />


    </main>
  );
}
