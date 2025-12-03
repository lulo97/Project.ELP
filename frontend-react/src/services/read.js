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

  // Construct chunks
  // "a \n b \n c" -> [ {chunk: a, translate: ""}, ... ]
  let original_chunks = result_json.data.source_row.source.split("\n");
  original_chunks = original_chunks.filter((ele) => ele.trim().length > 0);
  original_chunks = original_chunks.map((chunk) => {
    const existing_chunk = result_json.data.source_translates.find(
      (ele) => ele.chunk === chunk
    );

    return {
      chunk: chunk,
      translate: existing_chunk ? existing_chunk.translate : "",
    };
  });
  result_json.data.original_chunks = [...original_chunks];
  result_json.data.chunks = [...original_chunks];

  return result_json;
}
