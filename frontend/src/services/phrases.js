export async function getPhrase({ phrase }) {
    if (!phrase) {
        throw Error("Phrase can't be null!")
    }
    const result = await fetch(`/api/phrases?phrase=${phrase}`);
    const result_json = await result.json();
    if (result_json.data.length > 0) {
        return result_json.data[0];
    }
    return null;
}

export async function getAllPhrases({ pageIndex, pageSize }) {
    const result = await fetch(`/api/phrases?pageIndex=${pageIndex || ""}&pageSize=${pageSize || ""}`);
    const result_json = await result.json();
    return result_json;
}

export async function addPhrase({ row }) {
    const result = await fetch("/api/phrases", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
}

export async function updatePhrase({ row }) {
    const result = await fetch(`/api/phrases/${row.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
}

export async function deletePhrase({ row }) {
    const result = await fetch(`/api/phrases/${row.id}`, {
        method: "DELETE",
    });
}