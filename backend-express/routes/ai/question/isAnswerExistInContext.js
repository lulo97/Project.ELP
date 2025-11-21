const { sendPrompt } = require("../utils/sendPromt");

const PROMPT = `
You are given two text inputs: a Context and a SubContext.
Determine if the SubContext is meaningfully contained within the Context.
Respond with only one word: "YES" if the SubContext exists within the Context, or "NO" if it does not.

Context:
[context]

SubContext:
[answer]

Output:
`;

async function isAnswerExistInContext({ context, answer }) {
  if (
    !context ||
    !answer ||
    [null, undefined, ""].includes(context.trim?.()) ||
    [null, undefined, ""].includes(answer.trim?.())
  ) {
    throw new Error("Context and answer must not be null or empty!");
  }

  const prompt = PROMPT.replace("[context]", context).replace("[answer]", answer);
  const result = await sendPrompt(prompt);

  return !result.toUpperCase().includes("NO");
}

module.exports = {
  isAnswerExistInContext,
};
