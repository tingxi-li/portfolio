import React from "react";
import "../global.css";
import BackHome from "../components/BackHome";
import { Mail, Linkedin } from "lucide-react";
export default function Contact() {
  return (
    <main>
      <BackHome />
      <p className="title">Contact</p>
      <div className="circle-center">
        <div className="circle-buttons">
          <a className="circle-btn" href="mailto:tingxi.li@utdallas.edu"
             aria-label="Email">
            <Mail size={28} strokeWidth={2} />
          </a>
          <a className="circle-btn" href="/cv.pdf" target="_blank" rel="noopener noreferrer" aria-label="CV">
            CV
          </a>
          <a className="circle-btn" href="https://www.linkedin.com/in/tingxi-l-352a45297/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={28} strokeWidth={2} />
          </a>
        </div>
      </div>
    </main>
  );
}
