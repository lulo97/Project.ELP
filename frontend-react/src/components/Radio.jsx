import React, { useId, useState, useEffect } from "react";

export function Radio({
  value = "",
  onClick = () => {},
  checked = true,
  disabled = false,
  className = "",
  labelClassName = "",
  size = "small",
  children,
}) {
  const sizeClasses = {
    small: "w-3 h-3 border-2",
    default: "w-4 h-4 border-2",
    large: "w-5 h-5 border-2",
  };

  function localOnClick(event) {
    onClick();
  }

  return (
    <label
      className={`inline-flex items-center gap-2 cursor-pointer ${
        disabled ? "cursor-not-allowed" : ""
      } ${className}`}
    >
      <span
        className={`relative flex items-center justify-center rounded-full ${
          size === "small" ? "p-0.5" : size === "large" ? "p-[6px]" : "p-1"
        }`}
      >
        <span
          className={`flex items-center justify-center rounded-full border transition-all duration-150 ease-in-out ${sizeClasses[size]} ${checked ? "border-transparent" : "border-gray-300"} bg-white`}
          style={{
            boxShadow: checked ? "0 0 0 4px rgba(24,144,255,0.08)" : undefined,
          }}
        >
          <span
            className={`rounded-full transform transition-transform duration-150 ease-in-out ${
              size === "small"
                ? "w-1.5 h-1.5"
                : size === "large"
                ? "w-3 h-3"
                : "w-2 h-2"
            } ${checked ? "scale-100" : "scale-0"}`}
            style={{
              backgroundColor: checked ? "#91d5ff" : "#91d5ff transparent",
            }}
          />
        </span>
      </span>

      <input
        type="radio"
        value={String(value)}
        checked={checked}
        disabled={disabled}
        className="sr-only"
        onClick={localOnClick}
      />

      <span
        className={labelClassName ? labelClassName : `text-sm text-gray-900`}
      >
        {children}
      </span>
    </label>
  );
}

/*
Standalone:
<Radio value="a" checked={val === 'a'} onChange={(c) => c && setVal('a')}>Option A</Radio>
<Radio value="b" checked={val === 'b'} onChange={(c) => c && setVal('b')}>Option B</Radio>
<Radio value="c" disabled>Disabled</Radio>
*/
