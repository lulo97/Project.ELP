const { isQuestionCanBeAnswer } = require("./isQuestionCanBeAnswer");
const { sendPrompt } = require("../utils/sendPromt");
const { extractSentenceChunk } = require("../utils/extractSentenceChunk")

const PROMPT = `
Instruction:
Read the content below carefully and generate one natural, concise question that a person could answer using only the information provided in the text.

Good Examples:
Context: An apple is the round, edible fruit of the apple tree, originating from Central Asia.
Output: What is an apple?
Reason: The question asks about the main subject (apple) which is fully described in the context.

Context: [context]
Output:
`

async function handleGetQuestion(_context) {
  if (!_context || [null, undefined, ""].includes(_context)) {
    throw Error("Context must not be null!");
  }

  const context = extractSentenceChunk(_context);

  let question = "";

  let answer = "";

  let can_answer = false;

  const badQuestions = [];

  while (!can_answer) {

    const prompt = PROMPT.replace('[context]', context);

    question = await sendPrompt(prompt, is_random = true);

    const result = await isQuestionCanBeAnswer({ context, question });

    answer = result.answer;

    can_answer = result.can_answer;

    if (!can_answer) {
      console.log("Generated question cannot be answered, retrying...");
      badQuestions.push(question.trim());
    }

    if (badQuestions.length >= 5) {
      return "Can't generate question!";
    }
  }

  console.log("Found a good question:", question);

  const filterWords = ["Question:", "\n"];

  filterWords.forEach((ele) => {
    question = question.replaceAll(ele, "");
  });

  return { question, answer };
}

module.exports = {
  handleGetQuestion,
};
