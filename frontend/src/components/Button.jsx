export function Button({ text, onClick }) {
  return (
    <button
      className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
