import { useEffect, useState } from "react";
import { Table } from "../../../components/Table";
import { Popup } from "./Popup";
import {
  addExample,
  deleteExample,
  updateExample,
} from "../../../services/example";

export function Example({ word, existingRows, fetchExistingRows, partOfSpeechs }) {
  const EMPTY_ROW = { id: "", example: "", word: word, part_of_speech: "noun" };

  const [currentRow, setCurrentRow] = useState(EMPTY_ROW);
  const [showPopup, setShowPopup] = useState(false);
  const [action, setAction] = useState("ADD");

  function openPopup({ currentRow, action }) {
    setCurrentRow(currentRow);
    setShowPopup(true);
    setAction(action);
  }

  async function handleConfirm({ action }) {
    if (action == "ADD") {
      await addExample({ row: currentRow });
    }

    if (action == "EDIT") {
      await updateExample({ row: currentRow });
    }

    if (action == "DELETE") {
      await deleteExample({ row: currentRow });
    }

    fetchExistingRows();
    setShowPopup(false);
  }

  function handleClose() {
    setCurrentRow(currentRow);
    setShowPopup(false);
  }

  return (
    <div>
      <button
        onClick={() => openPopup({ currentRow: EMPTY_ROW, action: "ADD" })}
      >
        Add
      </button>
      <Table
        columns={[
          { id: "id", name: "Id" },
          { id: "example", name: "Example" },
          { id: "word", name: "Word" },
          { id: "part_of_speech", name: "Part of speech" },
        ]}
        rows={existingRows}
        openPopup={openPopup}
      />
      <Popup
        title={"Add"}
        show={showPopup}
        row={currentRow}
        setCurrentRow={setCurrentRow}
        action={action}
        handleConfirm={handleConfirm}
        handleClose={handleClose}
        partOfSpeechs={partOfSpeechs}
      />
    </div>
  );
}
