export async function getExample({ example }) {
    if (!example) {
        throw Error("Example can't be null!")
    }
    const result = await fetch(`/api/examples?example=${example}`);
    const result_json = await result.json();
    if (result_json.data.length > 0) {
        return result_json.data[0];
    }
    return null;
}

export async function getAllExamples({ pageIndex, pageSize }) {
    const result = await fetch(`/api/examples?pageIndex=${pageIndex || ""}&pageSize=${pageSize || ""}`);
    const result_json = await result.json();
    return result_json;
}

export async function getExamplesByWord({ word, pageIndex, pageSize }) {
    if ([null, undefined, ""].includes(word)) {
        throw Error("Word can't be null, input word = ", word)
    }

    const result = await fetch(`/api/examples?word=${word}&pageIndex=${pageIndex || ""}&pageSize=${pageSize || ""}`);
    const result_json = await result.json();
    return result_json;
}

export async function addExample({ row }) {
    const result = await fetch("/api/examples", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
    return result;
}

export async function updateExample({ row }) {
    const result = await fetch(`/api/examples/${row.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
}

export async function deleteExample({ row }) {
    const result = await fetch(`/api/examples/${row.id}`, {
        method: "DELETE",
    });
}