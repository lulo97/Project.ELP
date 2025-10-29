import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PageTitle } from "../../components/PageTitle";
import { Textarea } from "../../components/Textarea";
import { callAI } from "../../services/ai";
import { useState } from "react";

export function QuestionGenerator() {
  const [context, setContext] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [review, setReview] = useState("");

  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Simple inline spinner (no external library)
  const spinner = (
    <span
      className="inline-block w-4 h-4 border-2 border-t-transparent border-gray-600 rounded-full animate-spin align-middle"
      style={{ borderTopColor: "transparent" }}
    ></span>
  );

  return (
    <div className="p-4">
      <PageTitle title={"Question Generator"} />
      <Textarea
        placeholder="Context..."
        className="w-full min-h-32"
        isFitContent={true}
        value={context}
        onChange={(event) => setContext(event.target.value)}
      />

      <Button
        className="mb-2"
        disabled={loadingGenerate}
        text={
          loadingGenerate ? (
            <span className="flex items-center justify-center gap-2">
              {spinner} Generating...
            </span>
          ) : (
            "Generate"
          )
        }
        onClick={async () => {
          try {
            setLoadingGenerate(true);
            setAnswer("");
            const question_result = await callAI({
              input: { context },
              feature: "GENERATE_QUESTION",
            });
            setQuestion(question_result.data);
          } finally {
            setLoadingGenerate(false);
          }
        }}
      />

      <div className="mb-4"><span className="font-semibold">Question: </span>{question}</div>

      <Textarea
        placeholder="Answer..."
        className="w-full mb-2 min-h-24"
        isFitContent={true}
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
      />

      <Button
        className="mb-2"
        disabled={loadingSubmit}
        text={
          loadingSubmit ? (
            <span className="flex items-center justify-center gap-2">
              {spinner} Submitting...
            </span>
          ) : (
            "Submit"
          )
        }
        onClick={async () => {
          try {
            setLoadingSubmit(true);
            const review_result = await callAI({
              input: { context, question, answer },
              feature: "GENERATE_REVIEW",
            });
            setReview(review_result.data);
          } finally {
            setLoadingSubmit(false);
          }
        }}
      />

      {review && (
        <div className="mt-4 p-4 border rounded-2xl bg-gray-50 shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Review</h3>
          <p className="text-sm text-gray-800">
            <span className="font-medium">Verdict:</span> {review.verdict}
          </p>
          <p className="text-sm text-gray-700 mt-1">
            <span className="font-medium">Reason:</span> {review.reason}
          </p>
          <p className="text-sm text-gray-700 mt-1">
            <span className="font-medium">Correct Answer:</span> {review.correct_answer}
          </p>
        </div>
      )}
    </div>
  );
}
