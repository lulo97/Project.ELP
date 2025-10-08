import React, { useEffect, useState } from "react";
import { getAllWordDetails } from "../../services/word_detail";
import { addExample } from "../../services/example";

export function GivingExample({ reset } = {}) {
  //{"word":"linguistic","pos_id":"adjective","pos_name":"Adjective","meaning":"Liên quan tới ngôn ngữ học","examples":"[\"Linguistic evidence suggests the two languages are related\"]"}
  const [wordDetail, setWordDetail] = useState(null);
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

  if (!wordDetail) return <div>Loading...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Giving Example</h1>
      </div>

      {/* Input card (top) */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Your example
          </label>
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Type an example for "${
                wordDetail?.word || "word"
              }"...`}
              className="flex-1 rounded-md border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              aria-label="example-input"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              {"Submit"}
            </button>
          </div>{" "}
        </div>
      </form>

      {/* Word detail card (simple transition via Tailwind) */}
      <div
        className={`bg-white border border-slate-200 rounded-2xl p-6 shadow-md transition-opacity duration-300 ${"opacity-100"}`}
      >
        <div className="md:col-span-2">
          <div className="flex items-start gap-4">
            <div className="rounded-md bg-indigo-50 p-3">
              <span className="text-indigo-600 font-semibold text-xl">
                {wordDetail.word}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Part of speech</span>
                <span className="px-2 py-1 text-xs rounded-full border bg-slate-100">
                  {wordDetail.pos_name || wordDetail.pos_id}
                </span>
              </div>
              <p className="mt-3 text-slate-700">{wordDetail.meaning}</p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-slate-600 mb-3">
              Examples
            </h4>
            <div className="space-y-3">
              {wordDetail.examples && wordDetail.examples.length ? (
                wordDetail.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-md p-3 border border-slate-100 bg-slate-50"
                  >
                    <div className="text-sm text-slate-700">{ex}</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-slate-500">
                  No examples yet — be the first to add one!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
