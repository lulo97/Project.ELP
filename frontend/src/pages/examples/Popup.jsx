import { CommonPopup } from "../../components/CommonPopup";
import { PopupField } from "../../components/PopupField";

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
      {/* Id */}
      <PopupField
        label="Id"
        fieldComponent={<input value={row.id} disabled />}
      />

      {/* Word */}
      <PopupField
        label="Word"
        fieldComponent={
          <input
            value={row.word}
            disabled={isDelete}
            onChange={(e) => setCurrentRow({ ...row, word: e.target.value })}
          />
        }
      />

      {/* Part of speech */}
      <PopupField
        label="Part of speech"
        fieldComponent={
          <select
            value={row.part_of_speech}
            disabled={isDelete}
            onChange={(e) =>
              setCurrentRow({ ...row, part_of_speech: e.target.value })
            }
          >
            {partOfSpeechs.map((ele) => (
              <option key={ele.id} value={ele.id}>
                {ele.name}
              </option>
            ))}
          </select>
        }
      />

      {/* Example */}
      <PopupField
        label="Example"
        fieldComponent={
          <textarea
            value={row.example}
            disabled={isDelete}
            onChange={(e) => setCurrentRow({ ...row, example: e.target.value })}
          />
        }
      />
    </CommonPopup>
  );
}
