import { useEffect, useState } from "react";
import { getMultipleChoiceQuestion } from "../../services/exercise";
import { buildMultipleChoiceQuestion } from "../../utils/exercise";
import { MultipleChoiceTemplate } from "./MultipleChoiceTemplate";
import { getTranslation } from "../../utils/getTranslation";

export function MultipleChoice({ reset }) {
  const [data, setData] = useState([]);
  const [mcq, setMcq] = useState(null);

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

  if (!mcq) return <div>{getTranslation("Loading")}</div>;

  function generateNewQuestion() {
    const newMcq = buildMultipleChoiceQuestion({ data });
    setMcq(newMcq);
  }

  return (
    <MultipleChoiceTemplate
      question={mcq.question}
      correct_answer={mcq.correct_answer}
      choices={mcq.choices}
      onNext={generateNewQuestion}
    />
  );
}
