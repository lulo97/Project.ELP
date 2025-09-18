import { CommonPopup } from "../../components/CommonPopup";

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
      <div>
        <label>Id</label>
        <input value={row.id} disabled />
      </div>

      <div>
        <label>Name</label>
        <input
          value={row.name}
          disabled={action == "DELETE" ? true : false}
          onChange={(e) => setCurrentRow({ ...row, name: e.target.value })}
        />
      </div>

      <div>
        <label>Source</label>
        <textarea
          value={row.source}
          disabled={action == "DELETE" ? true : false}
          onChange={(e) => setCurrentRow({ ...row, source: e.target.value })}
        />
      </div>
    </CommonPopup>
  );
}
