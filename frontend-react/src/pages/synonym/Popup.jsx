import { CommonPopup } from "../../components/CommonPopup";
import { PopupField } from "../../components/PopupField";
import { RichTextEditorField } from "../../components/RichTextEditorField";

export function Popup({
  show,
  title,
  action,
  row,
  setCurrentRow,
  handleConfirm,
  handleClose,
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

      {/* synonym */}
      <PopupField
        label="Synonym"
        fieldComponent={
          <input
            value={row.synonym}
            disabled={isDelete}
            onChange={(e) => setCurrentRow({ ...row, synonym: e.target.value })}
          />
        }
      />

      {/* note */}
      <PopupField
        label="Note"
        fieldComponent={
          <RichTextEditorField
            value={row.note}
            onChange={(html) => setCurrentRow({ ...row, note: html })}
            disabled={isDelete}
            placeholder="Type your review here..."
          />
        }
      />
    </CommonPopup>
  );
}
