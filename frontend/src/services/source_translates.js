export async function getSourceTranslates({ source_id }) {
    if (!source_id) {
        throw new Error("source_id can't be null or undefined.");
    }

    const result = await fetch(`/api/source_translates?source_id=${source_id}`);
    const result_json = await result.json();

    return result_json.data;
}

export async function addSourceTranslates({ body }) {
    const result = await fetch("/api/source_translates", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return await result.json();
}
