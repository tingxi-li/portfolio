import React from "react";

export default function Section({id, kicker, title, children, right}){
  return (
    <section id={id} className="hero">
      <div>
        {kicker && <div className="kicker">{kicker}</div>}
        {title && <h1>{title}</h1>}
        {children}
      </div>
      {right ? <div>{right}</div> : <div />}
    </section>
  );
}