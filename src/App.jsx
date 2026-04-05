import React, { useCallback, useEffect, useState } from "react";

function highlightName(text, name) {
  if (!name || typeof text !== "string") return text;
  const pattern = new RegExp(
    `(${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  return text.split(pattern).map((part, i) =>
    pattern.test(part) ? (
      <span key={i} className="me">{part}</span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

function PubEntry({ title, authors, time, venue, links = [] }) {
  return (
    <article className="entry">
      <h3 className="entry-title">{title}</h3>
      <div className="entry-meta">
        {venue && <span className="entry-tag entry-tag--venue">{venue}</span>}
        {time && <span className="entry-tag">{time}</span>}
        {links.map((l, i) => (
          <span key={i} className="entry-tag">
            <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
          </span>
        ))}
      </div>
      {authors && <div className="entry-desc">{highlightName(authors, "Tingxi Li")}</div>}
    </article>
  );
}

function ExpEntry({ title, role, time, description }) {
  return (
    <article className="entry">
      <h3 className="entry-title">{title}</h3>
      <div className="entry-meta">
        {role && <span className="entry-tag entry-tag--venue">{role}</span>}
        {time && <span className="entry-tag">{time}</span>}
      </div>
      {description && <div className="entry-desc">{description}</div>}
    </article>
  );
}

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
    <div className="page">
      {/* ── Left Column ── */}
      <aside className="col-left">
        <img
          className="profile-photo"
          alt="Tingxi Li"
          src="https://ik.imagekit.io/tingxi/myphoto2.jpeg"
        />

        <div>
          <h1 className="profile-name">Tingxi Li</h1>
          <p className="profile-sub">李亭熹</p>
        </div>

        <p className="profile-bio">
          2nd year PhD student at{" "}
          <a href="https://www.utdallas.edu/" target="_blank" rel="noopener noreferrer">UT Dallas</a>,
          advised by{" "}
          <a href="https://www.youngwei.com/" target="_blank" rel="noopener noreferrer">Prof. Wei Yang</a>.
          B.S. from{" "}
          <a href="https://en.dlut.edu.cn/" target="_blank" rel="noopener noreferrer">Dalian University of Tech</a>.
        </p>

        <div className="profile-research">
          <p className="profile-research__heading">Research Interests</p>
          <p className="profile-research__text">
            Efficiency of DL pipeline systems under malicious inputs;
            compiler design and automated kernel generation.
          </p>
        </div>

        <p className="profile-callout">
          Looking for internship in ML Compilation, summer 2026
        </p>

        <div className="contact-row">
          <button onClick={copyEmail} title="Copy email">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </button>
          <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" title="CV">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </a>
          <a href="https://scholar.google.com/citations?user=a_XpeY0AAAAJ&hl=en" target="_blank" rel="noopener noreferrer" title="Google Scholar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/tingxi-l-352a45297/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </aside>

      {/* ── Right Column ── */}
      <main className="col-right">
        {/* Experience */}
        <section>
          <h2 className="section-block__title">Experience</h2>
          <ExpEntry
            title="SOPHGO"
            role="Research Intern"
            time="May – Aug 2024"
            description="Refactor C++ code, test the refactored code to ensure compilation and functionality, and write documentation."
          />
          <ExpEntry
            title="Amazon Nova AI Challenge: Trusted AI"
            role="Finalist"
            time="Nov 2024 – Jul 2025"
            description="Team member of one of the red teaming finalists. Develop surrogate model to help evaluating adversarial probes and refine attack strategies."
          />
        </section>

        {/* Publications */}
        <section>
          <h2 className="section-block__title">Selected Publications</h2>
          <PubEntry
            title="Identify then Exploit: Degrading Performance of Vision-based Deep Learning Systems"
            authors="Tingxi Li*, Mingfang Ji*, Ravishka Rathnasuriya, Simin Chen, Yitao Hu, Wei Yang"
            time="2025"
            venue="under review"
          />
          <PubEntry
            title="Efficiency Attack and Defences Towards Deep Learning Systems"
            authors="Ravishka Rathnasuriya, Tingxi Li, Zexin Xu, Zihe Song, Jun Ren, Mirazul Haque, Simin Chen, Wei Yang"
            time="2025"
            venue="USENIX Security"
            links={[
              { href: "https://www.usenix.org/system/files/usenixsecurity25-rathnasuriya.pdf", label: "PDF" },
              { href: "https://zenodo.org/records/15649771", label: "Code" },
            ]}
          />
          <PubEntry
            title="COMET: Closed-loop Orchestration for Malicious Elicitation Techniques in Code Models"
            authors="Zexin Xu, Tingxi Li, Ravishka Rathnasuriya, Zihe Song, Jun Ren, Bhavesh Mandalapu, Soroush Setayeshpour, Xinya Du, Wei Yang"
            time="2025"
            venue="technical report"
            links={[
              { href: "https://assets.amazon.science/6f/16/076dff834864823e4f09322d1495/astro-comet-closed-loop-orchestration-for-malicious-elicitation-techniques-in-code-models.pdf", label: "PDF" },
            ]}
          />
          <p className="scholar-note">
            Full list on{" "}
            <a href="https://scholar.google.com/citations?user=a_XpeY0AAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
              Google Scholar
            </a>
          </p>
        </section>
      </main>

      {/* Toast */}
      <div className={`toast${copied ? " toast--show" : ""}`} role="status" aria-live="polite">
        Email copied
      </div>
    </div>
  );
}
