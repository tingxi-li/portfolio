import React from "react";

function Tag({ type = "", children, href, newTab = true }) {
  const className = `tag ${type ? `tag--${type}` : ""}`.trim();
  if (href) {
    const isExternal = /^https?:/i.test(String(href));
    const props = { href, className };
    if (newTab && isExternal) {
      props.target = "_blank";
      props.rel = "noopener noreferrer";
    }
    return <a {...props}>{children}</a>;
  }
  return <span className={className}>{children}</span>;
}

/**
 * EntryItem — reusable item for experience/teaching/publication lists.
 * Props:
 * - title: ReactNode (required)
 * - description?: ReactNode
 * - time?: ReactNode (rendered as a time tag on the right)
 * - role?: ReactNode (role tag)
 * - links?: Array<{ href: string, label?: React.ReactNode, newTab?: boolean }>
 * - className?: string
 */
export default function EntryItem({
  title,
  description,
  time,
  role,
  links = [],
  className = "",
  highlightMe,
}) {
  const highlightText = (text, needle) => {
    if (!needle || typeof text !== "string") return text;
    const pattern = new RegExp(`(${needle.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")})`, "gi");
    return text.split(pattern).map((part, i) =>
      pattern.test(part) ? (
        <span key={i} className="mark-me">{part}</span>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      )
    );
  };

  const renderedDesc = highlightText(description, highlightMe);
  return (
    <article className={`entry ${className}`.trim()}>
      <h3 className="entry-title">{title}</h3>
      <div className="entry-tags">
        {time ? <Tag type="time">{time}</Tag> : null}
        {role ? <Tag type="role">{role}</Tag> : null}
        {Array.isArray(links)
          ? links.map((l, i) => (
              <Tag key={i} type="link" href={l.href} newTab={l.newTab !== false}>
                {l.label ?? l.href}
              </Tag>
            ))
          : null}
      </div>
      {description ? <div className="entry-desc">{renderedDesc}</div> : null}
    </article>
  );
}
