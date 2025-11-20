const { sendPrompt } = require("../utils/sendPromt");
const { getPrompt } = require("../utils/getPrompt");

async function handleGrammar(text) {
  if (!text || [null, undefined, ""].includes(text)) {
    throw Error("Text must not be null!");
  }

  const PROMPT = await getPrompt("GRAMMAR");

  const sentences = text
    .split(".")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const results = [];

  for (const sentence of sentences) {
    let result = await sendPrompt(PROMPT.replace("[sentence]", sentence));

    // Clean up model output
    const filterWords = ["Output:", "```json", "```", "json"];
    filterWords.forEach((ele) => {
      result = result.replaceAll(ele, "");
    });

    result = result.trim();

    try {
      result = JSON.parse(result);
    } catch (error) {
      console.log("Error parsing this:", result, error);
      result = {
        corrected: null,
        explanations: ["Error while parsing output."],
      };
    }

    results.push({
      sentence,
      ...result,
    });
  }

  return results;
}

module.exports = {
  handleGrammar,
};
