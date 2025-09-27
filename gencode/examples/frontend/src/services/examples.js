export async function getExample({ id }) {
    if (!id) {
        throw Error("Id can't be null!")
    }
    const result = await fetch(`/api/examples?id=${id}`);
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

export async function getExamplesByExamples({ examples, pageIndex, pageSize }) {
    if ([null, undefined, ""].includes(examples)) {
        throw Error("Examples can't be null, input examples = ", examples)
    }

    const result = await fetch(`/api/examples?examples=${examples}&pageIndex=${pageIndex || ""}&pageSize=${pageSize || ""}`);
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

export async function getExamplesByPartOfSpeech({ part_of_speech, pageIndex, pageSize }) {
    if ([null, undefined, ""].includes(part_of_speech)) {
        throw Error("PartOfSpeech can't be null, input part_of_speech = ", part_of_speech)
    }

    const result = await fetch(`/api/examples?part_of_speech=${part_of_speech}&pageIndex=${pageIndex || ""}&pageSize=${pageSize || ""}`);
    const result_json = await result.json();
    return result_json;
}

export async function getExamplesByExample({ example, pageIndex, pageSize }) {
    if ([null, undefined, ""].includes(example)) {
        throw Error("Example can't be null, input example = ", example)
    }

    const result = await fetch(`/api/examples?example=${example}&pageIndex=${pageIndex || ""}&pageSize=${pageSize || ""}`);
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
    return await result.json();
}

export async function updateExample({ row }) {
    const result = await fetch(`/api/examples/${row.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
    return await result.json();
}

export async function deleteExample({ row }) {
    const result = await fetch(`/api/examples/${row.id}`, {
        method: "DELETE",
    });
    return await result.json();
}