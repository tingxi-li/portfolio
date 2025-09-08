import React from "react";

export default function ProjectCard({title, meta, href, image}){
  return (
    <a className="card" href={href} target="_blank" rel="noreferrer">
      <div className="thumb" style={image ? { backgroundImage:`url(${image})` } : undefined}/>
      <div className="card-body">
        <div className="card-title">{title}</div>
        {meta && <div className="card-meta">{meta}</div>}
      </div>
    </a>
  );
}