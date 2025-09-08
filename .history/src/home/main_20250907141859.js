import React from "react";
import "./main.css";
import { Link } from "@mui/material";

export default function Main() {
  return (
    <div className="main">
      <p className="myname">Tingxi Li</p>

      <p className="addressline">800 W Campbell Rd, Richardson, TX 75080</p>

      <p className="contactline">tingxi.li [at] utdallas.edu</p>

      <p className="heading">Bio</p>

      <p className="normal-text">i'm a <s>1st</s> 2nd year phd student in computer science at the <Link href="https://www.utdallas.edu/">university of texas at dallas (ut dallas)</Link>, advised by <Link alt="wei's homepage" href="https://youngwei.com/">prof. wei yang</Link>. before that, i was an undergrad at dalian university of technology (大連理工大學), and a visiting student at technical university of munich (technische universität münchen)</p>

      <p className="heading">Research Interests</p>

      <p className="heading">Publications</p>

      <p className="heading">Misc.</p>

    </div>
  );
}