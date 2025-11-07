import { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { Popup } from "./Popup";
import {
  addPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "../../services/posts";
import { PageTitle } from "../../components/PageTitle";
import { Button } from "../../components/Button";
import { SearchTable } from "../../components/SearchTable";
import { message } from "../../providers/MessageProvider";

const EMPTY_ROW = { id: "", title: "", content: "" };

export function Post() {
  const [rows, setRows] = useState([]);
  const [currentRow, setCurrentRow] = useState(EMPTY_ROW);
  const [showPopup, setShowPopup] = useState(false);
  const [action, setAction] = useState("ADD");
  const [paginationData, setPaginationData] = useState({});
  const [searchValues, setSearchValues] = useState([
    {
      id: "title",
      label: "Title",
      value: "",
    },
    {
      id: "content",
      label: "Content",
      value: "",
    },
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

    const result = await getAllPosts({ pageIndex, pageSize, ...params });
    setRows(result.data);
    setPaginationData(result.pagination);
  }

  function openPopup({ currentRow, action }) {
    setCurrentRow(currentRow);
    setShowPopup(true);
    setAction(action);
  }

  async function handleConfirm({ action }) {
    let result = null;

    if (action == "ADD") {
      result = await addPost({ row: currentRow });
    }

    if (action == "EDIT") {
      result = await updatePost({ row: currentRow });
    }

    if (action == "DELETE") {
      result = await deletePost({ row: currentRow });
    }

    fetchRows();
    setShowPopup(false);

    if (result.error) message({ type: "error", text: result.error });
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
        <PageTitle title={"Post Manager"} />
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
          { id: "title", name: "Title" },
          { id: "content", name: "Content" },
        ]}
        rows={rows}
        openPopup={openPopup}
        paginationData={paginationData}
        fetchData={fetchRows}
        additionButtons={[
          (row) => (
            <Button
              className="py-0 h-full"
              text={"View Post"}
              onClick={() => (window.location.href = `/viewpost?id=${row.id}`)}
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
