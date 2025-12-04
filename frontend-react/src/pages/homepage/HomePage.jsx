import { useEffect, useState } from "react";
import { getTranslation as _getTranslation } from "../../utils/getTranslation";
import { translation } from "./HomePage.Translation";
import { WordOfTheDay } from "./WordOfTheDay";
import { Card } from "../../components/Card";

const getTranslation = (key) => _getTranslation(key, translation);

export function HomePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/homepage");
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  if (!data) {
    return <div className="p-6 text-center">{getTranslation("Loading")}</div>;
  }

  const {
    overview,
    latestWords,
    latestExamples,
    latestPhrases,
    latestIdioms,
    latestWriting,
  } = data;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* WordOfTheDay */}
      <WordOfTheDay />

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {[
          { label: getTranslation("Words"), value: overview.total_words },
          { label: getTranslation("Meanings"), value: overview.total_meanings },
          { label: getTranslation("Examples"), value: overview.total_examples },
          { label: getTranslation("Phrases"), value: overview.total_phrases },
          { label: getTranslation("Idioms"), value: overview.total_idioms },
          {
            label: getTranslation("WritingQuestions"),
            value: overview.total_writing_questions,
          },
        ].map((card) => (
          <Card key={card.label} className="">
            <p className="text-gray-500">{card.label}</p>
            <p className="text-2xl font-bold">{card.value}</p>
          </Card>
        ))}
      </div>

      {/* Latest Words Table */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-3">
          {getTranslation("LatestWords")}
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">
                  {getTranslation("Word")}
                </th>
                <th className="px-4 py-2 text-left text-gray-600">
                  {getTranslation("Meaning")}
                </th>
                <th className="px-4 py-2 text-left text-gray-600">
                  {getTranslation("PartOfSpeech")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {latestWords.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{item.word}</td>
                  <td className="px-4 py-2">{item.meaning}</td>
                  <td className="px-4 py-2">{item.part_of_speech}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Latest Examples */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-3">
          {getTranslation("LatestExamples")}
        </h2>
        <ul className="space-y-2">
          {latestExamples.map((ex, idx) => (
            <li key={idx} className="p-2 border rounded hover:bg-gray-50">
              <span className="font-semibold">{ex.word}</span> (
              {ex.part_of_speech}): {ex.example}
            </li>
          ))}
        </ul>
      </Card>

      {/* Latest Phrases */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-3">
          {getTranslation("LatestPhrases")}
        </h2>
        <ul className="space-y-2">
          {latestPhrases.map((p, idx) => (
            <li key={idx} className="p-2 border rounded hover:bg-gray-50">
              <p className="font-semibold">{p.phrase}</p>
              <p>{p.meaning}</p>
              {p.example && <p className="text-gray-500 italic">{p.example}</p>}
            </li>
          ))}
        </ul>
      </Card>

      {/* Latest Idioms */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-3">
          {getTranslation("LatestIdioms")}
        </h2>
        <ul className="space-y-2">
          {latestIdioms.map((i, idx) => (
            <li key={idx} className="p-2 border rounded hover:bg-gray-50">
              <p className="font-semibold">{i.idiom}</p>
              <p>{i.meaning}</p>
              {i.example && <p className="text-gray-500 italic">{i.example}</p>}
            </li>
          ))}
        </ul>
      </Card>

      {/* Latest Writing Questions */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-3">
          {getTranslation("LatestWritingQuestions")}
        </h2>
        <ul className="space-y-2">
          {latestWriting.map((w, idx) => (
            <li key={idx} className="p-2 border rounded hover:bg-gray-50">
              <p className="font-semibold">
                {getTranslation("Q")}: {w.question}
              </p>
              {w.answer && (
                <p className="text-gray-700">
                  {getTranslation("A")}: {w.answer}
                </p>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
