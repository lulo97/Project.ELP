import { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { Popup } from "./Popup";
import {
  addExample,
  deleteExample,
  getAllExamples,
  updateExample,
} from "../../services/example";
import { getPartOfSpeechs } from "../../services/part_of_speech";
import { PageTitle } from "../../components/PageTitle";
import { Button } from "../../components/Button";
import { message } from "../../providers/MessageProvider";

const EMPTY_ROW = { id: "", example: "", word: "", part_of_speech: "" };

export function Example() {
  const [rows, setRows] = useState([]);
  const [currentRow, setCurrentRow] = useState(EMPTY_ROW);
  const [showPopup, setShowPopup] = useState(false);
  const [action, setAction] = useState("ADD");
  const [partOfSpeechs, setPartOfSpeechs] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [searchValues, setSearchValues] = useState([
    { id: "word", label: "Word", value: "" },
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

    const result = await getAllExamples({ pageIndex, pageSize, ...params });
    setRows(result.data);
    setPaginationData(result.pagination);
  }

  async function fetchPartOfSpeechs() {
    const result = await getPartOfSpeechs();
    setPartOfSpeechs(result);
  }

  function openPopup({ currentRow, action }) {
    setCurrentRow(currentRow);
    setShowPopup(true);
    setAction(action);
  }

  async function handleConfirm({ action }) {
    let result = null;

    if (action == "ADD") {
      result = await addExample({ row: currentRow });
    }

    if (action == "EDIT") {
      result = await updateExample({ row: currentRow });
    }

    if (action == "DELETE") {
      result = await deleteExample({ row: currentRow });
    }

    fetchRows();
    setShowPopup(false);

    if (result.error) {
      message({ type: "error", text: result.error });
    }
  }

  function handleClose() {
    setCurrentRow(currentRow);
    setShowPopup(false);
  }

  useEffect(() => {
    fetchRows();
    fetchPartOfSpeechs();
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
          { id: "example", name: "Example" },
          { id: "word", name: "Word" },
          { id: "part_of_speech", name: "Part of speech" },
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
        partOfSpeechs={partOfSpeechs}
      />
    </div>
  );
}
