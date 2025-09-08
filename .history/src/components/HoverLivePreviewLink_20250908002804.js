// HoverLivePreviewLink.jsx
import React, { useRef, useState } from "react";
import "./HoverLivePreviewLink.css";

export default function HoverLivePreviewLink({
  href,
  text,
  previewUrl,
  fallbackImg = "",
  autoScreenshot = true,
  blockedHosts = ["tum.de"],
  placement = "right",
  showDelay = 120,
  hideDelay = 160,    // 关键：离开时加一点点延迟，避免抖动
  timeout = 1200,
}) {
  const [open, setOpen] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [fallbackImageFailed, setFallbackImageFailed] = useState(false);
  const [screenshotFailed, setScreenshotFailed] = useState(false);
  const boxRef = useRef(null);
  const timers = useRef({ show: null, hide: null, load: null });
  const loadedRef = useRef(false);
  const iframeRef = useRef(null);

  const url = previewUrl || href;
  const host = (() => {
    try { return new URL(url).host; } catch { return ""; }
  })();
  const isBlocked = (() => {
    if (!host) return false;
    return blockedHosts.some(h => host === h || host.endsWith(`.${h}`));
  })();

  const clear = (...keys) => {
    keys.forEach(k => { if (timers.current[k]) clearTimeout(timers.current[k]); });
  };

  const onEnter = () => {
    clear("hide");
    timers.current.show = setTimeout(() => {
      setOpen(true);
      setUseFallback(false);
      setLoaded(false);
      loadedRef.current = false;
      setFallbackImageFailed(false);
      setScreenshotFailed(false);
      clear("load");
      timers.current.load = setTimeout(() => {
        // 仅当尚未加载成功时才显示占位
        if (!loadedRef.current) setUseFallback(true);
      }, timeout);
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
      loadedRef.current = false;
      setFallbackImageFailed(false);
      setScreenshotFailed(false);
    }, hideDelay);
  };

  const onIframeLoad = () => {
    clear("load");
    loadedRef.current = true;
    setLoaded(true);
    setUseFallback(false);
  };

  const getScreenshotSrc = (u) => {
    if (!autoScreenshot) return "";
    try {
      const enc = encodeURIComponent(u);
      // 使用 WordPress mShots 作为公共截图服务（无需密钥）
      return `https://s.wordpress.com/mshots/v1/${enc}?w=360`;
    } catch {
      return "";
    }
  };

  const onFallbackImgError = () => {
    // 如果自带的 fallback 图失败，尝试自动截图；否则占位
    if (fallbackImg && !fallbackImageFailed) {
      setFallbackImageFailed(true);
    } else {
      setScreenshotFailed(true);
    }
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
          {open && !isBlocked && (
            <iframe
              title="preview"
              src={url}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              referrerPolicy="no-referrer"
              ref={iframeRef}
              onLoad={onIframeLoad}
            />
          )}
          {(isBlocked || (useFallback && !loaded)) && (() => {
            // 计算优先的回退资源：先用用户提供的图；若失败或没有，则用自动截图
            const userImgOk = !!fallbackImg && !fallbackImageFailed;
            const shotSrc = !screenshotFailed ? getScreenshotSrc(url) : "";
            const finalSrc = userImgOk ? fallbackImg : shotSrc;

            return finalSrc ? (
              <img src={finalSrc} alt="preview" onError={onFallbackImgError} />
            ) : (
              <div className="preview-placeholder" title="Target site may block embedding via X-Frame-Options or CSP">Preview unavailable or blocked</div>
            );
          })()}
        </div>
      </span>
    </span>
  );
}
