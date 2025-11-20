import { CommonPopup } from "../../components/CommonPopup";
import { PopupField } from "../../components/PopupField";
import { SelectWithInput } from "../../components/SelectWithInput";
import { getPromptMetadata } from "../../services/prompts";
import { message } from "../../providers/MessageProvider";
import { useEffect, useState } from "react";

export function Popup({
  show,
  title,
  action,
  row,
  setCurrentRow,
  handleConfirm,
  handleClose,
}) {
  const [options, setOptions] = useState(null);

  async function fetchData() {
    const result = await getPromptMetadata();

    if (result.error) {
      message({ type: "error", text: result.error });
      return;
    }

    const { task_names, model_names } = JSON.parse(result.data[0].result);

    const options = {
      task_names: [...new Set(task_names)].map((ele) => ({
        id: ele,
        name: ele,
      })),
      model_names: model_names.map((ele) => ({ id: ele, name: ele })),
    };

    setOptions(options);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!show) return null;

  if (!options) return <div>Loading...</div>;

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
          <SelectWithInput
            onChange={(e) => {
              setCurrentRow({ ...row, model_name: e.target.value });
            }}
            options={options.model_names}
            value={row.model_name}
            disabled={action == "DELETE" ? true : false}
          />
        }
      />

      <PopupField
        label="Task name"
        fieldComponent={
          <SelectWithInput
            onChange={(e) => {
              setCurrentRow({ ...row, task_name: e.target.value });
            }}
            options={options.task_names}
            value={row.task_name}
            disabled={action == "DELETE" ? true : false}
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
