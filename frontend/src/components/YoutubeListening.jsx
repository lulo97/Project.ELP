import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { MultipleChoiceTemplate } from "../pages/exercise/MultipleChoiceTemplate";

export function YoutubeListening() {
  const [youtubeId, setYoutubeId] = useState("");
  const [questionNumber, setQuestionNumber] = useState("");
  const [transcripts, setTranscripts] = useState([
    { time: "00:01", text: "Hello and welcome to this video." },
    { time: "00:05", text: "Today we will learn something new." },
    { time: "00:10", text: "Let's start with an example." },
  ]);
  const [mcqs, setMcqs] = useState([
    {
      question: "Sample Question 1",
      choices: ["A", "B", "C", "D"],
      correct_answer: "A",
    },
  ]);

  const handleYoutubeSubmit = () => {
    console.log("Youtube ID submitted:", youtubeId);
  };

  const handleGenerateQuestion = () => {
    console.log("Generate question number:", questionNumber);
  };

  const handleMCQSubmit = () => {
    console.log("MCQ submitted:", questions);
  };

  return (
    <div className="min-h-[90vh] flex flex-col p-4 gap-4 bg-gray-50">
      {/* Top Layout */}
      <div className="flex gap-2">
        <Input className="w-full" />
        <Button text={"Submit"} />
      </div>

      {/* Bottom Layout */}
      <div className="flex flex-1 gap-4">
        {/* Left Side */}
        <div className="flex-1 flex flex-col border rounded p-2 bg-white">
          <audio controls className="mb-2 w-full">
            <source src="sample-audio.mp3" type="audio/mp3" />
          </audio>
          <div className="flex-1 overflow-y-auto border-t pt-2">
            {transcripts.map((t, index) => (
              <div key={index} className="flex gap-2 border-b py-1 items-start">
                <div className="text-gray-500 w-16">{t.time}</div>
                <div>{t.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col border rounded p-2 bg-white">
          <div className="flex gap-2 mb-2">
            <Input className="w-full" />
            <Button text={"Generate"} />
          </div>

          <div className="flex-1 overflow-y-auto border-t pt-2 mb-2">
            {mcqs.map((mcq, idx) => (
              <MultipleChoiceTemplate
                key={idx}
                question={mcq.question}
                correct_answer={mcq.correct_answer}
                choices={mcq.choices}
                onNext={null}
              />
            ))}
          </div>

          <Button className="w-full" text={"Submit"} />
        </div>
      </div>
    </div>
  );
}
