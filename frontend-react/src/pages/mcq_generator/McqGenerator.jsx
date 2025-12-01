import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PageTitle } from "../../components/PageTitle";
import { Textarea } from "../../components/Textarea";
import { callAI } from "../../services/ai";
import { useEffect, useState } from "react";
import { getRandomId } from "../../utils/getRandomId";
import { getTranslation as _getTranslation } from "../../utils/getTranslation";
import { translation } from "./McqGenerator.Translation";
import { message } from "../../providers/MessageProvider";
import { MultipleChoiceTemplate } from "../exercise/multiple_choice/MultipleChoiceTemplate";
import { Spinner } from "../../components/Spinner";
import { useEventsPoll } from "../../hooks/useEventsPoll";

const getTranslation = (key) => _getTranslation(key, translation);

const EMPTY_MCQ = {
  question: "",
  correct_answer: "",
  choices: [],
  current_choice: "",
  submitted: false,
};

const EMPTY_STATE = {
  context:
    "Ants are fascinating creatures with some surprising abilities, like having two stomachs, not having lungs or ears, and the ability to lift up to 50 times their body weight",
  mcq: EMPTY_MCQ,
  loadingGenerate: false,
};

export function McqGenerator() {
  const [state, setState] = useState(EMPTY_STATE);
  const { getEventsData, startPooling } = useEventsPoll();

  async function handleGenerate() {
    const event_id = getRandomId();

    setState((old_state) => ({
      ...old_state,
      loadingGenerate: true,
      mcq: EMPTY_MCQ,
    }));

    startPooling(event_id);

    const result = await callAI({
      input: { context: state.context },
      feature: "GENERATE_MCQ",
      event_id: event_id,
    });

    if (result.error) {
      message({ type: "error", text: result.error });
      return;
    }

    setState((old_state) => ({
      ...old_state,
      loadingGenerate: false,
      mcq: result.data,
    }));
  }

  const action_button = (
    <Button
      disabled={state.mcq.submitted}
      text={getTranslation("Submit")}
      onClick={() => {
        const _mcq = {
          ...state.mcq,
          submitted: true,
        };
        setState((old_state) => ({
          ...old_state,
          mcq: _mcq,
        }));
      }}
    />
  );

  return (
    <div className="p-4">
      <PageTitle title={getTranslation("Title")} />

      <Textarea
        placeholder={getTranslation("Context")}
        className="w-full min-h-32"
        isFitContent={true}
        value={state.context}
        onChange={(event) => {
          setState((old_state) => ({
            ...old_state,
            context: event.target.value,
          }));
        }}
      />

      <Button
        className="mb-4 mt-3"
        disabled={state.loadingGenerate}
        text={
          <>
            {state.loadingGenerate && (
              <span className="flex items-center justify-center gap-2">
                <Spinner /> {getTranslation("Generating")} {getEventsData()}
              </span>
            )}
            {!state.loadingGenerate && getTranslation("Generate")}
          </>
        }
        onClick={handleGenerate}
      />

      {state.mcq && state.mcq.question && (
        <MultipleChoiceTemplate
          question={state.mcq.question}
          correct_answer={state.mcq.correct_answer}
          choices={state.mcq.choices}
          current_choice={state.mcq.current_choice}
          setCurrentChoice={(choice) => {
            const _mcq = {
              ...state.mcq,
              current_choice: choice,
            };
            setState((old_state) => ({
              ...old_state,
              mcq: _mcq,
            }));
          }}
          submitted={state.mcq.submitted}
          action_button={action_button}
        />
      )}
    </div>
  );
}
