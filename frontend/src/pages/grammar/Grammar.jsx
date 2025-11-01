import { useState } from "react";
import { Textarea } from "../../components/Textarea";
import { Button } from "../../components/Button";
import { callAI } from "../../services/ai";

export function Grammar() {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  async function handleCheckGrammar() {
    setLoading(true);
    setErrorMsg(null);
    setResults([]);

    try {
      const result = await callAI({ feature: "GRAMMAR", input: { text } });
      console.log(result);

      if (result.error) {
        setErrorMsg("An error occurred while checking grammar.");
      } else if (Array.isArray(result.data)) {
        setResults(result.data);
      } else {
        setErrorMsg("Unexpected response format.");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Grammar Checker</h1>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text here..."
        className="w-full h-32 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
      />

      <div className="flex justify-end mt-4">
        <Button
          text={loading ? "Checking..." : "Check Grammar"}
          onClick={handleCheckGrammar}
          disabled={loading || !text.trim()}
        />
      </div>

      {loading && (
        <p className="mt-3 text-gray-600 italic">Checking grammar...</p>
      )}

      {errorMsg && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {errorMsg}
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="mt-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Grammar Check Results
          </h2>

          {results.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm"
            >
              <p className="text-sm text-gray-600 mb-1">
                <strong>Original:</strong> {item.sentence}
              </p>
              <p className="text-sm text-green-700 mb-3">
                <strong>Corrected:</strong> {item.corrected}
              </p>

              {item.explanations && item.explanations.length > 0 && (
                <div>
                  <p className="font-medium text-gray-800 mb-1">
                    Explanations:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {item.explanations.map((exp, i) => (
                      <li key={i}>{exp}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
