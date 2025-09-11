import React from "react";

/**
 * Inline link with italic + underline styling that inherits the surrounding font.
 * - newTab: when true and href is http/https, opens in a new tab with safe rel
 */
export default function EmLink({ href, children, newTab = true, className = "", style, ...rest }) {
  const isExternal = /^https?:/i.test(String(href || ""));
  const props = { href, className: `em-link ${className}`.trim(), style, ...rest };
  if (newTab && isExternal) {
    props.target = "_blank";
    props.rel = "noopener noreferrer";
  }
  return <a {...props}>{children}</a>;
}

