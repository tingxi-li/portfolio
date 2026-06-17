import { useEffect, useState, useCallback, useRef } from "react";

const SECTIONS = ["research", "publications", "projects", "education", "experience", "teaching"];

const PUB_ABSTRACTS = {
  issta26: "Tile-based programming models such as Triton and TileLang are increasingly used to write high-performance GPU kernels, yet the reliability of programs in these DSLs remains understudied. We present a systematic characterization of real-world bugs in tile programs and develop automated detection techniques targeting common bug patterns found in production kernel code.",
  usenix25: "A taxonomy of efficiency vulnerabilities in dynamic deep learning systems, along with a comprehensive evaluation of attack techniques and defenses across multiple dimensions (e.g., attack surface, model type, etc.) to identify key factors influencing efficiency robustness and guide future research in this area.",
  comet: "Large language models trained on code are increasingly integrated into software development workflows, raising concerns about their susceptibility to adversarial prompts that elicit malicious outputs. COMET introduces a closed-loop orchestration framework that automatically generates, evaluates, and refines malicious elicitation techniques against black-box code models, achieving high attack success rates through iterative feedback.",
  tilelangTPU: "Tile-level DSLs like Triton and TileLang ease AI kernel writing on GPUs, but whether the abstraction transfers to commercial DSAs — with constrained local memory, DMA-based data movement, and decoupled transfer/compute engines — remains an open question. We build TileLang-TPU, a compiler and runtime that preserves the tile-level interface while redesigning its internals around SOPHGO TPU resource orchestration — reaching 1.05×–1.23× over vendor-optimized kernels on standalone operators and a 12.5× average speedup on FlashAttention.",
  aesop: "ML inference pipelines have a new attack surface single-model attacks miss: which path inputs take through the pipeline. Our attack, AESOP, exploits this — achieving 58× FLOPs / 17× latency inflation even in gray-box settings. Defenses don't stop it; they force pipelines to choose between throughput collapse or dropping 96.7% of inputs.",
  dslPerfGap: "Modern GPU DSLs like Triton and TileLang promise high-performance kernels without CUDA expertise, but how close they get to vendor libraries — and what limits them — is unclear. We benchmark 22 kernels across five operator categories and find performance is highly uneven: Triton reaches 32–58% of cuBLAS on GEMM and 103% on element-wise kernels, but only 35% on convolution; TileLang exhibits a 314× LayerNorm slowdown vs. PyTorch. Hardware-counter analysis identifies four recurring convolution bottlenecks, and targeted fixes recover 98% of PyTorch throughput on LayerNorm/RMSNorm and push Triton convolution to 80% of cuDNN.",
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
  cite: (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style={{verticalAlign:"middle",marginRight:4,flexShrink:0}}>
      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
    </svg>
  ),
  tldr: (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style={{verticalAlign:"middle",marginRight:4,flexShrink:0}}>
      <path d="M14 2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12zM2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z"/>
      <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
    </svg>
  ),
};

const PUB_FILES = {
  issta26: "tile-bugs.md",
  usenix25: "sok-efficiency.md",
  comet: "comet.md",
  tilelangTPU: "tilelang-tpu.md",
  dslPerfGap: "dsl-perf-gap.md",
  aesop: "aesop.md",
};

const BIBTEX = {
  issta26: `@inproceedings{rathnasuriya2026tilebugs,
  title     = {Characterizing Real-World Bugs in Tile Programs for Automated Bug Detection},
  author    = {Rathnasuriya, R. and Song, Z. and Majoju, N. and Li, T. and Moharir, A. and Yang, W. and Xie, T.},
  booktitle = {Proceedings of the ACM SIGSOFT International Symposium on Software Testing and Analysis (ISSTA)},
  year      = {2026}
}`,
  usenix25: `@inproceedings{rathnasuriya2025sok,
  title     = {SoK: Efficiency Robustness of Dynamic Deep Learning Systems},
  author    = {Rathnasuriya, R. and Li, T. and Xu, Z. and Song, Z. and Haque, M. and Chen, S. and Yang, W.},
  booktitle = {34th USENIX Security Symposium (USENIX Security)},
  year      = {2025}
}`,
  comet: `@techreport{xu2025comet,
  title       = {COMET: Closed-loop Orchestration for Malicious Elicitation Techniques in Code Models},
  author      = {Xu, Z. and Li, T. and Rathnasuriya, R. and Song, Z. and Ren, J. and Mandalapu, B. and Setayeshpour, S. and Du, X. and Yang, W.},
  institution = {Amazon Science},
  year        = {2025}
}`,
  tilelangTPU: `@misc{ren2026tilelangtpu,
  title  = {Retargeting AI Kernel DSLs Beyond GPUs: An Experience Report on Refactoring TileLang to Sophgo TPUs},
  author = {Ren, T. and Li, T. and Xiang, X. and Xu, C. and Yang, W. and Xie, T.},
  note   = {Under review},
  year   = {2026}
}`,
  dslPerfGap: `@misc{li2026dslperfgap,
  title  = {An Empirical Study of GPU Kernel Performance Gaps in Modern Domain-Specific Languages},
  author = {Li, T. and Rathnasuriya, R. and Yang, W.},
  note   = {Under review},
  year   = {2026}
}`,
  aesop: `@article{li2026aesop,
  title   = {AESOP: Adversarial Execution-path Selection to Overload Deep Learning Pipelines},
  author  = {Li, T. and Ji, M. and Rathnasuriya, R. and Chen, S. and Hu, Y. and Yang, W.},
  journal = {arXiv preprint arXiv:2605.10987},
  year    = {2026}
}`,
};

