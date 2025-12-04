import { useState, useEffect } from "react";

// Declare className=ALLOW_SELECTED to allow this hook to catch selected text
export const ALLOW_SELECTED = "ALLOW_SELECTED";

export function useSelectedText() {
  const [selectedText, setSelectedText] = useState("");

  function isNotSelected(event) {
    const target = event.target;

    if (
      target?.className?.includes(ALLOW_SELECTED) ||
      target?.parentElement?.className?.includes(ALLOW_SELECTED)
    ) {
      return false;
    }

    return true;
  }

  useEffect(() => {
    function handleSelection(event) {
      const selection = window.getSelection();
      const text = selection.toString();

      if (isNotSelected(event)) return;

      setSelectedText(text);
    }

    function handleClick(event) {
      const selection = window.getSelection();
      const text = selection.toString();

      if (isNotSelected(event)) return;

      if (!text) {
        setSelectedText(""); // clear if nothing selected
      }
    }

    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("keyup", handleSelection);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("keyup", handleSelection);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return { selectedText };
}
