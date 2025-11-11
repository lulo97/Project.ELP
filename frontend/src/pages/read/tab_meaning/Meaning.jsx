import { useEffect, useState } from "react";
import { Table } from "../../../components/Table";
import { Popup } from "./Popup";
import {
  addMeaning,
  deleteMeaning,
  updateMeaning,
} from "../../../services/meaning";
import { Button } from "../../../components/Button";
import { message } from "../../../providers/MessageProvider";
import { getTranslation } from "../../../utils/getTranslation";
import { translation } from "../Read.Translate";

export function Meaning({
  word,
  existingRows,
  fetchExistingRows,
  partOfSpeechs,
  paginationData,
}) {
  const EMPTY_ROW = { id: "", meaning: "", word: word, part_of_speech: "" };

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
    message({
      text: getTranslation("Success"),
    });
  }

  function handleClose() {
    setCurrentRow(currentRow);
    setShowPopup(false);
  }

  return (
    <div>
      <Button
        text={getTranslation("AddMeaning", translation)}
        onClick={() => openPopup({ currentRow: EMPTY_ROW, action: "ADD" })}
        className="mb-4"
      />
      <Table
        columns={[
          { id: "id", name: getTranslation("Id") },
          { id: "meaning", name: getTranslation("Meaning", translation) },
          { id: "word", name: getTranslation("Word", translation) },
          { id: "part_of_speech", name: getTranslation("PartOfSpeech", translation) },
        ]}
        rows={existingRows}
        openPopup={openPopup}
        paginationData={paginationData}
        fetchData={fetchExistingRows}
      />
      <Popup
        title={getTranslation("AddMeaning", translation)}
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
