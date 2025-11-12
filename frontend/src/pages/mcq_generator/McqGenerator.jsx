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

const getTranslation = (key) => _getTranslation(key, translation);

export function McqGenerator() {
  const [context, setContext] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [modelAnswer, setModelAnswer] = useState("");
  const [review, setReview] = useState("");

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
      setAnswer("");
      setQuestion("");
      setReview(null);

      const result = await callAI({
        input: { context },
        feature: "GENERATE_QUESTION",
        event_id: event_id,
      });

      setQuestion(result.data.question);
      setModelAnswer(result.data.answer);
    } finally {
      setLoadingGenerate(false);
    }
  }

  async function handleSubmit() {
    try {
      setReview("");
      setLoadingSubmit(true);
      const review_result = await callAI({
        input: { context, question, answer },
        feature: "GENERATE_REVIEW",
      });
      setReview(review_result.data);
    } finally {
      setLoadingSubmit(false);
    }
  }

  const spinner = (
    <span
      className="inline-block w-4 h-4 border-2 border-t-transparent border-gray-600 rounded-full animate-spin align-middle"
      style={{ borderTopColor: "transparent" }}
    ></span>
  );

  if (!isConnected)
    return <div>{getTranslation("NotConnected")}</div>;

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
                {current_event && "(" + current_event.data + ")"}
              </span>
            )}
            {!loadingGenerate && getTranslation("Generate")}
          </>
        }
        onClick={handleGenerate}
      />

      <div className="mb-4">
        <span className="font-semibold">{getTranslation("Question")}</span>
        {question}
      </div>

      <Textarea
        placeholder={getTranslation("Answer")}
        className="w-full mb-2 min-h-24"
        isFitContent={true}
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
      />

      <Button
        className="mb-2"
        disabled={loadingSubmit}
        text={
          <>
            {loadingSubmit && (
              <span className="flex items-center justify-center gap-2">
                {spinner} {getTranslation("Submitting")}
              </span>
            )}
            {!loadingSubmit && getTranslation("Submit")}
          </>
        }
        onClick={handleSubmit}
      />

      {review && (
        <div className="mt-4 p-4 border rounded-2xl bg-gray-50 shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            {getTranslation("Review")}
          </h3>
          <p className="text-sm text-gray-800">
            <span className="font-medium">{getTranslation("Verdict")}</span>{" "}
            {review.verdict}
          </p>
          <p className="text-sm text-gray-700 mt-1">
            <span className="font-medium">{getTranslation("Reason")}</span>{" "}
            {review.reason}
          </p>
          <p className="text-sm text-gray-700 mt-1">
            <span className="font-medium">
              {getTranslation("CorrectAnswer")}
            </span>{" "}
            {modelAnswer}
          </p>
        </div>
      )}
    </div>
  );
}
