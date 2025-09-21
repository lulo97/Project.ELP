import { useEffect, useState } from "react";
import { getMultipleChoiceQuestion } from "../../services/exercise";
import { buildMultipleChoiceQuestion } from "../../utils/exercise";
import { Button } from "../../components/Button";

export function MultipleChoice({ reset }) {
  const [data, setData] = useState([]);
  const [mcq, setMcq] = useState(null);
  const [currentChoice, setCurrentChoice] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await getMultipleChoiceQuestion();
      setData(result.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      generateNewQuestion();
    }
  }, [data]);

  if (!mcq) {
    return <div>Loading...</div>;
  }

  // Hàm build câu hỏi mới
  function generateNewQuestion() {
    const newMcq = buildMultipleChoiceQuestion({ data });
    setMcq(newMcq);
    setCurrentChoice(null);
    setSubmitted(false);
  }

  // Logic style khi submit
  function getChoiceClass(choice) {
    if (!submitted) return "";

    if (choice === mcq.correct_answer) {
      return "text-green-600 font-semibold";
    }

    if (choice === currentChoice) {
      return "text-red-600 font-semibold";
    }

    return "";
  }

  return (
    <div className="p-4">
      <div className="font-medium text-2xl">{mcq.question}</div>
      <ul className="my-4">
        {mcq.choices.map((choice, index) => (
          <li key={index}>
            <input
              className="mr-4"
              type="radio"
              name="mcq"
              value={choice}
              checked={currentChoice === choice}
              onChange={() => setCurrentChoice(choice)}
              disabled={submitted}
            />
            <label onClick={() => setCurrentChoice(choice)} className={getChoiceClass(choice)}>{choice}</label>
          </li>
        ))}
      </ul>

      {!submitted && (
        <Button
          text="Submit"
          onClick={() => {
            if (currentChoice) {
              setSubmitted(true);
            }
          }}
        />
      )}

      {submitted && (
        <Button text="Next question" onClick={() => reset()} />
      )}
    </div>
  );
}
