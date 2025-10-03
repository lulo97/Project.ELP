export async function getMeaning({ meaning }) {
    if (!meaning) {
        throw Error("Meaning can't be null!")
    }
    const result = await fetch(`/api/meanings?meaning=${meaning}`);
    const result_json = await result.json();
    if (result_json.data.length > 0) {
        return result_json.data[0];
    }
    return null;
}

export async function getAllMeanings({ pageIndex, pageSize, word, meaning, part_of_speech }) {
    const params = new URLSearchParams();

    params.append("pageIndex", pageIndex || "");
    params.append("pageSize", pageSize || "");
    params.append("word", word || "");
    params.append("meaning", meaning || "");
    params.append("part_of_speech", part_of_speech || "");

    const result = await fetch(`/api/meanings?${params.toString()}`);

    if (!result.ok) {
        throw new Error(`Failed to fetch meanings: ${result.status} ${result.statusText}`);
    }

    const result_json = await result.json();
    return result_json;
}

export async function getMeaningsByWord({ word, pageIndex = "", pageSize = "" }) {
    if (!word) {
        throw new Error(`Word can't be null or empty. Input word: ${word}`);
    }

    const whereOptions = {
        word: {
            comparisonOperation: "=",
        },
    };

    const query = new URLSearchParams({
        word,
        pageIndex: String(pageIndex || ""),
        pageSize: String(pageSize || ""),
        where_options: JSON.stringify(whereOptions) || "",
    });

    const response = await fetch(`/api/meanings?${query.toString()}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch meanings: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function addMeaning({ row }) {
    const result = await fetch("/api/meanings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
}

export async function updateMeaning({ row }) {
    const result = await fetch(`/api/meanings/${row.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
}

export async function deleteMeaning({ row }) {
    const result = await fetch(`/api/meanings/${row.id}`, {
        method: "DELETE",
    });
}

export async function getMeaningsForTooltip() {
    const result = await fetch(`/api/meanings/forTooltip`);
    const result_json = await result.json();
    return result_json.data;
}