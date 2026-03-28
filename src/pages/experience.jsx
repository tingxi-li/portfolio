import React from "react";
import EntryItem from "../components/EntryItem";

export default function Experience() {
  return (
    <>
      <h2 className="title">Experience</h2>

      <p className="section-text section-text--lg">
        My industrial & competition experiences.
      </p>

      <EntryItem
        title="SOPHGO"
        description="refactor c++ code, test the refactored code to ensure compilation and functionality, and write documentation."
        time="May 2024 - Aug. 2024"
        role="research intern"
      />

      <EntryItem
        title="Amazon Nova AI Challenge: Trusted AI"
        description="team member of one of the red teaming finalists. develop surrogate model to help evaluating adversarial probes and refine attack strategies based on the findings."
        time="Nov. 2024 - Jul. 2025"
        role="finalist team member"
      />
    </>
  );
}
