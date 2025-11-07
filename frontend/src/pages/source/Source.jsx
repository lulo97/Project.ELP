import { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { Popup } from "./Popup";
import { PageTitle } from "../../components/PageTitle";
import { Button } from "../../components/Button";
import {
  addSource,
  deleteSource,
  getAllSources,
  updateSource,
} from "../../services/source";
import { message } from "../../providers/MessageProvider";
import { translation } from "./Source.Translation";
import { getTranslation } from "../../utils/getTranslation";

const EMPTY_ROW = { id: "", name: "", source: "" };

export function Source() {
  const [rows, setRows] = useState([]);
  const [currentRow, setCurrentRow] = useState(EMPTY_ROW);
  const [showPopup, setShowPopup] = useState(false);
  const [action, setAction] = useState("ADD");
  const [paginationData, setPaginationData] = useState({});

  async function fetchRows(
    { pageIndex, pageSize } = { pageIndex: null, pageSize: 5 }
  ) {
    const result = await getAllSources({ pageIndex, pageSize });
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
      result = await addSource({ row: currentRow });
    }

    if (action == "EDIT") {
      result = await updateSource({ row: currentRow });
    }

    if (action == "DELETE") {
      result = await deleteSource({ row: currentRow });
    }

    fetchRows();
    setShowPopup(false);

    if (result.error) message({ type: "error", text: result.error });
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
        <PageTitle title={getTranslation("Title", translation)} />
        <Button
          text={getTranslation("Add")}
          onClick={() => openPopup({ currentRow: EMPTY_ROW, action: "ADD" })}
        />
      </div>
      <Table
        translation={translation}
        columns={["Id", "Name", "Source"]}
        rows={rows}
        openPopup={openPopup}
        additionButtons={[
          (row) => (
            <Button
              className="py-0 h-full"
              text={getTranslation("Read")}
              onClick={() =>
                (window.location.href = `/read?source_name=${row.name}`)
              }
            />
          ),
          (row) => (
            <Button
              className="py-0 h-full"
              text={getTranslation("ReadSentence", translation)}
              onClick={() =>
                (window.location.href = `/read_sentence?source_name=${row.name}`)
              }
            />
          ),
          (row) => (
            <Button
              className="py-0 h-full"
              text={getTranslation("WordList", translation)}
              onClick={() =>
                (window.location.href = `/read_word_list?source_name=${row.name}`)
              }
            />
          ),
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
