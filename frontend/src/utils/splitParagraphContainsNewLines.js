export const NEW_LINE_CHARACTER = "NEW_LINE_CHARACTER";

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