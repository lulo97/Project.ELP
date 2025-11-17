import { useState, useEffect } from "react";
import { RichTextEditor } from "./RichTextEditor";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { mergeTailwindClasses } from "../utils/mergeTailwindClasses";

function htmlStringToState(html) {
  const blocksFromHtml = htmlToDraft(html);
  const contentState = ContentState.createFromBlockArray(
    blocksFromHtml.contentBlocks,
    blocksFromHtml.entityMap
  );
  return EditorState.createWithContent(contentState);
}

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
        return htmlStringToState(value);
      }
      return EditorState.createEmpty();
    } catch {
      return EditorState.createEmpty();
    }
  });

  useEffect(() => {
    if (!value) return;
    setEditorState(htmlStringToState(value));
    console.log("Detect value change, value = ", value);
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
