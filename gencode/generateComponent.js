const { toPascalCase, toTitleCase } = require("./utils")

function generateComponent(sql) {
    // 1. Extract table name
    const tableMatch = sql.match(/CREATE TABLE\s+"?(\w+)"?/i);
    if (!tableMatch) throw new Error("Table name not found in SQL");
    const tableName = tableMatch[1];
    const compName = toPascalCase(tableName.slice(0, -1)); // Example(s) -> Example

    // 2. Extract columns
    const insideParens = sql.match(/\(([\s\S]*)\)/)[1];
    const columnMatches = [...insideParens.matchAll(/"(\w+)"\s+([\w()]+)/g)];
    const columns = columnMatches.map(m => m[1]);

    // 3. Build EMPTY_ROW
    const emptyRow = `{ ${columns.map(c => `${c}: ""`).join(", ")} }`;

    // 4. Build columns config
    const tableCols = columns
        .map(c => `{ id: "${c}", name: "${toTitleCase(c)}" }`)
        .join(",\n          ");

    // 5. Generate code
    return `import { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { Popup } from "./Popup";
import {
  add${compName},
  delete${compName},
  getAll${tableName.charAt(0).toUpperCase() + tableName.slice(1)},
  update${compName},
} from "../../services/${tableName}";
import { PageTitle } from "../../components/PageTitle";
import { Button } from "../../components/Button";
import { SearchTable } from "../../components/SearchTable";

const EMPTY_ROW = ${emptyRow};

export function ${compName}() {
  const [rows, setRows] = useState([]);
  const [currentRow, setCurrentRow] = useState(EMPTY_ROW);
  const [showPopup, setShowPopup] = useState(false);
  const [action, setAction] = useState("ADD");
  const [paginationData, setPaginationData] = useState({});
  const [searchValues, setSearchValues] = useState([
    ${columns
      .filter(ele => ele !== "id")
      .map(c => `{
        id: "${c}",
        name: "${toTitleCase(c)}",
        value: ""
      }`)
      .join(",\n  ")}
  ]);

  async function fetchRows({ pageIndex, pageSize } = { pageIndex: paginationData.pageIndex || null, pageSize: paginationData.pageSize || 5 }) {
    const params = searchValues.reduce((acc, ele) => {
      acc[ele.id] = ele.value;
      return acc;
    }, {});

    const result = await getAll${toPascalCase(tableName)}({ pageIndex, pageSize, ...params });
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
      await add${compName}({ row: currentRow });
    }

    if (action == "EDIT") {
      await update${compName}({ row: currentRow });
    }

    if (action == "DELETE") {
      await delete${compName}({ row: currentRow });
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
        <PageTitle title={"${compName} Manager"} />
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
          ${tableCols}
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
}`;
}

module.exports = {
    generateComponent
}