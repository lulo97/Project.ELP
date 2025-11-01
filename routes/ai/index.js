const express = require("express");
const { handleGetSynonyms } = require("./synonym/handleGetSynonyms");
const { handleGetQuestion } = require("./question/handleGetQuestion");
const { handleGetReview } = require("./question/handleGetReview");

const router = express.Router();

async function callAI(req, res, next) {
  const { input, feature } = req.body;

  let result = null;

  if (feature == "SYNONYMS") {
    //[a, b, c]
    result = await handleGetSynonyms(input.word);
  }

  if (feature == "GENERATE_QUESTION") {
    result = await handleGetQuestion(input.context);
  }

  if (feature == "GENERATE_REVIEW") {
    result = await handleGetReview({
      context: input.context,
      question: input.question,
      answer: input.answer,
    });
  }

  if (result == null) {
    throw Error("Feature not exist!");
  }

  res.json({ data: result, error: null });
}

router.post("/", callAI);

module.exports = router;
