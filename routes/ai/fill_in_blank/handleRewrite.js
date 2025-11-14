const { sendPrompt } = require("../utils/sendPromt");

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

  const result = await sendPrompt(prompt);

  return { error: null, data: result };
}

module.exports = {
  handleRewrite,
};
