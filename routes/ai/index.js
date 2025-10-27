const express = require("express");
const { sendPrompt } = require("./sendPromt");

const router = express.Router();

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

async function callAI(req, res, next) {
  const { input, feature } = req.body;

  let result = null;

  if (feature == "SYNONYMS") {
    //[a, b, c]
    result = await handleGetSynonyms(input.word);
  }

  if (result == null) {
    throw Error("Feature not exist!");
  }

  res.json({ data: result, error: null });
}

router.post("/", callAI);

module.exports = router;
