const { sendPrompt } = require("../utils/sendPromt");
const { isAnswerExistInContext } = require("./isAnswerExistInContext");

const PROMPT = `
Context: [context]
Question: [question]
Answer:
`

async function isQuestionCanBeAnswer({ context, question }) {
  if (!context || !question || [null, undefined, ""].includes(context) || [null, undefined, ""].includes(question)) {
    throw Error("Context and question must not be null or empty!");
  }

  const prompt = PROMPT.replace("[context]", context).replace("[question]", question);

  const answer = await sendPrompt(prompt);

  const is_answer_in_context = await isAnswerExistInContext({ context, answer });

  if (is_answer_in_context) return { answer: answer, can_answer: true }; //Yes, question can be answer.

  return { answer: answer, can_answer: false };
}

module.exports = {
  isQuestionCanBeAnswer,
};
