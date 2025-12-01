import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../services/users";
import { message } from "../../providers/MessageProvider";
import { PageTitle } from "../../components/PageTitle";
import { Table } from "../../components/Table";
import { SearchTable } from "../../components/SearchTable";
import { Popup } from "./Popup";

const EMPTY_ROW = {
  id: null,
  username: null,
  email: null,
  password_hash: null,
  full_name: null,
  is_active: null,
  created_at: null,
};

export function Users() {
  const [rows, setRows] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [searchValues, setSearchValues] = useState([
    { id: "username", label: "Username", value: "" },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentRow, setCurrentRow] = useState(EMPTY_ROW);
  const [action, setAction] = useState("ADD");

  function openPopup({ currentRow, action }) {
    setCurrentRow(currentRow);
    setShowPopup(true);
    setAction(action);
  }
  
  function handleClose() {
    setCurrentRow(currentRow);
    setShowPopup(false);
  }

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

    const result = await getUsers({ pageIndex, pageSize, ...params });
    if (result.error) {
      message({ type: "error", text: result.error });
      return;
    }
    setRows(result.data);
    setPaginationData(result.pagination);
  }

  async function handleConfirm({ action }) {
    let result = null;

    if (action == "DELETE") {
      result = await deleteUser({ id: currentRow.id });
    }

    fetchRows();
    setShowPopup(false);

    if (result.error) message({ type: "error", text: result.error });
  }

  useEffect(() => {
    fetchRows();
  }, []);

  return (
    <div className="p-4">
      <PageTitle title="Users" />

      <div className="mb-3">
        <SearchTable
          searchValues={searchValues}
          setSearchValues={setSearchValues}
          fetchRows={fetchRows}
        />
      </div>

      {/*  "id": "202511052219372973",
            "username": "test1",
            "email": null,
            "password_hash": "$2b$10$S6GgD4sMU7wKGIr9DxONUeF0Btmv4sGVezPpN0UmlQSFISzrftou2",
            "full_name": null,
            "is_active": true,
            "created_at": "2025-11-05T */}
      <Table
        columns={[
          { id: "id", name: "Id" },
          { id: "username", name: "Username" },
          { id: "email", name: "Email" },
          { id: "full_name", name: "FullName" },
          { id: "is_active", name: "Is active" },
          { id: "created_at", name: "Created at" },
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
