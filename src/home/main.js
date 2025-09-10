import React, { useState } from "react";
import "./main.css";
import Publications from "./Publications";
import HoverLivePreviewLink from "../components/HoverLivePreviewLink";

const pubs1 = [
{ title: "Efficiency Attack and Defences Towards Deep Learning Systems",
authors: ["Ravishka Rathnasuriya", "Tingxi Li", "Zexin Xu", "Zihe Song", "Jun Ren", "Mirazul Haque", "Simin Chen", "Wei Yang"], venue: "Usenix Sec", year: "2025",
pdf: "https://www.usenix.org/system/files/usenixsecurity25-rathnasuriya.pdf", github: "https://zenodo.org/records/15649771" }
];

const pubs2 = [
{ title: " COMET: Closed-loop Orchestration for Malicious Elicitation Techniques in Code Models",
authors: ["Zexin Xu", "Tingxi Li", "Ravishka Rathnasuriya", "Zihe Song", "Jun Ren", "Bhavesh Mandalapu", "Soroush Setayeshpour", "Xinya Du", "Wei Yang"], venue: "Technical Report", year: "2025",
pdf: "https://assets.amazon.science/6f/16/076dff834864823e4f09322d1495/astro-comet-closed-loop-orchestration-for-malicious-elicitation-techniques-in-code-models.pdf"}
];


