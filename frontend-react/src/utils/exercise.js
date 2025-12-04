import { translation } from "../pages/exercise/Exercise.Translation.js";
import { getKnuffShuffle } from "./getKnuffShuffle.js";
import { getTranslation } from "./getTranslation.js";

/*
{
    "question": "What is the meaning of \"arid\" with part of speech is \"adjective\"?",
    "correct_answer": "khô cằn",
    "choices": [
        "Đá nam châm",
        "khô cằn",
        "Quyền lực, quyền ảnh hưởng",
        "Liên quan tới đạo luật, văn bản luật"
    ]
}
*/

const CHOICE_COUNT = 4;

export function buildMultipleChoiceQuestion({ data, choice_count = CHOICE_COUNT }) {
  if ([null, undefined].includes(data) || data.length < choice_count) {
    return null;
  }

  const data_shuffled = getKnuffShuffle(data);

  const choices = data_shuffled.slice(0, choice_count);

  const correct = choices[Math.floor(Math.random() * choices.length)];

  let question = getTranslation("Template", translation, "MultipleChoice");
  question = question.replace("{word}", correct.word);
  question = question.replace("{part_of_speech}", correct.part_of_speech);

  return {
    question: question,
    correct_answer: correct.meaning,
    choices: choices.map((c) => c.meaning),
  };
}
