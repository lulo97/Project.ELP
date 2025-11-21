/**
 * Extracts a chunk of continuous sentences from a text.
 *
 * @param {string} text - The input paragraph or document text.
 * @param {number} minSentences - Minimum number of sentences in the chunk.
 * @param {number} maxSentences - Maximum number of sentences in the chunk.
 * @returns {string} - A chunk of continuous sentences.
 */
function extractSentenceChunk(text, minSentences = 1, maxSentences = 2) {
  if (!text || typeof text !== "string" || !text.trim()) {
    throw new Error("Text must be a non-empty string!");
  }

  // Step 1️⃣ — Split text into sentences safely
  const sentences = text
    .split(/(?<=[.!?])\s+/) // Split on sentence-ending punctuation + space
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length === 0) return "";

  // Step 2️⃣ — Randomly select a start index
  const startIndex = Math.floor(Math.random() * sentences.length);

  // Step 3️⃣ — Randomly choose how many sentences to include
  const chunkSize = Math.min(
    maxSentences,
    Math.max(
      minSentences,
      Math.floor(Math.random() * (maxSentences - minSentences + 1)) +
        minSentences
    )
  );

  // Step 4️⃣ — Extract continuous chunk
  const chunk = sentences.slice(startIndex, startIndex + chunkSize).join(" ");

  return chunk.trim();
}

module.exports = {
  extractSentenceChunk,
};
