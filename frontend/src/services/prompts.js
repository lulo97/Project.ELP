// where_options = [{ field: "prompt", comparison_operation: "=" }]
export async function getPrompt({ prompt, where_options }) {
  if (!prompt) {
    throw Error("Prompt can't be null!");
  }
  const result = await fetch(
    `/api/prompts?prompt=${prompt}&where_options=${
      JSON.stringify(where_options) || ""
    }`,
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  return await result.json();
}

export async function getPromptMetadata() {
  const result = await fetch(`/api/prompts/metadata`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return await result.json();
}

export async function getAllPrompts({ pageIndex, pageSize, prompt }) {
  const result = await fetch(
    `/api/prompts?pageIndex=${pageIndex || ""}&pageSize=${
      pageSize || ""
    }&prompt=${prompt || ""}`,
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  const result_json = await result.json();
  return result_json;
}

export async function addPrompt({ row }) {
  const result = await fetch("/api/prompts", {
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

export async function updatePrompt({ row }) {
  const result = await fetch(`/api/prompts/${row.id}`, {
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

export async function deletePrompt({ row }) {
  const result = await fetch(`/api/prompts/${row.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const result_json = await result.json();
  return result_json;
}
