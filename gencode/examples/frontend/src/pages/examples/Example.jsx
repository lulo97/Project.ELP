import { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { Popup } from "./Popup";
import {
  addExample,
  deleteExample,
  getAllExamples,
  updateExample,
} from "../../services/examples";
import { PageTitle } from "../../components/PageTitle";
import { Button } from "../../components/Button";

const EMPTY_ROW = { { id: "", word: "", part_of_speech: "", example: "" } };

export function Example() {
  const [rows, setRows] = useState([]);
  const [currentRow, setCurrentRow] = useState(EMPTY_ROW);
  const [showPopup, setShowPopup] = useState(false);
  const [action, setAction] = useState("ADD");
  const [paginationData, setPaginationData] = useState({});

  async function fetchRows({ pageIndex, pageSize } = { pageIndex: null, pageSize: 5 }) {
    const result = await getAllExamples({ pageIndex, pageSize });
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
      await addExample({ row: currentRow });
    }

    if (action == "EDIT") {
      await updateExample({ row: currentRow });
    }

    if (action == "DELETE") {
      await deleteExample({ row: currentRow });
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
        <PageTitle title={"Example Manager"} />
        <Button
          text={"Add"}
          onClick={() => openPopup({ currentRow: EMPTY_ROW, action: "ADD" })}
        />
      </div>
      <Table
        columns={[
          { id: "id", name: "Id" },
          { id: "word", name: "Word" },
          { id: "part_of_speech", name: "Part Of Speech" },
          { id: "example", name: "Example" }
        ]}
        rows={rows}
        openPopup={openPopup}
        paginationData={paginationData}
        fetchData={fetchRows}
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