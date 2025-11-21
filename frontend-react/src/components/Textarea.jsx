import React from "react";
import { useRef, useEffect } from "react";

export function Textarea({ className = "", isFitContent = false, ...props }) {

  const textareaRef = useRef(null);

  useEffect(() => {
    if (!isFitContent) return;

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 3 + "px";
    }
  }, [props.value]);

  return (
    <textarea
      ref={textareaRef}
      {...props}
      className={[
        "px-3 py-2",
        "border border-gray-300 rounded-md shadow-sm",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        "text-sm text-gray-800",
        className,
      ].join(" ")}
    />
  );
}
