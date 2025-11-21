import React, { useState, useEffect } from "react";
import { getWritingQuestion } from "../../services/writing_question";
import { getWritingAnswers } from "../../services/writing_answer";
import { Answer } from "./Answer";
import { Button } from "../../components/Button";

function getEmptyAnswer(question_id) {
  return {
    id: "", // temporary until saved
    question_id: question_id || "",
    answer: "",
    review: "",
  };
}

export function Writing() {
  const queryParams = new URLSearchParams(window.location.search);
  const question = queryParams.get("question");

  const [writingQuestion, setWritingQuestion] = useState(null);
  const [writingAnswers, setWritingAnswers] = useState([]);

  useEffect(() => {
    if (!question) return;

    async function fetchData() {
      const q = await getWritingQuestion({ question });
      setWritingQuestion(q);
    }

    fetchData();
  }, [question]);

  async function fetchAnswers() {
    const result = await getWritingAnswers({ question });
    setWritingAnswers(
      result.length === 0 ? [getEmptyAnswer(writingQuestion.id)] : result
    );
  }

  useEffect(() => {
    if (!writingQuestion?.id) return;

    fetchAnswers();
  }, [writingQuestion, question]);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <div className="text-2xl font-bold">{question}</div>
        <Button
          text={"Add answer"}
          onClick={() => {
            setWritingAnswers([
              ...writingAnswers,
              getEmptyAnswer(writingQuestion.id),
            ]);
          }}
        />
      </div>
      {writingAnswers.map((ele, idx) => (
        <Answer
          className="mb-2"
          key={ele.id || idx}
          row={ele}
          refresh={(updater) => {
            if (typeof updater === "function") {
              // local state update
              setWritingAnswers(updater);
            } else {
              // fallback to re-fetch
              fetchAnswers();
            }
          }}
        />
      ))}
    </div>
  );
}
