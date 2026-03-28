import React, { useCallback, useEffect, useState } from "react";
import { Mail, Linkedin } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copyEmail = useCallback(async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const email = "tingxi.li@utdallas.edu";
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const ta = document.createElement('textarea');
        ta.value = email;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
    } catch (err) {
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
      <h2 className="title">Contact</h2>
      <div className="circle-center">
        <div className="circle-buttons">
          <button className="circle-btn" onClick={copyEmail} aria-label="Copy email">
            <Mail size={28} strokeWidth={2} />
          </button>
          <a className="circle-btn" href="/cv.pdf" target="_blank" rel="noopener noreferrer" aria-label="CV">
            CV
          </a>
          <a className="circle-btn" href="https://www.linkedin.com/in/tingxi-l-352a45297/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={28} strokeWidth={2} />
          </a>
        </div>
      </div>
      <div className={"toast" + (copied ? " toast--show" : "")} role="status" aria-live="polite">
        Email copied
      </div>
    </>
  );
}
