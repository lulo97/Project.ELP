import { useEffect, useState } from "react";
import { getMultipleChoiceQuestion } from "../../services/exercise";
import { buildMultipleChoiceQuestion } from "../../utils/exercise";
import { Button } from "../../components/Button";
import { Radio } from "../../components/Radio";
import { getTranslation } from "../../utils/getTranslation";

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
    <div className="">
      <div className="font-medium text-2xl">{mcq.question}</div>
      <ul className="my-4 flex flex-col gap-3">
        {mcq.choices.map((choiceOption, index) => (
          <li key={index}>
            <Radio
              value={choiceOption}
              checked={currentChoice === choiceOption}
              disabled={submitted}
              onClick={() => setCurrentChoice(choiceOption)}
              className={getChoiceClass(choiceOption) + " w-full"}
            >
              {choiceOption}
            </Radio>
          </li>
        ))}
      </ul>

      {!submitted && (
        <Button
          text={getTranslation("Submit")}
          onClick={() => {
            if (currentChoice) {
              setSubmitted(true);
            }
          }}
        />
      )}

      {submitted && (
        <Button text={getTranslation("NextQuestion")} onClick={() => reset()} />
      )}
    </div>
  );
}
