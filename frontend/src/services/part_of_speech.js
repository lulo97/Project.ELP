export async function getPartOfSpeechs() {
    const result = await fetch(`/api/part_of_speechs`);
    const result_json = await result.json();
    return result_json.data;
}
