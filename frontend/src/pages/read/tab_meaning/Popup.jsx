import { CommonPopup } from "../../../components/CommonPopup";
import { PopupField } from "../../../components/PopupField";
import { SelectNoStyle } from "../../../components/Select";
import { getTranslation } from "../../../utils/getTranslation";
import { translation } from "../Read.Translate";

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
      handleConfirm={() => handleConfirm({ action })}
      handleClose={handleClose}
    >
      <PopupField
        label={getTranslation("Id")}
        fieldComponent={<input value={row.id} disabled />}
      />

      <PopupField
        label={getTranslation("Word", translation)}
        fieldComponent={
          <input
            value={row.word}
            disabled
            onChange={(e) => setCurrentRow({ ...row, word: e.target.value })}
          />
        }
      />

      <PopupField
        label={getTranslation("Meaning", translation)}
        fieldComponent={
          <input
            value={row.meaning}
            disabled={action == "DELETE" ? true : false}
            onChange={(e) => setCurrentRow({ ...row, meaning: e.target.value })}
          />
        }
      />

      <PopupField
        label={getTranslation("PartOfSpeech", translation)}
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
    </CommonPopup>
  );
}
