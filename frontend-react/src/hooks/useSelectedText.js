import { useState, useEffect } from "react";

export function useSelectedText() {
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    function handleSelection() {
      const text = window.getSelection().toString();
      setSelectedText(text);
    }

    function handleClick() {
      const text = window.getSelection().toString();
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

  return selectedText;
}