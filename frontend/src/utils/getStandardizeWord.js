export function getStandardizeWord({ word }) {
    if ([null, undefined].includes(word)) return "";
    if (word.length == 0) return "";

    let output = word.toLowerCase();
    output = output.replace(".", "");
    output = output.replace(",", "");
    output = output.replace("'s", "");
    
    return output;
}