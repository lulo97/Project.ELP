import { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { Popup } from "./Popup";
import {
  addWord,
  deleteWord,
  getAllWords,
  updateWord,
} from "../../services/word";
import { PageTitle } from "../../components/PageTitle";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { SearchTable } from "../../components/SearchTable";

const EMPTY_ROW = { id: "", word: "" };

export function Word() {
  const [rows, setRows] = useState([]);
  const [currentRow, setCurrentRow] = useState(EMPTY_ROW);
  const [showPopup, setShowPopup] = useState(false);
  const [action, setAction] = useState("ADD");
  const [paginationData, setPaginationData] = useState({});
  const [searchValues, setSearchValues] = useState([
    { id: "word", placeholder: "Search by word", value: "" },
  ]);

  async function fetchRows(
    { pageIndex, pageSize } = {
      pageIndex: paginationData.pageIndex || null,
      pageSize: paginationData.pageSize || 5,
    }
  ) {
    const params = searchValues.reduce((acc, ele) => {
      acc[ele.id] = ele.value;
      return acc;
    }, {});

    const result = await getAllWords({ pageIndex, pageSize, ...params });
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
      await addWord({ row: currentRow });
    }
    if (action === "EDIT") {
      await updateWord({ row: currentRow });
    }
    if (action === "DELETE") {
      await deleteWord({ row: currentRow });
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
      <div className="justify-between items-center mb-3">
        <PageTitle title={"Word Manager"} />
        <Button
          text={"Add"}
          onClick={() => openPopup({ currentRow: EMPTY_ROW, action: "ADD" })}
        />
      </div>

      <div className="mb-3">
        <SearchTable
          searchValues={searchValues}
          setSearchValues={setSearchValues}
          fetchRows={fetchRows}
        />
      </div>

      {/* Table */}
      <Table
        columns={["Id", "Word"]}
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
