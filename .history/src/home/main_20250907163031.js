import React from "react";
import "./main.css";
import { Link } from "@mui/material";

import FancyPreviewLink from "../components/FancyPreviewLink";
import HoverLivePreviewLink from "../components/HoverLivePreviewLink";

export default function Main() {
  return (
    <div className="main">
      <p className="myname">Tingxi Li</p>

      <p className="addressline">800 W Campbell Rd, Richardson, TX 75080</p>

      <p className="contactline">tingxi.li [at] utdallas.edu</p>

      <p className="heading">Bio</p>

      <p className="normal-text">
        i'm a <s>1st</s> 2nd year phd student in computer science at <HoverLivePreviewLink href="https://www.utdallas.edu/" text="the university of texas 
        at dallas" placement="right" ></HoverLivePreviewLink> (ut dallas), advised by <HoverLivePreviewLink href="https://youngwei.com/" text="prof. wei yang"></HoverLivePreviewLink>. 
        before that, i was an undergrad at <HoverLivePreviewLink href="https://en.dlut.edu.cn/" text="dalian university of 
        technology"></HoverLivePreviewLink> (大連理工大學), and a visiting student at <HoverLivePreviewLink href="https://www.tum.de/en/" text="technical university of munich"></HoverLivePreviewLink> 
        (technische universität münchen).</p>

      <p className="normal-text-highlight">i am actively looking for internship positions starting from summer 2026.</p>

      <p className="heading">Research Interests</p>

      <p className="heading">Publications</p>

      <p className="heading">Misc.</p>

    </div>
  );
}