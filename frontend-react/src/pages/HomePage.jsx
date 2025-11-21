import { useEffect, useState } from "react";

export function HomePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/homepage"); // match your API endpoint
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  if (!data) return <div className="p-6 text-center">Loading...</div>;

  const { overview, latestWords, latestExamples, latestPhrases, latestIdioms, latestWriting } = data;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Words", value: overview.total_words },
          { label: "Meanings", value: overview.total_meanings },
          { label: "Examples", value: overview.total_examples },
          { label: "Phrases", value: overview.total_phrases },
          { label: "Idioms", value: overview.total_idioms },
          { label: "Writing Questions", value: overview.total_writing_questions },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
          >
            <p className="text-gray-500">{card.label}</p>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Latest Words Table */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Latest Words</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Word</th>
                <th className="px-4 py-2 text-left text-gray-600">Meaning</th>
                <th className="px-4 py-2 text-left text-gray-600">Part of Speech</th>
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
      </div>

      {/* Latest Examples */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Latest Examples</h2>
        <ul className="space-y-2">
          {latestExamples.map((ex, idx) => (
            <li key={idx} className="p-2 border rounded hover:bg-gray-50">
              <span className="font-semibold">{ex.word}</span> ({ex.part_of_speech}): {ex.example}
            </li>
          ))}
        </ul>
      </div>

      {/* Latest Phrases */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Latest Phrases</h2>
        <ul className="space-y-2">
          {latestPhrases.map((p, idx) => (
            <li key={idx} className="p-2 border rounded hover:bg-gray-50">
              <p className="font-semibold">{p.phrase}</p>
              <p>{p.meaning}</p>
              {p.example && <p className="text-gray-500 italic">{p.example}</p>}
            </li>
          ))}
        </ul>
      </div>

      {/* Latest Idioms */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Latest Idioms</h2>
        <ul className="space-y-2">
          {latestIdioms.map((i, idx) => (
            <li key={idx} className="p-2 border rounded hover:bg-gray-50">
              <p className="font-semibold">{i.idiom}</p>
              <p>{i.meaning}</p>
              {i.example && <p className="text-gray-500 italic">{i.example}</p>}
            </li>
          ))}
        </ul>
      </div>

      {/* Latest Writing Questions */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Latest Writing Questions</h2>
        <ul className="space-y-2">
          {latestWriting.map((w, idx) => (
            <li key={idx} className="p-2 border rounded hover:bg-gray-50">
              <p className="font-semibold">Q: {w.question}</p>
              {w.answer && <p className="text-gray-700">A: {w.answer}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
