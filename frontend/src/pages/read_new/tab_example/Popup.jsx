import { CommonPopup } from "../../../components/CommonPopup";
import { PopupField } from "../../../components/PopupField";
import { SelectNoStyle } from "../../../components/Select";

export function Popup({
  show,
  title,
  action,
  row,
  setCurrentRow,
  handleConfirm,
  handleClose,
  partOfSpeechs,
}) {
  return (
    <CommonPopup
      show={show}
      title={title}
      overWrittenBoxStyle={{
        width: "80%",
        height: "80%",
      }}
      handleClose={handleClose}
      handleConfirm={() => handleConfirm({ action })}
    >
      <PopupField
        label={"Id"}
        fieldComponent={<input value={row.id} disabled />}
      />

      <PopupField
        label={"Word"}
        fieldComponent={
          <input
            value={row.word}
            disabled
            onChange={(e) => setCurrentRow({ ...row, word: e.target.value })}
          />
        }
      />

      <PopupField
        label={"Part of speech"}
        fieldComponent={
          <SelectNoStyle
            disabled={action == "DELETE" ? true : false}
            onChange={(e) => {
              setCurrentRow({ ...row, part_of_speech: e.target.value });
            }}
            options={partOfSpeechs}
          />
        }
      />

      <PopupField
        label={"Example"}
        fieldComponent={
          <textarea
            value={row.example}
            disabled={action == "DELETE" ? true : false}
            onChange={(e) => setCurrentRow({ ...row, example: e.target.value })}
          />
        }
      />
    </CommonPopup>
  );
}
