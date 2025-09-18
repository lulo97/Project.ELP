import { CommonPopup } from "../../../components/CommonPopup";

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
    >
      <div>
        <label>Id</label>
        <input value={row.id} disabled />
      </div>

      <div>
        <label>Word</label>
        <input
          value={row.word}
          disabled
          onChange={(e) => setCurrentRow({ ...row, word: e.target.value })}
        />
      </div>

      <div>
        <label>Part of speech</label>
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
      </div>

      <div>
        <label>Example</label>
        <textarea
          value={row.example}
          disabled={action == "DELETE" ? true : false}
          onChange={(e) => setCurrentRow({ ...row, example: e.target.value })}
        />
      </div>

      <button onClick={() => handleConfirm({ action })}>Confirm</button>
      <button onClick={handleClose}>Close</button>
    </CommonPopup>
  );
}
