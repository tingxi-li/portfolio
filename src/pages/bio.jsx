import React from "react";
import EmLink from "../components/EmLink";

export default function Bio() {
  return (
    <>
      <h2 className="title">Bio</h2>

      <figure className="media">
        <img
          className="misc-img"
          alt="me"
          loading="lazy"
          src="https://ik.imagekit.io/tingxi/myphoto2.jpeg"
          srcSet="
            https://ik.imagekit.io/tingxi/myphoto2.jpeg 480w,
            https://ik.imagekit.io/tingxi/myphoto2.jpeg 768w,
            https://ik.imagekit.io/tingxi/myphoto2.jpeg 1200w
          "
          style={{maxWidth: "240px", borderRadius: "8px"}}
        />
        <figcaption className="img-caption">Yosemite NP, California</figcaption>
      </figure>

      <p className="section-text">
        i'm a <s>1st</s> 2nd year phd student in computer science
        at <EmLink href="https://www.utdallas.edu/">ut dallas</EmLink>, advised by <EmLink href="https://www.youngwei.com/">prof. wei yang</EmLink>.
      </p>

      <p className="section-text">
        prior to that, i earned my bachelor's degree at <EmLink href="https://en.dlut.edu.cn/">dalian university of technology</EmLink>, and was a visiting student at <EmLink href="https://www.tum.de/en/">technical university of munich</EmLink>.
      </p>
    </>
  );
}
