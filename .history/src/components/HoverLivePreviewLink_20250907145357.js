import React, { useState, useRef } from "react";
import "./HoverLivePreviewLink.css";

export default function HoverLivePreviewLink({
  href,
  text,
  // 预览地址（默认等于 href）
  previewUrl,
  // 被站点拦截时的回退图（本地 /public 或截图 API）
  fallbackImg = "",
  placement = "right", // "left" | "right"
  showDelay = 120,     // 悬浮后多少毫秒出现
  timeout = 1200       // iframe 加载超过多少毫秒认为失败→回退
}) {
  const [open, setOpen] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const timerRef = useRef(null);
  const loadTimerRef = useRef(null);

  const url = previewUrl || href;

  const handleEnter = () => {
    timerRef.current = setTimeout(() => {
      setOpen(true);
      // 若 iframe 在 timeout 内没有显示有效内容，则切到 fallback
      loadTimerRef.current = setTimeout(() => {
        setUseFallback(true);
      }, timeout);
    }, showDelay);
  };

  const handleLeave = () => {
    clearTimeout(timerRef.current);
    clearTimeout(loadTimerRef.current);
    setOpen(false);
    setUseFallback(false);
  };

  // iframe 加载事件：很多被拦截的情况 onLoad 也会触发，但画面空白。
  // 这里简单地：一旦 onLoad，就先取消回退计时器（避免误判）；若你想更稳妥，
  // 可以加“白屏检测”或给 fallback 提供按钮手动切换。
  const handleIframeLoad = () => {
    clearTimeout(loadTimerRef.current);
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
        {/* 装饰用旋转边框（可删） */}
        <span className="preview-frame" />

        <div className="preview-viewport">
          {!useFallback ? (
            <iframe
              title="preview"
              src={url}
              loading="lazy"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              referrerPolicy="no-referrer"
              onLoad={handleIframeLoad}
            />
          ) : fallbackImg ? (
            <img src={fallbackImg} alt="preview" />
          ) : (
            <div className="preview-placeholder">Preview unavailable</div>
          )}
        </div>
      </span>
    </a>
  );
}