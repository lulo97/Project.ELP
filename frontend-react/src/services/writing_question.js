export async function getWritingQuestion({ question }) {
    if (!question) {
        throw Error("Question can't be null!")
    }
    const result = await fetch(`/api/writing_questions?question=${question}`);
    const result_json = await result.json();
    if (result_json.data.length > 0) {
        return result_json.data[0];
    }
    return null;
}

export async function getAllWritingQuestions({ pageIndex, pageSize }) {
    const result = await fetch(`/api/writing_questions?pageIndex=${pageIndex || ""}&pageSize=${pageSize || ""}`);
    const result_json = await result.json();
    return result_json;
}

export async function addWritingQuestion({ row }) {
    const result = await fetch("/api/writing_questions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
}

export async function updateWritingQuestion({ row }) {
    const result = await fetch(`/api/writing_questions/${row.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
}

export async function deleteWritingQuestion({ row }) {
    const result = await fetch(`/api/writing_questions/${row.id}`, {
        method: "DELETE",
    });
}