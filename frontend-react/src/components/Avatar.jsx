export function Avatar({ name, size = "medium" }) {
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

  // Map string sizes → pixel values
  const sizeMap = {
    small: 30,
    medium: 40,
    large: 60,
  };

  // If size is a string, convert to pixel value. If number, use directly.
  const pixelSize =
    typeof size === "string" ? sizeMap[size] || sizeMap.medium : size;

  return (
    <div
      className={`${color} rounded-full flex items-center justify-center text-white font-bold cursor-pointer`}
      style={{
        width: pixelSize,
        height: pixelSize,
        fontSize: pixelSize / 2,
      }}
    >
      {firstLetter}
    </div>
  );
}
