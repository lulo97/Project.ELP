import { CommonPopup } from "../../components/CommonPopup";
import { PopupField } from "../../components/PopupField";
import { message } from "../../providers/MessageProvider";
import { callAI } from "../../services/ai";
import { useState } from "react";
import { Button } from "../../components/Button";

export function PopupTest({ show, title, row, handleClose }) {
  const [input, setInput] = useState({ context: "" });
  const [output, setOutput] = useState("");

  return (
    <CommonPopup
      show={show}
      title={title}
      isShowConfirmButton={false}
      handleClose={() => {
        setInput("");
        setOutput("");
        handleClose();
      }}
      customButton={
        <Button
          text="Test"
          onClick={async () => {
            const result = await callAI({
              input,
              feature: "SUMMARY",
              event_id: null,
            });

            if (result.error) {
              message({ type: "error", text: result.error });
              return;
            }

            setOutput(JSON.stringify(result.data));
          }}
        />
      }
    >
      <PopupField
        label="Id"
        fieldComponent={<input value={row.id} disabled />}
      />

      <PopupField
        label="Model name"
        fieldComponent={<input value={row.model_name} disabled={true} />}
      />

      <PopupField
        label="Task name"
        fieldComponent={<input value={row.task_name} disabled={true} />}
      />

      <PopupField
        label="Input"
        fieldComponent={
          <textarea
            className="h-[30vh]"
            value={input.context}
            onChange={(e) => setInput({ context: e.target.value })}
          />
        }
      />

      <PopupField
        label="Output"
        fieldComponent={
          <textarea
            value={output}
            disabled
            className="h-[30vh]"
          />
        }
      />
    </CommonPopup>
  );
}
