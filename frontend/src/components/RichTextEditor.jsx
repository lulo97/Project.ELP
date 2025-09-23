import React, { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  getDefaultKeyBinding,
  KeyBindingUtil,
} from "draft-js";
import "draft-js/dist/Draft.css";

// Toolbar button definition
const INLINE_STYLES = [
  { label: "Bold", style: "BOLD", className: "font-bold" },
  { label: "Italic", style: "ITALIC", className: "italic" },
  { label: "Underline", style: "UNDERLINE", className: "underline" },
];

function ToolbarButton({ label, style, active, onToggle, extraClass }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onToggle(style);
      }}
      className={`px-2 py-1 border rounded ${
        active ? "text-blue-600" : "text-gray-700"
      } ${extraClass}`}
    >
      {label}
    </button>
  );
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start typing...",
  className = "",
}) {
  const [editorState, setEditorState] = useState(
    value || EditorState.createEmpty()
  );

  const currentStyle = editorState.getCurrentInlineStyle();

  const toggleInlineStyle = (style) => {
    const newState = RichUtils.toggleInlineStyle(editorState, style);
    setEditorState(newState);
    onChange?.(newState);
  };

  // Custom key binding
  const keyBindingFn = (e) => {
    if (e.key === "Tab") {
      return "insert-4-spaces";
    }
    return getDefaultKeyBinding(e);
  };

  // Handle custom command
  const handleKeyCommand = (command, editorState) => {
    if (command === "insert-4-spaces") {
      const currentContent = editorState.getCurrentContent();
      const selection = editorState.getSelection();

      const newContent = Modifier.insertText(currentContent, selection, "    "); // 4 spaces
      const newState = EditorState.push(editorState, newContent, "insert-characters");

      setEditorState(newState);
      onChange?.(newState);
      return "handled";
    }
    return "not-handled";
  };

  return (
    <div className={`p-4 border rounded ${className}`}>
      {/* Toolbar */}
      <div className="mb-2 space-x-2">
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
      </div>

      {/* Editor */}
      <Editor
        editorState={editorState}
        onChange={(newState) => {
          setEditorState(newState);
          onChange?.(newState);
        }}
        placeholder={placeholder}
        keyBindingFn={keyBindingFn}
        handleKeyCommand={handleKeyCommand}
      />
    </div>
  );
}
