export async function getPartOfSpeechs({ word } = { word: "" }) {
    const result = await fetch(`/api/part_of_speechs?word=${word || ""}`);
    const result_json = await result.json();
    return result_json.data;
}
