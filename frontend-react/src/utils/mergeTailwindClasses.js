function getUtilityBase(utilityPart) {
  if (utilityPart === "border") return "border-width";
  if (/^border-(\d+)$/.test(utilityPart)) return "border-width";
  if (/^border-(solid|dashed|dotted|double|none)$/.test(utilityPart))
    return "border-style";
  if (/^border-(.+)/.test(utilityPart)) {
    const colorMatch = utilityPart.match(/^border-(.+)/);
    const val = colorMatch[1];
    if (val.match(/^\[.*\]$/)) {
      return "border-width"; // arbitrary width
    }
    return "border-color";
  }

  // Flex utilities
  if (utilityPart === "flex") return "flex-display";
  if (/^flex-(col|row|row-reverse|col-reverse)$/.test(utilityPart))
    return "flex-direction";
  if (/^flex-(1|auto|initial|none)$/.test(utilityPart)) return "flex-grow";

  // Height and width
  if (/^(h|w)-.+/.test(utilityPart)) {
    return utilityPart.split("-")[0]; // "h" or "w"
  }

  // General fallback: take the first part before - or [
  const match = utilityPart.match(/^([^\-\[]+)/);
  return match ? match[1] : utilityPart;
}

export function mergeTailwindClasses(className) {
  try {
    className.trim().split(/\s+/);
  } catch (error) {
    console.log(className);
  }
  const tokens = className.trim().split(/\s+/);

  // Maps baseKey => token, last occurrence index
  const groups = new Map();

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const parts = token.split(":");
    const utilityPart = parts.pop();

    const baseUtility = getUtilityBase(utilityPart);
    const key = parts.length
      ? parts.join(":") + ":" + baseUtility
      : baseUtility;

    // Always overwrite to keep last occurrence and track last index
    groups.set(key, { token, index: i });
  }

  // Sort by last occurrence index to preserve final order
  const sorted = [...groups.entries()]
    .sort((a, b) => a[1].index - b[1].index)
    .map(([_, val]) => val.token);

  return sorted.join(" ");
}

const testCases = [
  {
    input: "p-2 p-4",
    expected: "p-4",
    description: "Should keep the last padding class",
  },
  {
    input: "m-1 m-3",
    expected: "m-3",
    description: "Should keep the last margin class",
  },
  {
    input: "bg-red-500 bg-blue-300",
    expected: "bg-blue-300",
    description: "Should keep the last background color",
  },
  {
    input: "text-sm text-lg",
    expected: "text-lg",
    description: "Should keep the last text size",
  },
  {
    input: "font-bold font-light",
    expected: "font-light",
    description: "Should keep the last font weight",
  },
  {
    input: "w-1/2 w-2/3",
    expected: "w-2/3",
    description: "Should keep the last width with fraction",
  },
  {
    input: "sm:p-2 sm:p-4",
    expected: "sm:p-4",
    description: "Should handle responsive variants",
  },
  {
    input: "hover:bg-red-500 hover:bg-blue-300",
    expected: "hover:bg-blue-300",
    description: "Should handle state variants",
  },
  {
    input: "sm:hover:bg-red-500 md:focus:bg-green-300 sm:hover:bg-blue-300",
    expected: "sm:hover:bg-blue-300 md:focus:bg-green-300",
    description: "Should handle combined variants",
  },
  {
    input: "p-4 m-2",
    expected: "p-4 m-2",
    description: "Should keep non-conflicting classes",
  },
  {
    input: "w-[100px] w-[200px]",
    expected: "w-[200px]",
    description: "Should handle arbitrary values",
  },
  {
    input: "border border-2 border-red-500 border-blue-400",
    expected: "border-2 border-blue-400",
    description: "Should keep the last border width and color",
  },
  {
    input: "text-gray-700 text-gray-800",
    expected: "text-gray-800",
    description: "Should keep the last text color",
  },
  {
    input: "rounded rounded-md rounded-lg",
    expected: "rounded-lg",
    description: "Should keep the last border radius",
  },
  {
    input: "flex flex-col flex-row",
    expected: "flex-row",
    description: "Should keep the last flex direction",
  },
];

function runTests(mergeFn) {
  testCases.forEach(({ input, expected, description }, i) => {
    const result = mergeFn(input);
    if (result === expected) {
      console.log(`Test ${i + 1} passed: ${description}`);
    } else {
      console.error(`Test ${i + 1} failed: ${description}`);
      console.error(`   Input:    "${input}"`);
      console.error(`   Expected: "${expected}"`);
      console.error(`   Got:      "${result}"`);
    }
  });
}

//runTests(mergeTailwindClasses);
