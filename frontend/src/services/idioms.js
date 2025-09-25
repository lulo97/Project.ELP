export async function getIdiom({ idiom }) {
    if (!idiom) {
        throw Error("Idiom can't be null!")
    }
    const result = await fetch(`/api/idioms?idiom=${idiom}`);
    const result_json = await result.json();
    if (result_json.data.length > 0) {
        return result_json.data[0];
    }
    return null;
}

export async function getAllIdioms({ pageIndex, pageSize }) {
    const result = await fetch(`/api/idioms?pageIndex=${pageIndex || ""}&pageSize=${pageSize || ""}`);
    const result_json = await result.json();
    return result_json;
}

export async function addIdiom({ row }) {
    const result = await fetch("/api/idioms", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
}

export async function updateIdiom({ row }) {
    const result = await fetch(`/api/idioms/${row.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
}

export async function deleteIdiom({ row }) {
    const result = await fetch(`/api/idioms/${row.id}`, {
        method: "DELETE",
    });
}