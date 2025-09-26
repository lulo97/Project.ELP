import { useState } from "react";
import { Textarea } from "../../components/Textarea";
import { Button } from "../../components/Button";
import { getGrammar } from "../../services/grammar";

export function Grammar() {
  const [text, setText] = useState("");
  const [textCorrected, setTextCorrected] = useState("");

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
          text="Check grammar"
          onClick={async () => {
            const result = await getGrammar({ text });
            console.log(result);
            setTextCorrected(result.data.correct_text);
          }}
        />
      </div>

      {textCorrected && (
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
