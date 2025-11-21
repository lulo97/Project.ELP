const { sendPrompt } = require("../utils/sendPromt");

/*
3 method:
- Normal prompt
  -> If if word with frequency >= 2 then remove that word from context and try again
- Find proper noun
*/

const PROMPT = `
You are given a sentence. Your task is to extract a **meaningful, specific noun** from the sentence that can be used for a fill-in-the-blank question. 

Rules:
1. Do **not** select generic nouns.
2. Select nouns that are concrete, specific, or important in the context of the sentence.
3. If detect proper noun then output it
4. Only return **one word**, the chosen noun.
5. Do not add extra explanation, only output the word.

Input:
[context]

Output:
`;

async function handleExtractWord({ context }) {
  if (!context || [null, undefined, ""].includes(context.trim?.())) {
    throw new Error("Context must not be null or empty!");
  }

  const prompt = PROMPT.replace("[context]", context);

  const result = await sendPrompt(prompt);

  return { data: result, error: null };
}

module.exports = {
  handleExtractWord,
};
