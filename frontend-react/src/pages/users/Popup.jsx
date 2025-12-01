import { CommonPopup } from "../../components/CommonPopup";
import { Input } from "../../components/Input";
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

      {/* username */}
      <PopupField
        label="Username"
        fieldComponent={
          <input
            value={row.username}
            disabled={isDelete}
            onChange={(e) => setCurrentRow({ ...row, username: e.target.value })}
          />
        }
      />

      {/* email */}
      <PopupField
        label="Email"
        fieldComponent={
          <input
            value={row.email}
            disabled={isDelete}
            onChange={(e) => setCurrentRow({ ...row, email: e.target.value })}
          />
        }
      />

      {/* fullname */}
      <PopupField
        label="Fullname"
        fieldComponent={
          <input
            value={row.fullname}
            onChange={(e) => setCurrentRow({ ...row, fullname: e.target.value })}
            disabled={isDelete}
            placeholder="Fullname..."
          />
        }
      />

      {/* is active */}
      <PopupField
        label="Is active"
        fieldComponent={
          <input
            value={row.is_active}
            onChange={(e) => setCurrentRow({ ...row, is_active: e.target.value })}
            disabled={isDelete}
          />
        }
      />

      {/* created at */}
      <PopupField
        label="Created at"
        fieldComponent={
          <input
            value={row.created_at}
            onChange={(e) => setCurrentRow({ ...row, created_at: e.target.value })}
            disabled={isDelete}
          />
        }
      />
    </CommonPopup>
  );
}
