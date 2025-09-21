export async function getMultipleChoiceQuestion() {
    const result = await fetch(`/api/exercises/mcq`);
    const result_json = await result.json();
    return result_json;
}

export async function getFillInBlank() {
    const result = await fetch(`/api/exercises/fillInBlank`);
    const result_json = await result.json();
    return result_json;
}