import { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { Popup } from "./Popup";
import {
  addSpeaking,
  deleteSpeaking,
  getAllSpeakings,
  updateSpeaking,
} from "../../services/speakings";
import { PageTitle } from "../../components/PageTitle";
import { Button } from "../../components/Button";

const EMPTY_ROW = { id: "", question: "", answer: "" };

export function Speaking() {
  const [rows, setRows] = useState([]);
  const [currentRow, setCurrentRow] = useState(EMPTY_ROW);
  const [showPopup, setShowPopup] = useState(false);
  const [action, setAction] = useState("ADD");
  const [paginationData, setPaginationData] = useState({});

  async function fetchRows({ pageIndex, pageSize } = { pageIndex: null, pageSize: 5 }) {
    const result = await getAllSpeakings({ pageIndex, pageSize });
    setRows(result.data);
    setPaginationData(result.pagination);
  }

  function openPopup({ currentRow, action }) {
    setCurrentRow(currentRow);
    setShowPopup(true);
    setAction(action);
  }

  async function handleConfirm({ action }) {
    if (action == "ADD") {
      await addSpeaking({ row: currentRow });
    }

    if (action == "EDIT") {
      await updateSpeaking({ row: currentRow });
    }

    if (action == "DELETE") {
      await deleteSpeaking({ row: currentRow });
    }

    fetchRows();
    setShowPopup(false);
  }

  function handleClose() {
    setCurrentRow(currentRow);
    setShowPopup(false);
  }

  useEffect(() => {
    fetchRows();
  }, []);

  return (
    <div className="p-4">
      <div className="justify-between items-center mb-6">
        <PageTitle title={"Speaking Manager"} />
        <Button
          text={"Add"}
          onClick={() => openPopup({ currentRow: EMPTY_ROW, action: "ADD" })}
        />
      </div>
      <Table
        columns={[
          { id: "id", name: "Id" },
          { id: "question", name: "Question" },
          { id: "answer", name: "Answer" }
        ]}
        rows={rows}
        openPopup={openPopup}
        paginationData={paginationData}
        fetchData={fetchRows}
        additionButtons={[
          (row) => (
            <Button
              text={"Speaking"}
              onClick={() =>
                (window.location.href = `/speaking_exercise?speaking_id=${row.id}`)
              }
            />
          ),
        ]}
      />
      <Popup
        title={"Add"}
        show={showPopup}
        row={currentRow}
        setCurrentRow={setCurrentRow}
        action={action}
        handleConfirm={handleConfirm}
        handleClose={handleClose}
      />
    </div>
  );
}