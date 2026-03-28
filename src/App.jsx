import React, { useCallback, useEffect, useState } from "react";
import Nav from "./components/Nav";
import Section from "./components/Section";
import EntryItem from "./components/EntryItem";

export default function App() {
  const [copied, setCopied] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = useCallback((id) => {
    setOpenSection((prev) => (prev === id ? null : id));
  }, []);

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
          李 亭熹
        </p>
      </header>

      {/* About: Photo+Contact | Bio+Research */}
      <div id="bio" className="section section--split">
        <div className="section__content">
          <img
            className="bio-photo"
            alt="Tingxi Li"
            loading="lazy"
            src="https://ik.imagekit.io/tingxi/myphoto2.jpeg"
          />
          <p className="photo-caption">Yosemite NP, California</p>
          <ul className="contact-list">
            <li className="contact-item">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <button onClick={copyEmail}>
                {copied ? "Copied!" : "tingxi.li [at] utdallas.edu"}
              </button>
            </li>
            <li className="contact-item">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">CV</a>
            </li>
            <li className="contact-item">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              <a href="https://scholar.google.com/citations?user=a_XpeY0AAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Google Scholar</a>
            </li>
            <li className="contact-item">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              <a href="https://www.linkedin.com/in/tingxi-l-352a45297/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </li>
          </ul>
        </div>

        <div id="research" className="section__content">
          <div className="section__label">01 — About</div>
          <p className="body-text body-text--bold" style={{ marginTop: 16 }}>BIO</p>
          <p className="body-text body-text--muted">
            tingxi li is a 2nd year PhD student at{" "}
            <a href="https://www.utdallas.edu/" target="_blank" rel="noopener noreferrer">UT Dallas</a>,
            advised by{" "}
            <a href="https://www.youngwei.com/" target="_blank" rel="noopener noreferrer">Prof. Wei Yang</a>.
            , before that, he earned his B.S. from{" "}
            <a href="https://en.dlut.edu.cn/" target="_blank" rel="noopener noreferrer">Dalian University of Tech</a>.
          </p>
          {/* <p className="body-text body-text--bold" style={{ marginTop: 16 }}>Efficient ML Systems</p>
          <p className="body-text body-text--bold">ML Compilation</p>
          <p className="body-text body-text--bold">Adversarial Attacks on DNNs</p> */}
          <p className="body-text body-text--bold" style={{ marginTop: 16 }}>RESEARCH INTEREST</p>

          <p className="body-text body-text--muted" style={{ marginTop: 12 }}>
            Analyzing efficiency of DL pipeline systems under malicious inputs;
            compiler design and automated kernel generation.
          </p>
          
          <p className="body-text body-text--highlight" style={{ marginTop:20, fontSize: 14, color: 'blue' }}>
            I am Looking for internship in ML Compilation, summer 2026
          </p>
        </div>
      </div>

      {/* 02 Publications (collapsible) */}
      <Section id="publications" number="02" label="Publications" collapsible open={openSection === "publications"} onToggle={() => toggleSection("publications")}>
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

      {/* 03 Experience (collapsible) */}
      <Section id="experience" number="03" label="Experience" collapsible open={openSection === "experience"} onToggle={() => toggleSection("experience")}>
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

      {/* 04 Teaching (collapsible) */}
      <Section id="teaching" number="04" label="Teaching" collapsible open={openSection === "teaching"} onToggle={() => toggleSection("teaching")}>
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
