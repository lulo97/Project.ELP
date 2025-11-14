const { countFrequency } = require("../../../utils/countFrequency");
const { countWords } = require("../../../utils/countWords");
const { handleExtractWord } = require("./handleExtractWord");
const { handleRewrite } = require("./handleRewrite");

async function generateFillInBlank({ context }) {
  const result_refined_context = await handleRewrite({ context: context });

  if (result_refined_context.error) {
    return {
      data: null,
      error: result_refined_context.error,
    };
  }

  const refined_context = result_refined_context.data;

  const result_word = await handleExtractWord({ context: refined_context });

  if (result_word.error) {
    return {
      data: null,
      error: result_word.error,
    };
  }

  const word = result_word.data;

  return {
    data: {
      original_context: context,
      context: refined_context,
      word: word,
    },
    error: null,
  };
}

function validate({ context, word }) {
  if (!context || !word) return false;

  //Context word length in [15, 30]
  if (!(10 <= countWords(context) && countWords(context) <= 30)) return false;

  //Word exist one in context
  if (countFrequency(context, word) != 1) return false;

  //Word is a single word
  if (word.split(" ").length != 1) return false;

  return true;
}

async function handleGenerateFillInBlank({ context }) {
  if (!context || [null, undefined, ""].includes(context.trim?.())) {
    throw new Error("Context must not be null or empty!");
  }

  output = null;

  count = 0;

  while (true) {
    if (count > 5) {
      return { error: "Max attempt", data: null };
    }

    count += 1;

    const result = await generateFillInBlank({ context });

    if (result.error) {
      return { data: null, error: result.error };
    }

    const valid = validate({
      context: result.data.context,
      word: result.data.word,
    });

    if (valid) {
      output = result.data;
      break;
    } else {
      console.log("Error", result.data);
    }
  }

  return {
    data: output,
    error: null,
  };
}

module.exports = {
  handleGenerateFillInBlank,
};
