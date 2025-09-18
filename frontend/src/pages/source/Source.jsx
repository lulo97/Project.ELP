import { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { Popup } from "./Popup";
import { PageTitle } from "../../components/PageTitle";
import { Button } from "../../components/Button";
import { getAllSources } from "../../services/source";

const EMPTY_ROW = { id: "", name: "", source: "" };

export function Source() {
  const [rows, setRows] = useState([]);
  const [currentRow, setCurrentRow] = useState(EMPTY_ROW);
  const [showPopup, setShowPopup] = useState(false);
  const [action, setAction] = useState("ADD");
  const [paginationData, setPaginationData] = useState({});

  async function fetchRows({ pageIndex, pageSize } = { pageIndex: null, pageSize: 5 }) {
    const result = await getAllSources({ pageIndex, pageSize })
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
      const result = await fetch("/api/sources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentRow),
      });
    }

    if (action == "EDIT") {
      const result = await fetch(`/api/sources/${currentRow.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentRow),
      });
    }

    if (action == "DELETE") {
      const result = await fetch(`/api/sources/${currentRow.id}`, {
        method: "DELETE",
      });
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
        <PageTitle title={"Source Manager"} />
        <Button
          text={"Add"}
          onClick={() => openPopup({ currentRow: EMPTY_ROW, action: "ADD" })}
        />
      </div>
      <Table
        columns={["Id", "Name", "Source"]}
        rows={rows}
        openPopup={openPopup}
        additionButtons={[
          <Button
            text={"Read"}
            onClick={(row) =>
              (window.location.href = `/read?source_name=${row.name}`)
            }
          />,
        ]}
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
