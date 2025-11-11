import { useEffect, useState } from "react";
import { getFillInBlank } from "../../services/exercise";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { callAI } from "../../services/ai";

/**
 * Hide random characters from a word.
 * @param {string} word - The input word.
 * @param {number} ratio - The fraction of characters to hide (0–1).
 * @param {string} maskChar - The character to use for hiding.
 * @returns {string} The word with some letters hidden.
 */
function hideCharacters(word, ratio = 0.5, maskChar = "_") {
  if (typeof word !== "string" || word.length === 0) return "";

  const hideCount = Math.floor(word.length * ratio);
  const indices = new Set();

  // Pick unique random positions to hide
  while (indices.size < hideCount) {
    indices.add(Math.floor(Math.random() * word.length));
  }

  // Replace selected characters with maskChar
  return word
    .split("")
    .map((ch, i) => (indices.has(i) ? maskChar : ch))
    .join("");
}

export function FillInBank({ reset }) {
  const [data, setData] = useState(null);
  const [fillWord, setFillWord] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const [synonyms, setSynonym] = useState(null);
  const [maskedWord, setMaskedWord] = useState("");

  async function fetchData() {
    const result = await getFillInBlank();
    setData(result.data);
    setFillWord("");
    setSubmitted(false);
    setShowHint(false);

    const synonyms_result = await callAI({
      input: { word: result.data.word },
      feature: "SYNONYMS",
    });

    if (synonyms_result.error) {
      setSynonym("");
      return;
    }

    const synonyms = JSON.parse(synonyms_result.data);

    setSynonym(synonyms);

    const masked = hideCharacters(result.data.word);
    setMaskedWord(masked);
  }

  useEffect(() => {
    fetchData();
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
    <div className="">
      <div className="font-medium text-2xl mb-2">Fill word in blank</div>

      <div className="flex flex-wrap items-baseline leading-relaxed mb-2">
        {data.sentence.split(" ").map((ele, i) => {
          if (ele.toLowerCase().includes(data.word.toLowerCase())) {
            return (
              <Input
                key={i}
                className="mr-1"
                placeholder="Fill in"
                onChange={(e) => setFillWord(e.target.value)}
                disabled={submitted}
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
        <details
          open={showHint}
          onToggle={(e) => setShowHint(e.target.open)}
          className="rounded-md"
        >
          <summary className="cursor-pointer font-medium">
            {showHint ? "Hide Hint" : "Show Hint"}
          </summary>

          <div className="mt-2 p-2 border rounded bg-gray-50">
            {!synonyms ? (
              <div>Loading hint...</div>
            ) : (
              <>
                <div className="font-semibold">Hint for meanings of word:</div>
                <br />
                <div>
                  <span className="italic">Synonyms:</span>{" "}
                  {synonyms.join(", ")}
                </div>
                <br />
                <div>
                  <span className="italic">It looks something like this:</span>{" "}
                  {maskedWord}
                </div>
                <br />
                <span className="italic">Part of speech:</span>
                <ul className="list-disc pl-5">
                  {data.meanings.map((m, i) => (
                    <li key={i}>
                      <span className="italic">{m.part_of_speech}</span>:{" "}
                      {m.meaning}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </details>

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
