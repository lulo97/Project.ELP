
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

      {/* synomym */}
      <PopupField
        label="Synomym"
        fieldComponent={
          <input
            value={row.synomym}
            disabled={isDelete}
            onChange={(e) => setCurrentRow({ ...row, synomym: e.target.value })}
          />
        }
      />

      {/* note */}
      <PopupField
        label="Note"
        fieldComponent={
          <input
            value={row.note}
            disabled={isDelete}
            onChange={(e) => setCurrentRow({ ...row, note: e.target.value })}
          />
        }
      />
    </CommonPopup>
  );
}