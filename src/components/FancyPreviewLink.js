import React from "react";
import "./FancyPreviewLink.css";

export default function FancyPreviewLink({
  href,
  text,
  previewSrc,
  previewAlt = "preview",
  placement = "left",   // "left" | "right"
}) {
  return (
    <a className={`preview-link ${placement}`} href={href} target="_blank" rel="noopener noreferrer">
      <span className="link-text">{text}</span>

      {/* 预览容器 */}
      <span className="preview-pop" aria-hidden="true">
        {/* 旋转边框层 */}
        <span className="preview-frame" />
        {/* 图片层（延迟淡入） */}
        <img className="preview-img" src={previewSrc} alt={previewAlt} />
      </span>
    </a>
  );
}