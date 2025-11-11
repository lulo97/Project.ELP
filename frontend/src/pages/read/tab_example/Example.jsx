import { useEffect, useState } from "react";
import { Table } from "../../../components/Table";
import { Popup } from "./Popup";
import {
  addExample,
  deleteExample,
  updateExample,
} from "../../../services/example";
import { Button } from "../../../components/Button";
import { CommonAudio } from "../../../components/CommonAudio";
import { message } from "../../../providers/MessageProvider";
import { getTranslation as _getTranslation } from "../../../utils/getTranslation";
import { translation } from "../Read.Translate";

const getTranslation = (key) => _getTranslation(key, translation);

export function Example({
  word,
  existingRows,
  fetchExistingRows,
  partOfSpeechs,
  paginationData,
}) {
  const EMPTY_ROW = { id: "", example: "", word: word, part_of_speech: "" };

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
        text={getTranslation("AddExample")}
        onClick={() => openPopup({ currentRow: EMPTY_ROW, action: "ADD" })}
        className="mb-4"
      />

      <Table
        columns={[
          { id: "id", name: getTranslation("Id") },
          { id: "example", name: getTranslation("Example"), truncate: false },
          { id: "word", name: getTranslation("Word") },
          { id: "part_of_speech", name: getTranslation("PartOfSpeech") },
        ]}
        rows={existingRows}
        openPopup={openPopup}
        paginationData={paginationData}
        fetchData={fetchExistingRows}
        additionButtons={[(row) => <CommonAudio text={row.example} />]}
      />
      <Popup
        title={getTranslation("AddExample")}
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
