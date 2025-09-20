import { SPECIAL_CHARACTERS } from "./const";

export function splitParagraphContainsSpecialCharacters(words) {
    return words.flatMap((word) => {
        for (let ch of SPECIAL_CHARACTERS) {
            if (word.endsWith(ch) && word.length > 1) {
                return [word.slice(0, -1), ch];
            }
        }
        return [word];
    });
}