export async function getWord({ word }) {
    if (!word) {
        throw Error("Word can't be null!")
    }
    const result = await fetch(`/api/words?word=${word}`);
    const result_json = await result.json();
    if (result_json.data.length > 0) {
        return result_json.data[0];
    }
    return null;
}

export async function getAllWords({ pageIndex, pageSize, word }) {
    const result = await fetch(`/api/words?pageIndex=${pageIndex || ""}&pageSize=${pageSize || ""}&word=${word || ""}`);
    const result_json = await result.json();
    return result_json;
}

export async function addWord({ row }) {
    const result = await fetch("/api/words", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
}

export async function updateWord({ row }) {
    const result = await fetch(`/api/words/${row.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
}

export async function deleteWord({ row }) {
    const result = await fetch(`/api/words/${row.id}`, {
        method: "DELETE",
    });
}