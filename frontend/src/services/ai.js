export async function callAI({ input = {}, feature = "", event_id = "" }) {
  const result = await fetch(`/api/ai`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input, feature, event_id }),
  });
  const result_json = await result.json();
  return result_json;
}
