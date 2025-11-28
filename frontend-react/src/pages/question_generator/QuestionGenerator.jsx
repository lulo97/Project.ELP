import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PageTitle } from "../../components/PageTitle";
import { Textarea } from "../../components/Textarea";
import { callAI } from "../../services/ai";
import { useEffect, useState } from "react";
import { getRandomUUID } from "../../utils/getRandomUUID";
import { getTranslation as _getTranslation } from "../../utils/getTranslation";
import { translation } from "./QuestionGenerator.Translation";
import { useEventsPoll } from "../../hooks/useEventsPoll";
import { Spinner } from "../../components/Spinner";

const getTranslation = (key) => _getTranslation(key, translation);

const EMPTY_STATE = {
  context:
    "Ants are strong, with some able to lift 50 times their body weight, and have existed since the time of dinosaurs",
  question: "",
  answer: "",
  modelAnswer: "",
  review: {
    verdict: "",
    reason: "",
  },
  loadingGenerate: false,
  loadingSubmit: false,
};

export function QuestionGenerator() {
  const [state, setState] = useState(EMPTY_STATE);
  const { getEventsData, startPooling } = useEventsPoll();

  async function handleGenerate() {
    const event_id = getRandomUUID();

    setState({
      ...EMPTY_STATE,
      loadingGenerate: true,
    });

    startPooling(event_id);

    const result = await callAI({
      input: { context: state.context },
      feature: "GENERATE_QUESTION", 
      event_id: event_id,
    });

    setState((old_state) => ({
      ...old_state,
      question: result.data.question,
      modelAnswer: result.data.answer,
      loadingGenerate: false,
    }));
  }

  async function handleSubmit() {
    const event_id = getRandomUUID();

    setState((old_state) => ({
      ...old_state,
      review: EMPTY_STATE.review,
      loadingSubmit: true,
    }));

    startPooling(event_id);

    const review_result = await callAI({
      input: { context: state.context, question: state.question, answer: state.answer },
      feature: "GENERATE_REVIEW",
      event_id: event_id
    });

    setState((old_state) => ({
      ...old_state,
      review: review_result.data,
      loadingSubmit: false,
    }));
  }

  return (
    <div className="p-4">
      <PageTitle title={getTranslation("Title")} />

      <Textarea
        placeholder={getTranslation("Context")}
        className="w-full min-h-32"
        isFitContent={true}
        value={state.context}
        onChange={(event) => {
          setState(old_state => ({
            ...old_state,
            context: event.target.value
          }))
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

      <div className="mb-4">
        <span className="font-semibold">{getTranslation("Question")}</span>
        {state.question}
      </div>

      <Textarea
        placeholder={getTranslation("Answer")}
        className="w-full mb-2 min-h-24"
        isFitContent={true}
        value={state.answer}
        onChange={(event) => {
          setState(old_state => ({
            ...old_state,
            answer: event.target.value
          }))
        }}      />

      <Button
        className="mb-2"
        disabled={state.loadingSubmit}
        text={
          <>
            {state.loadingSubmit && (
              <span className="flex items-center justify-center gap-2">
                {spinner} {getTranslation("Submitting")} {getEventsData()}
              </span>
            )}
            {!state.loadingSubmit && getTranslation("Submit")}
          </>
        }
        onClick={handleSubmit}
      />

      {state.review.verdict && (
        <div className="mt-4 p-4 border rounded-2xl bg-gray-50 shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            {getTranslation("Review")}
          </h3>
          <p className="text-sm text-gray-800">
            <span className="font-medium">{getTranslation("Verdict")}</span>{" "}
            {state.review.verdict}
          </p>
          <p className="text-sm text-gray-700 mt-1">
            <span className="font-medium">{getTranslation("Reason")}</span>{" "}
            {state.review.reason}
          </p>
          <p className="text-sm text-gray-700 mt-1">
            <span className="font-medium">
              {getTranslation("CorrectAnswer")}
            </span>{" "}
            {state.modelAnswer}
          </p>
        </div>
      )}
    </div>
  );
}
