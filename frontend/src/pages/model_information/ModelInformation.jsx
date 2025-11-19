import { useEffect, useState } from "react";
import { message } from "../../providers/MessageProvider";
import { SelectNoStyle } from "../../components/Select";
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";
import { getModelInformations } from "../../services/model_informations";
import { PageTitle } from "../../components/PageTitle";

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
  const [paginationData, setPaginationData] = useState({});

  async function fetchData(
    { pageIndex, pageSize } = {
      pageIndex: paginationData.pageIndex || null,
      pageSize: paginationData.pageSize || 5,
    }
  ) {
    const result = await getModelInformations({ pageIndex, pageSize });

    if (result.error) {
      message({ type: "error", text: result.error });
      return;
    }

    const result_data = result.data[0].result;

    setState({
      ...result_data,
      selected_model_name: result_data.model_name, //Init as current model_name
    });

    setPaginationData(result.pagination);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleUpdateConsts() {
    if (!state.selected_model_name) {
      message({ type: "warning", text: "Selected model name null!" });
      return;
    }

    if (state.selected_model_name == state.model_name) {
      message({ type: "warning", text: "Change model name to apply!" });
      return;
    }

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
    <div className="p-4 bg-gray-100 h-[90vh]">
      <PageTitle title={"Model Information"} />

      <div className="px-4 py-4 mb-2 rounded-xl border bg-white shadow-sm">
        <div className="text-sm font-medium text-gray-700">Current model</div>

        <SelectNoStyle
          onChange={(e) => {
            setState((old_state) => ({
              ...old_state,
              selected_model_name: e.target.value,
            }));
          }}
          options={state.all_model_names.map((ele) => ({
            id: ele,
            name: ele,
          }))}
          value={state.model_name}
          className="mr-4"
        />

        <Button text="Apply" onClick={handleUpdateConsts} />
      </div>

      <Table
        columns={[
          { id: "id", name: "Id" },
          { id: "model_name", name: "Model name" },
          { id: "task_name", name: "Task name" },
          { id: "prompt", name: "Prompt" },
          { id: "description", name: "Description" },
        ]}
        rows={state.prompts}
        openPopup={() => {}}
        fetchData={fetchData}
        showActionColumn={false}
        paginationData={paginationData}
      />
    </div>
  );
}
