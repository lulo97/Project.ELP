import { getConsts } from "./const";

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