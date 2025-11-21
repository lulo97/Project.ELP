const { handleGetQuestion } = require("../question/handleGetQuestion");
const { handleGetFalseAnswers } = require("./handleGetFalseAnswers");
const { updateEvent } = require("../../events/updateEvent");

async function handleGetMCQ(context, event_id) {
  const output = {
    question: "",
    correct_answer: "",
    choices: [],
    error: null,
  };

  updateEvent({
    event_id,
    status: "PROCESSING",
    data: "Generating question and answers...",
  });

  //From context -> question + answer
  const result_qa = await handleGetQuestion(context);

  if (result_qa.error) {
    output.error = result_qa.error;
    return output;
  }

  updateEvent({
    event_id,
    status: "PROCESSING",
    data: "Generating false answers...",
  });

  //From Q, A -> false answers
  const result_false_answers = await handleGetFalseAnswers({
    question: result_qa.question,
    answer: result_qa.answer,
  });

  if (result_false_answers.error) {
    output.error = result_false_answers.error;
    return output;
  }

  updateEvent({
    event_id,
    status: "COMPLETE",
    data: "",
  });

  //Done
  output.question = result_qa.question;
  output.correct_answer = result_qa.answer;
  output.choices = [...result_false_answers.data, result_qa.answer];

  return output;
}

module.exports = {
  handleGetMCQ,
};
