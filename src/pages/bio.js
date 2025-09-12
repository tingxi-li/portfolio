import React from "react";
import "../global.css";
import BackHome from "../components/BackHome";
import EmLink from "../components/EmLink";
export default function Bio() {
  return (
    <main>
      <BackHome />

      <p className="title" style={{fontFamily: "var(--font-chelsea)", fontSize: "var(--title-font-size)" }}>Bio</p>
      <br />
      <figure className="media">
        {/* Replace YOUR_ENDPOINT and PATH/TO/IMG.jpg with your ImageKit values */}
        <img
          className="misc-img"
          alt="me"
          loading="lazy"
          src="https://ik.imagekit.io/tingxi/myphoto.jpg?updatedAt=1757567875898"
          srcSet="
            https://ik.imagekit.io/tingxi/myphoto.jpg?updatedAt=1757567875898 480w,
            https://ik.imagekit.io/tingxi/myphoto.jpg?updatedAt=1757567875898 768w,
            https://ik.imagekit.io/tingxi/myphoto.jpg?updatedAt=1757567875898 1200w
          "
          style={{maxWidth: "240px", borderRadius: "8px"}}
        />
        <figcaption className="img-caption">Deer Valley, Utah</figcaption>
      </figure>

      <br />

      <p className="content" style={{fontFamily: "var(--font-mono)", fontSize: "var(--smaller-text-font-size)" , fontWeight: 400}}>
        i'm a <s>1st</s> 2nd year phd student in computer science
         at <EmLink href="https://www.utdallas.edu/">ut dallas</EmLink>, advised by <EmLink href="https://www.youngwei.com/">prof. wei yang</EmLink>. </p>

      <p className="content" style={{fontFamily: "var(--font-mono)", fontSize: "var(--smaller-text-font-size)" , fontWeight: 400}}>
        prior to that, i earned my bachelor's degree at <EmLink href="https://en.dlut.edu.cn/">dalian university of technology</EmLink>, and was a visiting student at <EmLink href="https://www.tum.de/en/">technical university of munich</EmLink>.</p>
      <br />
      <br />
      <br />
    </main>
  );
}
