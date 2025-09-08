import React from "react";
import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function Home(){
  return (
    <>
      <Section
        kicker="Researcher · AI Security"
        title="Tingxi Li"
        right={
          <div className="border" style={{padding:"14px"}}>
            <div className="small">Currently</div>
            <div>Ph.D. student focusing on AI Security, RecSys, and Systems.</div>
            <div style={{marginTop:10}}>
              <a href="/tingxi-cv.pdf" target="_blank" rel="noreferrer">Download CV →</a>
            </div>
          </div>
        }
      >
        <p>
          Minimal, editorial-style portfolio inspired by luxury fashion sites:
          generous white space, thin borders, and a strict grid. Clean,
          typographic first—no distractions.
        </p>
      </Section>

      <section id="work" className="main container" style={{paddingTop:0}}>
        <div className="kicker">Selected Work</div>
        <div className="grid">
          {projects.map((p, i) => (
            <ProjectCard key={i} {...p} />
          ))}
        </div>
      </section>

      <section id="about" className="main container" style={{paddingTop:"40px"}}>
        <div className="kicker">About</div>
        <div className="border" style={{padding:"18px"}}>
          <p>
            I study security of adaptive deep-learning systems and code-model red teaming.
            I like building clean, reliable infra and writing precise interfaces.
          </p>
        </div>
      </section>
    </>
  );
}