import React, { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
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
      />
    </div>
  );
}
