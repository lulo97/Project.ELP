// where_options = [{ field: "word", comparison_operation: "=" }]
export async function getWord({ word, where_options }) {
  if (!word) {
    throw Error("Word can't be null!");
  }
  const result = await fetch(
    `/api/words?word=${word}&where_options=${
      JSON.stringify(where_options) || ""
    }`,
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  return await result.json();;
}

export async function getAllWords({ pageIndex, pageSize, word }) {
  const result = await fetch(
    `/api/words?pageIndex=${pageIndex || ""}&pageSize=${pageSize || ""}&word=${
      word || ""
    }`,
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  const result_json = await result.json();
  return result_json;
}

export async function addWord({ row }) {
  const result = await fetch("/api/words", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(row),
  });
  const result_json = await result.json();
  return result_json;
}

export async function updateWord({ row }) {
  const result = await fetch(`/api/words/${row.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(row),
  });
  const result_json = await result.json();
  return result_json;
}

export async function deleteWord({ row }) {
  const result = await fetch(`/api/words/${row.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const result_json = await result.json();
  return result_json;
}
