/**
 * Combine texts into sentences with minimum words.
 * @param {string[]} texts - Array of text strings
 * @param {number} minWords - Minimum words per sentence
 * @returns {string[]} - Array of combined sentences
 * 
 * 
 * Input: [a1, a2, a3, a4, a5, a6]
 * 
 * Output: [a1 + a2, a3 + a4 + a5, a6]
 */
export function combineTextsByMinWords(texts, minWords = 15) {
  if (!Array.isArray(texts) || texts.length === 0) return [];

  const sentences = [];
  let currentSentence = "";

  for (const text of texts) {
    currentSentence = currentSentence ? currentSentence + " " + text : text;

    const wordCount = currentSentence.split(/\s+/).filter(Boolean).length;

    if (wordCount >= minWords) {
      sentences.push(currentSentence.trim());
      currentSentence = "";
    }
  }

  // Add any leftover text as a sentence
  if (currentSentence) {
    sentences.push(currentSentence.trim());
  }

  if (sentences.length >= 2) {
    const lastSentence = sentences[sentences.length - 1];
    const lastWordCount = lastSentence.split(/\s+/).filter(Boolean).length;

    if (lastWordCount < minWords) {
      sentences[sentences.length - 2] += " " + lastSentence;
      sentences.pop();
    }
  }

  return sentences;
}

// const texts = [
//   "Hi, this is Emily from MinuteEarth.",
//   "Supermarkets have lots of milks to choose from these days.",
//   "Many of which are the product of blending up and straining various nuts and seeds.",
//   "Others come from grains like oats or rice, offering different textures and flavors.",
//   "Even traditional dairy milk now comes in multiple varieties such as skim, low-fat, and whole.",
//   "Consumers today are faced with more choices than ever before when buying milk."
// ];

// const minWords = 15;

// const result = combineTextsByMinWords(texts, minWords);

// console.log(result);
