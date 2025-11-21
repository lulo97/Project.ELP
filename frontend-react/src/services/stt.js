export async function stt({ base64 }) {
    const result = await fetch(`/api/stt`, {
        method: "POST",
        body: JSON.stringify({ base64 }),
        headers: { "Content-Type": "application/json" },
    });
    const result_json = await result.json();
    return result_json;
}