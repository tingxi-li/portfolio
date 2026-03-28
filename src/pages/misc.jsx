import React from "react";

export default function Misc() {
  return (
    <>
      <h2 className="title">Miscellaneous</h2>
      <figure className="media">
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
    </>
  );
}
