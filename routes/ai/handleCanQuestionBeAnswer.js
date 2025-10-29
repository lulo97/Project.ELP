const { sendPrompt } = require("./sendPromt");

async function handleCanQuestionBeAnswer({ context, question }) {
  if (!context || !question || [null, undefined, ""].includes(context) || [null, undefined, ""].includes(question)) {
    throw Error("Context and question must not be null or empty!");
  }

  const prompt = `Context: ${context}
Question: ${question}
Can an answer be extract from context? Output: YES/NO
Output:`;

  const result = await sendPrompt(prompt);

  if (result.includes("NO")) return "NO";
  return "YES";
}

module.exports = {
  handleCanQuestionBeAnswer,
};
