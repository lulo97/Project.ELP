import React, { useRef, useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  Modifier,
  getDefaultKeyBinding,
} from "draft-js";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";

// Toolbar button definition
const INLINE_STYLES = [
  { label: "Bold", style: "BOLD", className: "font-bold" },
  { label: "Italic", style: "ITALIC", className: "italic" },
  { label: "Underline", style: "UNDERLINE", className: "underline" },
];

function ToolbarButton({
  label,
  style,
  active,
  onToggle,
  extraClass,
  isUpload,
  onUploadClick,
}) {
  if (isUpload) {
    return (
      <button
        type="button"
        onClick={onUploadClick}
        className="px-2 py-1 border rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onToggle(style);
      }}
      className={`px-2 py-1 border rounded mr-2 ${
        active ? "text-blue-600" : "text-gray-700"
      } ${extraClass}`}
    >
      {label}
    </button>
  );
}

export function RichTextEditorWithUpload({
  initialValue = "",
  onChange,
  placeholder = "Start typing...",
}) {
  if (!onChange) throw Error("onChange must not null!");

  const fileInputRef = useRef(null);

  const [editorState, setEditorState] = useState(() => {
    if (!initialValue) return EditorState.createEmpty();

    const blocksFromHTML = htmlToDraft(initialValue);
    const { contentBlocks, entityMap } = blocksFromHTML;

    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );

    return EditorState.createWithContent(contentState);
  });

  const currentStyle = editorState.getCurrentInlineStyle();

  const toggleInlineStyle = (style) => {
    const newState = RichUtils.toggleInlineStyle(editorState, style);
    setEditorState(newState);
    onChange(draftToHtml(convertToRaw(newState.getCurrentContent())));
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
    onChange(draftToHtml(convertToRaw(state.getCurrentContent())));
  };

  const keyBindingFn = (e) => {
    if (e.key === "Tab") return "insert-4-spaces";
    if (e.ctrlKey && e.key.toLowerCase() === "b") return "bold";
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command, editorState) => {
    if (command === "insert-4-spaces") {
      const currentContent = editorState.getCurrentContent();
      const selection = editorState.getSelection();
      const newContent = Modifier.insertText(currentContent, selection, "    ");
      const newState = EditorState.push(
        editorState,
        newContent,
        "insert-characters"
      );
      setEditorState(newState);
      onChange(draftToHtml(convertToRaw(newState.getCurrentContent())));
      return "handled";
    }

    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      onChange(draftToHtml(convertToRaw(newState.getCurrentContent())));
      return "handled";
    }

    return "not-handled";
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "text/plain") {
      alert("Please upload a .txt file.");
      return;
    }
    const text = await file.text();
    const newState = EditorState.createWithContent(
      ContentState.createFromText(text)
    );
    setEditorState(newState);
    onChange(text);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col flex-1 px-3 py-3 border border-gray-300 rounded-md shadow-sm h-[50vh]">
      {/* Toolbar */}
      <div className="mb-2 flex space-x-2">
        {INLINE_STYLES.map((btn) => (
          <ToolbarButton
            key={btn.style}
            label={btn.label}
            style={btn.style}
            active={currentStyle.has(btn.style)}
            onToggle={toggleInlineStyle}
            extraClass={btn.className}
          />
        ))}

        {/* Upload button as toolbar item */}
        <ToolbarButton
          label="Upload .txt"
          isUpload
          onUploadClick={handleUploadClick}
        />
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        accept=".txt"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Editor */}
      <div className="flex-1 border rounded p-2 overflow-y-auto min-h-[200px]">
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          placeholder={placeholder}
          keyBindingFn={keyBindingFn}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div>
  );
}
