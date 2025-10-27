export async function callAI({ input = {}, feature = "" }) {
  const result = await fetch(`/api/ai`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input, feature }),
  });
  const result_json = await result.json();
  return result_json;
}
