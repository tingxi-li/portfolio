// HoverLivePreviewLink.jsx（关键差异版）
import React, { useState, useRef } from "react";
import "./HoverLivePreviewLink.css";

export default function HoverLivePreviewLink({
  href,
  text,
  previewUrl,
  fallbackImg = "",
  placement = "right",
  showDelay = 120,
  timeout = 1200,
}) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);        // 新增：iframe 是否加载成功
  const [useFallback, setUseFallback] = useState(false);

  const showTimer = useRef(null);
  const loadTimer = useRef(null);

  const url = previewUrl || href;

  const clearAllTimers = () => {
    if (showTimer.current) clearTimeout(showTimer.current);
    if (loadTimer.current) clearTimeout(loadTimer.current);
  };

  const handleEnter = () => {
    clearAllTimers();
    // 延迟展示弹层
    showTimer.current = setTimeout(() => {
      setOpen(true);
      setLoaded(false);
      setUseFallback(false);
      // 设定加载超时回退：若 timeout 内未标记 loaded，就显示 fallback
      loadTimer.current = setTimeout(() => {
        setUseFallback(true);
      }, timeout);
    }, showDelay);
  };

  const handleLeave = () => {
    clearAllTimers();
    setOpen(false);
    setLoaded(false);
    setUseFallback(false);
  };

  const handleIframeLoad = () => {
    // 一旦 onLoad，视为成功：取消回退
    if (loadTimer.current) clearTimeout(loadTimer.current);
    setLoaded(true);
    setUseFallback(false);
  };

  const renderPreviewContent = () => {
    // 只渲染其中一个，避免重叠
    if (useFallback) {
      return fallbackImg
        ? <img src={fallbackImg} alt="preview" />
        : <div className="preview-placeholder">Preview unavailable</div>;
    }
    return (
      <iframe
        title="preview"
        src={url}
        loading="lazy"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
        referrerPolicy="no-referrer"
        onLoad={handleIframeLoad}
      />
    );
  };

  return (
    <a
      className={`hover-live-link ${placement}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span className="link-text">{text}</span>

      <span className={`preview-pop ${open ? "open" : ""}`} aria-hidden="true">
        <span className="preview-frame" />
        <div className="preview-viewport">
          {open && renderPreviewContent()}
        </div>
      </span>
    </a>
  );
}