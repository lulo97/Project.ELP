import { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { Popup } from "./Popup";
import {
  addWritingQuestion,
  deleteWritingQuestion,
  getAllWritingQuestions,
  updateWritingQuestion,
} from "../../services/writing_question";
import { PageTitle } from "../../components/PageTitle";
import { Button } from "../../components/Button";

const EMPTY_ROW = { id: "", question: "" };

export function WritingQuestion() {
  const [rows, setRows] = useState([]);
  const [currentRow, setCurrentRow] = useState(EMPTY_ROW);
  const [showPopup, setShowPopup] = useState(false);
  const [action, setAction] = useState("ADD");
  const [paginationData, setPaginationData] = useState({});

  async function fetchRows(
    { pageIndex, pageSize } = { pageIndex: null, pageSize: 5 }
  ) {
    const result = await getAllWritingQuestions({ pageIndex, pageSize });
    setRows(result.data);
    setPaginationData(result.pagination);
  }

  function openPopup({ currentRow, action }) {
    setCurrentRow(currentRow);
    setShowPopup(true);
    setAction(action);
  }

  async function handleConfirm({ action }) {
    if (action === "ADD") {
      await addWritingQuestion({ row: currentRow });
    }
    if (action === "EDIT") {
      await updateWritingQuestion({ row: currentRow });
    }
    if (action === "DELETE") {
      await deleteWritingQuestion({ row: currentRow });
    }

    fetchRows();
    setShowPopup(false);
  }

  function handleClose() {
    setCurrentRow(EMPTY_ROW);
    setShowPopup(false);
  }

  useEffect(() => {
    fetchRows();
  }, []);

  return (
    <div className="p-4">
      <div className="justify-between items-center mb-6">
        <PageTitle title={"WritingQuestion Manager"} />
        <Button
          text={"Add"}
          onClick={() => openPopup({ currentRow: EMPTY_ROW, action: "ADD" })}
        />
      </div>

      {/* Table */}
      <Table
        columns={["Id", "Question"]}
        rows={rows}
        openPopup={openPopup}
        fetchData={fetchRows}
        paginationData={paginationData}
        additionButtons={[
          (row) => (
            <Button
              text={"Answer"}
              onClick={() =>
                (window.location.href = `/writing?question=${row.question}`)
              }
            />
          ),
        ]}
      />

      {/* Popup (already styled) */}
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
