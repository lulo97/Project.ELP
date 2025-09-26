export async function getHomePage() {
    const result = await fetch(`/api/homepage`);
    const result_json = await result.json();
    return result_json;
}
