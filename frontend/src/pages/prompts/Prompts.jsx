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
import { SearchTable } from "../../components/SearchTable";
import { message } from "../../providers/MessageProvider";
import { PopupTest } from "./PopupTest";
import { getConsts } from "../../utils/const";

const EMPTY_ROW = { id: "", prompt: "" };

export function Prompts() {
  const [rows, setRows] = useState([]);
  const [currentRow, setCurrentRow] = useState(EMPTY_ROW);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupTest, setShowPopupTest] = useState(false);
  const [action, setAction] = useState("ADD");
  const [paginationData, setPaginationData] = useState({});
  const [searchValues, setSearchValues] = useState([
    { id: "model_name", label: "Model name", value: "" },
    { id: "task_name", label: "Task name", value: "" },
    { id: "prompt", label: "Prompt", value: "" },
    { id: "description", label: "Description", value: "" },
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

  function handleCloseTest() {
    setCurrentRow(EMPTY_ROW);
    setShowPopupTest(false);
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
        additionButtons={[
          (row) => (
            <Button
              className="py-0 h-full"
              text={"Test"}
              disabled={getConsts().MODEL_NAME != row.model_name}
              onClick={() => {
                setShowPopupTest(true)
                setCurrentRow(row)
              }}
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

      <PopupTest
        title={"Test"}
        show={showPopupTest}
        row={currentRow}
        handleClose={handleCloseTest}
      />
    </div>
  );
}
