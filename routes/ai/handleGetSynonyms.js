const { sendPrompt } = require("./sendPromt");

async function handleGetSynonyms(word) {
  const prompt = `You are a helpful AI that outputs synonyms.

Given a word, respond ONLY with a valid JSON array of strings (no explanation, no extra text).

Example:
Input: fun
Output: ["happy", "energetic", "pleasure"]

Now process:
Input: ${word}
Output:`;

  let result = await sendPrompt(prompt);

  const filterWords = ["Output: "];

  filterWords.forEach((ele) => {
    result = result.replaceAll(ele, "");
  });

  try {
    let arr = JSON.parse(result);
    arr = arr.filter((item) => item.toLowerCase() !== word.toLowerCase());
    result = JSON.stringify(arr);
  } catch (e) {
    result = "[]";
  }

  return result;
}

module.exports = {
  handleGetSynonyms,
};
