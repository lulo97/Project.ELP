import { useState } from "react";
import { Button } from "../../components/Button";
import { Radio } from "../../components/Radio";
import { getTranslation } from "../../utils/getTranslation";
import { translation } from "./Exercise.Translation";

export function MultipleChoiceTemplate({
  question = "question...",
  correct_answer = "a",
  choices = ["a", "b", "c", "d"],
  current_choice = "a",
  setCurrentChoice = () => {},
  submitted = false,
  action_button = <Button text={getTranslation("Submit")} />,
}) {
  function getChoiceClass(choice) {
    if (!submitted) return "";
    if (choice === correct_answer) return "text-green-600 font-semibold";
    if (choice === current_choice) return "text-red-600 font-semibold";
    return "";
  }

  return (
    <div>
      <div className="font-medium text-2xl">{question}</div>
      <ul className="my-4 flex flex-col gap-3">
        {choices.map((choiceOption, index) => (
          <li key={index}>
            <Radio
              value={choiceOption}
              checked={current_choice === choiceOption}
              disabled={submitted}
              onClick={() => setCurrentChoice(choiceOption)}
              className={"w-full"}
              labelClassName={getChoiceClass(choiceOption) + " text-sm"}
            >
              {choiceOption}
            </Radio>
          </li>
        ))}
      </ul>

      {typeof action_button === "function" ? action_button() : action_button}
    </div>
  );
}
