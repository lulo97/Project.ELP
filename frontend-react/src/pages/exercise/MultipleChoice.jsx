import { useEffect, useState } from "react";
import { getMultipleChoiceQuestion } from "../../services/exercise";
import { buildMultipleChoiceQuestion } from "../../utils/exercise";
import { MultipleChoiceTemplate } from "./MultipleChoiceTemplate";
import { getTranslation } from "../../utils/getTranslation";
import { Button } from "../../components/Button";
import { translation } from "./Exercise.Translation";

const EMPTY_STATE = {
  question: "",
  correct_answer: "",
  choices: [],
  current_choice: "",
  submitted: false,
};

export function MultipleChoice() {
  const [state, setState] = useState(EMPTY_STATE);

  async function fetchData() {
    const result = await getMultipleChoiceQuestion();
    if (result.data.length > 0) {
      const newMcq = buildMultipleChoiceQuestion({ data: result.data });
      setState({ ...EMPTY_STATE, ...newMcq });
    } else {
      console.error("API response empty!", JSON.stringify(result));
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!state) return <div>{getTranslation("Loading")}</div>;

  const action_button = () => {
    return (
      <>
        {!state.submitted && (
          <Button
            disabled={state.submitted}
            text={getTranslation("Submit")}
            onClick={() => {
              const new_state = {
                ...state,
                submitted: true,
              };
              setState(new_state);
            }}
          />
        )}

        {state.submitted && (
          <Button
            text={getTranslation("NextQuestion", translation, "MultipleChoice")}
            onClick={async () => {
              await fetchData();
            }}
          />
        )}
      </>
    );
  };

  return (
    <MultipleChoiceTemplate
      question={state.question}
      correct_answer={state.correct_answer}
      choices={state.choices}
      current_choice={state.current_choice}
      setCurrentChoice={(choice) => {
        const new_state = {
          ...state,
          current_choice: choice,
        };
        setState(new_state);
      }}
      submitted={state.submitted}
      action_button={action_button}
    />
  );
}
