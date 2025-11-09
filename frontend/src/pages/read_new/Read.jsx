import { useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { getReadData } from "../../services/read";
import { message } from "../../providers/MessageProvider";
import { ClickableWordParagraph } from "../read_new/ClickableWordParagraph";
import { PageTitle } from "../../components/PageTitle";
import { Button } from "../../components/Button";
import { addSourceTranslates } from "../../services/source_translates";

export const EMPTY_STATE = {
  words: [],
  idioms: [],
  phrases: [],
  meanings: [],
  source_translates: [],
  source_row: {
    id: null,
    source: null,
    name: null,
    user_id: null,
  },
  current_word: null,
  open_popup: false,
  chunks_original: [],
  chunks: [],
};

export function Read() {
  const source_id = new URLSearchParams(useLocation().search).get("source_id");

  const [state, setState] = useState(EMPTY_STATE);

  async function fetchData() {
    const result = await getReadData({ source_id: source_id });

    if (result.error) message({ type: "error", text: result.error });

    setState((state) => {
      return {
        ...state,
        ...result.data,
      };
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!state.source_row.id) return <div>Loading...</div>;

  function isChunksEdit() {
    const string_original_chunks = JSON.stringify(state.chunks_original.toSorted());
    const string_chunks = JSON.stringify(state.chunks.toSorted());
    return string_original_chunks == string_chunks;
  }

  const saveTranslateButtonDisable = isChunksEdit();

  return (
    <div className="p-4 min-h-[90vh]">
      <div className="flex justify-between mb-4">
        <PageTitle title={`Title: ${state.source_row.name}`} />
        {!saveTranslateButtonDisable && (
          <div className="fixed top-[60px] right-0 p-4 z-10">
            <Button
              className="opacity-75"
              text={"Save translate"}
              onClick={async () => {
                const body = {
                  source_id: currentSource.id,
                  chunks: state.chunks
                    .filter((ele) => ele.translate)
                    .map((ele) => ({
                      chunk: ele.chunk,
                      translate: ele.translate,
                    })),
                };

                await addSourceTranslates({ body: body });
                await fetchData();
              }}
            />
          </div>
        )}
      </div>

      <ClickableWordParagraph state={state} setState={setState} />
    </div>
  );
}
