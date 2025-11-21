// -------------------- GET SINGLE SOURCE --------------------
export async function getSource({ source }) {
  if (!source) {
    throw new Error("Source can't be null or undefined!");
  }

  const res = await fetch(`/api/sources?source=${encodeURIComponent(source)}`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  const result_json = await res.json();
  return result_json.data.length > 0 ? result_json.data[0] : null;
}

// -------------------- GET ALL SOURCES --------------------
export async function getAllSources({
  id = "",
  source = "",
  name = "",
  pageIndex = "",
  pageSize = "",
}) {
  const params = new URLSearchParams({
    id: id || "",
    source: source || "",
    name: name || "",
    pageIndex: pageIndex || "",
    pageSize: pageSize || "",
  });

  const res = await fetch(`/api/sources?${params.toString()}`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return res.json();
}

// -------------------- ADD SOURCE --------------------
export async function addSource({ row }) {
  const res = await fetch("/api/sources", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(row),
  });

  return res.json();
}

// -------------------- UPDATE SOURCE --------------------
export async function updateSource({ row }) {
  const res = await fetch(`/api/sources/${row.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(row),
  });

  return res.json();
}

// -------------------- DELETE SOURCE --------------------
export async function deleteSource({ row }) {
  const res = await fetch(`/api/sources/${row.id}`, {
    method: "DELETE",
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return res.json();
}
