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
        authorization: localStorage.getItem("token"),
      },
    }
  );
  const result_json = await result.json();
  if (result_json.data.length > 0) {
    return result_json.data[0];
  }
  return null;
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
    },
    body: JSON.stringify(row),
  });
}

export async function updateWord({ row }) {
  const result = await fetch(`/api/words/${row.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(row),
  });
}

export async function deleteWord({ row }) {
  const result = await fetch(`/api/words/${row.id}`, {
    method: "DELETE",
  });
}
