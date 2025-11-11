import { Button } from "../../../components/Button";
import { CommonAudio } from "../../../components/CommonAudio";
import { PopupField } from "../../../components/PopupField";
import { useEffect, useState } from "react";
import { message } from "../../../providers/MessageProvider";
import { EMPTY_STATE } from "../Read";
import { addWord } from "../../../services/word";
import { getTranslation } from "../../../utils/getTranslation";
import { translation } from "../Read.Translate";

export function TabWord({
  state = EMPTY_STATE,
  fetchWord = () => {},
}) {
  async function handleAdd() {
    const row = { word: state.word_row.word };
    const result = await addWord({ row: row })
    if (result.error) {
      message({ type: "error", text: result.error });
      return;
    }

    fetchWord();

    message({
      text: getTranslation("Success"),
    });
  }

  return (
    <div style={{ flexGrow: "1" }}>
      <div className="flex gap-4">
        <Button
          disabled={!!state.word_row.id}
          text={getTranslation("AddWord", translation)}
          onClick={handleAdd}
          className="mb-4"
        />

        <CommonAudio text={state.word_row.word} />
      </div>

      <PopupField
        label={getTranslation("Word", translation)}
        fieldComponent={<input disabled value={state.word_row.word} />}
      />
    </div>
  );
}
