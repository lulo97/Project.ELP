export function Avatar({ name, size = 40 }) {
  const firstLetter = (name || "?").charAt(0).toUpperCase();

  // Generate a consistent color for each name
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];
  const color = colors[name?.charCodeAt(0) % colors.length] || "bg-gray-500";

  return (
    <div
      className={`${color} rounded-full flex items-center justify-center text-white font-bold cursor-pointer`}
      style={{ width: size, height: size, fontSize: size / 2 }}
    >
      {firstLetter}
    </div>
  );
}
