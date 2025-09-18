export async function getSource({ source }) {
    if (!source) {
        throw Error("Source can't be null!")
    }
    const result = await fetch(`/api/sources?source=${source}`);
    const result_json = await result.json();
    if (result_json.data.length > 0) {
        return result_json.data[0];
    }
    return null;
}

export async function getAllSources({ pageIndex, pageSize }) {
    const result = await fetch(`/api/sources?pageIndex=${pageIndex || ""}&pageSize=${pageSize || ""}`);
    const result_json = await result.json();
    return result_json;
}

export async function addSource({ row }) {
    const result = await fetch("/api/sources", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
}

export async function updateSource({ row }) {
    const result = await fetch(`/api/sources/${row.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
}

export async function deleteSource({ row }) {
    const result = await fetch(`/api/sources/${row.id}`, {
        method: "DELETE",
    });
}