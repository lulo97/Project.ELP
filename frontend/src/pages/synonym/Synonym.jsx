import { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { Popup } from "./Popup";
import {
  addSynonym,
  deleteSynonym,
  getAllSynonyms,
  updateSynonym,
} from "../../services/synonyms";
import { PageTitle } from "../../components/PageTitle";
import { Button } from "../../components/Button";
import { SearchTable } from "../../components/SearchTable";

const EMPTY_ROW = { id: "", word: "", synomym: "", note: "" };

export function Synonym() {
  const [rows, setRows] = useState([]);
  const [currentRow, setCurrentRow] = useState(EMPTY_ROW);
  const [showPopup, setShowPopup] = useState(false);
  const [action, setAction] = useState("ADD");
  const [paginationData, setPaginationData] = useState({});
  const [searchValues, setSearchValues] = useState([
    { id: "word", placeholder: "Search by Word", value: "" },
          { id: "synomym", placeholder: "Search by Synomym", value: "" },
          { id: "note", placeholder: "Search by Note", value: "" }
  ]);

  async function fetchRows({ pageIndex, pageSize } = { pageIndex: paginationData.pageIndex || null, pageSize: paginationData.pageSize || 5 }) {
    const params = searchValues.reduce((acc, ele) => {
      acc[ele.id] = ele.value;
      return acc;
    }, {});

    const result = await getAllSynonyms({ pageIndex, pageSize, ...params });
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
      await addSynonym({ row: currentRow });
    }

    if (action == "EDIT") {
      await updateSynonym({ row: currentRow });
    }

    if (action == "DELETE") {
      await deleteSynonym({ row: currentRow });
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
        <PageTitle title={"Synonym Manager"} />
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

      <Table
        columns={[
          { id: "id", name: "Id" },
          { id: "word", name: "Word" },
          { id: "synomym", name: "Synomym" },
          { id: "note", name: "Note" }
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