export async function getUserByToken() {
  if (!localStorage.getItem("token")) return null;

  const result = await fetch("/api/auth/getuserbytoken", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });

  const result_json = await result.json();

  if (result_json.error) {
    return null;
  }

  const user = result_json.data.user || null;

  return user;
}
