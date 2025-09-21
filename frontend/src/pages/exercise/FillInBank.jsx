import { useEffect, useState } from "react";
import { getFillInBlank } from "../../services/exercise";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function FillInBank({ reset }) {
  const [data, setData] = useState(null);
  const [fillWord, setFillWord] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  async function fetchQuestion() {
    const result = await getFillInBlank();
    setData(result.data);
    setFillWord("");
    setSubmitted(false);
    setShowHint(false);
  }

  useEffect(() => {
    fetchQuestion();
  }, []);

  function getFillWordClass() {
    if (!submitted) return "";

    if (fillWord === data.word) {
      return "text-green-600 font-semibold";
    }

    return "text-red-600 font-semibold";
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="font-medium text-2xl">Fill word in blank</div>

      <div className="flex flex-wrap items-baseline leading-relaxed mb-2">
        {data.sentence.split(" ").map((ele, i) => {
          if (ele.toLowerCase().includes(data.word.toLowerCase())) {
            return (
              <Input
                key={i}
                className="mr-1"
                placeholder="Fill in"
                onChange={(e) => setFillWord(e.target.value)}
              />
            );
          }
          return (
            <span key={i} className="mr-1">
              {ele}
            </span>
          );
        })}
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <Button
            text={showHint ? "Hide Hint" : "Show Hint"}
            onClick={() => setShowHint(!showHint)}
          />

          {showHint && (
            <div className="mt-2 p-2 border rounded bg-gray-50">
              <div className="font-semibold">Hint for meanings of word:</div>
              <ul className="list-disc pl-5">
                {data.meanings.map((m, i) => (
                  <li key={i}>
                    <span className="italic">{m.part_of_speech}</span>:{" "}
                    {m.meaning}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {!submitted && (
          <Button
            text="Submit"
            onClick={() => {
              setSubmitted(true);
            }}
          />
        )}

        {submitted && (
          <div>
            <Button text="Next question" onClick={() => reset()} />

            <div className="mt-2 p-2 border rounded bg-gray-50">
              <div className={getFillWordClass()}>Your answer: {fillWord}</div>
              <div>Correct answer: {data.word}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
