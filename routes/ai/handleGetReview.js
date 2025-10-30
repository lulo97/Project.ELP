const { sendPrompt } = require("./sendPromt");

async function handleGetReview({ context, question, answer }) {
  const prompt = `You are given a context, a question, and an answer.
Determine whether the answer is correct, partially correct, or incorrect based on the information in the context.
Then explain why you made that judgment in one short sentence.
Finally, provide the correct answer to the question based on the context.

Correct: The answer matches or can be clearly inferred from the context.
Partially Correct: The answer captures part of the truth but misses or distorts some detail.
Incorrect: The answer contradicts or is not supported by the context.
Be tolerant of paraphrasing and synonyms; focus on meaning, not exact wording.

Output your response **only** in valid JSON with this structure:
{
  "verdict": "Correct" | "Partially Correct" | "Incorrect",
  "reason": "A short explanation of your judgment",
  "correct_answer": "The answer to the question based on the context"
}

### Examples

Context: An apple is the round, edible fruit of the apple tree, originating from Central Asia.
Question: What is an apple?
Answer: An apple is the edible, round fruit of the apple tree.
Output:
{
  "verdict": "Correct",
  "reason": "The answer accurately matches the context with minor rewording.",
  "correct_answer": "An apple is the round, edible fruit of the apple tree."
}

Context: An apple is the round, edible fruit of the apple tree, originating from Central Asia.
Question: What is an apple?
Answer: An apple is a cat.
Output:
{
  "verdict": "Incorrect",
  "reason": "The answer contradicts the context.",
  "correct_answer": "An apple is the round, edible fruit of the apple tree."
}

Now evaluate and respond only with JSON:

Context: ${context}
Question: ${question}
Answer: ${answer}
Output:
`;

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
    console.error("❌ Failed to parse model output:", result);
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
