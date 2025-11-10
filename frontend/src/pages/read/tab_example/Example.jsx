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
      text: "Success!",
    });
  }

  function handleClose() {
    setCurrentRow(currentRow);
    setShowPopup(false);
  }

  return (
    <div>
      <Button
        text={"Add"}
        onClick={() => openPopup({ currentRow: EMPTY_ROW, action: "ADD" })}
        className="mb-4"
      />

      <Table
        columns={[
          { id: "id", name: "Id" },
          { id: "example", name: "Example", truncate: false },
          { id: "word", name: "Word" },
          { id: "part_of_speech", name: "Part of speech" },
        ]}
        rows={existingRows}
        openPopup={openPopup}
        paginationData={paginationData}
        fetchData={fetchExistingRows}
        additionButtons={[(row) => <CommonAudio text={row.example} />]}
      />
      <Popup
        title={"Add example"}
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
