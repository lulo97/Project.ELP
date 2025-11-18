import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { FillInBankTemplate } from "../exercise/FillInBankTemplate";
import { callAI } from "../../services/ai";
import { combineTextsByMinWords } from "../../utils/combineTextsByMinWords";
import { selectRandomIncreasing } from "../../utils/selectRandomIncreasing";
import { message } from "../../providers/MessageProvider";
import { toMinutesSeconds } from "../../utils/convertTime";

export function RightSide({ state, setState }) {
  const handleGenerateQuestion = async () => {
    if (state.transcripts.length === 0) {
      message({ type: "warning", text: "No transcript detected!" });
      return;
    }

    if (!state.total_question) {
      message({ type: "warning", text: "Total question is null!" });
      return;
    }

    setState((old_state) => ({
      ...old_state,
      loading: true,
      submitted: false,
      fill_in_blanks: [],
    }));

    let contexts = combineTextsByMinWords(
      state.transcripts.map((ele) => ele.text)
    );
    contexts = selectRandomIncreasing(contexts, state.total_question);

    const new_fill_in_blanks = [];

    for (const context of contexts) {
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

        let start = null;
        let end = null;

        function normalize(str) {
          return str.toLowerCase().replace(/[^a-z0-9]/g, "");
        }

        const normContext = normalize(context);

        state.transcripts.forEach((ele) => {
          const normText = normalize(ele.text);

          if (normText && normContext.includes(normText)) {
            if (start === null) start = ele.start;
            end = ele.end;
          }
        });

        if (!start || !end) {
          console.error({ state, context, start, end });
          throw Error("Something is wrong here!");
        }

        new_fill_in_blanks.push({
          ...question,
          start: start,
          end: end,
        });
        setState((prev) => ({
          ...prev,
          fill_in_blanks: [...new_fill_in_blanks],
        }));
      }
    }

    setState((old_state) => ({ ...old_state, loading: false }));
  };

  const handleSubmit = () =>
    setState((old_state) => ({ ...old_state, submitted: true }));
  const handleReset = () =>
    setState((old_state) => ({ ...old_state, submitted: false }));

  const request_percent = `Generate... [${(
    (state.fill_in_blanks.length * 100) /
    state.total_question
  ).toFixed(0)}%]`;

  return (
    <div className="flex-1 flex flex-col border border-gray-300 rounded p-2 bg-white shadow-md h-full">
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
          text={state.loading ? request_percent : "Generate"}
          onClick={handleGenerateQuestion}
          disabled={state.loading}
          className={`${
            state.loading ? "min-w-40" : "min-w-28"
          } whitespace-nowrap`}
        />
      </div>

      <div className="flex-1 overflow-y-auto border-t pt-2 mb-2">
        {state.fill_in_blanks.length == 0 && <div>No question generated!</div>}

        {/* Fill in blanks */}
        {state.fill_in_blanks.map((ele, idx) => (
          <div key={idx} className="mb-4">
            <FillInBankTemplate
              className="inline-block"
              context={ele.context}
              word={ele.word}
              input_word={ele.input_word}
              setInputWord={(value) => {
                const new_fill_in_blanks = [...state.fill_in_blanks];
                new_fill_in_blanks[idx].input_word = value;
                setState((old_state) => {
                  return {
                    ...old_state,
                    fill_in_blanks: new_fill_in_blanks,
                  };
                });
              }}
              submitted={state.submitted}
              action_button={null}
              size="small"
              prefix={<span className="font-bold">{`Q${idx + 1}:`}&nbsp;</span>}
              postfix={
                state.submitted ? (
                  <span className="font-bold text-green-500">
                    &nbsp;({ele.word}, {`${ele.start} - ${ele.end}`})
                  </span>
                ) : <span>
                    &nbsp;({`${ele.start} - ${ele.end}`})
                  </span>
              }
            />
          </div>
        ))}
      </div>

      {!state.submitted && (
        <Button className="w-full" text={"Submit"} onClick={handleSubmit} />
      )}
      {state.submitted && (
        <Button className="w-full" text={"Reset"} onClick={handleReset} />
      )}
    </div>
  );
}
