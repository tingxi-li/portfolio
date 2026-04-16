import { useEffect, useState, useCallback, useRef } from "react";

const SECTIONS = ["research", "publications", "teaching", "experience", "education"];

export default function App() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(null);
  const countFetched = useRef(false);

  useEffect(() => {
    if (countFetched.current) return;
    countFetched.current = true;
    import("./firebase")
      .then((mod) => mod.incrementVisitorCount())
      .then((count) => setVisitorCount(count))
      .catch(() => setVisitorCount(null));
  }, []);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      switch (e.key) {
        case "?":
          setHelpOpen((v) => !v);
          break;
        case "Escape":
          setHelpOpen(false);
          break;
        case "r":
          scrollToSection("research");
          break;
        case "p":
          scrollToSection("publications");
          break;
        case "t":
          scrollToSection("teaching");
          break;
        case "x":
          scrollToSection("experience");
          break;
        case "d":
          scrollToSection("education");
          break;
        case "j": {
          const headings = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
          const scrollY = window.scrollY + 100;
          const next = headings.find((el) => el.offsetTop > scrollY);
          if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
          break;
        }
        case "k": {
          const headings = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
          const scrollY = window.scrollY - 10;
          const prev = [...headings].reverse().find((el) => el.offsetTop < scrollY);
          if (prev) prev.scrollIntoView({ behavior: "smooth", block: "start" });
          break;
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollToSection]);
  return (
    <>
      <nav className="navbar">
        <a href="#research" onClick={(e) => { e.preventDefault(); scrollToSection("research"); }}>Research</a>
        <a href="#publications" onClick={(e) => { e.preventDefault(); scrollToSection("publications"); }}>Publications</a>
        <a href="#teaching" onClick={(e) => { e.preventDefault(); scrollToSection("teaching"); }}>Teaching</a>
        <a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection("experience"); }}>Experience</a>
        <a href="#education" onClick={(e) => { e.preventDefault(); scrollToSection("education"); }}>Education</a>
      </nav>

      <p className="welcome">
        <span className="w1">W</span><span className="w2">e</span><span className="w3">l</span><span className="w4">c</span><span className="w5">o</span><span className="w6">m</span><span className="w1">e</span>{" "}
        <span className="w2">t</span><span className="w3">o</span>{" "}
        <span className="w4">m</span><span className="w5">y</span>{" "}
        <span className="w6">h</span><span className="w1">o</span><span className="w2">m</span><span className="w3">e</span><span className="w4">p</span><span className="w5">a</span><span className="w6">g</span><span className="w1">e</span><span className="w2">!</span><span className="w3">!</span><span className="w4">!</span>
      </p>

      <div className="marquee-wrap">
        <span className="marquee-text">
          ★ Looking for research intern for summer 2026 ★
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ marginBottom: 0 }}>Tingxi Li</h1>
          <p style={{ fontSize: 15, color: "#444", marginTop: 4 }}>
            Ph.D. Student in Computer Science @ UT Dallas
            <br />
            Advised by <a href="https://www.youngwei.com/" target="_blank" rel="noopener noreferrer">Prof. Wei Yang</a>
          </p>
        </div>
        <img
          src="https://ik.imagekit.io/tingxi/myphoto2.jpeg"
          alt="Tingxi Li"
          style={{ width: 100, height: 100, objectFit: "cover", border: "2px solid #000", flexShrink: 0, marginTop: 8 }}
        />
      </div>

      {/* Contact icons */}
      <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", marginTop: 8 }}>
        <a href="mailto:tingxi.li@utdallas.edu" style={{ display: "flex", alignItems: "center", gap: 5, color: "#0000ee" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="14" height="10" rx="1"/><path d="M2 5l7 5 7-5"/></svg>
          Email
        </a>
        <a href="https://scholar.google.com/citations?user=a_XpeY0AAAAJ&hl=en" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 5, color: "#0000ee" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="5"/><path d="M4 8h10"/><ellipse cx="9" cy="8" rx="2" ry="5"/></svg>
          Google Scholar
        </a>
        <a href="https://www.linkedin.com/in/tingxi-l-352a45297/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 5, color: "#0000ee" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="14" height="14" rx="2"/><path d="M6 8v4"/><path d="M6 6v.01"/><path d="M10 12v-2.5a1.5 1.5 0 1 1 3 0V12"/></svg>
          LinkedIn
        </a>
        <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 5, color: "#0000ee" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2h7l3 3v11H4V2z"/><path d="M11 2v3h3"/><line x1="6" y1="9" x2="12" y2="9"/><line x1="6" y1="12" x2="10" y2="12"/></svg>
          CV
        </a>
      </div>

      <hr />

      <h2 id="research">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", marginRight: 6 }}><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/></svg>
        Research Interests
      </h2>

      <p>
        I am interested in improving the inference-time efficiency of deep learning systems
        through <b>AI compiler optimization</b> and <b>input guardrailing</b>. My primary research focus is 
        on the <b>AI compilation pipeline</b> — particularly auto-tuning, automated kernel generation,
         and code generation. I am also interested in characterizing and mitigating <b>performance 
          vulnerabilities</b> in the input space that can silently degrade system efficiency.
      </p>

      <hr />

      <h2 id="publications">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", marginRight: 6 }}><path d="M3 2h10l1 2H2L3 2z"/><rect x="2" y="4" width="12" height="9" rx="1"/><circle cx="8" cy="8.5" r="2"/></svg>
        Publications
      </h2>

      <ul className="pub-list">
        <li className="pub-year">2026</li>

        <li className="pub-entry">
          <span className="pub-title">Characterizing Real-World Bugs in Tile Programs for Automated Bug Detection <span className="badge-new">NEW!</span></span>
          <span className="pub-authors">Ravishka Rathnasuriya, Zihe Song, Nidhi Majoju, <b>Tingxi Li</b>, Aaryaa Moharir, Wei Yang, Tao Xie</span>
          <span className="pub-venue">ACM SIGSOFT International Symposium on Software Testing and Analysis (ISSTA)</span>
        </li>

        <li className="pub-entry">
          <span className="pub-title">A Systematic Review of AI Compilation: From Framework Intent to Kernel Optimization <span className="badge-new">NEW!</span></span>
          <span className="pub-authors"><b>Tingxi Li</b>, Wei Yang</span>
          <span className="pub-venue">Under review</span>
        </li>

        <li className="pub-entry">
          <span className="pub-title">An Empirical Study of GPU Kernel Performance Gaps in Modern Domain-Specific Languages <span className="badge-new">NEW!</span></span>
          <span className="pub-authors"><b>Tingxi Li</b>, Ravishka Rathnasuriya, Wei Yang</span>
          <span className="pub-venue">Under review</span>
        </li>

        <li className="pub-entry">
          <span className="pub-title">Identify then Exploit: Degrading Performance of Vision-based Deep Learning Systems</span>
          <span className="pub-authors"><b>Tingxi Li</b>*, Mingfang Ji*, Ravishka Rathnasuriya, Simin Chen, Yitao Hu, Wei Yang</span>
          <span className="pub-venue">Under review</span>
        </li>

        <li className="pub-year">2025</li>

        <li className="pub-entry">
          <span className="pub-title">Efficiency Attack and Defences Towards Deep Learning Systems</span>
          <span className="pub-authors">Ravishka Rathnasuriya, <b>Tingxi Li</b>, Zexin Xu, Zihe Song, Jun Ren, Mirazul Haque, Simin Chen, Wei Yang</span>
          <span className="pub-venue">USENIX Security Symposium (USENIX Security)</span>
          <div className="pub-links">
            <a href="https://www.usenix.org/system/files/usenixsecurity25-rathnasuriya.pdf" target="_blank" rel="noopener noreferrer">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="#0000ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 1h6l3 3v8H2V1z"/><path d="M8 1v3h3"/></svg>
              [PDF]
            </a>
            <a href="https://zenodo.org/records/15649771" target="_blank" rel="noopener noreferrer">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="#0000ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="2" width="11" height="9" rx="1"/><path d="M4 5l2 2-2 2M7 9h3"/></svg>
              [Code]
            </a>
          </div>
        </li>

        <li className="pub-entry">
          <span className="pub-title">COMET: Closed-loop Orchestration for Malicious Elicitation Techniques in Code Models</span>
          <span className="pub-authors">Zexin Xu, <b>Tingxi Li</b>, Ravishka Rathnasuriya, Zihe Song, Jun Ren, Bhavesh Mandalapu, Soroush Setayeshpour, Xinya Du, Wei Yang</span>
          <span className="pub-venue">Technical report</span>
          <div className="pub-links">
            <a href="https://assets.amazon.science/6f/16/076dff834864823e4f09322d1495/astro-comet-closed-loop-orchestration-for-malicious-elicitation-techniques-in-code-models.pdf" target="_blank" rel="noopener noreferrer">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="#0000ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 1h6l3 3v8H2V1z"/><path d="M8 1v3h3"/></svg>
              [PDF]
            </a>
          </div>
        </li>
      </ul>

      <p>
        Full list on <a href="https://scholar.google.com/citations?user=a_XpeY0AAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Google Scholar</a>.
      </p>

      <hr />

      <h2 id="teaching">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", marginRight: 6 }}><path d="M2 13V5l6-3 6 3v8"/><rect x="6" y="9" width="4" height="4"/><path d="M2 5l6 3 6-3"/></svg>
        Teaching
      </h2>

      <ul className="pub-list">
        <li className="pub-entry">
          <div className="pub-title-row">
            <span className="pub-title">CS 4365 — Artifical Intelligence</span>
            <span className="pub-semester">Spring 2026</span>
          </div>
          <span className="pub-authors">Teaching Assistant, UT Dallas</span>
        </li>

        <li className="pub-entry">
          <div className="pub-title-row">
            <span className="pub-title">CS 4375 — Introduction to Machine Learning</span>
            <span className="pub-semester">Fall 2025; Fall 2024</span>
          </div>
          <span className="pub-authors">Teaching Assistant, UT Dallas</span>
          <div className="pub-links">
            <a href="https://github.com/tingxi-li/portfolio/releases/download/v1.0/ml-compilation-triton.pdf" target="_blank" rel="noopener noreferrer">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="#0000ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 1h6l3 3v8H2V1z"/><path d="M8 1v3h3"/></svg>
              [Slides]
            </a>
          </div>
        </li>

        <li className="pub-entry">
          <div className="pub-title-row">
            <span className="pub-title">CS 4337 — Programming Language Paradigms</span>
            <span className="pub-semester">Spring 2025</span>
          </div>
          <span className="pub-authors">Teaching Assistant, UT Dallas</span>
        </li>
      </ul>

      <hr />

      <h2 id="experience">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", marginRight: 6 }}><rect x="2" y="4" width="12" height="9" rx="1"/><path d="M5 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1"/><circle cx="8" cy="8.5" r="1"/></svg>
        Experience
      </h2>

      <div className="row">
        <div>Research Intern, SOPHGO</div>
        <div className="row-year">May–Aug 2024</div>
      </div>
      <div className="row">
        <div>Finalist, <a href="https://www.amazon.science/nova-ai-challenge/finalist-teams-advance-in-the-amazon-nova-ai-challenge-trusted-ai-track" target="_blank" rel="noopener noreferrer">Amazon Nova AI Challenge: Trusted AI</a></div>
        <div className="row-year">Nov 2024–Jul 2025</div>
      </div>

      <hr />

      <h2 id="education">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", marginRight: 6 }}><path d="M2 6l6-3 6 3-6 3-6-3z"/><path d="M14 6v5"/><path d="M4 7.5v4c0 1 2 2 4 2s4-1 4-2v-4"/></svg>
        Education
      </h2>

      <div className="row">
        <div>Ph.D., <a href="https://www.utdallas.edu/" target="_blank" rel="noopener noreferrer">The University of Texas at Dallas</a></div>
        <div className="row-year">2024–present</div>
      </div>
      <div className="row">
        <div>B.S., <a href="https://en.dlut.edu.cn/" target="_blank" rel="noopener noreferrer">Dalian University of Technology</a></div>
        <div className="row-year">2019–2024</div>
      </div>

      <hr />

      <h2 id="misc">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", marginRight: 6 }}><circle cx="8" cy="8" r="6"/><path d="M8 5v1"/><path d="M8 8v3"/></svg>
        Misc
      </h2>

      <div className="under-construction">
        <div className="under-construction__inner">🚧 Under Construction 🚧</div>
      </div>

      <p>My two cats:</p>
      <img
        src="https://ik.imagekit.io/tingxi/IMG_1491.jpg"
        alt="My two cats"
        style={{ maxWidth: 360, width: "100%", border: "2px solid #000", display: "block" }}
      />

      <hr />

      <address style={{ fontSize: 14, color: "#444" }}>
        Last modified: April 2026 · <a href="mailto:tingxi.li@utdallas.edu">tingxi.li [you-know-what] utdallas.edu</a>
        <span className="cursor">█</span>
      </address>

      <p style={{ fontSize: 12, color: "#555", textAlign: "center", marginTop: 12 }}>
        &copy; 2026 Tingxi Li. All rights reserved.
      </p>

      <div className="badges">
        <span className="badge badge--netscape">Best viewed with Netscape Navigator 3.0</span>
        <span className="badge badge--react">Made with React</span>
        <span className="badge badge--firebase">Powered by Firebase</span>
        <span className="badge badge--html">HTML 2.0 Compliant</span>
        <span className="badge badge--claude">Built with Claude Code</span>
      </div>

      <p style={{ fontSize: 13, color: "#555", textAlign: "center", marginTop: 24 }}>
        You are visitor <span className="hit-counter">{visitorCount !== null ? String(visitorCount).padStart(8, "0") : "········"}</span>
        <br />
        <span style={{ fontSize: 11 }}>Press <b>?</b> for keyboard shortcuts</span>
      </p>

      {/* Keyboard help overlay */}
      <div className={`help-overlay${helpOpen ? " open" : ""}`} onClick={() => setHelpOpen(false)}>
        <div className="help-box" onClick={(e) => e.stopPropagation()}>
          <h3>Keyboard Shortcuts</h3>
          <table>
            <tbody>
              <tr><td>?</td><td>Toggle this help</td></tr>
              <tr><td>j / k</td><td>Next / previous section</td></tr>
              <tr><td>r</td><td>Research Interests</td></tr>
              <tr><td>p</td><td>Publications</td></tr>
              <tr><td>t</td><td>Teaching</td></tr>
              <tr><td>x</td><td>Experience</td></tr>
              <tr><td>d</td><td>Education</td></tr>
              <tr><td>Esc</td><td>Close</td></tr>
            </tbody>
          </table>
          <span className="help-close">press ? or Esc to close</span>
        </div>
      </div>
    </>
  );
}
