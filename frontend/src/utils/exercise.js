import { getKnuffShuffle } from "./getKnuffShuffle.js";

export function buildMultipleChoiceQuestion({ data, choice_count = 4 }) {
    if ([null, undefined].includes(data) || data.length < choice_count) {
        return null;
    }

    const data_shuffled = getKnuffShuffle(data);

    const choices = data_shuffled.slice(0, choice_count);

    const correct = choices[Math.floor(Math.random() * choices.length)];

    return {
        question: `What is the meaning of "${correct.word}"?`,
        correct_answer: correct.meaning,
        choices: choices.map(c => c.meaning)
    };
}