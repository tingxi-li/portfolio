// HoverLivePreviewLink.jsx
import React, { useRef, useState } from "react";
import "./HoverLivePreviewLink.css";

export default function HoverLivePreviewLink({
  href,
  text,
  previewUrl,
  fallbackImg = "",
  placement = "right",
  showDelay = 120,
  hideDelay = 160,    // 关键：离开时加一点点延迟，避免抖动
  timeout = 1800,
}) {
  const [open, setOpen] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const boxRef = useRef(null);
  const timers = useRef({ show: null, hide: null, load: null });
  const openRef = useRef(false);
  const loadedRef = useRef(false);

  const url = previewUrl || href;

  const clear = (...keys) => {
    keys.forEach(k => { if (timers.current[k]) clearTimeout(timers.current[k]); });
  };

  const onEnter = () => {
    clear("hide");
    timers.current.show = setTimeout(() => {
      setOpen(true);
      setUseFallback(false);
      setLoaded(false);
      clear("load");
      timers.current.load = setTimeout(() => setUseFallback(true), timeout);
    }, showDelay);
  };

  const onLeave = (e) => {
    // 如果仍在容器内部（比如从链接移动到预览框），不关闭
    const next = e?.relatedTarget;
    if (next && boxRef.current?.contains(next)) return;

    clear("show", "load", "hide");
    timers.current.hide = setTimeout(() => {
      setOpen(false);
      setUseFallback(false);
      setLoaded(false);
    }, hideDelay);
  };

  const onIframeLoad = () => {
    clear("load");
    setLoaded(true);
    setUseFallback(false);
  };

  return (
    <span
      ref={boxRef}
      className={`hover-live-wrap ${placement}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <a className="hover-live-link" href={href} target="_blank" rel="noopener noreferrer">
        <span className="link-text">{text}</span>
      </a>

      <span className={`preview-pop ${open ? "open" : ""}`} aria-hidden="true">
        <span className="preview-frame" />
        <div className="preview-viewport">
          {!useFallback ? (
            <iframe
              title="preview"
              src={url}
              loading="lazy"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              referrerPolicy="no-referrer"
              onLoad={onIframeLoad}
            />
          ) : fallbackImg ? (
            <img src={fallbackImg} alt="preview" />
          ) : (
            <div className="preview-placeholder">Preview unavailable</div>
          )}
        </div>
      </span>
    </span>
  );
}