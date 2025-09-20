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
        label="Phrase"
        fieldComponent={
          <input
            value={row.phrase}
            disabled={action == "DELETE" ? true : false}
            onChange={(e) => setCurrentRow({ ...row, phrase: e.target.value })}
          />
        }
      />

      <PopupField
        label="Meaning"
        fieldComponent={
          <input
            value={row.meaning}
            disabled={action == "DELETE" ? true : false}
            onChange={(e) => setCurrentRow({ ...row, meaning: e.target.value })}
          />
        }
      />

      <PopupField
        label="Example"
        fieldComponent={
          <textarea
            value={row.example}
            disabled={action == "DELETE" ? true : false}
            onChange={(e) => setCurrentRow({ ...row, example: e.target.value })}
          />
        }
      />
    </CommonPopup>
  );
}
