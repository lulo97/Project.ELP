// -------------------- GET SINGLE PHRASE --------------------
export async function getPhrase({ phrase }) {
    if (!phrase) {
        throw new Error("Phrase can't be null!");
    }

    const res = await fetch(`/api/phrases?phrase=${encodeURIComponent(phrase)}`, {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
        },
    });

    const result_json = await res.json();
    return result_json.data.length > 0 ? result_json.data[0] : null;
}

// -------------------- GET ALL PHRASES --------------------
export async function getAllPhrases({ pageIndex = "", pageSize = "" }) {
    const params = new URLSearchParams({ pageIndex: pageIndex || "", pageSize: pageSize || "" });
    const res = await fetch(`/api/phrases?${params.toString()}`, {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    return res.json();
}

// -------------------- ADD PHRASE --------------------
export async function addPhrase({ row }) {
    const res = await fetch("/api/phrases", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(row),
    });
    return res.json();
}

// -------------------- UPDATE PHRASE --------------------
export async function updatePhrase({ row }) {
    const res = await fetch(`/api/phrases/${row.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(row),
    });
    return res.json();
}

// -------------------- DELETE PHRASE --------------------
export async function deletePhrase({ row }) {
    const res = await fetch(`/api/phrases/${row.id}`, {
        method: "DELETE",
        headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    return res.json();
}
