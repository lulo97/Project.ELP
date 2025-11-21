const { sendPrompt } = require("../utils/sendPromt");

const PROMPT = `
You are given the following context. The context may be incomplete or consist of partial sentences.

Task:
- Summarize the context in a clear and concise way.
- Use less than 30 words and more than 15 words which means don't too short or don't too long.
- Keep the main meaning intact.
- Avoid adding information not present in the context.

Context:
[context]

Summary:
`;

async function handleSummary({ context }) {
  if (
    !context ||
    [null, undefined, ""].includes(context.trim?.())
  ) {
    throw new Error("Context must not be null or empty!");
  }

  const prompt = PROMPT.replace("[context]", context);
  const result = await sendPrompt(prompt);

  return result;
}

module.exports = {
  handleSummary,
};
