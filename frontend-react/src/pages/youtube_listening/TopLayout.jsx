import { PageTitle } from "../../components/PageTitle";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { getTranscript } from "../../services/youtube";
import { getAudio } from "../../services/youtube";
import { message } from "../../providers/MessageProvider";
import { EMPTY_STATE } from "./YoutubeListening";
import { toMinutesSeconds } from "../../utils/convertTime";

export function TopLayout({ state, setState }) {
  async function handleYoutubeSubmit() {
    const transript_result = await getTranscript(state.youtube_id);

    if (transript_result.error) {
      message({ type: "error", text: transript_result.error });
      return;
    }

    const transcripts = transript_result.data.map((ele) => {
      return {
        ...ele,
        start: toMinutesSeconds(ele.start),
        end: toMinutesSeconds(ele.end),
      };
    });

    const audio_result = await getAudio(state.youtube_id);

    if (audio_result.error) {
      message({ type: "error", text: audio_result.error });
      return;
    }

    //Replace .mp3 to ""
    const file_name = audio_result.data.file_name.replace(
      "." + audio_result.data.format,
      ""
    );

    const old_state = { ...state };

    setState({
      ...EMPTY_STATE,
      youtube_id: old_state.youtube_id,
      transcripts: transcripts,
      file_name: file_name,
    });
  }

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title={"Youtube listening"} />

        <Button
          className="py-1 h-fit"
          text={"Existing audios"}
          onClick={() => {
            setState((old_state) => ({
              ...old_state,
              openPopup: true,
            }));
          }}
        />
      </div>

      <div className="flex gap-2 bg-white border border-gray-300 rounded p-2 shadow-md">
        <Input
          label={"https://www.youtube.com/watch?v="}
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
        <Button
          className="min-w-28"
          text={"Submit"}
          onClick={handleYoutubeSubmit}
        />
        <Button
          className="min-w-28"
          text={"Reset"}
          onClick={() => {
            setState(EMPTY_STATE);
          }}
        />
      </div>
    </div>
  );
}
