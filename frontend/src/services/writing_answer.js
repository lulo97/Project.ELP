export async function getWritingAnswers({ question }) {
    if (!question) {
        throw Error("Question can't be null!")
    }
    const result = await fetch(`/api/writing_answers?question=${question}`);
    const result_json = await result.json();
    if (result_json.data.length > 0) {
        return result_json.data;
    }
    return [];
}

export async function getAllWritingAnswers({ pageIndex, pageSize }) {
    const result = await fetch(`/api/writing_answers?pageIndex=${pageIndex || ""}&pageSize=${pageSize || ""}`);
    const result_json = await result.json();
    return result_json;
}

export async function addWritingAnswer({ row }) {
    const result = await fetch("/api/writing_answers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
    return result
}

export async function updateWritingAnswer({ row }) {
    const result = await fetch(`/api/writing_answers/${row.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
    return result
}

export async function deleteWritingAnswer({ row }) {
    const result = await fetch(`/api/writing_answers/${row.id}`, {
        method: "DELETE",
    });
    return result
}