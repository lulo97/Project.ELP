import { getConsts } from "./const";
import { compareStandardize } from "./standardizeWord";

export const NEW_LINE_CHARACTER = "NEW_LINE_CHARACTER";

/**
Input: ["he", "is\n", "well"];

Output: ["he", "is", NEW_LINE_CHARACTER, "well"]
*/
export function splitParagraphContainsNewLines(words) {
    const result = [];

    words.forEach((word) => {
        // Split by newline
        const parts = word.split(/\n/);
        parts.forEach((part, index) => {
            if (part) result.push(part); // add non-empty string
            if (index < parts.length - 1) result.push(NEW_LINE_CHARACTER); // add newline marker
        });
    });

    return result;
}

/**
Input: ["he", "is.", "well"];

Output: ["he", "is", ".", "well"]
*/
export function splitParagraphContainsSpecialCharacters(words) {
    return words.flatMap((word) => {
        for (let ch of getConsts().SPECIAL_CHARACTERS) {
            if (word.endsWith(ch) && word.length > 1) {
                return [word.slice(0, -ch.length), ch];
            }
        }
        return [word];
    });
}

/**
const words = ["he", "is", "well", "grounded", "isn't", "he"];

const phrases = ["well grounded"];

const idioms = ["to add insult to injury"];

Output: [
  { value: 'he', type: 'word' },
  { value: 'is', type: 'word' },
  { value: 'well grounded', type: 'phrase' },
  { value: "isn't", type: 'word' },
  { value: 'he', type: 'word' },
  { value: 'to add insult to injury', type: 'idiom' }
]
*/
export function getSplittedSourceWithType({ words, phrases = [], idioms = [] }) {
    const result = [];
    let i = 0;

    while (i < words.length) {
        let matched = false;

        // Check idioms first
        for (const idiom of idioms) {
            const idiomParts = idiom.split(" ");
            const slice = words.slice(i, i + idiomParts.length);

            if (compareStandardize(slice.join(" "), idiom)) {
                result.push({ value: idiom, type: "idiom" });
                i += idiomParts.length;
                matched = true;
                break;
            }
        }

        if (matched) continue;

        // Check phrases
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

/**
Input = "a b c"

Output = [{ value: "a", type: "word" }, { value: "b", type: "word" }, ...] with special process
*/
export function splitParagraph({ source = "", existPhrases = [], existIdioms = [] }) {
    const rawSource = source.split(" ");
    const rawSourceWithNewLines = splitParagraphContainsNewLines(rawSource);
    const rawSourceWithSpecialCharacters = splitParagraphContainsSpecialCharacters(
        rawSourceWithNewLines
    );
    const rawSourceSplittedWithType = getSplittedSourceWithType({
        words: rawSourceWithSpecialCharacters,
        phrases: existPhrases ? existPhrases.map((ele) => ele.phrase) : [],
        idioms: existIdioms ? existIdioms.map((ele) => ele.idiom) : [],
    });
    return rawSourceSplittedWithType;
}
