const { countWords } = require("../../../utils/countWords");
const { handleExtractWord } = require("./handleExtractWord");
const { handleRewrite } = require("./handleRewrite");

async function handleGenerateFillInBlank({ context }) {
  if (!context || [null, undefined, ""].includes(context.trim?.())) {
    throw new Error("Context must not be null or empty!");
  }

  const result_refined_context = await handleRewrite({ context: context });

  if (result_refined_context.error) {
    return {
      data: null,
      error: result_refined_context.error,
    };
  }

  const refined_context = result_refined_context.data;

  if (!(15 <= countWords(refined_context) && countWords(refined_context) <= 30)) {
    throw Error(JSON.stringify({ refined_context, error: "Must word count in [15, 30]" }))
  }

  const sentences = refined_context.split(".");

  const cleanedSentences = sentences
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const randomSentence =
    cleanedSentences[Math.floor(Math.random() * cleanedSentences.length)];

  const result_word = await handleExtractWord({ context: randomSentence });

  if (result_word.error) {
    return {
      data: null,
      error: result_word.error,
    };
  }

  return {
    data: {
      original_context: context,
      context: randomSentence,
      word: result_word.data,
    },
    error: null,
  };
}

module.exports = {
  handleGenerateFillInBlank,
};
