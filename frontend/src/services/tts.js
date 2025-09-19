export async function tts(text) {
    const result = await fetch(`/api/tts?text=${text}`);
    const result_json = await result.json();
    return result_json;
}