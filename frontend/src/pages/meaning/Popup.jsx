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
  partOfSpeechs,
}) {
  return (
    <CommonPopup
      show={show}
      title={title}
      handleConfirm={() => handleConfirm({ action })}
      handleClose={handleClose}
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
            disabled={action == "DELETE" ? true : false}
            onChange={(e) => setCurrentRow({ ...row, word: e.target.value })}
          />
        }
      />

      <PopupField
        label={"Meaning"}
        fieldComponent={
          <input
            value={row.meaning}
            disabled={action == "DELETE" ? true : false}
            onChange={(e) => setCurrentRow({ ...row, meaning: e.target.value })}
          />
        }
      />
      
      <PopupField
        label={"Part of speech"}
        fieldComponent={
          <select
            disabled={action == "DELETE" ? true : false}
            onChange={(e) => {
              setCurrentRow({ ...row, part_of_speech: e.target.value });
            }}
          >
            {partOfSpeechs.map((ele) => {
              return <option value={ele.id}>{ele.name}</option>;
            })}
          </select>
        }
      />
    </CommonPopup>
  );
}
