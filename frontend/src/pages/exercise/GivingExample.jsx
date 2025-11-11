import React, { useEffect, useState } from "react";
import { getAllWordDetails } from "../../services/word_detail";
import { addExample } from "../../services/example";
import { Button } from "../../components/Button";
import { getTranslation as _getTranslation } from "../../utils/getTranslation";
import { translation } from "./Exercise.Translation";

const getTranslation = (key) =>
  _getTranslation(key, translation, "GivingExample");

const EMPTY_STATE = {
  word: "linguistic",
  pos_id: "adjective",
  pos_name: "Adjective",
  meaning: "Liên quan tới ngôn ngữ học",
  examples: ["Linguistic evidence suggests the two languages are related"],
};

export function GivingExample({ reset } = {}) {
  //{"word":"linguistic","pos_id":"adjective","pos_name":"Adjective","meaning":"Liên quan tới ngôn ngữ học","examples":"[\"Linguistic evidence suggests the two languages are related\"]"}
  const [wordDetail, setWordDetail] = useState(EMPTY_STATE);
  const [input, setInput] = useState("");

  async function fetchWordDetail() {
    const result = await getAllWordDetails();

    const data = result.data;

    const word_detail = data[Math.floor(Math.random() * data.length)];

    setWordDetail({ ...word_detail });
  }

  useEffect(() => {
    fetchWordDetail();
  }, []);

  async function handleSubmit(e) {
    e?.preventDefault();
    if (!input.trim()) return;

    const body = {
      word: wordDetail.word,
      part_of_speech: wordDetail.pos_id,
      example: input,
    };

    const result = await addExample({ row: body });

    if (result.error) {
      console.error(result.error);
      return;
    }

    reset();
  }

  if (!wordDetail) return <div>Loading...</div>;

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-2">{getTranslation("Title")}</h1>

      {/* Input card (top) */}
      <form onSubmit={handleSubmit} className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {getTranslation("Label")}
        </label>
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={getTranslation("Placeholder").replace(
              "{word}",
              wordDetail.word
            )}
            className="flex-1 rounded-md border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            aria-label="example-input"
          />
          <Button text={getTranslation("Submit")} type="submit" />
        </div>{" "}
      </form>

      {/* Word detail card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-md">
        {/* Word and part of speech */}
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-indigo-50 rounded-md px-3 py-2">
            <span className="text-indigo-600 font-semibold text-xl">
              {wordDetail.word}
            </span>
          </div>
          <span className="text-xs px-2 py-1 rounded-full border bg-slate-100 text-slate-500">
            {wordDetail.pos_name || wordDetail.pos_id}
          </span>
        </div>

        {/* Meaning */}
        <p className="text-slate-700 mb-4">{wordDetail.meaning}</p>

        {/* Examples */}
        <h4 className="text-sm font-medium text-slate-600 mb-2">
          {getTranslation("Examples")}
        </h4>
        {wordDetail.examples && wordDetail.examples.length ? (
          <div className="space-y-2">
            {wordDetail.examples.map((ex, i) => (
              <div
                key={i}
                className="bg-slate-50 border border-slate-100 rounded-md p-2 text-sm text-slate-700"
              >
                {ex}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-slate-500">
            {getTranslation("NoExamples")}
          </div>
        )}
      </div>
    </div>
  );
}
