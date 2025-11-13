import { useState } from "react";
import { Button } from "../../components/Button";
import { Radio } from "../../components/Radio";
import { getTranslation } from "../../utils/getTranslation";
import { translation } from "./Exercise.Translation";

const SIZE_VARIANTS = {
  small: {
    question: "text-sm font-medium",
    listGap: "gap-0.5 my-1",
    label: "text-sm",
    button: "text-sm px-3 py-1.5",
    padding: "p-1",
  },
  medium: {
    question: "text-xl font-medium",
    listGap: "gap-3 my-3",
    label: "text-base",
    button: "text-base px-4 py-2",
    padding: "p-3",
  },
  large: {
    question: "text-2xl font-semibold",
    listGap: "gap-4 my-4",
    label: "text-lg",
    button: "text-lg px-5 py-3",
    padding: "p-4",
  },
};

export function MultipleChoiceTemplate({
  question = "question...",
  correct_answer = "a",
  choices = ["a", "b", "c", "d"],
  current_choice = "a",
  setCurrentChoice = () => {},
  submitted = false,
  action_button = <Button text={getTranslation("Submit")} />,
  size = "medium",
}) {
  const styles = SIZE_VARIANTS[size] || SIZE_VARIANTS.medium;

  function getChoiceClass(choice) {
    if (!submitted) return styles.label;
    if (choice === correct_answer)
      return `${styles.label} text-green-600 font-semibold`;
    if (choice === current_choice)
      return `${styles.label} text-red-600 font-semibold`;
    return styles.label;
  }

  return (
    <div className={`${styles.padding}`}>
      <div className={styles.question}>{question}</div>

      <ul className={`flex flex-col ${styles.listGap}`}>
        {choices.map((choiceOption, index) => (
          <li key={index}>
            <Radio
              value={choiceOption}
              checked={current_choice === choiceOption}
              disabled={submitted}
              onClick={() => setCurrentChoice(choiceOption)}
              className="w-full"
              labelClassName={getChoiceClass(choiceOption)}
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
