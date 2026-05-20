import { useEffect, useState, useCallback, useRef } from "react";

const SECTIONS = ["research", "publications", "projects", "education", "experience", "teaching"];

const PUB_ABSTRACTS = {
  issta26: "Tile-based programming models such as Triton and TileLang are increasingly used to write high-performance GPU kernels, yet the reliability of programs in these DSLs remains understudied. We present a systematic characterization of real-world bugs in tile programs and develop automated detection techniques targeting common bug patterns found in production kernel code.",
  usenix25: "A taxonomy of efficiency vulnerabilities in dynamic deep learning systems, along with a comprehensive evaluation of attack techniques and defenses across multiple dimensions (e.g., attack surface, model type, etc.) to identify key factors influencing efficiency robustness and guide future research in this area.",
  comet: "Large language models trained on code are increasingly integrated into software development workflows, raising concerns about their susceptibility to adversarial prompts that elicit malicious outputs. COMET introduces a closed-loop orchestration framework that automatically generates, evaluates, and refines malicious elicitation techniques against black-box code models, achieving high attack success rates through iterative feedback.",
  tilelangTPU: "Tile-level DSLs make AI kernels easier to write, but mapping them to commercial DSAs like SOPHGO TPUs is hard due to constrained local memory and decoupled DMA/compute engines. We build a compiler+runtime that preserves the tile abstraction while redesigning its internals around TPU resource orchestration — achieving a 1.10× average speedup over vendor-optimized kernels on Matmul, RMSNorm, RoPE, SwiGLU, and more.",
  aesop: "ML inference pipelines have a new attack surface single-model attacks miss: which path inputs take through the pipeline. Our attack, AESOP, exploits this — achieving 58× FLOPs / 17× latency inflation even in gray-box settings. Defenses don't stop it; they force pipelines to choose between throughput collapse or dropping 96.7% of inputs.",
};

const ICONS = {
  pdf: (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style={{verticalAlign:"middle",marginRight:4,flexShrink:0}}>
      <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2L9.5 1.5z"/>
    </svg>
  ),
  github: (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style={{verticalAlign:"middle",marginRight:4,flexShrink:0}}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
    </svg>
  ),
  slides: (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style={{verticalAlign:"middle",marginRight:4,flexShrink:0}}>
      <path d="M14 2H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h4v1H4a.5.5 0 0 0 0 1h8a.5.5 0 0 0 0-1h-2v-1h4a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM2 3h12v9H2V3z"/>
    </svg>
  ),
  link: (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style={{verticalAlign:"middle",marginRight:4,flexShrink:0}}>
      <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
      <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
    </svg>
  ),
};

const SECTION_LABELS = {
  research: "Research",
  publications: "Publications",
  projects: "Projects",
  education: "Education",
  experience: "Experience",
  teaching: "Teaching",
};

