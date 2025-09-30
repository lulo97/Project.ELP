// Auto-generated service for synonyms

export async function getSynonym({ word }) {
  if (!word) {
    throw new Error("word can't be null or undefined.");
  }

  const result = await fetch(`/api/synonyms?word=${word}`);
  const result_json = await result.json();

  if (result_json.data.length > 0) {
    return result_json.data[0];
  }

  return null;
}

export async function getAllSynonyms({ id, word, synomym, note , pageIndex, pageSize }) {
  const params = new URLSearchParams();

  params.append("pageIndex", pageIndex || "");
  params.append("pageSize", pageSize || "");
  params.append("id", id || "");
  params.append("word", word || "");
  params.append("synomym", synomym || "");
  params.append("note", note || "");

  const result = await fetch(`/api/synonyms?${params.toString()}`);
  return await result.json();
}

export async function getSynonymsBySynomym({ synomym, pageIndex, pageSize }) {
  if ([null, undefined, ""].includes(synomym)) {
    throw new Error("synomym is required.");
  }

  const params = new URLSearchParams({
    synomym: synomym,
    pageIndex: pageIndex ?? "",
    pageSize: pageSize ?? "",
  });

  const result = await fetch(`/api/synonyms?${params.toString()}`);
  return await result.json();
}

export async function getSynonymsByNote({ note, pageIndex, pageSize }) {
  if ([null, undefined, ""].includes(note)) {
    throw new Error("note is required.");
  }

  const params = new URLSearchParams({
    note: note,
    pageIndex: pageIndex ?? "",
    pageSize: pageSize ?? "",
  });

  const result = await fetch(`/api/synonyms?${params.toString()}`);
  return await result.json();
}

export async function addSynonym({ row }) {
  const result = await fetch("/api/synonyms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(row),
  });

  return await result.json();
}

export async function updateSynonym({ row }) {
  const result = await fetch(`/api/synonyms/${row.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(row),
  });

  return await result.json();
}

export async function deleteSynonym({ row }) {
  const result = await fetch(`/api/synonyms/${row.id}`, {
    method: "DELETE",
  });

  return await result.json();
}
