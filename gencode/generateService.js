const { toPascalCase } = require("./utils")

function generateService(sql) {
    // 1. Extract table name
    const tableMatch = sql.match(/CREATE TABLE\s+"?(\w+)"?/i);
    if (!tableMatch) throw new Error("Table name not found in SQL");
    const tableName = tableMatch[1];
    const capName = toPascalCase(tableName.slice(0, -1)); // singular

    // 2. Extract columns 
    const insideParens = sql.match(/\(([\s\S]*)\)/)[1];
    const columnMatches = [...insideParens.matchAll(/"(\w+)"\s+([\w()]+)/g)];
    const columns = columnMatches.map(m => m[1]);

    // 3. Identify primary key
    const pkMatch = sql.match(/PRIMARY KEY\("(\w+)"\)/i);
    const primaryKey = pkMatch ? pkMatch[1] : columns[0];

    // 4. Build code
    return `export async function get${capName}({ ${columns[1]} }) {
    if (!${columns[1]}) {
        throw Error("${toPascalCase(columns[1])} can't be null!")
    }
    const result = await fetch(\`/api/${tableName}?${columns[1]}=\${${columns[1]}}\`);
    const result_json = await result.json();
    if (result_json.data.length > 0) {
        return result_json.data[0];
    }
    return null;
}

export async function getAll${toPascalCase(tableName)}({ pageIndex, pageSize }) {
    const result = await fetch(\`/api/${tableName}?pageIndex=\${pageIndex || ""}&pageSize=\${pageSize || ""}\`);
    const result_json = await result.json();
    return result_json;
}

${columns
    .filter(c => c !== pkMatch?.[1] && c !== columns[1]) // exclude PK + first col used in getX
    .map(
        c => `export async function get${toPascalCase(tableName)}By${toPascalCase(c)}({ ${c}, pageIndex, pageSize }) {
    if ([null, undefined, ""].includes(${c})) {
        throw Error("${toPascalCase(c)} can't be null, input ${c} = ", ${c})
    }

    const result = await fetch(\`/api/${tableName}?${c}=\${${c}}&pageIndex=\${pageIndex || ""}&pageSize=\${pageSize || ""}\`);
    const result_json = await result.json();
    return result_json;
}`
    )
    .join("\n\n")}

export async function add${capName}({ row }) {
    const result = await fetch("/api/${tableName}", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
    return await result.json();
}

export async function update${capName}({ row }) {
    const result = await fetch(\`/api/${tableName}/\${row.${primaryKey}}\`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
    });
    return await result.json();
}

export async function delete${capName}({ row }) {
    const result = await fetch(\`/api/${tableName}/\${row.${primaryKey}}\`, {
        method: "DELETE",
    });
    return await result.json();
}`;
}

module.exports = {
    generateService
}