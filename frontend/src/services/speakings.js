export async function getSpeaking({ question }) {
    if (!question) {
        throw Error("Question can't be null!")
    }
    const result = await fetch(`/api/speakings?question=${question}`);
    const result_json = await result.json();
    if (result_json.data.length > 0) {
        return result_json.data[0];
    }
    return null;
}

export async function getAllSpeakings({ pageIndex, pageSize }) {
    const result = await fetch(`/api/speakings?pageIndex=${pageIndex || ""}&pageSize=${pageSize || ""}`);
    const result_json = await result.json();
    return result_json;
}

export async function getSpeakingsByAnswer({ answer, pageIndex, pageSize }) {
    if ([null, undefined, ""].includes(answer)) {
        throw Error("Answer can't be null, input answer = ", answer)
    }

    const result = await fetch(`/api/speakings?answer=${answer}&pageIndex=${pageIndex || ""}&pageSize=${pageSize || ""}`);
    const result_json = await result.json();
    return result_json;
}

export async function addSpeaking({ row }) {
    const result = await fetch("/api/speakings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
    return await result.json();
}

export async function updateSpeaking({ row }) {
    const result = await fetch(`/api/speakings/${row.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
    return await result.json();
}

export async function deleteSpeaking({ row }) {
    const result = await fetch(`/api/speakings/${row.id}`, {
        method: "DELETE",
    });
    return await result.json();
}