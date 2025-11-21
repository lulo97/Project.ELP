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
}) {
  return (
    <CommonPopup
      show={show}
      title={title}
      handleConfirm={() => handleConfirm({ action })}
      handleClose={handleClose}
    >
      <PopupField
        label="Id"
        fieldComponent={<input value={row.id} disabled />}
      />

      <PopupField
        label="Word"
        fieldComponent={
          <input
            value={row.word}
            disabled={action == "DELETE" ? true : false}
            onChange={(e) => setCurrentRow({ ...row, word: e.target.value })}
          />
        }
      />
    </CommonPopup>
  );
}
