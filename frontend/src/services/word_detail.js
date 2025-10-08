export async function getAllWordDetails() {
    const result = await fetch(`/api/word_details`);
    const result_json = await result.json();
    return result_json;
}