export default function Main() {
  return (
    <div className="main">
      <div className="name-row">
        <p className="myname">Tingxi Li</p>
        <span className="myphoto-wrap" aria-label="profile photo flipping like a coin">
          <div className="coin-3d" role="img" aria-label="Tingxi Li">
            <img className="coin-face coin-front" src="/myphoto.ico" alt="" />
            <img className="coin-face coin-back" src="/favicon.ico" alt="" onError={(e) => { e.currentTarget.src = '/myphoto.ico'; }} />
          </div>
        </span>
      </div>

      <p className="addressline" style={{ marginLeft: "8px"}}>[ˈtɪŋɕi li] 李 亭熹</p>

      <ContactRow />

      <p className="heading">Bio</p>

      <p className="normal-text">
        i'm a <s>1st</s> 2nd year phd student in computer science at <span style={{color: "#247856", fontStyle: "italic"}}>ut dallas</span>, advised by <HoverLivePreviewLink href="https://youngwei.com/" text="prof. wei yang"></HoverLivePreviewLink>. 
        prior to that, i earned my bachelor's degree at <span style={{color: "#247856", fontStyle: "italic"}}>dalian university of technology</span>, and was a visiting student at <span style={{color: "#247856", fontStyle: "italic"}}>technical university of munich</span>.</p>

      <p className="heading">Research Interests</p>

      <p className="normal-text">
        i am broadly interested in <span style={{color: "#247856", fontStyle: "italic"}}>artificial intelligence</span> and <span style={{color: "#247856", fontStyle: "italic"}}>software engineering</span>, particularly at the intersection of the two. more specifically, i focus on enhancing the efficiency and robustness of deep learning systems against malicious inputs, as well as leveraging large language models for software testing.
      </p>

      <p className="normal-text-highlight">i am actively seeking internship opportunities starting in summer 2026.</p>

      <p className="heading">Education</p>

      <div className="line-left-right">
        <p className="normal-text" style={{fontSize: "24px"}}>
          The University of Texas at Dallas
        </p>
        <p className="normal-text accent-underline" style={{color: "#247856", fontStyle: "italic" , fontSize: "20px"}}>
          Doctor of Philosophy, 2024 - present
        </p>
      </div>

      <div className="line-left-right">
        <p className="normal-text" style={{fontSize: "24px"}}>
          Dalian University of Technology
        </p>
        <p className="normal-text accent-underline" style={{color: "#247856", fontStyle: "italic" , fontSize: "20px"}}>
          Bachelor of Science, 2019 - 2024
        </p>
      </div>

      <div className="line-left-right">
        <p className="normal-text" style={{fontSize: "24px"}}>
          Technical University of Munich
        </p>
        <p className="normal-text accent-underline" style={{color: "#247856", fontStyle: "italic" , fontSize: "20px"}}>
          Visiting Student, 2022 - 2022
        </p>
      </div>

      <p className="heading">Publications</p>

      <div className="pubs-large"><Publications items={pubs1} me="Tingxi Li" /></div>

      <div className="pubs-large"><Publications items={pubs2} me="Tingxi Li" /></div>

      <p className="heading">Experience</p>

      <ul className="cards">
        <li className="card-item">
          <h3 className="card-title">SOPHGO</h3>
          <div className="card-meta">
            <span className="card-tag">Research Intern</span>
            <span className="card-tag">May 2024 – Aug 2024</span>
          </div>
          <p className="card-description">
            refactor c++ code, test the refactored code to ensure compilation and functionality, and write documentation.
          </p>
        </li>

        <li className="card-item">
          <h3 className="card-title">Amazon Nova AI Challenge: Trusted AI</h3>
          <div className="card-meta">
            <span className="card-tag">Finalist Team</span>
            <span className="card-tag">Nov 2024 – Jul 2025</span>
          </div>
          <p className="card-description">
            team member of one of the red teaming finalists. develop surrogate model to help evaluating adversarial probes and refine attack strategies based on the findings.
          </p>
        </li>
      </ul>


      <p className="heading">Teaching</p>

      <ul className="cards">
        <li className="card-item">
          <h3 className="card-title">CS4375: Introduction to Machine Learning</h3>
          <div className="card-meta">
            <span className="card-tag">Teaching Assistant</span>
            <span className="card-tag">Fall 2024</span>
          </div>
          <p className="card-description">
            host office hours, design exam questions and deliver review lectures for the course
          </p>
        </li>

        <li className="card-item">
          <h3 className="card-title">CS4375: Introduction to Machine Learning</h3>
          <div className="card-meta">
            <span className="card-tag">Teaching Assistant</span>
            <span className="card-tag">Fall 2025</span>
          </div>
          <p className="card-description">
            host  office hours; teach introductory level of machine learning compilation, vllm, sglang, tilelang and triton; design coding assignments
          </p>
        </li>
      </ul>


      <p className="heading">Misc.</p>

      <p className="normal-text" style={{color: "#666666", fontSize: "18px"}}>Programming Languages: Python, C/C++, Java, JavaScript, SQL, HTML/CSS</p>
      <p className="normal-text" style={{color: "#666666", fontSize: "18px"}}>Languages: Mandarin, Cantonese, English</p>


      <p className="heading">My Reading List</p>

      <p className="normal-text" style={{color: "#666666", fontSize: "18px"}}>i want to express my sincere thanks to my advisor, as well as to the researchers and peers whose words and work inspired, motivated, and guided me throughout my academic journey.</p>

      <ul className="cards">
        <li className="card-item has-links">
          <h3 className="card-title">You and your research</h3>
          <div className="card-meta">
            <span className="card-tag">Talk</span>
            <span className="card-tag">Mar 1986</span>
          </div>
          <p className="card-description">
            Richard Hamming
          </p>
          <div className="card-links">
            <a className="card-link" href="https://www.cs.virginia.edu/~robins/YouAndYourResearch.html" target="_blank" rel="noopener noreferrer">Link</a>
          </div>
        </li>
      </ul>

      <ul className="cards">
        <li className="card-item has-links">
          <h3 className="card-title">The Ph.D. Grind</h3>
          <div className="card-meta">
            <span className="card-tag">Book</span>
            <span className="card-tag">Jul 2012</span>
          </div>
          <p className="card-description">
            Philip Guo
          </p>
          <div className="card-links">
            <a className="card-link" href="http://linyun.info/phd-grinding.pdf" target="_blank" rel="noopener noreferrer">Link</a>
          </div>
        </li>
      </ul>

    </div>
  );
}

