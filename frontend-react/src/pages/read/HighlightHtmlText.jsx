import React from "react";
import { getConsts } from "../../utils/const";
import { ALLOW_SELECTED } from "../../hooks/useSelectedText";

function log(...args) {
  console.log(...args);
}

/**
const a = "open-source open";

const regex = /(?<=\s|^)open(?=\s|$)/gi;

console.log(a.replace(regex, "[FOUND]"));

//open-source [FOUND]
*/
function buildHighlightRegex(words = [], idioms = [], phrases = []) {
  const sortedIdioms = [...idioms].sort((a, b) => b.length - a.length);
  const sortedPhrases = [...phrases].sort((a, b) => b.length - a.length);

  const allPatterns = [
    // REAL regex fragments (NO outer slashes)
    ...words.map((w) => `(?<!-)\\b${w}\\b(?!-)`),

    // literal text patterns (escaped)
    ...sortedIdioms.map(ele => ele),
    ...sortedPhrases.map(ele => ele),
  ];

  if (allPatterns.length === 0) return null;

  return new RegExp(`(${allPatterns.join("|")})`, "gi");
}

export function HighlightHtmlText({
  htmlString = "",
  words = [],
  idioms = [],
  phrases = [],
  highlightColor = "blue",
}) {
  if (!htmlString) return null;

  if (
    (!words || words.length === 0) &&
    (!idioms || idioms.length === 0) &&
    (!phrases || phrases.length === 0)
  ) {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  }

  const regex = buildHighlightRegex(words, idioms, phrases);

  const parseNode = (node, key) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const parts = [];
      let lastIndex = 0;

      node.textContent.replace(regex, (match, _, offset) => {
        
        if (offset > lastIndex) {
          parts.push(node.textContent.slice(lastIndex, offset));
        }

        // Determine color based on type
        let color = highlightColor;
        const lowerMatch = match.toLowerCase();

        let className = "WORD";

        if (idioms.some((i) => i.toLowerCase() === lowerMatch)) {
          color = getConsts().IDIOM_COLOR;
          className = "IDIOM";
        } else if (phrases.some((p) => p.toLowerCase() === lowerMatch)) {
          color = getConsts().PHRASE_COLOR;
          className = "PHRASE"
        }

        className = className + " " + ALLOW_SELECTED; 

        parts.push(
          <span className={className} key={offset} style={{ color }}>
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
      const children = Array.from(node.childNodes).map((child, i) =>
        parseNode(child, i)
      );

      const props = { key };
      for (let attr of node.attributes || []) {
        props[attr.name] = attr.value;
      }

      return React.createElement(
        node.tagName.toLowerCase(),
        props,
        children.length > 0 ? children : null
      );
    }

    return null;
  };

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;

  const reactNodes = Array.from(tempDiv.childNodes).map((n, i) =>
    parseNode(n, i)
  );

  return <div>{reactNodes}</div>;
}
