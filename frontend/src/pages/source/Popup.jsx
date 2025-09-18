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
        label={"Source"}
        fieldComponent={
          <textarea
            value={row.source}
            disabled={action == "DELETE" ? true : false}
            onChange={(e) => setCurrentRow({ ...row, source: e.target.value })}
          />
        }
      />
    </CommonPopup>
  );
}
