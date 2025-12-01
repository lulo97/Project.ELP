export async function getUsers({
  username = "",
  pageIndex = "",
  pageSize = "",
}) {
  const params = new URLSearchParams({
    username: username || "",
    pageIndex: pageIndex || "",
    pageSize: pageSize || "",
  });

  const result = await fetch(`/api/users?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result_json = await result.json();
  return result_json;
}

export async function deleteUser({ id = "" }) {
  const result = await fetch(`/api/users/${id || "null"}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result_json = await result.json();
  return result_json;
}
