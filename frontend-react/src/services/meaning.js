// -------------------- GET SINGLE MEANING --------------------
export async function getMeaning({ meaning }) {
  if (!meaning) {
    throw new Error("Meaning can't be null!");
  }
  const result = await fetch(`/api/meanings?meaning=${meaning}`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const result_json = await result.json();
  if (result_json.data.length > 0) {
    return result_json.data[0];
  }
  return null;
}

// -------------------- GET ALL MEANINGS --------------------
export async function getAllMeanings({ pageIndex, pageSize, word, meaning, part_of_speech }) {
  const params = new URLSearchParams();
  params.append("pageIndex", pageIndex || "");
  params.append("pageSize", pageSize || "");
  params.append("word", word || "");
  params.append("meaning", meaning || "");
  params.append("part_of_speech", part_of_speech || "");

  const result = await fetch(`/api/meanings?${params.toString()}`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const result_json = await result.json();
  return result_json;
}

// -------------------- GET MEANINGS BY WORD (EXACT MATCH) --------------------
export async function getMeaningsByWord({ word, pageIndex = "", pageSize = "" }) {
  if (!word) {
    throw new Error(`Word can't be null or empty. Input word: ${word}`);
  }

  const whereOptions = [{ field: "word", comparison_operation: "=" }];

  const query = new URLSearchParams({
    word,
    pageIndex: String(pageIndex || ""),
    pageSize: String(pageSize || ""),
    where_options: JSON.stringify(whereOptions),
  });

  const response = await fetch(`/api/meanings?${query.toString()}`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return response.json();
}

// -------------------- ADD MEANING --------------------
export async function addMeaning({ row }) {
  const result = await fetch("/api/meanings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(row),
  });
  return result.json();
}

// -------------------- UPDATE MEANING --------------------
export async function updateMeaning({ row }) {
  const result = await fetch(`/api/meanings/${row.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(row),
  });
  return result.json();
}

// -------------------- DELETE MEANING --------------------
export async function deleteMeaning({ row }) {
  const result = await fetch(`/api/meanings/${row.id}`, {
    method: "DELETE",
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return result.json();
}

// -------------------- GET MEANINGS FOR TOOLTIP --------------------
export async function getMeaningsForTooltip() {
  const result = await fetch(`/api/meanings/forTooltip`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const result_json = await result.json();
  return result_json.data;
}
