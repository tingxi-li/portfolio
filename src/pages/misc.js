import React from "react";
import "../global.css";
export default function Misc() {
  return (
    <main>
      <p className="title" style={{ fontSize: "var(--title-font-size)" }}>Miscellaneous</p>
      {/* ImageKit-hosted photo */}
      <figure className="media">
        {/* Replace YOUR_ENDPOINT and PATH/TO/IMG.jpg with your ImageKit values */}
        <img
          className="misc-img"
          alt="A moment I like"
          loading="lazy"
          src="https://ik.imagekit.io/tingxi/twocats.jpeg"
          srcSet="
            https://ik.imagekit.io/tingxi/twocats.jpeg 480w,
            https://ik.imagekit.io/tingxi/twocats.jpeg 768w,
            https://ik.imagekit.io/tingxi/twocats.jpeg 1200w
          "
          sizes="(max-width: 600px) 92vw, 72ch"
        />
        <figcaption className="img-caption">Jolly-B (Left) and Chick-fil-A (Right) (Jan. 2026)</figcaption>
      </figure>
      <br />
      <br />
      <br />
    </main>
  );
}
