import { useState } from "react";
import { Button } from "../../components/Button";
import { Radio } from "../../components/Radio";
import { getTranslation } from "../../utils/getTranslation";
import { translation } from "./Exercise.Translation";

export function MultipleChoiceTemplate({
  question,
  correct_answer,
  choices,
  onNext,
}) {
  const [currentChoice, setCurrentChoice] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function getChoiceClass(choice) {
    if (!submitted) return "";

    if (choice === correct_answer) return "text-green-600 font-semibold";
    if (choice === currentChoice) return "text-red-600 font-semibold";
    return "";
  }

  function handleOnNext() {
    if (onNext) onNext();
    setSubmitted(false);
  }

  return (
    <div>
      <div className="font-medium text-2xl">{question}</div>
      <ul className="my-4 flex flex-col gap-3">
        {choices.map((choiceOption, index) => (
          <li key={index}>
            <Radio
              value={choiceOption}
              checked={currentChoice === choiceOption}
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

      {!submitted && (
        <Button
          text={getTranslation("Submit")}
          onClick={() => currentChoice && setSubmitted(true)}
        />
      )}

      {submitted && !onNext && (
        <Button disabled={true} text={getTranslation("Submit")} />
      )}

      {submitted && onNext && (
        <Button
          text={getTranslation("NextQuestion", translation, "MultipleChoice")}
          onClick={handleOnNext}
        />
      )}
    </div>
  );
}
