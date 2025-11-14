const { sendPrompt } = require("../utils/sendPromt");

const PROMPT = `
You are given a context, a question, and a user-provided answer.
Your task is to judge whether the user’s answer is Correct, Partially Correct, or Incorrect based on the information in the context.

Respond only in valid JSON with this structure:

{
  "verdict": "Correct" | "Partially Correct" | "Incorrect",
  "reason": "A short explanation of your judgment",
}

Examples

**Example 1**
Context: The Eiffel Tower is a wrought-iron structure located in Paris, France.
Question: Where is the Eiffel Tower located?
Answer: It’s in Paris.
Output:

{
  "verdict": "Correct",
  "reason": "The answer matches the context, just phrased more casually.",
}

**Example 2**
Context: The Eiffel Tower is a wrought-iron structure located in Paris, France.
Question: What is the Eiffel Tower made of?
Answer: It’s made of bricks.
Output:

{
  "verdict": "Incorrect",
  "reason": "The answer contradicts the context, which says it is made of wrought iron.",
}

Final section (for actual evaluation):

Context: [context]
Question: [question]
Answer: [answer]
Output:
`;

async function handleGetReview({ context, question, answer }) {
  const prompt = PROMPT.replace("[context]", context)
    .replace("[question]", question)
    .replace("[answer]", answer);

  let result = await sendPrompt(prompt);

  const filterWords = ["```json", "```"];

  filterWords.forEach((ele) => {
    result = result.replaceAll(ele, "");
  });

  function extractFirstSubstring(str, startChar, endChar) {
    const startIndex = str.indexOf(startChar);
    if (startIndex === -1) return null;

    const endIndex = str.indexOf(endChar, startIndex + 1);
    if (endIndex === -1) return null;

    return startChar + str.slice(startIndex + 1, endIndex) + endChar;
  }

  result = extractFirstSubstring(result, "{", "}");

  try {
    const parsed = JSON.parse(result.trim());
    return parsed;
  } catch (err) {
    console.error("Failed to parse model output:", result);
    return {
      verdict: "Error",
      reason: "Invalid JSON format from model.",
      correct_answer: null,
    };
  }
}

module.exports = {
  handleGetReview,
};
