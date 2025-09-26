export async function getGrammar({ text }) {
    const result = await fetch(`/api/grammar?text=` + encodeURIComponent(text));
    const result_json = await result.json();
    return result_json;
}
