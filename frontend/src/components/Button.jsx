export function Button({ text, onClick, disabled = false, className = "" }) {
  return (
    <button
      disabled={disabled}
      className={`
        px-4 py-2 rounded-lg shadow-md transition w-fit
        ${disabled
          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
        }
        ${" " + className}
      `}
      onClick={() => !disabled && onClick()}
    >
      {text}
    </button>
  );
}
