import { compareStandardize, getStandardizeWord } from "./standardizeWord";

/**
const words = ["he", "is", "well", "grounded", "isn't", "he"];

const phrases = ["well grounded"];

Output: [
  { value: 'he', type: 'word' },
  { value: 'is', type: 'word' },
  { value: 'well grounded', type: 'phrase' },
  { value: "isn't", type: 'word' },
  { value: 'he', type: 'word' }
]
*/
export function getSplittedSourceWithType({ words, phrases }) {
  const result = [];
  let i = 0;

  while (i < words.length) {
    let matched = false;

    for (const phrase of phrases) {
      const phraseParts = phrase.split(" ");
      const slice = words.slice(i, i + phraseParts.length);

      if (compareStandardize(slice.join(" "), phrase)) {
        result.push({ value: phrase, type: "phrase" });
        i += phraseParts.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      result.push({ value: words[i], type: "word" });
      i++;
    }
  }

  return result;
}