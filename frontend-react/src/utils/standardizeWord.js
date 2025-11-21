import { getConsts } from "./const";

export function getStandardizeWord({ word }) {
    if ([null, undefined].includes(word)) return "";
    if (word.length == 0) return "";

    let output = word.toLowerCase();

    for (const character of getConsts().SPECIAL_CHARACTERS) {
        output = output.replace(character, "");
    }

    return output;
}

export function compareStandardize(a, b) {
    return getStandardizeWord({ word: a }) == getStandardizeWord({ word: b })
}