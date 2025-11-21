let cachedConsts = null;

export async function initConsts() {
  if (cachedConsts) return cachedConsts;

  const response = await fetch("/api/redis?key=CONSTS");
  const response_json = await response.json();

  const response_mapped = response_json.data.reduce((acc, ele) => {
    acc[ele.key] = ele.value;
    return acc;
  }, {});

  cachedConsts = response_mapped;
  return cachedConsts;
}

export function getConsts() {
  if (!cachedConsts) {
    throw new Error("Consts not initialized. Call initConsts() first.");
  }
  return cachedConsts;
}
