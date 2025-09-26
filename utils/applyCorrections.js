function isAlnum(ch) {
  if (!ch) return false;
  // Unicode-aware would be better; this is fine for ASCII (English).
  return /[A-Za-z0-9_]/.test(ch);
}

function findWordBounds(s, pos) {
  if (!s || s.length === 0) return null;
  // clamp
  pos = Math.max(0, Math.min(pos, s.length - 1));

  // if current char isn't alnum, search near for one
  if (!isAlnum(s[pos])) {
    const maxRadius = 20;
    let found = -1;
    for (let r = 1; r <= maxRadius; r++) {
      const L = pos - r;
      const R = pos + r;
      if (L >= 0 && isAlnum(s[L])) { found = L; break; }
      if (R < s.length && isAlnum(s[R])) { found = R; break; }
    }
    if (found === -1) return null;
    pos = found;
  }

  // expand to word boundaries
  let start = pos;
  while (start > 0 && isAlnum(s[start - 1])) start--;
  let end = pos + 1;
  while (end < s.length && isAlnum(s[end])) end++;
  return { start, end }; // end is exclusive
}

function applyCorrections(originalText, matches) {
  if (!originalText) return originalText;
  const orig = originalText;
  const sorted = (matches || []).slice().sort((a, b) => (a.offset || 0) - (b.offset || 0)); // ascending

  let currentPos = 0;
  const parts = [];

  for (const match of sorted) {
    const start = Math.max(0, Math.min(Number(match.offset) || 0, orig.length));
    const length = Math.max(0, Number(match.length) || 0);
    const end = Math.max(start, Math.min(start + length, orig.length));

    const hasReplacement = match.replacements && match.replacements.length > 0;
    if (!hasReplacement) continue;
    const replacement = match.replacements[0].value;

    // If the match starts inside a word, expand to whole word in original string
    let useStart = start;
    let useEnd = end;

    const wordBounds = findWordBounds(orig, start);
    if (wordBounds) {
      // If match starts inside a word OR the match start isn't alnum (punctuation),
      // prefer replacing the whole word to avoid leaving a leftover letter.
      if (start > wordBounds.start || !isAlnum(orig[start])) {
        useStart = wordBounds.start;
        useEnd = wordBounds.end;
      }
    }

    // Skip if this match overlaps an already applied span
    if (useStart < currentPos) {
      // overlapping/older match — skip
      continue;
    }

    // Append unchanged text from currentPos to useStart
    if (useStart > currentPos) {
      parts.push(orig.slice(currentPos, useStart));
    }

    // Append replacement
    parts.push(replacement);

    // Advance currentPos to the end of the replaced span
    currentPos = useEnd;
  }

  // Append tail
  if (currentPos < orig.length) parts.push(orig.slice(currentPos));

  return parts.join('');
}

module.exports = {
    applyCorrections
};

// const tests = [
//   {
//     name: "Single replacement in middle",
//     text: "She go to school every day.",
//     matches: [
//       {
//         offset: 4,
//         length: 2,
//         replacements: [{ value: "goes" }]
//       }
//     ],
//     expected: "She goes to school every day."
//   },
//   {
//     name: "Multiple replacements applied (right to left order)",
//     text: "He have eat apple.",
//     matches: [
//       { offset: 3, length: 4, replacements: [{ value: "has" }] },     // "have" -> "has"
//       { offset: 8, length: 3, replacements: [{ value: "eaten" }] }    // "eat" -> "eaten"
//     ],
//     expected: "He has eaten apple."
//   },
//   {
//     name: "No replacements available",
//     text: "I are happy.",
//     matches: [
//       { offset: 2, length: 3, replacements: [] } // empty replacements
//     ],
//     expected: "I are happy."
//   },
//   {
//     name: "Multiple suggestions, only first is chosen",
//     text: "She go fast.",
//     matches: [
//       {
//         offset: 4,
//         length: 2,
//         replacements: [{ value: "goes" }, { value: "went" }]
//       }
//     ],
//     expected: "She goes fast."
//   },
//   {
//     name: "Overlapping corrections (ensure right-to-left works)",
//     text: "It do not works.",
//     matches: [
//       { offset: 3, length: 2, replacements: [{ value: "does" }] },    // "do" -> "does"
//       { offset: 11, length: 5, replacements: [{ value: "work" }] }    // "works" -> "work"
//     ],
//     expected: "It does not work."
//   }
// ];

// // Run the tests
// tests.forEach(({ name, text, matches, expected }) => {
//   const result = applyCorrections(text, matches);
//   console.log(name, result === expected ? "✅ PASS" : `❌ FAIL (got: ${result})`);
// });