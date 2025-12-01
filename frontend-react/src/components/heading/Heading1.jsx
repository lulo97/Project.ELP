export function Heading1({ className = "", children }) {
  return (
    <h2 className={`text-lg font-semibold text-gray-800 ${className}`}>
      {children}
    </h2>
  );
}
