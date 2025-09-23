export function mergeTailwindClasses(className) {
  const groups = {};

  const tokens = className.trim().split(/\s+/);

  for (const token of tokens) {
    // Example: "sm:hover:bg-red-500"
    // split into ["sm:hover", "bg-red-500"]
    const parts = token.split(":");
    const base = parts.pop();      // utility part (e.g., bg-red-500)
    const prefix = parts.join(":"); // variant part (e.g., sm:hover)

    // group key ensures variants are grouped separately
    const key = prefix ? prefix + ":" + base.replace(/[-]?\d.*$/, "").replace(/\/.*/, "") 
                       : base.replace(/[-]?\d.*$/, "").replace(/\/.*/, "");

    groups[key] = token; // overwrite → newest wins
  }

  return Object.values(groups).join(" ");
}
