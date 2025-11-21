const { sendPrompt } = require("../utils/sendPromt");

const PROMPT = `
Given a sentence, adding false information to make that sentence longer:

Sentence:
[false_answer]

Output:
`;

async function handleExtendFalseAnswer({ false_answer }) {
  if (
    !false_answer ||
    [null, undefined, ""].includes(false_answer.trim?.())
  ) {
    throw new Error("false_answer must not be null or empty!");
  }

  const prompt = PROMPT.replace("[false_answer]", false_answer);
  const result = await sendPrompt(prompt);

  return result;
}

module.exports = {
  handleExtendFalseAnswer,
};
