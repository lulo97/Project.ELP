import { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { Popup } from "./Popup";
import {
  addMeaning,
  deleteMeaning,
  getAllMeanings,
  updateMeaning,
} from "../../services/meaning";
import { getPartOfSpeechs } from "../../services/part_of_speech";
import { PageTitle } from "../../components/PageTitle";
import { Button } from "../../components/Button";
import { SearchTable } from "../../components/SearchTable";
import { message } from "../../providers/MessageProvider"

const EMPTY_ROW = { id: "", meaning: "", word: "", part_of_speech: "" };

export function Meaning() {
  const [rows, setRows] = useState([]);
  const [currentRow, setCurrentRow] = useState(EMPTY_ROW);
  const [showPopup, setShowPopup] = useState(false);
  const [action, setAction] = useState("ADD");
  const [partOfSpeechs, setPartOfSpeechs] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [searchValues, setSearchValues] = useState([
    { id: "meaning", placeholder: "Search by meaning", value: "" },
    { id: "word", placeholder: "Search by word", value: "" },
    {
      id: "part_of_speech",
      placeholder: "Search by part of speech",
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

    const result = await getAllMeanings({ pageIndex, pageSize, ...params });
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
    let result;
    if (action == "ADD") {
      result = await addMeaning({ row: currentRow });
      console.log(result)
    }

    if (action == "EDIT") {
      result = await updateMeaning({ row: currentRow });
    }

    if (action == "DELETE") {
      result = await deleteMeaning({ row: currentRow });
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
    fetchPartOfSpeechs();
  }, []);

  return (
    <div className="p-4">
      <div className="justify-between items-center mb-6">
        <PageTitle title={"Meaning Manager"} />
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
          { id: "meaning", name: "Meaning" },
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