export default function App() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);
  const countFetched = useRef(false);

  useEffect(() => {
    const visible = new Set();
    const observers = SECTIONS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
          const active = SECTIONS.find((s) => visible.has(s));
          if (active) setActiveSection(active);
        },
        { rootMargin: "0px 0px -70% 0px" }
      );
      obs.observe(el);
      return obs;
    }).filter(Boolean);
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (countFetched.current) return;
    countFetched.current = true;
    import("./firebase")
      .then((m) => m.incrementVisitorCount())
      .catch(() => {});
  }, []);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      switch (e.key) {
        case "r": scrollToSection("research"); break;
        case "p": scrollToSection("publications"); break;
        case "j": {
          const hs = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
          const next = hs.find((el) => el.offsetTop > window.scrollY + 100);
          if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
          break;
        }
        case "k": {
          const hs = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
          const prev = [...hs].reverse().find((el) => el.offsetTop < window.scrollY - 10);
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
      {/* Nav dots */}
      <nav className="section-dots" aria-label="Page sections">
        {SECTIONS.map((id) => (
          <button
            key={id}
            className={`section-dot${activeSection === id ? " active" : ""}`}
            onClick={() => scrollToSection(id)}
            aria-label={SECTION_LABELS[id]}
            data-label={SECTION_LABELS[id]}
          />
        ))}
      </nav>

      {/* Download CV button */}
      <a className="pdf-btn" href="/cv.pdf" download="Tingxi-Li-CV.pdf" aria-label="Download CV">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
        </svg>
      </a>

      {/* Header */}
      <header className="cv-header">
        <div className="cv-header-spacer" />
        <div className="cv-header-text">
          <h1 className="cv-name">Tingxi Li</h1>
          <p className="cv-address">800 W Campbell Rd, Richardson, TX 75080</p>
          <p className="cv-contact">
            <span className="cv-email">tingxi.li[at]utdallas.edu</span>
            <span className="cv-sep">|</span>
            <a href="https://www.linkedin.com/in/tingxi-li-352a45297/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span className="cv-sep">|</span>
            <a href="https://tingxi.li" target="_blank" rel="noopener noreferrer">Homepage</a>
            <span className="cv-sep">|</span>
            <a href="https://scholar.google.com/citations?view_op=list_works&hl=en&user=a_XpeY0AAAAJ" target="_blank" rel="noopener noreferrer">Google Scholar</a>
          </p>
        </div>
        <div className="cv-photo-coin">
          <img
            src="https://ik.imagekit.io/tingxi/myphoto2.jpeg"
            alt="Tingxi Li"
            className="cv-photo cv-photo-front"
          />
          <img
            src="https://ik.imagekit.io/tingxi/SDIM0107.jpg"
            alt="My two cats"
            className="cv-photo cv-photo-back"
          />
        </div>
      </header>

      {/* Research Interests */}
      <section className="cv-section" id="research">
        <h2 className="cv-section-title">Research Interests</h2>
        <p>
          I am broadly interested in the <strong>inference-time efficiency</strong> of deep learning
          systems across two levels: (i) kernel and subgraph-level efficiency, and (ii) model-level
          dynamicity. My primary research interests lie in <strong>deep learning compilation</strong>,
          targeting compiler infrastructure and AI-driven kernel generation. I also investigate dynamic
          behavior vulnerabilities in deep learning models and develop defenses against efficiency
          exploitation.
        </p>
      </section>

      {/* Publications */}
      <section className="cv-section" id="publications">
        <h2 className="cv-section-title">Publications</h2>

        <div className="cv-entry">
          <div className="cv-entry-row">
            <span className="cv-entry-title">Characterizing Real-World Bugs in Tile Programs for Automated Bug Detection</span>
            <span className="venue venue-conf">ISSTA 2026</span>
          </div>
          <div className="cv-entry-authors">
            R. Rathnasuriya, Z. Song, N. Majoju, <b>T. Li</b>, A. Moharir, W. Yang, T. Xie
          </div>
          <div className="cv-pub-links">
            <a href="https://arxiv.org/pdf/2605.19652v1" target="_blank" rel="noopener noreferrer" className="cv-pub-link">{ICONS.pdf}arXiv</a>
          </div>
          <div className="pub-abstract">
            {PUB_ABSTRACTS.issta26}
            <a href="https://arxiv.org/pdf/2605.19652v1" target="_blank" rel="noopener noreferrer" className="pub-abstract-link">{ICONS.pdf}view full paper →</a>
          </div>
        </div>

        <div className="cv-entry">
          <div className="cv-entry-row">
            <span className="cv-entry-title">SoK: Efficiency Robustness of Dynamic Deep Learning Systems</span>
            <span className="venue venue-conf">USENIX Security 2025</span>
          </div>
          <div className="cv-entry-authors">
            R. Rathnasuriya, <b>T. Li</b>, Z. Xu, Z. Song, M. Haque, S. Chen, W. Yang
          </div>
          <div className="cv-pub-links">
            <a href="https://www.usenix.org/system/files/usenixsecurity25-rathnasuriya.pdf" target="_blank" rel="noopener noreferrer" className="cv-pub-link">{ICONS.pdf}PDF</a>
            <a href="https://zenodo.org/records/15649771" target="_blank" rel="noopener noreferrer" className="cv-pub-link">{ICONS.github}Code</a>
          </div>
          <div className="pub-abstract">
            {PUB_ABSTRACTS.usenix25}
            <a href="https://www.usenix.org/system/files/usenixsecurity25-rathnasuriya.pdf" target="_blank" rel="noopener noreferrer" className="pub-abstract-link">{ICONS.pdf}view full paper →</a>
          </div>
        </div>

        <div className="cv-entry">
          <div className="cv-entry-row">
            <span className="cv-entry-title">COMET: Closed-loop Orchestration for Malicious Elicitation Techniques in Code Models</span>
            <span className="venue venue-report">Technical Report</span>
          </div>
          <div className="cv-entry-authors">
            Z. Xu, <b>T. Li</b>, R. Rathnasuriya, Z. Song, J. Ren, B. Mandalapu, S. Setayeshpour, X. Du, W. Yang
          </div>
          <div className="cv-pub-links">
            <a href="https://assets.amazon.science/6f/16/076dff834864823e4f09322d1495/astro-comet-closed-loop-orchestration-for-malicious-elicitation-techniques-in-code-models.pdf" target="_blank" rel="noopener noreferrer" className="cv-pub-link">{ICONS.pdf}PDF</a>
          </div>
          <div className="pub-abstract">
            {PUB_ABSTRACTS.comet}
            <a href="https://assets.amazon.science/6f/16/076dff834864823e4f09322d1495/astro-comet-closed-loop-orchestration-for-malicious-elicitation-techniques-in-code-models.pdf" target="_blank" rel="noopener noreferrer" className="pub-abstract-link">{ICONS.pdf}view full paper →</a>
          </div>
        </div>

        <div className="cv-entry">
          <div className="cv-entry-row">
            <span className="cv-entry-title">TileLang-TPU: A High-Performance Tiled Programming Framework for SOPHGO TPU Acceleration</span>
            <span className="venue venue-report">Technical Report</span>
          </div>
          <div className="cv-entry-authors">
            Sophgo Infra Team
          </div>
          <div className="cv-pub-links">
            <a href="https://github.com/xwhzz/tilelang-tpu" target="_blank" rel="noopener noreferrer" className="cv-pub-link">{ICONS.github}Code</a>
          </div>
          <div className="pub-abstract">
            {PUB_ABSTRACTS.tilelangTPU}
          </div>
        </div>

        <div className="cv-entry">
          <div className="cv-entry-row">
            <span className="cv-entry-title">AESOP: Adversarial Execution-path Selection to Overload Deep Learning Pipelines</span>
            <span className="venue venue-arxiv">arXiv Preprint</span>
          </div>
          <div className="cv-entry-authors">
            <b>T. Li</b>, M. Ji, R. Rathnasuriya, S. Chen, Y. Hu, W. Yang
          </div>
          <div className="cv-pub-links">
            <a href="https://arxiv.org/abs/2605.10987" target="_blank" rel="noopener noreferrer" className="cv-pub-link">{ICONS.pdf}arXiv</a>
          </div>
          <div className="pub-abstract">
            {PUB_ABSTRACTS.aesop}
            <a href="https://arxiv.org/abs/2605.10987" target="_blank" rel="noopener noreferrer" className="pub-abstract-link">{ICONS.pdf}view full paper →</a>
          </div>
        </div>
      </section>

      {/* Research Projects */}
      <section className="cv-section" id="projects">
        <h2 className="cv-section-title">Research Projects</h2>

        <div className="cv-entry">
          <div className="cv-entry-row">
            <span className="cv-entry-title">A Survey of Automation in Kernel Generalization and Optimization</span>
            <span className="cv-entry-date">Jan. 2026 – Present</span>
          </div>
          <ul className="cv-entry-bullets">
            <li>Systematized DL compilation research into AI-driven kernel generation and compiler infrastructure, with subcategories on search space pruning, auto-tuning, cost modeling, and candidate validation.</li>
            <li>Analyzed IR evolution from loop-based to tile-based abstractions and its downstream impact on the compilation ecosystem.</li>
          </ul>
        </div>

        <div className="cv-entry">
          <div className="cv-entry-row">
            <span className="cv-entry-title">TileBench: A Comprehensive Benchmark for Tile-Based DSLs</span>
            <span className="cv-entry-date">Mar. 2026 – Present</span>
          </div>
          <div className="cv-pub-links">
            <a href="https://github.com/tingxi-li/DSLPerfGap" target="_blank" rel="noopener noreferrer" className="cv-pub-link">{ICONS.github}Code</a>
          </div>
          <ul className="cv-entry-bullets">
            <li>Built a benchmark covering PyTorch Eager/Compile and Triton/TileLang across diverse hardware and workloads.</li>
            <li>Merged KernelBench and TritonBench into a unified dataset with verified correctness and a multi-dimensional kernel taxonomy (functionality, complexity, etc.).</li>
          </ul>
        </div>

        <div className="cv-entry">
          <div className="cv-entry-row">
            <span className="cv-entry-title">Amazon Trusted AI Competition</span>
            <span className="cv-entry-date">Nov. 2024 – Jul. 2025</span>
          </div>
          <div className="cv-pub-links">
            <a href="https://www.amazon.science/nova-ai-challenge/finalist-teams-advance-in-the-amazon-nova-ai-challenge-trusted-ai-track" target="_blank" rel="noopener noreferrer" className="cv-pub-link">{ICONS.link}Link</a>
          </div>
          <ul className="cv-entry-bullets">
            <li>Finalist team ($250K prize) targeting black-box jailbreaking of CodeLLMs.</li>
            <li>Fine-tuned surrogate models for adversarial prompt guidance, achieving 0.80+ recall and 0.75+ F1 in malicious intent detection.</li>
          </ul>
        </div>
      </section>

      {/* Education */}
      <section className="cv-section" id="education">
        <h2 className="cv-section-title">Education</h2>

        <div className="cv-entry">
          <div className="cv-entry-row">
            <span className="cv-entry-title">
              <a href="https://www.utdallas.edu/" target="_blank" rel="noopener noreferrer">University of Texas at Dallas</a>
            </span>
            <span className="cv-entry-date">Sep. 2024 – Present</span>
          </div>
          <div className="cv-entry-sub">Doctor of Philosophy</div>
        </div>

        <div className="cv-entry">
          <div className="cv-entry-row">
            <span className="cv-entry-title">
              <a href="https://en.dlut.edu.cn/" target="_blank" rel="noopener noreferrer">Dalian University of Technology</a>
            </span>
            <span className="cv-entry-date">Sep. 2019 – May 2024</span>
          </div>
          <div className="cv-entry-sub">Bachelor of Science</div>
        </div>
      </section>

      {/* Internship Experience */}
      <section className="cv-section" id="experience">
        <h2 className="cv-section-title">Internship Experience</h2>

        <div className="cv-entry">
          <div className="cv-entry-row">
            <span className="cv-entry-title">Sophgo — Research Intern</span>
            <span className="cv-entry-date">Jun. 2024 – Aug. 2024</span>
          </div>
          <div className="cv-entry-sub">Shenzhen, China</div>
          <ul className="cv-entry-bullets">
            <li>Developed C++ API code for models on RISC-V processors and authored deployment documentation.</li>
            <li>Fine-tuned models on private datasets, identified failure cases, and applied data augmentation to improve robustness.</li>
          </ul>
        </div>
      </section>

      {/* Teaching */}
      <section className="cv-section" id="teaching">
        <h2 className="cv-section-title">Teaching</h2>

        <div className="cv-entry">
          <div className="cv-entry-row">
            <span className="cv-entry-title">CS 4365 — Artificial Intelligence</span>
            <span className="cv-entry-date">Spring 2026</span>
          </div>
          <div className="cv-entry-sub">Teaching Assistant, UT Dallas</div>
        </div>

        <div className="cv-entry">
          <div className="cv-entry-row">
            <span className="cv-entry-title">CS 4375 — Introduction to Machine Learning</span>
            <span className="cv-entry-date">Fall 2025; Fall 2024</span>
          </div>
          <div className="cv-entry-sub">Teaching Assistant, UT Dallas</div>
          <div className="cv-pub-links">
            <a href="https://github.com/tingxi-li/portfolio/releases/download/v1.0/ml-compilation-triton.pdf" target="_blank" rel="noopener noreferrer" className="cv-pub-link">{ICONS.slides}Slides</a>
          </div>
        </div>

        <div className="cv-entry">
          <div className="cv-entry-row">
            <span className="cv-entry-title">CS 4337 — Programming Language Paradigms</span>
            <span className="cv-entry-date">Spring 2025</span>
          </div>
          <div className="cv-entry-sub">Teaching Assistant, UT Dallas</div>
        </div>
      </section>

      {/* Miscellaneous */}
      <section className="cv-section" id="misc">
        <h2 className="cv-section-title">Miscellaneous</h2>
        <p><strong>Tech Stack:</strong> Python; C; C++; Java; PyTorch; LaTeX; SQL</p>
        <p style={{ marginTop: "10px" }}>My two cats:</p>
        <img
          src="https://ik.imagekit.io/tingxi/SDIM0107.jpg"
          alt="My two cats"
          className="misc-cats"
        />
      </section>

      {/* Footer */}
      <footer className="cv-footer">
        <p>Last modified: April 2026 · <span className="cv-email">tingxi.li[at]utdallas.edu</span></p>
      </footer>
    </>
  );
}
