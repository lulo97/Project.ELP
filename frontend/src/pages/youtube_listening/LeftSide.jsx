import { Button } from "../../components/Button";
import { toSeconds } from "../../utils/convertTime";

export function LeftSide({ state, setState }) {
  return (
    <div className="flex-1 flex flex-col border border-gray-300 rounded p-2 bg-white shadow-md h-full">
      <div className="flex items-center gap-2 mb-2">
        <audio
          key={state.file_name}
          controls
          className="flex-shrink-0 flex-1 h-10"
          src={
            state.file_name
              ? `/api/youtube/stream_audio?video_id=${state.file_name}`
              : ""
          }
          onError={() => console.error("Audio failed to load.")}
          onTimeUpdate={(e) => {
            const current_second = e.target.currentTime;
            setState((old_state) => {
              return {
                ...old_state,
                current_second: current_second,
              };
            });
          }}
        ></audio>
        <Button
          className="py-2 min-w-28"
          text={state.show_transcript ? "Hide" : "Show"}
          onClick={() => {
            setState((old_state) => {
              return {
                ...old_state,
                show_transcript: !state.show_transcript,
              };
            });
          }}
        />
      </div>

      {/* grid-cols-[auto_1fr] = setting for 2 column:
          First column: auto fit widest child 
          Second column: 1fr = fit remaining space
      */}
      <div
        className={`${
          !state.show_transcript && state.transcripts.length != 0
            ? "blur-sm"
            : ""
        } flex-1 overflow-y-auto border-t pt-2 grid grid-cols-[auto_1fr] gap-2`}
      >
        {state.transcripts.length == 0 && <div>No transcript detected!</div>}
        {state.transcripts.map((t, index) => {
          const isActive =
            parseFloat(state.current_second) >= toSeconds(t.start) &&
            parseFloat(state.current_second) <= toSeconds(t.end);

          return (
            <div key={index} className="contents">
              {/* contents = treat children as single row instead of grid items (columns) */}
              <div
                className={`whitespace-nowrap py-1 border-b text-sm flex-shrink-0 ${
                  isActive ? "font-bold text-blue-500" : "text-gray-500"
                }`}
              >
                {`${t.start} - ${t.end}`}
              </div>
              <div
                className={`py-1 border-b text-sm min-w-0 ${
                  isActive ? "font-bold text-blue-500" : ""
                }`}
              >
                {t.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
