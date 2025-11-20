const { sendPrompt } = require("../utils/sendPromt");
const { getPrompt } = require("../utils/getPrompt");

async function handleSummary({ context }) {
  if (
    !context ||
    [null, undefined, ""].includes(context.trim?.())
  ) {
    throw new Error("Context must not be null or empty!");
  }

  const PROMPT = await getPrompt("SUMMARY");

    console.log({PROMPT})

  const prompt = PROMPT.replace("[context]", context);
  const result = await sendPrompt(prompt);

  return result;
}

module.exports = {
  handleSummary,
};
