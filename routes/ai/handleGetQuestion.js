const { handleCanQuestionBeAnswer } = require("./handleCanQuestionBeAnswer");
const { sendPrompt, PARAMS } = require("./sendPromt");

function getRandomPreset() {
  const keys = Object.keys(PARAMS);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return PARAMS[randomKey];
}

async function handleGetQuestion(context) {
  if (!context || [null, undefined, ""].includes(context)) {
    throw Error("Context must not be null!");
  }

  let question = "";
  let can_answer = "NO";
  const badQuestions = [];

  // Keep trying until a GOOD question is found
  while (can_answer === "NO") {
    const preset = getRandomPreset();

    // Construct the prompt including previously bad questions
    const badQuestionsText =
      badQuestions.length > 0
        ? `Avoid repeating these previously generated bad questions:\n${badQuestions
            .map((q) => `- ${q}`)
            .join("\n")}\n`
        : "";

    const prompt = `Instruction:
Read the content below carefully and generate one natural, concise question that a person could answer using only the information provided in the text.
The question should not contain the full answer or restate every fact.
Focus on the main idea, cause, or mystery in the text.
The question should sound like something a curious human would ask.
Keep it under 15 words if possible.
Do not ask for details not mentioned in the context.
The difficulty level of the question should be: hard

${badQuestionsText}

Good Examples:
Context: An apple is the round, edible fruit of the apple tree, originating from Central Asia.
Output: What is an apple?
Reason: The question asks about the main subject (apple) which is fully described in the context.

Context: ${context}
Output:`;

    // Generate a question with a random tweak
    question = await sendPrompt(prompt, preset);

    // Check if the question can be answered
    can_answer = await handleCanQuestionBeAnswer({ context, question });

    if (can_answer === "NO") {
      console.log("Generated question cannot be answered, retrying...");
      badQuestions.push(question.trim()); // Save bad question for next iteration
    }
  }

  console.log("Found a good question:", question);

  const filterWords = ["Question:", "\n"];

  filterWords.forEach((ele) => {
    question = question.replaceAll(ele, "");
  });

  return question;
}

module.exports = {
  handleGetQuestion,
};
