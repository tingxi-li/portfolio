import React from "react";
import "./bio.css";

export default function Bio() {
  return (
    <div className="rounded-box">
      <img
        src="../../favicon.ico"
        alt="Profile"
        className="bio-image"
      />
      <p>
        I am a 2nd year Ph.D. student in Computer Science at 
        the University of Texas at Dallas (UT Dallas), 
        advised by Dr. Wei Yang. 
        I am broadly interested in AI and Software Engineering, 
        as well as the intersection of both.
      </p>

    </div>
  );
}