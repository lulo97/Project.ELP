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

  // Keep trying until a GOOD question is found
  while (can_answer === "NO") {
    const preset = getRandomPreset();

    const prompt = `Instruction:
Read the content below carefully and generate one natural, concise question that a person could answer using only the information provided in the text.
The question should not contain the full answer or restate every fact.
Focus on the main idea, cause, or mystery in the text.
The question should sound like something a curious human would ask.
Keep it under 15 words if possible.
Do not ask for details not mentioned in the context.

Good Examples:
Context: An apple is the round, edible fruit of the apple tree, originating from Central Asia.
Output: What is an apple?
Reason: The question asks about the main subject (apple) which is fully described in the context.

Context: Water boils at 100 degrees Celsius at sea level.
Output: At what temperature does water boil?
Reason: The question focuses on a fact explicitly stated in the context (boiling point).

Context: The Wright brothers made the first powered flight in 1903 in Kitty Hawk.
Output: Who made the first powered flight and when?
Reason: The question asks about information clearly provided in the context, no additional assumptions.

Bad Example:
Context: At first, nothing worked. Jones noticed some plants turned autumn colors before dying.
Output: What chemical did Jones discover to kill poison ivy?
Reason: The question asks for a specific chemical not mentioned in the context, so it cannot be answered.

Context: ${context}
Output:`;

    // Generate a question with a random tweak
    question = await sendPrompt(prompt, preset);

    // Check if the question can be answered
    can_answer = await handleCanQuestionBeAnswer({ context, question });

    if (can_answer === "NO") {
      console.log("Generated question cannot be answered, retrying...");
    }
  }

  return question;
}

module.exports = {
  handleGetQuestion,
};
