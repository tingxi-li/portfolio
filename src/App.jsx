import React, { useCallback, useEffect, useState } from "react";
import Nav from "./components/Nav";
import Section from "./components/Section";
import EntryItem from "./components/EntryItem";

export default function App() {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const email = "tingxi.li@utdallas.edu";
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
    } catch {
      setCopied(true);
    }
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1400);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <>
      <Nav />

      {/* Hero */}
      <header className="hero">
        <h1 className="hero__name">Tingxi Li</h1>
        <p className="hero__subtitle">
          PhD Student · Computer Science · University of Texas at Dallas
        </p>
      </header>

      {/* 01 Bio + 02 Research (side by side) */}
      <div className="section section--split" style={{ borderBottom: "none" }}>
        <Section id="bio" number="01" label="Bio">
          <img
            className="bio-photo"
            alt="Tingxi Li"
            loading="lazy"
            src="https://ik.imagekit.io/tingxi/myphoto2.jpeg"
          />
          <p className="photo-caption">Yosemite NP, California</p>
          <p className="body-text">
            2nd year PhD student at{" "}
            <a href="https://www.utdallas.edu/" target="_blank" rel="noopener noreferrer">
              UT Dallas
            </a>
            , advised by{" "}
            <a href="https://www.youngwei.com/" target="_blank" rel="noopener noreferrer">
              Prof. Wei Yang
            </a>
            .
          </p>
          <p className="body-text">
            B.S. from{" "}
            <a href="https://en.dlut.edu.cn/" target="_blank" rel="noopener noreferrer">
              Dalian University of Technology
            </a>
            . Visiting student at{" "}
            <a href="https://www.tum.de/en/" target="_blank" rel="noopener noreferrer">
              TU Munich
            </a>
            .
          </p>
        </Section>

        <Section id="research" number="02" label="Research Interests">
          <p className="body-text body-text--bold">Efficient ML Systems</p>
          <p className="body-text body-text--bold">ML Compilation</p>
          <p className="body-text body-text--bold">Adversarial Attacks on DNNs</p>
          <p className="body-text body-text--muted" style={{ marginTop: 12 }}>
            Analyzing efficiency of DL pipeline systems under malicious inputs;
            compiler design and automated kernel generation.
          </p>
          <p className="keywords">Keywords: Efficient ML · MLSys</p>
          <p className="body-text body-text--highlight">
            Looking for internship in ML Compilation, summer 2026
          </p>
        </Section>
      </div>

      {/* 03 Education */}
      <div className="section">
        <Section id="education" number="03" label="Education">
          <div className="edu-entry">
            <span className="edu-entry__school">University of Texas at Dallas</span>
            {" — "}
            <span className="edu-entry__detail">PhD in Computer Science · Aug 2024 – Present</span>
          </div>
          <div className="edu-entry">
            <span className="edu-entry__school">Dalian University of Technology</span>
            {" — "}
            <span className="edu-entry__detail">Bachelor of Science · Sep 2019 – Jun 2024</span>
          </div>
          <div className="edu-entry">
            <span className="edu-entry__school">Technical University of Munich</span>
            {" — "}
            <span className="edu-entry__detail">Visiting Student · Apr 2022 – Oct 2022</span>
          </div>
        </Section>
      </div>

      {/* 04 Publications (collapsible) */}
      <Section id="publications" number="04" label="Publications" collapsible>
        <p className="body-text body-text--muted" style={{ marginBottom: 16 }}>
          Full list on{" "}
          <a
            href="https://scholar.google.com/citations?user=a_XpeY0AAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Scholar
          </a>
          .
        </p>
        <EntryItem
          title="Identify then Exploit: Degrading Performance of Vision-based Deep Learning Systems"
          description="Tingxi Li*, Mingfang Ji*, Ravishka Rathnasuriya, Simin Chen, Yitao Hu, Wei Yang"
          time="2025"
          role="under review"
          highlightMe="Tingxi Li"
        />
        <EntryItem
          title="Efficiency Attack and Defences Towards Deep Learning Systems"
          description="Ravishka Rathnasuriya, Tingxi Li, Zexin Xu, Zihe Song, Jun Ren, Mirazul Haque, Simin Chen, Wei Yang"
          time="2025"
          role="USENIX Security"
          highlightMe="Tingxi Li"
          links={[
            {
              href: "https://www.usenix.org/system/files/usenixsecurity25-rathnasuriya.pdf",
              label: "PDF",
            },
            { href: "https://zenodo.org/records/15649771", label: "Code" },
          ]}
        />
        <EntryItem
          title="COMET: Closed-loop Orchestration for Malicious Elicitation Techniques in Code Models"
          description="Zexin Xu, Tingxi Li, Ravishka Rathnasuriya, Zihe Song, Jun Ren, Bhavesh Mandalapu, Soroush Setayeshpour, Xinya Du, Wei Yang"
          time="2025"
          role="technical report"
          highlightMe="Tingxi Li"
          links={[
            {
              href: "https://assets.amazon.science/6f/16/076dff834864823e4f09322d1495/astro-comet-closed-loop-orchestration-for-malicious-elicitation-techniques-in-code-models.pdf",
              label: "PDF",
            },
          ]}
        />
      </Section>

      {/* 05 Experience (collapsible) */}
      <Section id="experience" number="05" label="Experience" collapsible>
        <EntryItem
          title="SOPHGO"
          description="Refactor C++ code, test the refactored code to ensure compilation and functionality, and write documentation."
          time="May – Aug 2024"
          role="Research Intern"
        />
        <EntryItem
          title="Amazon Nova AI Challenge: Trusted AI"
          description="Team member of one of the red teaming finalists. Develop surrogate model to help evaluating adversarial probes and refine attack strategies based on the findings."
          time="Nov 2024 – Jul 2025"
          role="Finalist"
        />
      </Section>

      {/* 06 Teaching (collapsible) */}
      <Section id="teaching" number="06" label="Teaching" collapsible>
        <EntryItem
          title="CS 4375: Introduction to Machine Learning"
          description="Host office hours, design exam questions and deliver review lectures for the course."
          time="Fall 2024"
          role="Teaching Assistant"
        />
        <EntryItem
          title="CS 4375: Introduction to Machine Learning"
          description="Host office hours; teach introductory level of machine learning compilation, Triton programming; design coding assignments/exam questions."
          time="Fall 2025"
          role="Teaching Assistant"
          links={[
            {
              href: "https://github.com/tingxi-li/portfolio/releases/download/v1.0/ml-compilation-triton.pdf",
              label: "Download Slides",
            },
          ]}
        />
      </Section>

      {/* 07 Contact (collapsible) */}
      <Section id="contact" number="07" label="Contact" collapsible>
        <ul className="contact-list">
          <li className="contact-item">
            Email:{" "}
            <button onClick={copyEmail}>
              tingxi.li@utdallas.edu {copied ? "(copied!)" : "(click to copy)"}
            </button>
          </li>
          <li className="contact-item">
            CV:{" "}
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
              Download PDF
            </a>
          </li>
          <li className="contact-item">
            Scholar:{" "}
            <a
              href="https://scholar.google.com/citations?user=a_XpeY0AAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Scholar
            </a>
          </li>
          <li className="contact-item">
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/tingxi-l-352a45297/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Profile
            </a>
          </li>
        </ul>
      </Section>

      {/* 08 Misc (collapsible) */}
      <Section id="misc" number="08" label="Misc" collapsible>
        <img
          className="misc-photo"
          alt="Jolly-B and Chick-fil-A"
          loading="lazy"
          src="https://ik.imagekit.io/tingxi/twocats.jpeg"
        />
        <p className="misc-caption">
          Jolly-B (Left) and Chick-fil-A (Right) (Jan. 2026)
        </p>
      </Section>

      {/* Toast */}
      <div
        className={`toast${copied ? " toast--show" : ""}`}
        role="status"
        aria-live="polite"
      >
        Email copied
      </div>
    </>
  );
}
