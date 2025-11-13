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

function countFrequency(context, word) {
  if (!word) return 0;
  const regex = new RegExp(`\\b${word}\\b`, "gi");
  return (context.match(regex) || []).length;
}

async function handleExtractWord({ context, frequency = 1, maxRetries = 3 }) {
  if (!context || [null, undefined, ""].includes(context.trim?.())) {
    throw new Error("Context must not be null or empty!");
  }

  let result = null;
  let current_context = context;

  for (let i = 0; i < maxRetries; i++) {
    const prompt = PROMPT.replace("[context]", current_context);
    const response = await sendPrompt(prompt);
    const word = response?.trim();
    console.log({ current_context, word })

    if (!word) continue;

    const freq = countFrequency(context, word);
    if (freq === frequency) {
      result = word;
      break;
    } else {
      current_context = current_context.replaceAll(word, "");
    }
  }

  if (!result) {
    const error = `No word found in ${maxRetries} attempts with frequency = ${frequency}`;
    return { data: null, error: error };
  }

  return { data: result, error: null };
}

module.exports = {
  handleExtractWord,
};
