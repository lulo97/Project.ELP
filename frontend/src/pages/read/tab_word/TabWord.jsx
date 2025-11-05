import { Button } from "../../../components/Button";
import { CommonAudio } from "../../../components/CommonAudio";
import { PopupField } from "../../../components/PopupField";
import { useEffect, useState } from "react";
import { message } from "../../../providers/MessageProvider";

export function TabWord({ word, wordData, fetchWordData }) {
  const [addButtonDisabled, setAddButtonDisabled] = useState(false);

  useEffect(() => {
    setAddButtonDisabled(getButtonAddDisabled());
  }, wordData);

  async function handleAdd() {
    const result = await fetch("/api/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word: word }),
    });
    fetchWordData();
    message({
      text: "Success!",
    });
  }

  function getButtonAddDisabled() {
    if (!wordData) return false;
    if (Object.keys(wordData).length > 0) return true;
    return false;
  }

  return (
    <div style={{ flexGrow: "1" }}>
      <div className="flex gap-4">
        <Button
          disabled={addButtonDisabled}
          text={"Add"}
          onClick={() => handleAdd()}
          className="mb-4"
        />

        <CommonAudio text={word} />
      </div>

      <PopupField
        label="Word"
        fieldComponent={<input disabled value={word} />}
      />
    </div>
  );
}
