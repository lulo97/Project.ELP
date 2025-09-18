import { useEffect, useState } from "react";
import { Table } from "../../../components/Table";
import { Popup } from "./Popup";
import {
  addMeaning,
  deleteMeaning,
  updateMeaning,
} from "../../../services/meaning";

export function Meaning({ word, existingRows, fetchExistingRows, partOfSpeechs }) {
  const EMPTY_ROW = { id: "", meaning: "", word: word, part_of_speech: "noun" };

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
      await addMeaning({ row: currentRow });
    }

    if (action == "EDIT") {
      await updateMeaning({ row: currentRow });
    }

    if (action == "DELETE") {
      await deleteMeaning({ row: currentRow });
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
          { id: "meaning", name: "Meaning" },
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
