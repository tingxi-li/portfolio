import React from "react";
import "./main.css";
import { Link } from "@mui/material";

import FancyPreviewLink from "../components/FancyPreviewLink";
import HoverLivePreviewLink from "../components/HoverLivePreviewLink";
import { color } from "framer-motion";

export default function Main() {
  return (
    <div className="main">
      <p className="myname">Tingxi Li</p>

      <p className="addressline">800 W Campbell Rd, Richardson, TX 75080</p>

      <p className="contactline">tingxi.li [at] utdallas.edu</p>

      <p className="heading">Bio</p>

      <p className="normal-text">
        i'm a <s>1st</s> 2nd year phd student in computer science at <HoverLivePreviewLink href="https://www.utdallas.edu/" text="ut dallas" placement="right" ></HoverLivePreviewLink>, advised by <HoverLivePreviewLink href="https://youngwei.com/" text="prof. wei yang"></HoverLivePreviewLink>. 
        prior to that, i earned my bachelor's degree at <HoverLivePreviewLink href="https://en.dlut.edu.cn/" text="dalian university of 
        technology"></HoverLivePreviewLink>, and was a visiting student at <HoverLivePreviewLink href="https://www.tum.de/en" text="technical university of munich" fallbackImg="/previews/tum_preview.webp"></HoverLivePreviewLink>.</p>

      <p className="heading">Research Interests</p>

      <p className="normal-text">
        i am broadly interested in artificial intelligence and software engineering, particularly at the intersection of the two. more specifically, i focus on enhancing the efficiency and robustness of deep learning systems against malicious inputs, as well as leveraging large language models for software testing.
      </p>

      <p className="normal-text-highlight">i am actively seeking internship opportunities starting in summer 2026.</p>

      <p className="heading">Education</p>

      <div className="line-left-right">
        <p className="normal-text" style={{fontSize: "18px"}}>
          the university of texas at dallas
        </p>
        <p className="normal-text" style={{ fontStyle: "italic" }}>
          doctor of philosophy, 2024 - present
        </p>
      </div>

      <div className="line-left-right">
        <p className="normal-text" style={{fontSize: "18px"}}>
          dalian university of technology
        </p>
        <p className="normal-text" style={{ fontStyle: "italic" }}>
          bachelor of science, 2019 - 2024
        </p>
      </div>

      <div className="line-left-right">
        <p className="normal-text" style={{fontSize: "18px"}}>
          technical university of munich
        </p>
        <p className="normal-text" style={{ fontStyle: "italic" }}>
          visiting student, 2022 - 2022
        </p>
      </div>

      <p className="heading">Publications</p>

      <p className="heading">Experience</p>

      <p className="heading">Misc.</p>

    </div>
  );
}