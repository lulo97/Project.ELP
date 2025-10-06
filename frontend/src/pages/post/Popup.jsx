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

      {/* title */}
      <PopupField
        label="Title"
        fieldComponent={
          <input
            value={row.title}
            disabled={isDelete}
            onChange={(e) => setCurrentRow({ ...row, title: e.target.value })}
          />
        }
      />

      {/* content */}
      <PopupField
        label="Content"
        fieldComponent={
          <RichTextEditorField
            value={row.content} // or row.note
            onChange={(html) => setCurrentRow({ ...row, content: html })} // or note
            disabled={isDelete}
            placeholder="Content..."
          />
        }
      />
    </CommonPopup>
  );
}
