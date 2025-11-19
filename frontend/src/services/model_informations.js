async function getModelInformations() {
  const result = await fetch(`/api/model_informations`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const result_json = await result.json();
  return result_json;
}
