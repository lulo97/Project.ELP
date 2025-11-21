export async function getModelInformations({ pageIndex, pageSize }) {
  const params = new URLSearchParams();
  params.append("pageIndex", pageIndex || "");
  params.append("pageSize", pageSize || "");
  
  const result = await fetch(`/api/model_informations?${params.toString()}`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const result_json = await result.json();
  return result_json;
}
