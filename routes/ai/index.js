const express = require("express");
const { handleGetSynonyms } = require("./synonym/handleGetSynonyms");
const { handleGetQuestion } = require("./question/handleGetQuestion");
const { handleGetReview } = require("./question/handleGetReview");
const { handleGrammar } = require("./grammar/handleGrammar");
const { handleGetMCQ } = require("./mcq/handleGetMCQ");

const { initEvent } = require("../events/initEvent");

const router = express.Router();

async function callAI(req, res, next) {
  const { input, feature, event_id } = req.body;

  if (event_id) {
    initEvent(event_id);
  }

  let result = null;
  let error = null;

  if (feature == "SYNONYMS") {
    //[a, b, c]
    result = await handleGetSynonyms(input.word);
  }

  if (feature == "GENERATE_QUESTION") {
    result = await handleGetQuestion(input.context, event_id);
  }

  if (feature == "GENERATE_MCQ") {
    result = await handleGetMCQ(input.context, event_id);
  }

  if (feature == "GENERATE_REVIEW") {
    result = await handleGetReview({
      context: input.context,
      question: input.question,
      answer: input.answer,
    });
  }

  if (feature == "GRAMMAR") {
    result = await handleGrammar(input.text);
  }

  if (result == null) {
    throw Error("Feature not exist!");
  }

  if (result.error) {
    error = result.error;
  }

  res.json({ data: result, error: error });
}

router.post("/", callAI);

module.exports = router;
