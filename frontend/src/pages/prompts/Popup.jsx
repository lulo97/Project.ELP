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
        label="Model name"
        fieldComponent={
          <input
            value={row.model_name}
            disabled={action == "DELETE" ? true : false}
            onChange={(e) =>
              setCurrentRow({ ...row, model_name: e.target.value })
            }
          />
        }
      />

      <PopupField
        label="Task name"
        fieldComponent={
          <input
            value={row.task_name}
            disabled={action == "DELETE" ? true : false}
            onChange={(e) =>
              setCurrentRow({ ...row, task_name: e.target.value })
            }
          />
        }
      />

      <PopupField
        label="Prompt"
        fieldComponent={
          <textarea
            className="h-[50vh]"
            value={row.prompt}
            disabled={action == "DELETE" ? true : false}
            onChange={(e) => setCurrentRow({ ...row, prompt: e.target.value })}
          />
        }
      />

      <PopupField
        label="Description"
        fieldComponent={
          <input
            value={row.description}
            disabled={action == "DELETE" ? true : false}
            onChange={(e) =>
              setCurrentRow({ ...row, description: e.target.value })
            }
          />
        }
      />
    </CommonPopup>
  );
}
