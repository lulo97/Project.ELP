import { useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { getReadData } from "../../services/read";
import { message } from "../../providers/MessageProvider";
import { ClickableWordParagraph } from "../read/ClickableWordParagraph";
import { PageTitle } from "../../components/PageTitle";
import { Button } from "../../components/Button";
import { addSourceTranslates } from "../../services/source_translates";
import { TranslateDetail } from "./TranslateDetail";
import { Popup } from "./Popup";
import { getTranslation as _getTranslation } from "../../utils/getTranslation";
import { translation } from "./Read.Translate";

const getTranslation = (key) => _getTranslation(key, translation);

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
  word_row: {
    id: null,
    word: null,
    user_id: null,
  },
  open_popup: false,
  original_chunks: [],
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

  function isChunksEdit() {
    const string_original_chunks = JSON.stringify(
      state.original_chunks.toSorted()
    );
    const string_chunks = JSON.stringify(state.chunks.toSorted());
    return string_original_chunks == string_chunks;
  }

  async function handleSaveChunks() {
    const body = {
      source_id: state.source_row.id,
      chunks: state.chunks
        .filter((ele) => ele.translate)
        .map((ele) => ({
          chunk: ele.chunk,
          translate: ele.translate,
        })),
    };

    await addSourceTranslates({ body: body });
    await fetchData();
  }

  function handleSaveTranslateChunk({ idx, translate }) {
    const new_chunks = [...state.chunks];

    new_chunks[idx] = {
      ...new_chunks[idx],
      translate: translate,
    };

    setState((old_state) => {
      return {
        ...old_state,
        chunks: new_chunks,
      };
    });
  }

  if (!state.source_row.id) return <div>Loading...</div>;

  const title = getTranslation("Title").replace(
    "{name}",
    state.source_row.name
  );

  return (
    <div className="p-4 min-h-[90vh]">
      <div className="flex justify-between mb-4">
        <PageTitle title={title} />
        {!isChunksEdit() && (
          <div className="fixed top-[60px] right-0 p-4 z-10">
            <Button
              className="opacity-75"
              text={getTranslation("SaveTranslate")}
              onClick={handleSaveChunks}
            />
          </div>
        )}
      </div>

      {state.chunks.map((ele, idx) => {
        return (
          <div key={idx}>
            <ClickableWordParagraph
              chunk={ele.chunk}
              state={state}
              setState={setState}
            />
            <TranslateDetail
              translate={ele.translate}
              idx={idx}
              handleSaveTranslateChunk={handleSaveTranslateChunk}
            />
            <br />
          </div>
        );
      })}

      {state.open_popup && (
        <Popup state={state} setState={setState} fetchData={fetchData} />
      )}
    </div>
  );
}
