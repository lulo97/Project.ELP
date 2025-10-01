import { useState } from "react";
import { Textarea } from "../../components/Textarea";
import { Button } from "../../components/Button";
import { getGrammar } from "../../services/grammar";

export function Grammar() {
  const [text, setText] = useState("");
  const [textCorrected, setTextCorrected] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCheckGrammar() {
    setLoading(true);
    try {
      const result = await getGrammar({ text });
      console.log(result);
      setTextCorrected(result.data.correct_text);
    } catch (error) {
      console.error(error);
      // optionally show error to user
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Grammar Checker</h1>

      <Textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Type or paste text here..."
        className="w-full h-28"
      />

      <div className="flex justify-end mt-4">
        <Button
          text={loading ? "Checking..." : "Check grammar"}
          onClick={handleCheckGrammar}
          disabled={loading}
        />
      </div>

      {loading && (
        <p className="mt-2 text-gray-600 italic">Loading, please wait...</p>
      )}

      {textCorrected && !loading && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <h2 className="text-lg font-semibold text-green-800 mb-2">
            Corrected Text
          </h2>
          <p className="text-gray-800 whitespace-pre-wrap">{textCorrected}</p>
        </div>
      )}
    </div>
  );
}
