import { PageTitle } from "../../components/PageTitle";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { getTranscript } from "../../services/youtube";
import { message } from "../../providers/MessageProvider";
import { EMPTY_STATE } from "./YoutubeListening";

export function TopLayout({ state, setState }) {

  async function handleYoutubeSubmit() {
    const transript_result = await getTranscript(state.youtube_id);

    if (transript_result.error) {
      message({ type: "error", text: transript_result.error });
      return;
    }

    setState({ ...EMPTY_STATE, transcripts: transript_result.data });
  }

  return (
    <div>
      <PageTitle title={"Youtube listening"} />

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
        <Button text={"Submit"} onClick={handleYoutubeSubmit} />
      </div>
    </div>
  );
}
