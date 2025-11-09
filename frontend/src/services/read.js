export async function getReadData({ source_id }) {
  if (!source_id) {
    throw new Error("source_id can't be null or undefined!");
  }

  const res = await fetch(
    `/api/read?source_id=${encodeURIComponent(source_id)}`,
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  const result_json = await res.json();
  return result_json;
}
