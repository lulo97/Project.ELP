import { CommonPopup } from "../../components/CommonPopup";
import { PopupField } from "../../components/PopupField";
import { SelectNoStyle } from "../../components/Select";
import { RichTextEditor } from "../../components/RichTextEditor";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { useState } from "react";

export function Popup({
  show,
  title,
  action,
  row,
  setCurrentRow,
  handleConfirm,
  handleClose,
}) {
  const isDelete = action === "DELETE";

  const [editorState, setEditorState] = useState(() => {
    try {
      if (row?.review) {
        const blocksFromHtml = htmlToDraft(row.review);
        const contentState = ContentState.createFromBlockArray(
          blocksFromHtml.contentBlocks,
          blocksFromHtml.entityMap
        );
        return EditorState.createWithContent(contentState);
      }
      return EditorState.createEmpty();
    } catch {
      return EditorState.createEmpty();
    }
  });

  const handleEditorChange = (state) => {
    setEditorState(state);

    const rawContent = convertToRaw(state.getCurrentContent());
    const html = draftToHtml(rawContent);

    setCurrentRow({ ...row, note: html })
  };

  return (
    <CommonPopup
      show={show}
      title={title}
      handleConfirm={() => handleConfirm({ action })}
      handleClose={handleClose}
    >
      {/* id */}
      <PopupField
        label="Id"
        fieldComponent={<input value={row.id} disabled />}
      />

      {/* word */}
      <PopupField
        label="Word"
        fieldComponent={
          <input
            value={row.word}
            disabled={isDelete}
            onChange={(e) => setCurrentRow({ ...row, word: e.target.value })}
          />
        }
      />

      {/* synomym */}
      <PopupField
        label="Synomym"
        fieldComponent={
          <input
            value={row.synomym}
            disabled={isDelete}
            onChange={(e) => setCurrentRow({ ...row, synomym: e.target.value })}
          />
        }
      />

      {/* note */}
      <PopupField
        label="Note"
        fieldComponent={
          <RichTextEditor
            disabled={isDelete}
            className="w-full h-80"
            value={editorState}
            onChange={handleEditorChange}
            placeholder="Type your review here..."
          />
        }
      />
    </CommonPopup>
  );
}
