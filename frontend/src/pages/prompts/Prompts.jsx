import { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { Popup } from "./Popup";
import {
  addPrompt,
  deletePrompt,
  getAllPrompts,
  updatePrompt,
} from "../../services/prompts";
import { PageTitle } from "../../components/PageTitle";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { SearchTable } from "../../components/SearchTable";
import { Popup as PopupDetail } from "../read/Popup";
import { message } from "../../providers/MessageProvider";

const EMPTY_ROW = { id: "", prompt: "" };

export function Prompts() {
  const [rows, setRows] = useState([]);
  const [currentRow, setCurrentRow] = useState(EMPTY_ROW);
  const [showPopup, setShowPopup] = useState(false);
  const [action, setAction] = useState("ADD");
  const [paginationData, setPaginationData] = useState({});
  const [searchValues, setSearchValues] = useState([
    { id: "model_name", label: "Model name", value: "" },
    { id: "task_name", label: "Task name", value: "" },
    { id: "prompt", label: "Prompt", value: "" },
    { id: "description", label: "Description", value: "" },
  ]);
  const [showPopupDetail, setShowPopupDetail] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(EMPTY_ROW);

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

    const result = await getAllPrompts({ pageIndex, pageSize, ...params });
    setRows(result.data);
    setPaginationData(result.pagination);
  }

  function openPopup({ currentRow, action }) {
    setCurrentRow(currentRow);
    setShowPopup(true);
    setAction(action);
  }

  async function handleConfirm({ action }) {
    let result;
    if (action === "ADD") {
      result = await addPrompt({ row: currentRow });
    }
    if (action === "EDIT") {
      result = await updatePrompt({ row: currentRow });
    }
    if (action === "DELETE") {
      result = await deletePrompt({ row: currentRow });
    }

    fetchRows();
    setShowPopup(false);

    if (result.error) {
      message({ type: "error", text: result.error });
    }
  }

  function handleClose() {
    setCurrentRow(EMPTY_ROW);
    setShowPopup(false);
  }

  function handleClosePopupDetail() {
    setCurrentRow(EMPTY_ROW);
    setShowPopupDetail(false);
  }

  useEffect(() => {
    fetchRows();
  }, []);

  return (
    <div className="p-4">
      <div className="justify-between items-center mb-3">
        <PageTitle title={"Prompt Manager"} />
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
        columns={[
          { id: "id", name: "Id" },
          { id: "model_name", name: "Model name" },
          { id: "task_name", name: "Task name" },
          { id: "prompt", name: "Prompt" },
          { id: "description", name: "Description" },
        ]}
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

      {selectedPrompt.prompt && (
        <PopupDetail
          show={showPopupDetail}
          title="Add"
          prompt={selectedPrompt.prompt}
          handleClose={handleClosePopupDetail}
        />
      )}
    </div>
  );
}
