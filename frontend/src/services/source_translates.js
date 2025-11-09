export async function getSourceTranslates({ source_id }) {
  if (!source_id) {
    throw new Error("source_id can't be null or undefined.");
  }

  const result = await fetch(`/api/source_translates?source_id=${source_id}`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return await result.json();
}

export async function addSourceTranslates({ body }) {
  const result = await fetch("/api/source_translates", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return await result.json();
}
