// -------------------- GET SINGLE EXAMPLE --------------------
export async function getExample({ example }) {
    if (!example) {
        throw new Error("Example can't be null!");
    }
    const res = await fetch(`/api/examples?example=${encodeURIComponent(example)}`, {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    const result_json = await res.json();
    return result_json.data.length > 0 ? result_json.data[0] : null;
}

// -------------------- GET ALL EXAMPLES --------------------
export async function getAllExamples({ pageIndex = "", pageSize = "" }) {
    const params = new URLSearchParams({ pageIndex: pageIndex || "", pageSize: pageSize || "" });
    const res = await fetch(`/api/examples?${params.toString()}`, {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    return res.json();
}

// -------------------- GET EXAMPLES BY WORD --------------------
export async function getExamplesByWord({ word, pageIndex = "", pageSize = "" }) {
    if (!word) {
        throw new Error("Word can't be null or empty.");
    }
    const params = new URLSearchParams({ word, pageIndex: pageIndex || "", pageSize: pageSize || "" });
    const res = await fetch(`/api/examples?${params.toString()}`, {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    return res.json();
}

// -------------------- ADD EXAMPLE --------------------
export async function addExample({ row }) {
    const res = await fetch("/api/examples", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(row),
    });
    return res.json();
}

// -------------------- UPDATE EXAMPLE --------------------
export async function updateExample({ row }) {
    const res = await fetch(`/api/examples/${row.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(row),
    });
    return res.json();
}

// -------------------- DELETE EXAMPLE --------------------
export async function deleteExample({ row }) {
    const res = await fetch(`/api/examples/${row.id}`, {
        method: "DELETE",
        headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    return res.json();
}
