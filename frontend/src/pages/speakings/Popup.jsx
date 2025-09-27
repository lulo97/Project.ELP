
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

      {/* question */}
      <PopupField
        label="Question"
        fieldComponent={
          <input
            value={row.question}
            disabled={isDelete}
            onChange={(e) => setCurrentRow({ ...row, question: e.target.value })}
          />
        }
      />

      {/* answer */}
      <PopupField
        label="Answer"
        fieldComponent={
          <input
            value={row.answer}
            disabled={isDelete}
            onChange={(e) => setCurrentRow({ ...row, answer: e.target.value })}
          />
        }
      />
    </CommonPopup>
  );
}