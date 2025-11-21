import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PageTitle } from "../../components/PageTitle";
import { Textarea } from "../../components/Textarea";
import { callAI } from "../../services/ai";
import { useEffect, useState } from "react";
import { getRandomId } from "../../utils/getRandomId";
import { useEventSource } from "../../hooks/useEventSource";
import { getTranslation as _getTranslation } from "../../utils/getTranslation";
import { translation } from "./McqGenerator.Translation";
import { message } from "../../providers/MessageProvider";
import { MultipleChoiceTemplate } from "../exercise/MultipleChoiceTemplate";

const getTranslation = (key) => _getTranslation(key, translation);

const EMPTY_MCQ = {
  question: "",
  correct_answer: "",
  choices: [],
  current_choice: "",
  submitted: false,
};

export function McqGenerator() {
  const [context, setContext] = useState("");
  const [mcq, setMcq] = useState(EMPTY_MCQ);

  const [loadingGenerate, setLoadingGenerate] = useState(false);

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [questionEventId, setQuestionEventId] = useState("");

  const { data, error, isConnected } = useEventSource();

  let current_event = null;
  if (questionEventId && data) {
    current_event = data.find((ele) => ele.id == questionEventId);

    if (current_event && current_event.status == "COMPLETE") {
      setQuestionEventId("");
    }
  }

  async function handleGenerate() {
    try {
      const event_id = getRandomId();
      setQuestionEventId(event_id);

      setLoadingGenerate(true);
      setMcq(EMPTY_MCQ);

      const result = await callAI({
        input: { context },
        feature: "GENERATE_MCQ",
        event_id: event_id,
      });

      if (result.error) {
        message({ type: "error", text: result.error });
        return;
      }

      setMcq({ ...EMPTY_MCQ, ...result.data });
    } finally {
      setLoadingGenerate(false);
    }
  }

  const spinner = (
    <span
      className="inline-block w-4 h-4 border-2 border-t-transparent border-gray-600 rounded-full animate-spin align-middle"
      style={{ borderTopColor: "transparent" }}
    ></span>
  );

  const action_button = (
    <Button
      disabled={mcq.submitted}
      text={getTranslation("Submit")}
      onClick={() => {
        const new_mcq = {
          ...mcq,
          submitted: true,
        };
        setMcq(new_mcq);
      }}
    />
  );

  if (!isConnected) return <div>{getTranslation("NotConnected")}</div>;

  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div className="p-4">
      <PageTitle title={getTranslation("Title")} />

      <Textarea
        placeholder={getTranslation("Context")}
        className="w-full min-h-32"
        isFitContent={true}
        value={context}
        onChange={(event) => setContext(event.target.value)}
      />

      <Button
        className="mb-4 mt-3"
        disabled={loadingGenerate}
        text={
          <>
            {loadingGenerate && (
              <span className="flex items-center justify-center gap-2">
                {spinner} {getTranslation("Generating")}{" "}
                {current_event &&
                  `[${current_event.status}] ${current_event.data}`}
              </span>
            )}
            {!loadingGenerate && getTranslation("Generate")}
          </>
        }
        onClick={handleGenerate}
      />

      {mcq && mcq.question && (
        <MultipleChoiceTemplate
          question={mcq.question}
          correct_answer={mcq.correct_answer}
          choices={mcq.choices}
          current_choice={mcq.current_choice}
          setCurrentChoice={(choice) => {
            const new_mcq = {
              ...mcq,
              current_choice: choice,
            };
            setMcq(new_mcq);
          }}
          submitted={mcq.submitted}
          action_button={action_button}
        />
      )}
    </div>
  );
}
