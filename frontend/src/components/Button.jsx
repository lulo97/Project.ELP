import { mergeTailwindClasses } from "../utils/mergeTailwindClasses";

export function Button({
  text,
  onClick = () => {},
  disabled = false,
  className = "",
  ...props
}) {
  const _className = `
        rounded-lg shadow-md transition w-fit
        ${
          disabled
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }
        px-4 py-2  /* defaults */
        ${className} /* parent overrides */
      `;
  return (
    <button
      {...props}
      disabled={disabled}
      className={mergeTailwindClasses(_className)}
      onClick={() => !disabled && onClick()}
    >
      {text}
    </button>
  );
}
