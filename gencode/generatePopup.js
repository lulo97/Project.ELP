const { capitalize } = require("./utils")

function generatePopup(sql) {
    // Extract columns inside (...)
    const insideParens = sql.match(/\(([\s\S]*)\)/)[1];
    const columnMatches = [...insideParens.matchAll(/"(\w+)"\s+([\w()]+)/g)];
    const columns = columnMatches.map(m => m[1]);

    function renderField(col) {
        if (col === "id") {
            return `
      {/* ${col} */}
      <PopupField
        label="${capitalize(col)}"
        fieldComponent={<input value={row.${col}} disabled />}
      />`;
        }

        if (col.toLowerCase().includes("part_of_speech")) {
            return `
      {/* ${col} */}
      <PopupField
        label="Part of speech"
        fieldComponent={
          <SelectNoStyle
            value={row.${col}}
            disabled={isDelete}
            onChange={(e) =>
              setCurrentRow({ ...row, ${col}: e.target.value })
            }
            options={partOfSpeechs}
          />
        }
      />`;
        }

        if (col.toLowerCase().includes("example")) {
            return `
      {/* ${col} */}
      <PopupField
        label="${capitalize(col)}"
        fieldComponent={
          <textarea
            value={row.${col}}
            disabled={isDelete}
            onChange={(e) =>
              setCurrentRow({ ...row, ${col}: e.target.value })
            }
          />
        }
      />`;
        }

        return `
      {/* ${col} */}
      <PopupField
        label="${capitalize(col)}"
        fieldComponent={
          <input
            value={row.${col}}
            disabled={isDelete}
            onChange={(e) => setCurrentRow({ ...row, ${col}: e.target.value })}
          />
        }
      />`;
    }

    const fields = columns.map(c => renderField(c)).join("\n");

    return `
import { CommonPopup } from "../../components/CommonPopup";
import { PopupField } from "../../components/PopupField";
import { SelectNoStyle } from "../../components/Select";

export function Popup({
  show,
  title,
  action,
  row,
  setCurrentRow,
  handleConfirm,
  handleClose,
  partOfSpeechs,
}) {
  const isDelete = action === "DELETE";

  return (
    <CommonPopup
      show={show}
      title={title}
      handleConfirm={() => handleConfirm({ action })}
      handleClose={handleClose}
    >
      ${fields}
    </CommonPopup>
  );
}`;
}

module.exports = {
    generatePopup
}