// -------------------- GET SINGLE SYNONYM --------------------
export async function getSynonym({ word }) {
  if (!word) {
    throw new Error("Word can't be null!");
  }

  const res = await fetch(`/api/synonyms?word=${encodeURIComponent(word)}`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  const result_json = await res.json();
  return result_json.data.length > 0 ? result_json.data[0] : null;
}

// -------------------- GET ALL SYNONYMS --------------------
export async function getAllSynonyms({ pageIndex = "", pageSize = "" }) {
  const params = new URLSearchParams({
    pageIndex: pageIndex || "",
    pageSize: pageSize || "",
  });

  const res = await fetch(`/api/synonyms?${params.toString()}`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return res.json();
}

// -------------------- ADD SYNONYM --------------------
export async function addSynonym({ row }) {
  const res = await fetch("/api/synonyms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(row),
  });

  return res.json();
}

// -------------------- UPDATE SYNONYM --------------------
export async function updateSynonym({ row }) {
  const res = await fetch(`/api/synonyms/${row.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(row),
  });

  return res.json();
}

// -------------------- DELETE SYNONYM --------------------
export async function deleteSynonym({ row }) {
  const res = await fetch(`/api/synonyms/${row.id}`, {
    method: "DELETE",
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return res.json();
}
