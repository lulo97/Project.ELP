const { toPascalCase } = require("./utils");

function generateService(sql) {
  const tableMatch = sql.match(/CREATE TABLE\s+"?(\w+)"?/i);
  if (!tableMatch) throw new Error("Table name not found in SQL");
  const tableName = tableMatch[1];

  const singularName = toPascalCase(tableName.endsWith('s') ? tableName.slice(0, -1) : tableName);
  const pascalTable = toPascalCase(tableName);

  const insideParens = sql.match(/\(([\s\S]*)\)/)[1];
  const columnMatches = [...insideParens.matchAll(/"(\w+)"\s+([\w()]+)/g)];
  const columns = columnMatches.map(m => m[1]);

  const pkMatch = sql.match(/PRIMARY KEY\("(\w+)"\)/i);
  const primaryKey = pkMatch ? pkMatch[1] : columns[0];

  const firstFilterCol = columns.find(c => c !== primaryKey);

  return `// Auto-generated service for ${tableName}

export async function get${singularName}({ ${firstFilterCol} }) {
  if (!${firstFilterCol}) {
    throw new Error("${firstFilterCol} can't be null or undefined.");
  }

  const result = await fetch(\`/api/${tableName}?${firstFilterCol}=\${${firstFilterCol}}\`);
  const result_json = await result.json();

  if (result_json.data.length > 0) {
    return result_json.data[0];
  }

  return null;
}

export async function getAll${pascalTable}({ ${columns.join(", ")} , pageIndex, pageSize }) {
  const params = new URLSearchParams();

  params.append("pageIndex", pageIndex || "");
  params.append("pageSize", pageSize || "");
${columns.map(c => `  params.append("${c}", ${c} || "");`).join("\n")}

  const result = await fetch(\`/api/${tableName}?\${params.toString()}\`);
  return await result.json();
}

${columns
  .filter(c => c !== primaryKey && c !== firstFilterCol)
  .map(
    c => `export async function get${pascalTable}By${toPascalCase(c)}({ ${c}, pageIndex, pageSize }) {
  if ([null, undefined, ""].includes(${c})) {
    throw new Error("${c} is required.");
  }

  const params = new URLSearchParams({
    ${c}: ${c},
    pageIndex: pageIndex ?? "",
    pageSize: pageSize ?? "",
  });

  const result = await fetch(\`/api/${tableName}?\${params.toString()}\`);
  return await result.json();
}`
  )
  .join("\n\n")}

export async function add${singularName}({ row }) {
  const result = await fetch("/api/${tableName}", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(row),
  });

  return await result.json();
}

export async function update${singularName}({ row }) {
  const result = await fetch(\`/api/${tableName}/\${row.${primaryKey}}\`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(row),
  });

  return await result.json();
}

export async function delete${singularName}({ row }) {
  const result = await fetch(\`/api/${tableName}/\${row.${primaryKey}}\`, {
    method: "DELETE",
  });

  return await result.json();
}
`;
}

module.exports = {
  generateService,
};
