import { CommonPopup } from "../../components/CommonPopup";
import { PopupField } from "../../components/PopupField";
import { getTranslation as _getTranslation } from "../../utils/getTranslation";
import { translation } from "./Word.Translation";

const getTranslation = (key) => _getTranslation(key, translation);

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
      title={getTranslation(title)}
      handleConfirm={() => handleConfirm({ action })}
      handleClose={handleClose}
    >
      <PopupField
        label={getTranslation("Id")}
        fieldComponent={<input value={row.id} disabled />}
      />

      <PopupField
        label={getTranslation("Word")}
        fieldComponent={
          <input
            value={row.word}
            disabled={action == "DELETE" ? true : false}
            onChange={(e) => setCurrentRow({ ...row, word: e.target.value })}
          />
        }
      />
    </CommonPopup>
  );
}
