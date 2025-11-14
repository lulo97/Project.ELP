import { useState } from "react";
import { TopLayout } from "./TopLayout";
import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";

export const EMPTY_STATE = {
  youtube_id: "NcsGpDFKCgY",
  total_question: 3,
  //[{ text, start, end }]
  transcripts: [],
  //[{ question, choices, correct_answer }]
  mcqs: [],
  //[{context, word}]
  fill_in_blanks: [],
  submitted: false,
  show_transcript: false,
  loading: false,
  current_second: 0,
};

export function YoutubeListening() {
  const [state, setState] = useState(EMPTY_STATE);

  return (
    <div className="h-[90vh] flex flex-col p-4 gap-4 bg-gray-100">
      <TopLayout state={state} setState={setState} />

      <div className="flex flex-1 gap-4 min-h-0">
        <LeftSide state={state} setState={setState} />
        <RightSide state={state} setState={setState} />
      </div>
    </div>
  );
}
