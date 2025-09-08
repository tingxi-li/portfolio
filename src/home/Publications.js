import React from "react";

function normalizeAuthors(authors, me) {
  if (!Array.isArray(authors)) return [];
  const meLower = typeof me === "string" ? me.trim().toLowerCase() : "";
  return authors.map((a) => {
    if (a && typeof a === "object") {
      const name = String(a.name || "");
      const isMe = Boolean(a.me) || (meLower && name.trim().toLowerCase() === meLower);
      return { name, me: isMe };
    }
    const name = String(a || "");
    const isMe = meLower && name.trim().toLowerCase() === meLower;
    return { name, me: Boolean(isMe) };
  });
}

function Authors({ authors = [], me }) {
  const list = normalizeAuthors(authors, me);
  return (
    <span className="pub-authors">
      {list.map((a, i) => (
        <span key={i} className={a.me ? "me" : undefined}>
          {a.name}
          {i < list.length - 1 ? ", " : ""}
        </span>
      ))}
    </span>
  );
}

export default function Publications({ items = [], me }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <ul className="publications">
      {items.map((it, idx) => {
        const {
          title,
          titleUrl,
          authors = [],
          venue,
          year,
          pdf,
          github,
        } = it || {};

        const titleEl = titleUrl || pdf ? (
          <a href={(titleUrl || pdf)} target="_blank" rel="noopener noreferrer">{title}</a>
        ) : (
          <>{title}</>
        );

        return (
          <li className="pub-item" key={`${title || "pub"}-${year || idx}`}>
            <h4 className="pub-title">{titleEl}</h4>
            <Authors authors={authors} me={me} />
            <div className="pub-meta">
              {venue ? <span className="pub-venue">{venue}</span> : null}
              {year ? <span className="pub-year">{year}</span> : null}
            </div>
            {(pdf || github) ? (
              <div className="pub-links">
                {pdf ? (
                  <a className="pub-link" href={pdf} target="_blank" rel="noopener noreferrer">PDF</a>
                ) : null}
                {github ? (
                  <a className="pub-link" href={github} target="_blank" rel="noopener noreferrer">Code</a>
                ) : null}
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

