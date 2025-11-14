import { Button } from "../../components/Button";

export function LeftSide({ state, setState }) {
  return (
    <div className="flex-1 flex flex-col border border-gray-300 rounded p-2 bg-white shadow-md h-full">
      <div className="flex items-center gap-2 mb-2">
        <audio
          controls
          className="flex-shrink-0 flex-1 h-10"
          src={
            state.youtube_id
              ? `/api/youtube/stream_audio?video_id=${state.youtube_id}`
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
          className="py-2"
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
          !state.show_transcript ? "blur-sm" : ""
        } flex-1 overflow-y-auto border-t pt-2 grid grid-cols-[auto_1fr] gap-2`}
      >
        {state.transcripts.map((t, index) => {
          const isActive =
            state.current_second >= parseFloat(t.start) &&
            state.current_second <= parseFloat(t.end);

          return (
            <div key={index} className="contents">
              {/* contents = treat children as single row instead of grid items (columns) */}
              <div
                className={`whitespace-nowrap py-1 border-b text-sm flex-shrink-0 ${
                  isActive ? "font-bold text-blue-500" : "text-gray-500"
                }`}
              >
                {parseFloat(t.start).toFixed(2)} -{" "}
                {parseFloat(t.end).toFixed(2)}
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
