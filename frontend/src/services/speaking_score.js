export async function getSpeakingScore({ speaking_id }) {
    if (!speaking_id) {
        throw Error("SpeakingId can't be null!")
    }
    const result = await fetch(`/api/speaking_scores?speaking_id=${speaking_id}`);
    const result_json = await result.json();
    if (result_json.data.length > 0) {
        return result_json.data[0];
    }
    return null;
}

export async function getAllSpeakingScores({ pageIndex, pageSize }) {
    const result = await fetch(`/api/speaking_scores?pageIndex=${pageIndex || ""}&pageSize=${pageSize || ""}`);
    const result_json = await result.json();
    return result_json;
}

export async function getSpeakingScoresByQuestionScore({ question_score, pageIndex, pageSize }) {
    if ([null, undefined, ""].includes(question_score)) {
        throw Error("QuestionScore can't be null, input question_score = ", question_score)
    }

    const result = await fetch(`/api/speaking_scores?question_score=${question_score}&pageIndex=${pageIndex || ""}&pageSize=${pageSize || ""}`);
    const result_json = await result.json();
    return result_json;
}

export async function getSpeakingScoresByAnswerScore({ answer_score, pageIndex, pageSize }) {
    if ([null, undefined, ""].includes(answer_score)) {
        throw Error("AnswerScore can't be null, input answer_score = ", answer_score)
    }

    const result = await fetch(`/api/speaking_scores?answer_score=${answer_score}&pageIndex=${pageIndex || ""}&pageSize=${pageSize || ""}`);
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