import React from "react";
import "./bio.css";

export default function RoundedBox({
  imageSrc,
  text,
  imgSize = "100px",
  imgPosition = "left",
}) {
  return (
    <div className="rounded-box">
      <img
        src={imageSrc}
        alt=""
        className="rounded-box__image"
        style={{
          width: imgSize,
          height: "auto",
          objectFit: "cover",
          order: imgPosition === "left" ? 0 : 1,
        }}
      />
      <div className="rounded-box__text">{text}</div>
    </div>
  );
}