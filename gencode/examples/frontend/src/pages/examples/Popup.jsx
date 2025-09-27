
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
      
      {/* id */}
      <PopupField
        label="Id"
        fieldComponent={<input value={row.id} disabled />}
      />

      {/* word */}
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

      {/* part_of_speech */}
      <PopupField
        label="Part of speech"
        fieldComponent={
          <SelectNoStyle
            value={row.part_of_speech}
            disabled={isDelete}
            onChange={(e) =>
              setCurrentRow({ ...row, part_of_speech: e.target.value })
            }
            options={partOfSpeechs}
          />
        }
      />

      {/* example */}
      <PopupField
        label="Example"
        fieldComponent={
          <textarea
            value={row.example}
            disabled={isDelete}
            onChange={(e) =>
              setCurrentRow({ ...row, example: e.target.value })
            }
          />
        }
      />
    </CommonPopup>
  );
}