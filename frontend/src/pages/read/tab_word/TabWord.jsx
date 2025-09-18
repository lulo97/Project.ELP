import { Button } from "../../../components/Button";
import { PopupField } from "../../../components/PopupField";
import { useEffect, useState } from "react";

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
  }

  function getButtonAddDisabled() {
    if (!wordData) return false;
    if (Object.keys(wordData).length > 0) return true;
    return false;
  }

  return (
    <div style={{ flexGrow: "1" }}>
      <Button
        disabled={addButtonDisabled}
        text={"Add"}
        onClick={() => handleAdd()}
        className="mb-4"
      />

      <PopupField
        label="Word"
        fieldComponent={<input disabled value={word} />}
      />
    </div>
  );
}