function ContactRow() {
  const EMAIL = "tingxi.li@utdallas.edu";
  const PHONE = "+1 (123) 456-7890"; 
  const LINKEDIN = "https://www.linkedin.com/in/tingxi-l-352a45297/"; 
  const SCHOLAR = "https://scholar.google.com/citations?user=a_XpeY0AAAAJ&hl=en";  
  const CV = "/cv.pdf"; 

  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  const copy = async (text, setFlag) => {
    try {
      await navigator.clipboard.writeText(text);
      setFlag(true);
      setTimeout(() => setFlag(false), 1400);
    } catch {
      setFlag(true);
      setTimeout(() => setFlag(false), 1400);
    }
  };

  return (
    <p className="contactline">
      <span className="contact-icons" role="group" aria-label="contact">
        <button type="button" className="contact-btn" title="Copy email" onClick={() => copy(EMAIL, setEmailCopied)}>
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient id="contact-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'var(--grad-1)' }} />
                <stop offset="50%" style={{ stopColor: 'var(--grad-2)' }} />

              </linearGradient>
            </defs>
            <path fill="url(#contact-grad)" d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2Zm0 3.5-8 5-8-5V6l8 5 8-5v1.5Z" />
          </svg>
          {emailCopied && <span className="copied">Copied</span>}
        </button>

        {PHONE ? (
          <button type="button" className="contact-btn" title="Copy phone" onClick={() => copy(PHONE, setPhoneCopied)}>
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <linearGradient id="contact-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: 'var(--grad-1)' }} />
                  <stop offset="33%" style={{ stopColor: 'var(--grad-2)' }} />

                </linearGradient>
              </defs>
              <path fill="url(#contact-grad)" d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.11.37 2.31.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.27.2 2.47.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2Z"/>
            </svg>
            {phoneCopied && <span className="copied">Copied</span>}
          </button>
        ) : null}

        {CV ? (
          <a className="contact-btn" href={CV} target="_blank" rel="noopener noreferrer" title="CV / Resume">
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <linearGradient id="contact-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: 'var(--grad-1)' }} />
                  <stop offset="50%" style={{ stopColor: 'var(--grad-2)' }} />

                </linearGradient>
              </defs>
              <path fill="url(#contact-grad)" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6Zm0 2.5L18.5 9H14V4.5ZM8 12h8v1.5H8V12Zm0 4h8v1.5H8V16Z" />
            </svg>
          </a>
        ) : null}

        {LINKEDIN ? (
          <a className="contact-btn" href={LINKEDIN} target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <linearGradient id="contact-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: 'var(--grad-1)' }} />
                  <stop offset="33%" style={{ stopColor: 'var(--grad-2)' }} />

                </linearGradient>
              </defs>
              <path fill="url(#contact-grad)" d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.07c.67-1.27 2.3-2.6 4.74-2.6 5.07 0 6 3.34 6 7.68V24h-5v-7.6c0-1.8-.03-4.12-2.51-4.12-2.52 0-2.9 1.96-2.9 4v7.72h-5V8z"/>
            </svg>
          </a>
        ) : null}

        {SCHOLAR ? (
          <a className="contact-btn" href={SCHOLAR} target="_blank" rel="noopener noreferrer" title="Google Scholar" aria-label="Google Scholar">
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <linearGradient id="contact-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: 'var(--grad-1)' }} />
                  <stop offset="33%" style={{ stopColor: 'var(--grad-2)' }} />

                </linearGradient>
              </defs>
              <g fill="url(#contact-grad)">
                <path d="M5 13.18v2.58L12 21l7-5.24v-2.58L12 16l-7-2.82z" />
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
              </g>
            </svg>
          </a>
        ) : null}
      </span>
    </p>
  );
}
