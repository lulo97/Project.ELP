import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { MultipleChoiceTemplate } from "../pages/exercise/MultipleChoiceTemplate";
import { PageTitle } from "./PageTitle";
import { getTranscript } from "../services/youtube";
import { message } from "../providers/MessageProvider";
import { callAI } from "../services/ai";
import { combineTextsByMinWords } from "../utils/combineTextsByMinWords";
import { FillInBankTemplate } from "../pages/exercise/FillInBankTemplate";
import { selectRandomIncreasing } from "../utils/selectRandomIncreasing";

const EMPTY_STATE = {
  youtube_id: "NcsGpDFKCgY",
  total_question: 3,
  //[{ text, start, end }]
  transcripts: [],
  //[{ question, choices, correct_answer }]
  mcqs: [],
  //[{context, word}]
  fill_in_blanks: [
    {
      context: "The sun rises in the east.",
      word: "east",
      input_word: "west",
    },
  ],
  submitted: false,
  show_transcript: false,
};

export function YoutubeListening() {
  const [state, setState] = useState(EMPTY_STATE);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    const transript_result = await getTranscript(state.youtube_id);

    if (transript_result.error) {
      message({ type: "error", text: transript_result.error });
      return;
    }

    const new_state = {
      ...EMPTY_STATE,
      transcripts: transript_result.data,
    };

    setState(new_state);
  }

  const handleYoutubeSubmit = async () => {
    await fetchData();
  };

  const handleGenerateQuestion = async () => {
    if (state.transcripts.length === 0 || !state.total_question) return;

    setLoading(true);

    let contexts = combineTextsByMinWords(
      state.transcripts.map((ele) => ele.text)
    );

    contexts = selectRandomIncreasing(contexts, state.total_question);

    const new_fill_in_blanks = [];

    for (const [i, context] of contexts.entries()) {
      const result = await callAI({
        input: { context },
        feature: "FILL_IN_BLANK",
        event_id: null,
      });

      if (!result.error) {
        const question = {
          context: result.data.context,
          word: result.data.word,
          input_word: result.data.input_word,
        };

        new_fill_in_blanks.push(question);

        setState((prev) => ({
          ...prev,
          fill_in_blanks: [...new_fill_in_blanks],
        }));
      }
    }

    setLoading(false);
  };

  const handleSubmit = () => {
    setState((old_state) => {
      return {
        ...old_state,
        submitted: true,
      };
    });
  };

  function handleReset() {
    setState((old_state) => {
      return {
        ...old_state,
        submitted: false,
      };
    });
  }

  return (
    <div className="h-[90vh] flex flex-col p-4 gap-4 bg-gray-100">
      {/* Top Layout */}
      <div>
        <PageTitle title={"Youtube listening"} />

        <div className="flex gap-2 bg-white border border-gray-300 rounded p-2 bg-white shadow-md">
          <Input
            label={"Youtube Id"}
            placeholder={"Input the youtube id..."}
            value={state.youtube_id}
            className="w-full"
            onChange={(event) => {
              setState((old_state) => {
                return {
                  ...old_state,
                  youtube_id: event.target.value,
                };
              });
            }}
          />
          <Button text={"Submit"} onClick={handleYoutubeSubmit} />
        </div>
      </div>

      {/* Bottom Layout */}
      {/* 
        min-h-0 = Override flex's default css: min-height: auto
        Preventing a child with flex-1 try to fit its content when data is big
      */}
      <div className="flex flex-1 gap-4 min-h-0">
        {/* Left Side */}
        <div className="flex-1 flex flex-col border border-gray-300 rounded p-2 bg-white shadow-md">
          <div className="flex items-center gap-2">
            <audio
              controls
              className="flex-shrink-0 flex-1 h-10"
              src={
                state.youtube_id
                  ? `/api/youtube/stream_audio?video_id=${state.youtube_id}`
                  : ""
              }
              onError={() => {
                console.error("Audio failed to load.");
              }}
            ></audio>
            <Button
              className="py-2"
              text={state.show_transcript ? "Hide" : "Show"}
              onClick={() => {
                const new_state = {
                  ...state,
                  show_transcript: !state.show_transcript,
                };
                setState(new_state);
              }}
            />
          </div>

          {/* grid-cols-[auto_1fr] = setting for 2 column:
            First column: auto fit widest child 
            Second column: 1fr = fit remaining space
          */}
          <div
            className={`${
              !state.show_transcript ? "blur-sm" : ""
            } flex-1 overflow-y-auto border-t pt-2 grid grid-cols-[auto_1fr] gap-2`}
          >
            {state.transcripts.map((t, index) => (
              <div key={index} className="contents">
                {/* contents = treat children as single row instead of grid items (columns) */}
                <div className="text-gray-500 whitespace-nowrap py-1 border-b text-sm flex-shrink-0">
                  {parseFloat(t.start).toFixed(2)} -{" "}
                  {parseFloat(t.end).toFixed(2)}
                </div>
                <div className="py-1 border-b text-sm min-w-0">{t.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col border border-gray-300 rounded p-2 bg-white shadow-md">
          <div className="flex gap-2 mb-2">
            <Input
              label={"Total question"}
              value={state.total_question}
              placeholder={"Input number of question..."}
              className="w-full"
              onChange={(event) => {
                setState((old_state) => {
                  return {
                    ...old_state,
                    total_question: event.target.value,
                  };
                });
              }}
            />
            <Button
              text={loading ? "Generate..." : "Generate"}
              onClick={handleGenerateQuestion}
              disabled={loading}
            />
          </div>

          <div className="flex-1 overflow-y-auto border-t pt-2 mb-2">
            {/* Fill in blanks */}
            {state.fill_in_blanks.map((ele, idx) => {
              return (
                <div className="mb-4">
                  <FillInBankTemplate
                    className="inline-block"
                    context={ele.context}
                    word={ele.word}
                    input_word={ele.input_word}
                    setInputWord={(value) => {
                      const new_fill_in_blanks = [...state.fill_in_blanks];
                      new_fill_in_blanks[idx].input_word = value;
                      setState({
                        ...state,
                        fill_in_blanks: new_fill_in_blanks,
                      });
                    }}
                    submitted={state.submitted}
                    action_button={null}
                    size="small"
                    prefix={
                      <span className="font-bold">{`Q${idx + 1}:`}&nbsp;</span>
                    }
                    postfix={
                      state.submitted ? (
                        <span className="font-bold text-green-500">
                          &nbsp;({ele.word})
                        </span>
                      ) : null
                    }
                  />
                </div>
              );
            })}
          </div>

          {!state.submitted && (
            <Button className="w-full" text={"Submit"} onClick={handleSubmit} />
          )}

          {state.submitted && (
            <Button className="w-full" text={"Reset"} onClick={handleReset} />
          )}
        </div>
      </div>
    </div>
  );
}
