import { mergeTailwindClasses } from "../utils/mergeTailwindClasses";

export function OutlinedButton({
  text,
  onClick,
  disabled = false,
  className = "",
}) {
  const _className = `
    rounded-lg border transition w-fit
    px-4 py-2
    ${
      disabled
        ? "border-gray-300 text-gray-400 cursor-not-allowed"
        : "border-indigo-600 text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100"
    }
    ${className}
  `;

  return (
    <button
      disabled={disabled}
      className={mergeTailwindClasses(_className)}
      onClick={() => !disabled && onClick?.()}
    >
      {text}
    </button>
  );
}
