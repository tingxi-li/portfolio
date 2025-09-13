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
          src="https://ik.imagekit.io/tingxi/favicon.jpg?updatedAt=1757566627954"
          srcSet="
            https://ik.imagekit.io/tingxi/favicon.jpg?updatedAt=1757566627954 480w,
            https://ik.imagekit.io/tingxi/favicon.jpg?updatedAt=1757566627954 768w,
            https://ik.imagekit.io/tingxi/favicon.jpg?updatedAt=1757566627954 1200w
          "
          sizes="(max-width: 600px) 92vw, 72ch"
        />
        <figcaption className="img-caption">Chick-fil-A and his bean bag (Sept. 2025)</figcaption>
      </figure>
      <br />
      <br />
      <br />
    </main>
  );
}
