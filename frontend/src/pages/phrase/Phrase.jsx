import { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { Popup } from "./Popup";
import {
  addPhrase,
  deletePhrase,
  getAllPhrases,
  updatePhrase,
} from "../../services/phrases";
import { PageTitle } from "../../components/PageTitle";
import { Button } from "../../components/Button";

const EMPTY_ROW = { id: "", phrase: "", meaning: "", example: "" };

export function Phrase() {
  const [rows, setRows] = useState([]);
  const [currentRow, setCurrentRow] = useState(EMPTY_ROW);
  const [showPopup, setShowPopup] = useState(false);
  const [action, setAction] = useState("ADD");
  const [paginationData, setPaginationData] = useState({});

  async function fetchRows(
    { pageIndex, pageSize } = { pageIndex: null, pageSize: 5 }
  ) {
    const result = await getAllPhrases({ pageIndex, pageSize });
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
      await addPhrase({ row: currentRow });
    }
    if (action === "EDIT") {
      await updatePhrase({ row: currentRow });
    }
    if (action === "DELETE") {
      await deletePhrase({ row: currentRow });
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
        <PageTitle title={"Phrase Manager"} />
        <Button
          text={"Add"}
          onClick={() => openPopup({ currentRow: EMPTY_ROW, action: "ADD" })}
        />
      </div>

      {/* Table */}
      <Table
        columns={["Id", "Phrase", "Meaning", "Example"]}
        rows={rows}
        openPopup={openPopup}
        fetchData={fetchRows}
        paginationData={paginationData}
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
