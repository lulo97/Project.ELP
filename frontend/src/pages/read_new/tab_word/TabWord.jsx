import { Button } from "../../../components/Button";
import { CommonAudio } from "../../../components/CommonAudio";
import { PopupField } from "../../../components/PopupField";
import { useEffect, useState } from "react";
import { message } from "../../../providers/MessageProvider";
import { EMPTY_STATE } from "../Read";

export function TabWord({
  state = EMPTY_STATE,
  fetchData = () => {},
}) {
  async function handleAdd() {
    const result = await fetch("/api/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word: state.word_row.word }),
    });

    if (result.error) {
      message({ type: "error", text: result.error });
      return;
    }

    fetchData();

    message({
      text: "Success!",
    });
  }

  return (
    <div style={{ flexGrow: "1" }}>
      <div className="flex gap-4">
        <Button
          disabled={!state.word_row.id}
          text={"Add word"}
          onClick={handleAdd}
          className="mb-4"
        />

        <CommonAudio text={state.word_row.word} />
      </div>

      <PopupField
        label="Word"
        fieldComponent={<input disabled value={state.word_row.word} />}
      />
    </div>
  );
}
