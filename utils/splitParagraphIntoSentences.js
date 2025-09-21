export function splitParagraphIntoSentences(paragraph) {
  if (!paragraph || typeof paragraph !== "string") return [];

  // Regex to split on ., ?, ! followed by space or end of string
  const sentences = paragraph
    .split(/(?<=[.?!])\s+/)   // split but keep punctuation
    .map(s => s.trim())       // trim spaces
    .filter(s => s.length > 0); // remove empty

  return sentences;
}