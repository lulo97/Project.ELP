import { CommonPopup } from "../../components/CommonPopup";
import { PopupField } from "../../components/PopupField";
import { RichTextEditorWithUpload } from "../../components/RichTextEditorWithUpload";
import { useState } from "react";

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
        label={"Id"}
        fieldComponent={<input value={row.id} disabled />}
      />

      <PopupField
        label={"Name"}
        fieldComponent={
          <input
            value={row.name}
            disabled={action == "DELETE" ? true : false}
            onChange={(e) => setCurrentRow({ ...row, name: e.target.value })}
          />
        }
      />

      <PopupField
        label="Source"
        fieldComponent={
          <RichTextEditorWithUpload
            initialValue={row.source}
            onChange={(value) => setCurrentRow({ ...row, source: value })}
          />
        }
      />
    </CommonPopup>
  );
}
