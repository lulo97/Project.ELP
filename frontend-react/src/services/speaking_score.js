export async function getSpeakingScore({ speaking_id }) {
  if (!speaking_id) {
    throw Error("SpeakingId can't be null!");
  }
  const result = await fetch(`/api/speaking_scores?speaking_id=${speaking_id}`);
  const result_json = await result.json();
  if (result_json.data.length > 0) {
    return result_json.data;
  }
  return null;
}

export async function getAllSpeakingScores({ pageIndex, pageSize }) {
  const result = await fetch(
    `/api/speaking_scores?pageIndex=${pageIndex || ""}&pageSize=${
      pageSize || ""
    }`
  );
  const result_json = await result.json();
  return result_json;
}

export async function getSpeakingScoresByTextListened({
  text_listened,
  pageIndex,
  pageSize,
}) {
  if ([null, undefined, ""].includes(text_listened)) {
    throw Error(
      "text_listened can't be null, input text_listened = ",
      text_listened
    );
  }

  const result = await fetch(
    `/api/speaking_scores?text_listened=${text_listened}&pageIndex=${
      pageIndex || ""
    }&pageSize=${pageSize || ""}`
  );
  const result_json = await result.json();
  return result_json;
}

export async function getSpeakingScoresByText({ text, pageIndex, pageSize }) {
  if ([null, undefined, ""].includes(text)) {
    throw Error("text can't be null, input text = ", text);
  }

  const result = await fetch(
    `/api/speaking_scores?text=${text}&pageIndex=${pageIndex || ""}&pageSize=${
      pageSize || ""
    }`
  );
  const result_json = await result.json();
  return result_json;
}

export async function addSpeakingScore({ row }) {
  const result = await fetch("/api/speaking_scores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(row),
  });
  return await result.json();
}

export async function updateSpeakingScore({ row }) {
  const result = await fetch(`/api/speaking_scores/${row.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(row),
  });
  return await result.json();
}

export async function deleteSpeakingScore({ row }) {
  const result = await fetch(`/api/speaking_scores/${row.id}`, {
    method: "DELETE",
  });
  return await result.json();
}
