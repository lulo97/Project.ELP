const { sendPrompt } = require("./sendPromt");

async function handleGetQuestion(context) {
  if (!context || [null, undefined, ""].includes(context)) {
    throw Error("Context must not null!")
  }

  const prompt = `Instruction:
Read the content below carefully and generate one natural, concise question that a person might ask after reading it.
The question should not contain the full answer or restate every fact.
Focus on the main idea, cause, or mystery in the text.
The question should sound like something a curious human would ask.
Keep it under 15 words if possible.

Example:
Context: An apple is the round, edible fruit of the apple tree, originating from Central Asia.
Output: What is an apple?

Context: ${context}
Output:`;

  let result = await sendPrompt(prompt);

  return result;
}

module.exports = {
  handleGetQuestion,
};
