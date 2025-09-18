export async function getMeaning({ meaning }) {
    if (!meaning) {
        throw Error("Meaning can't be null!")
    }
    const result = await fetch(`/api/meanings?meaning=${meaning}`);
    const result_json = await result.json();
    if (result_json.data.length > 0) {
        return result_json.data[0];
    }
    return null;
}

export async function getAllMeanings({ pageIndex, pageSize }) {
    const result = await fetch(`/api/meanings?pageIndex=${pageIndex || ""}&pageSize=${pageSize || ""}`);
    const result_json = await result.json();
    return result_json;
}

export async function getMeaningsByWord({ word, pageIndex, pageSize }) {
    if ([null, undefined, ""].includes(word)) {
        throw Error("Word can't be null, input word = ", word)
    }

    const result = await fetch(`/api/meanings?word=${word}&pageIndex=${pageIndex || ""}&pageSize=${pageSize || ""}`);
    const result_json = await result.json();
    return result_json;
}

export async function addMeaning({ row }) {
    const result = await fetch("/api/meanings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
}

export async function updateMeaning({ row }) {
    const result = await fetch(`/api/meanings/${row.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
}

export async function deleteMeaning({ row }) {
    const result = await fetch(`/api/meanings/${row.id}`, {
        method: "DELETE",
    });
}

export async function getMeaningsForTooltip() {
    const result = await fetch(`/api/meanings/forTooltip`);
    const result_json = await result.json();
    return result_json.data;
}