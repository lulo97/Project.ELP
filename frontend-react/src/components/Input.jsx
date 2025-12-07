import React from "react";
import { mergeTailwindClasses } from "../utils/mergeTailwindClasses";

export function Input({ label, className = "", padding = "", inputClassName = "", ...props }) {
  const _padding = padding || "px-3 py-2";

  return (
    <div
      className={mergeTailwindClasses([
        "flex items-center w-full",
        "border border-gray-300 rounded-md shadow-sm overflow-hidden",
        "focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500",
        className,
      ].join(" "))}
    >
      {label && (
        <span className={`bg-gray-100 text-gray-700 text-sm ${_padding} whitespace-nowrap`}>
          {label}
        </span>
      )}

      <input
        {...props}
        className={mergeTailwindClasses([
          `flex-1 ${_padding}`,
          "text-sm text-gray-800 bg-white",
          "focus:outline-none",
          inputClassName
        ].join(" "))}
      />
    </div>
  );
}
