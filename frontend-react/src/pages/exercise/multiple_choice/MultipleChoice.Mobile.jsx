import { MultipleChoiceTemplate } from "./MultipleChoiceTemplate";
import { Button } from "../../../components/Button";
import { getTranslation } from "../../../utils/getTranslation";
import { translation } from "../Exercise.Translation";

export function MultipleChoiceMobile({
  question,
  correct_answer,
  choices,
  current_choice,
  submitted,
  setCurrentChoice,
  onSubmit,
  onNext,
}) {
  return (
      <MultipleChoiceTemplate
        question={question}
        correct_answer={correct_answer}
        choices={choices}
        current_choice={current_choice}
        setCurrentChoice={setCurrentChoice}
        submitted={submitted}
        action_button={() => (
          <div className="w-full flex flex-col gap-3 mt-4">
            {!submitted && (
              <Button
                text={getTranslation("Submit")}
                className="w-full py-2"
                onClick={onSubmit}
              />
            )}

            {submitted && (
              <Button
                text={getTranslation("NextQuestion", translation, "MultipleChoice")}
                className="w-full py-2"
                onClick={onNext}
              />
            )}
          </div>
        )}
      />
  );
}
