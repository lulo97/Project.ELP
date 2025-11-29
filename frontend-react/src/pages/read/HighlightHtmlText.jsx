import React from "react";

// Highlight specific words in an HTML string
export function HighlightHtmlText({ htmlString = "", words = [], highlightColor = "blue" }) {
  if (!htmlString) return null;

  // If no words to highlight, render normally
  if (!words || words.length === 0) return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;

  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`\\b(${words.map(escapeRegex).join("|")})\\b`, "gi");

  const parseNode = (node, key) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const parts = [];
      let lastIndex = 0;

      node.textContent.replace(regex, (match, _, offset) => {
        if (offset > lastIndex) {
          parts.push(node.textContent.slice(lastIndex, offset));
        }
        parts.push(
          <span key={offset} style={{ color: highlightColor }}>
            {match}
          </span>
        );
        lastIndex = offset + match.length;
      });

      if (lastIndex < node.textContent.length) {
        parts.push(node.textContent.slice(lastIndex));
      }

      return parts;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const children = Array.from(node.childNodes).map((child, i) => parseNode(child, i));
      const props = { key };

      // Preserve attributes like href, class, etc.
      for (let attr of node.attributes || []) {
        props[attr.name] = attr.value;
      }

      // Handle self-closing tags correctly
      return React.createElement(node.tagName.toLowerCase(), props, children.length > 0 ? children : null);
    }
    return null;
  };

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  const reactNodes = Array.from(tempDiv.childNodes).map((n, i) => parseNode(n, i));

  return <div>{reactNodes}</div>;
}
