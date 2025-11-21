const { sendPrompt } = require("../utils/sendPromt");
const { handleExtendFalseAnswer } = require("./handleExtendFalseAnswer");

function cleanText(text) {
  // Example inputs:
  // '- "An ant is a type of fish."'
  // '1. A mole is a type of fish.'
  // '* A centipede is a type of reptile that lives on land.'

  if (!text) return "";

  const cleaned = text
    .split("\n")
    .map(
      (line) =>
        line
          .replace(/^[-*\d\.\s]*["']?/, "") // remove leading -, *, numbers, dots, quotes, spaces
          .replace(/["']?$/, "") // remove trailing quotes
          .trim() // remove extra spaces
    )
    .filter((line) => line.length > 0); // remove empty lines

  // Return a single string
  return cleaned.join(" "); // join multiple lines with a space
}

const PROMPT = `
You are given two text inputs: a Question and an Correct Answer.
Output 3 false answers as a list of string (false answer, false answer, false answer).
False answers must have length the same as correct answer, don't too short.

Question:
[question]

Correct Answer:
[answer]

False Answers:
`;

async function handleGetFalseAnswers({ question, answer }) {
  if (
    !question ||
    !answer ||
    [null, undefined, ""].includes(question.trim?.()) ||
    [null, undefined, ""].includes(answer.trim?.())
  ) {
    throw new Error("Question and answer must not be null or empty!");
  }

  const prompt = PROMPT.replace("[question]", question).replace(
    "[answer]",
    answer
  );

  const result = await sendPrompt(prompt);

  let result_splited = result.split("\n");

  if (result_splited.length < 3) {
    console.log("Generate false answer failed, result = ", result);
    return { data: null, error: "Can't generate false answers" };
  }

  if (result_splited.length > 3) {
    result_splited = result_splited.sort(() => Math.random() - 0.5).slice(0, 3);
  }

  result_splited = await Promise.all(
    result_splited.map(async (ele) => {
      let new_ele = cleanText(ele);

      // Extend if too short
      if (new_ele.length <= answer.length) {
        new_ele = await handleExtendFalseAnswer({ false_answer: new_ele });
      }

      return new_ele;
    })
  );

  return { data: result_splited, error: null };
}

module.exports = {
  handleGetFalseAnswers,
};
