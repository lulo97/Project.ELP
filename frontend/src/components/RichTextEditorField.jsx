import { useState, useEffect } from "react";
import { RichTextEditor } from "./RichTextEditor";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { mergeTailwindClasses } from "../utils/mergeTailwindClasses";

export function RichTextEditorField({
  value,
  onChange,
  disabled,
  placeholder,
  className,
}) {
  const [editorState, setEditorState] = useState(() => {
    try {
      if (value) {
        const blocksFromHtml = htmlToDraft(value);
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

  // Keep editor in sync if `value` prop changes externally
  useEffect(() => {
    if (!value) return;
    const blocksFromHtml = htmlToDraft(value);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHtml.contentBlocks,
      blocksFromHtml.entityMap
    );
    setEditorState(EditorState.createWithContent(contentState));
  }, [value]);

  const handleEditorChange = (state) => {
    setEditorState(state);
    const rawContent = convertToRaw(state.getCurrentContent());
    const html = draftToHtml(rawContent);
    onChange(html);
  };

  return (
    <RichTextEditor
      value={editorState}
      onChange={handleEditorChange}
      disabled={disabled}
      placeholder={placeholder}
      className={mergeTailwindClasses("w-full h-80 " + className)}
    />
  );
}
