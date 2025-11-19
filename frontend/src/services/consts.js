async function updateConsts({ key, value }) {
  const res = await fetch(`/api/consts`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({ key, value }),
  });
  return res.json();
}