const EMAIL = "tingxi.li@utdallas.edu";

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
  const [tilelangTpuPdfNote, setTilelangTpuPdfNote] = useState(false);
  const [dslPerfGapPdfNote, setDslPerfGapPdfNote] = useState(false);
  const [cvMenuOpen, setCvMenuOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "light"
  );
  const [openAbstracts, setOpenAbstracts] = useState(() => new Set());
  const [toast, setToast] = useState(null);
  const [progress, setProgress] = useState(0);
  const countFetched = useRef(false);
  const cvMenuRef = useRef(null);
  const toastTimer = useRef(null);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* private mode */ }
      return next;
    });
  }, []);

  const toggleAbstract = useCallback((id) => {
    setOpenAbstracts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  }, []);

  const copy = useCallback(async (text, label) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      showToast(label);
    } catch (e) {
      showToast("Copy failed — select manually");
    }
  }, [showToast]);

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  useEffect(() => {
    if (!cvMenuOpen) return;
    const onDocClick = (e) => {
      if (cvMenuRef.current && !cvMenuRef.current.contains(e.target)) {
        setCvMenuOpen(false);
      }
    };
    const onEsc = (e) => {
      if (e.key === "Escape") setCvMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [cvMenuOpen]);

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
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const el = document.documentElement;
        const max = el.scrollHeight - el.clientHeight;
        setProgress(max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.06 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
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

  const renderAbstract = (id, body) => (
    <div className={`pub-abstract${openAbstracts.has(id) ? " is-open" : ""}`}>
      <div className="pa-bar">
        <span className="pa-dot" /><span className="pa-dot" /><span className="pa-dot" />
        <span className="pa-fn">{PUB_FILES[id]}</span>
      </div>
      <div className="pa-body">{body}</div>
    </div>
  );

  const renderTldr = (id) => (
    <button
      type="button"
      className="cv-pub-link cv-pub-link-button cv-pub-link--tldr"
      aria-expanded={openAbstracts.has(id)}
      onClick={() => toggleAbstract(id)}
    >
      {ICONS.tldr}{openAbstracts.has(id) ? "hide" : "TL;DR"}
    </button>
  );

  const renderCite = (id) => (
    <button
      type="button"
      className="cv-pub-link cv-pub-link-button cv-pub-link--cite"
      onClick={() => copy(BIBTEX[id], "BibTeX copied ✓")}
      aria-label="Copy BibTeX citation"
    >
      {ICONS.cite}cite
    </button>
  );

  return (
    <>
      {/* Reading progress */}
      <div className="progress-bar" aria-hidden="true">
        <div className="progress-fill" style={{ transform: `scaleX(${progress})` }} />
      </div>

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

      {/* Top-right controls: theme toggle + CV menu */}
      <div className="controls">
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          title={theme === "dark" ? "Light theme" : "Dark theme"}
        >
          {theme === "dark" ? (
            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.708l1.414 1.415a.5.5 0 0 1 0 .707"/>
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
            </svg>
          )}
        </button>
        <div className="pdf-wrap" ref={cvMenuRef}>
        <button
          type="button"
          className="pdf-btn"
          onClick={() => setCvMenuOpen((o) => !o)}
          aria-haspopup="menu"
          aria-expanded={cvMenuOpen}
          aria-label="CV options"
        >
          résumé
        </button>
        {cvMenuOpen && (
          <div className="pdf-menu" role="menu">
            <a
              className="pdf-menu-item"
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setCvMenuOpen(false)}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
              </svg>
              Preview
            </a>
            <a
              className="pdf-menu-item"
              href="/cv.pdf"
              download="Tingxi-Li-CV.pdf"
              role="menuitem"
              onClick={() => setCvMenuOpen(false)}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
              Download
            </a>
          </div>
        )}
        </div>
      </div>

      {/* Header */}
      <header className="cv-header reveal">
        <div className="cv-header-spacer" />
        <div className="cv-header-text">
          <h1 className="cv-name">Tingxi Li</h1>
          <p className="cv-address">800 W Campbell Rd, Richardson, TX 75080</p>
          <p className="cv-contact">
            <button type="button" className="cv-email" onClick={() => copy(EMAIL, "Email copied ✓")} title="Copy email">tingxi.li[at]utdallas.edu</button>
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
      <section className="cv-section reveal" id="research">
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
      <section className="cv-section reveal" id="publications">
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
            <a href="https://arxiv.org/pdf/2605.19652v1" target="_blank" rel="noopener noreferrer" className="cv-pub-link cv-pub-link--pdf">{ICONS.pdf}PDF</a>
            {renderTldr("issta26")}
            {renderCite("issta26")}
          </div>
          {renderAbstract("issta26", (
            <>
              {PUB_ABSTRACTS.issta26}
              <a href="https://arxiv.org/pdf/2605.19652v1" target="_blank" rel="noopener noreferrer" className="pub-abstract-link">{ICONS.pdf}view full paper →</a>
            </>
          ))}
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
            <a href="https://www.usenix.org/system/files/usenixsecurity25-rathnasuriya.pdf" target="_blank" rel="noopener noreferrer" className="cv-pub-link cv-pub-link--pdf">{ICONS.pdf}PDF</a>
            <a href="https://zenodo.org/records/15649771" target="_blank" rel="noopener noreferrer" className="cv-pub-link cv-pub-link--code">{ICONS.github}Code</a>
            {renderTldr("usenix25")}
            {renderCite("usenix25")}
          </div>
          {renderAbstract("usenix25", (
            <>
              {PUB_ABSTRACTS.usenix25}
              <a href="https://www.usenix.org/system/files/usenixsecurity25-rathnasuriya.pdf" target="_blank" rel="noopener noreferrer" className="pub-abstract-link">{ICONS.pdf}view full paper →</a>
            </>
          ))}
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
            <a href="https://assets.amazon.science/6f/16/076dff834864823e4f09322d1495/astro-comet-closed-loop-orchestration-for-malicious-elicitation-techniques-in-code-models.pdf" target="_blank" rel="noopener noreferrer" className="cv-pub-link cv-pub-link--pdf">{ICONS.pdf}PDF</a>
            {renderTldr("comet")}
            {renderCite("comet")}
          </div>
          {renderAbstract("comet", (
            <>
              {PUB_ABSTRACTS.comet}
              <a href="https://assets.amazon.science/6f/16/076dff834864823e4f09322d1495/astro-comet-closed-loop-orchestration-for-malicious-elicitation-techniques-in-code-models.pdf" target="_blank" rel="noopener noreferrer" className="pub-abstract-link">{ICONS.pdf}view full paper →</a>
            </>
          ))}
        </div>

        <div className="cv-entry">
          <div className="cv-entry-row">
            <span className="cv-entry-title">Practical: Retargeting AI Kernel DSLs Beyond GPUs: An Experience Report on Refactoring TileLang to Sophgo TPUs</span>
            <span className="venue venue-report">Under Review</span>
          </div>
          <div className="cv-entry-authors">
            T. Ren, <b>T. Li</b>, X. Xiang, C. Xu, W. Yang, T. Xie
          </div>
          <div className="cv-pub-links">
            <button
              type="button"
              onClick={() => setTilelangTpuPdfNote((v) => !v)}
              className="cv-pub-link cv-pub-link-button"
              aria-expanded={tilelangTpuPdfNote}
            >
              {ICONS.pdf}PDF
            </button>
            <a href="https://github.com/xwhzz/tilelang-tpu" target="_blank" rel="noopener noreferrer" className="cv-pub-link cv-pub-link--code">{ICONS.github}Code</a>
            {renderTldr("tilelangTPU")}
            {renderCite("tilelangTPU")}
            {tilelangTpuPdfNote && (
              <span className="cv-pub-note">PDF available upon request.</span>
            )}
          </div>
          {renderAbstract("tilelangTPU", PUB_ABSTRACTS.tilelangTPU)}
        </div>

        <div className="cv-entry">
          <div className="cv-entry-row">
            <span className="cv-entry-title">An Empirical Study of GPU Kernel Performance Gaps in Modern Domain-Specific Languages</span>
            <span className="venue venue-report">Under Review</span>
          </div>
          <div className="cv-entry-authors">
            <b>T. Li</b>, R. Rathnasuriya, W. Yang
          </div>
          <div className="cv-pub-links">
            <button
              type="button"
              onClick={() => setDslPerfGapPdfNote((v) => !v)}
              className="cv-pub-link cv-pub-link-button"
              aria-expanded={dslPerfGapPdfNote}
            >
              {ICONS.pdf}PDF
            </button>
            {renderTldr("dslPerfGap")}
            {renderCite("dslPerfGap")}
            {dslPerfGapPdfNote && (
              <span className="cv-pub-note">PDF available upon request.</span>
            )}
          </div>
          {renderAbstract("dslPerfGap", PUB_ABSTRACTS.dslPerfGap)}
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
            <a href="https://arxiv.org/abs/2605.10987" target="_blank" rel="noopener noreferrer" className="cv-pub-link cv-pub-link--pdf">{ICONS.pdf}PDF</a>
            {renderTldr("aesop")}
            {renderCite("aesop")}
          </div>
          {renderAbstract("aesop", (
            <>
              {PUB_ABSTRACTS.aesop}
              <a href="https://arxiv.org/abs/2605.10987" target="_blank" rel="noopener noreferrer" className="pub-abstract-link">{ICONS.pdf}view full paper →</a>
            </>
          ))}
        </div>
      </section>

      {/* Research Projects */}
      <section className="cv-section reveal" id="projects">
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
            <span className="cv-entry-title">Amazon Trusted AI Competition</span>
            <span className="cv-entry-date">Nov. 2024 – Jul. 2025</span>
          </div>
          <div className="cv-pub-links">
            <a href="https://www.amazon.science/nova-ai-challenge/finalist-teams-advance-in-the-amazon-nova-ai-challenge-trusted-ai-track" target="_blank" rel="noopener noreferrer" className="cv-pub-link cv-pub-link--link">{ICONS.link}Link</a>
          </div>
          <ul className="cv-entry-bullets">
            <li>Finalist team ($250K prize) targeting black-box jailbreaking of CodeLLMs.</li>
            <li>Fine-tuned surrogate models for adversarial prompt guidance, achieving 0.80+ recall and 0.75+ F1 in malicious intent detection.</li>
          </ul>
        </div>
      </section>

      {/* Education */}
      <section className="cv-section reveal" id="education">
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
      <section className="cv-section reveal" id="experience">
        <h2 className="cv-section-title">Internship Experience</h2>

        <div className="cv-entry">
          <div className="cv-entry-row">
            <span className="cv-entry-title">Sophgo — Research Intern</span>
            <span className="cv-entry-date">Jun. 2024 – Aug. 2024</span>
          </div>
          <div className="cv-entry-sub">Shenzhen, China</div>
          <ul className="cv-entry-bullets">
            <li>Refactored C++ model deployment interfaces for RISC-V architecture and authored comprehensive technical documentation.</li>
            <li>Fine-tuned models on private datasets, identified failure cases, and applied data augmentation to improve robustness.</li>
          </ul>
        </div>
      </section>

      {/* Teaching */}
      <section className="cv-section reveal" id="teaching">
        <h2 className="cv-section-title">Teaching</h2>

        <div className="cv-entry">
          <div className="cv-entry-row">
            <span className="cv-entry-title">Teaching Assistant, UT Dallas</span>
            <span className="cv-entry-date">Fall 2024 – Spring 2026</span>
          </div>
          <ul className="cv-entry-bullets">
            <li>CS 4365 — Artificial Intelligence (Spring 2026)</li>
            <li>CS 4375 — Introduction to Machine Learning (Fall 2024, Fall 2025)</li>
            <li>CS 4337 — Programming Language Paradigms (Spring 2025)</li>
          </ul>
        </div>
      </section>

      {/* Miscellaneous */}
      <section className="cv-section reveal" id="misc">
        <h2 className="cv-section-title">Miscellaneous</h2>
        <p><strong>Tech Stack:</strong> Steering agentic coding tools for efficient implementation through specifications, contracts, and test suites, without maximizing token usage; PyTorch; C++</p>
        <p style={{ marginTop: "10px" }}>My two cats:</p>
        <img
          src="https://ik.imagekit.io/tingxi/SDIM0107.jpg"
          alt="My two cats"
          className="misc-cats"
        />
      </section>

      {/* Footer */}
      <footer className="cv-footer">
        <p>Last modified: June 2026 · <button type="button" className="cv-email" onClick={() => copy(EMAIL, "Email copied ✓")} title="Copy email">tingxi.li[at]utdallas.edu</button></p>
      </footer>

      {/* Toast */}
      {toast && <div className="toast" role="status" aria-live="polite">{toast}</div>}
    </>
  );
}
