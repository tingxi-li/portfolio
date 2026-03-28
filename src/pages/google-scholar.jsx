import React from "react";
import EmLink from "../components/EmLink";
import EntryItem from "../components/EntryItem";

export default function GoogleScholar() {
  return (
    <>
      <h2 className="title">Google Scholar</h2>

      <p className="section-text section-text--lg">
        Full list of publications and citations
        can be found <EmLink href="https://scholar.google.com/citations?user=a_XpeY0AAAAJ&hl=en">HERE</EmLink>.
      </p>

      <EntryItem
        title="Identify then Exploit: Degrading Performance of Vision-based Deep Learning Systems"
        description="Tingxi Li*, Mingfang Ji*, Ravishka Rathnasuriya, Simin Chen, Yitao Hu, Wei Yang"
        time="2025"
        role="under review at a major cv/ai conference"
        highlightMe="Tingxi Li"
      />

      <EntryItem
        title="Efficiency Attack and Defences Towards Deep Learning Systems"
        description="Ravishka Rathnasuriya, Tingxi Li, Zexin Xu, Zihe Song, Jun Ren, Mirazul Haque, Simin Chen, Wei Yang"
        time="2025"
        role="usenix security"
        highlightMe="Tingxi Li"
        links={[
          { href: 'https://www.usenix.org/system/files/usenixsecurity25-rathnasuriya.pdf', label: 'PDF' },
          { href: "https://zenodo.org/records/15649771", label: "Code" }
        ]}
      />

      <EntryItem
        title="COMET: Closed-loop Orchestration for Malicious Elicitation Techniques in Code Models"
        description="Zexin Xu, Tingxi Li, Ravishka Rathnasuriya, Zihe Song, Jun Ren, Bhavesh Mandalapu, Soroush Setayeshpour, Xinya Du, Wei Yang"
        time="2025"
        role="technical report"
        highlightMe="Tingxi Li"
        links={[
          { href: 'https://assets.amazon.science/6f/16/076dff834864823e4f09322d1495/astro-comet-closed-loop-orchestration-for-malicious-elicitation-techniques-in-code-models.pdf', label: 'PDF' },
        ]}
      />
    </>
  );
}
