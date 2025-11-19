import { useEffect, useState } from "react";
import { message } from "../../providers/MessageProvider";
import { SelectNoStyle } from "../../components/Select";
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";
import { getModelInformations } from "../../services/model_informations"


const EMPTY_STATE = {
  //Table CONSTS key = MODEL_NAME
  model_name: "123",
  selected_model_name: "",
  //Unique list of model_name
  all_model_names: [],
  //Rows of prompts table of current model_name
  prompts: [{}],
};

export function ModelInformation() {
  const [state, setState] = useState(EMPTY_STATE);

  async function fetchData() {
    const result = await getModelInformations();

    if (result.error) {
      message({ type: "error", text: result.error });
      return;
    }

    setState({
      ...result.data,
      selected_model_name: result.data.model_name, //Init as current model_name
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleUpdateConsts() {
    if (!state.selected_model_name) return;

    const result = await updateConsts({
      key: "MODEL_NAME",
      value: state.selected_model_name,
    });

    if (result.error) {
      message({ type: "error", text: result.error });
      return;
    }

    fetchData();
  }

  return (
    <div>
      <div>
        <div>Current model</div>
        <SelectNoStyle
          onChange={(e) => {
            setState((old_state) => ({
              ...old_state,
              selected_model_name: e.target.value,
            }));
          }}
          options={state.all_model_names.map((ele) => {
            return {
              id: ele,
              name: ele,
            };
          })}
          value={state.model_name}
          className=""
        />
        <Button text={"Apply"} onClick={handleUpdateConsts} />
      </div>

      <Table
        columns={[
          { id: "id", name: "Id" },
          { id: "model_name", name: "Model name" },
          { id: "prompt", name: "Prompt" },
          { id: "active", name: "Active" },
          { id: "description", name: "Description" },
        ]}
        rows={state.prompts}
        openPopup={() => {}}
        fetchData={fetchData}
      />
    </div>
  );
}
