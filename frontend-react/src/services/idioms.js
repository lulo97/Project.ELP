// -------------------- GET SINGLE IDIOM --------------------
export async function getIdiom({ idiom }) {
    if (!idiom) {
        throw new Error("Idiom can't be null!");
    }

    const res = await fetch(`/api/idioms?idiom=${encodeURIComponent(idiom)}`, {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
        },
    });

    const result_json = await res.json();
    return result_json.data.length > 0 ? result_json.data[0] : null;
}

// -------------------- GET ALL IDIOMS --------------------
export async function getAllIdioms({ pageIndex = "", pageSize = "" }) {
    const params = new URLSearchParams({ pageIndex: pageIndex || "", pageSize: pageSize || "" });
    const res = await fetch(`/api/idioms?${params.toString()}`, {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    return res.json();
}

// -------------------- ADD IDIOM --------------------
export async function addIdiom({ row }) {
    const res = await fetch("/api/idioms", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(row),
    });
    return res.json();
}

// -------------------- UPDATE IDIOM --------------------
export async function updateIdiom({ row }) {
    const res = await fetch(`/api/idioms/${row.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(row),
    });
    return res.json();
}

// -------------------- DELETE IDIOM --------------------
export async function deleteIdiom({ row }) {
    const res = await fetch(`/api/idioms/${row.id}`, {
        method: "DELETE",
        headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    return res.json();
}
