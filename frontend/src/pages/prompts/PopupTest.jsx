import { CommonPopup } from "../../components/CommonPopup";
import { PopupField } from "../../components/PopupField";
import { message } from "../../providers/MessageProvider";
import { callAI } from "../../services/ai";
import { useState, useEffect } from "react";
import { Button } from "../../components/Button";

// Parse placeholders in square brackets: [context], [sentence], etc.
function parseBracketedString(input) {
  if (!input || input.length === 0) {
    throw Error("Something wrong with input = " + JSON.stringify(input));
  }

  const regex = /\[([^\]]*?)\]/g;
  const result = [];
  let match;

  while ((match = regex.exec(input)) !== null) {
    result.push(match[1].trim());
  }

  return result;
}

export function PopupTest({ show, title, row, handleClose }) {
  const [inputs, setInputs] = useState({});
  const [output, setOutput] = useState("");

  // Extract placeholders and initialize state
  useEffect(() => {
    if (!row || !row.prompt) return;

    const placeholders = parseBracketedString(row.prompt);

    // Initialize each placeholder with empty string if not already in state
    const initState = {};
    placeholders.forEach((p) => {
      initState[p] = inputs[p] || "";
    });

    setInputs(initState);
  }, [row]);

  if (!show) return null;

  const handleInputChange = (key, value) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <CommonPopup
      show={show}
      title={title}
      isShowConfirmButton={false}
      handleClose={() => {
        setInputs({});
        setOutput("");
        handleClose();
      }}
      customButton={
        <Button
          text="Test"
          onClick={async () => {
            const result = await callAI({
              input: inputs,
              feature: row.task_name,
              event_id: null,
            });

            if (result.error) {
              message({ type: "error", text: result.error });
              return;
            }

            setOutput(JSON.stringify(result.data, null, 2));
          }}
        />
      }
    >
      {/* Fixed fields */}
      <PopupField
        label="Id"
        fieldComponent={<input value={row.id} disabled />}
      />

      <PopupField
        label="Model name"
        fieldComponent={<input value={row.model_name} disabled />}
      />

      <PopupField
        label="Task name"
        fieldComponent={<input value={row.task_name} disabled />}
      />

      {/* Dynamic input fields */}
      {Object.keys(inputs).map((key) => (
        <PopupField
          key={key}
          label={`Input [${key}]`}
          fieldComponent={
            <textarea
              className="h-[10vh] w-full"
              value={inputs[key]}
              onChange={(e) => handleInputChange(key, e.target.value)}
            />
          }
        />
      ))}

      {/* Output */}
      <PopupField
        label="Output"
        fieldComponent={
          <textarea
            value={output}
            disabled
            className="h-[30vh] w-full"
          />
        }
      />
    </CommonPopup>
  );
}
