const { sendPrompt } = require("../utils/sendPromt");
const { countWords } = require("../../../utils/countWords");

const PROMPT = `
You are given the following text. The text may be incomplete or contain grammatical errors.

Task:
- Rewrite the text clearly and correctly while keeping all original words.
- Preserve the meaning of the original text.
- Use less than 30 words and more than 15 words which means don't too short or don't too long.

Input:
[context]

Paraphrased Output:
`;

async function handleRewrite({ context, maxRetries = 3 }) {
  if (!context || [null, undefined, ""].includes(context.trim?.())) {
    throw new Error("Context must not be null or empty!");
  }

  const prompt = PROMPT.replace("[context]", context);
  let result = null;

  let attempts = 0;
  while (true) {
    attempts++;
    if (attempts > maxRetries) {
      return {
        error: `Failed to generate output within 15-30 words after ${maxRetries} attempts.`,
        data: null,
      };
    }

    const response = await sendPrompt(prompt);
    const text = response?.trim();

    if (!text) continue;

    const wordCount = countWords(text);

    if (wordCount >= 15 && wordCount <= 30) {
      result = text;
      break;
    }
  }

  return { error: null, data: result };
}

module.exports = {
  handleRewrite,
};
