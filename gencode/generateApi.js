const { capitalize } = require("./utils.js");

function generateApi(sql) {
    // 1. Extract table name
    const tableMatch = sql.match(/CREATE TABLE\s+"?(\w+)"?/i);
    if (!tableMatch) throw new Error("Table name not found in SQL");
    const tableName = tableMatch[1];

    // 2. Extract columns
    const columnMatches = [...sql.matchAll(/"(\w+)"\s+([\w()]+)/g)];
    const columns = columnMatches.map(m => m[1]);

    // 3. Identify primary key (first one found)
    const pkMatch = sql.match(/PRIMARY KEY\("(\w+)"\)/i);
    const primaryKey = pkMatch ? pkMatch[1] : columns[0]; // fallback

    // 4. Columns excluding PK (for insert/update)
    const nonPkCols = columns.filter(c => c !== primaryKey);

    // 5. Build CRUD code
    return `const express = require("express");
const { executeSelect, execute } = require("../../database/execute.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js");

const router = express.Router();

async function get${capitalize(tableName)}(req, res, next) {
    const { ${columns.join(", ")} } = req.query;

    let sql = "SELECT * FROM ${tableName}";
    const params = [];
    const conditions = [];

${columns.map(c => 
`    if (${c}) {
        conditions.push("${c} = ?");
        params.push(${c});
    }`).join("\n")}

    if (conditions.length > 0) {
        sql += " WHERE " + conditions.join(" AND ");
    }

    const result = await executeSelect({ sql, params });
    res.locals.data = result;
    res.locals.error = null;
    next();
}

async function add${capitalize(tableName)}(req, res) {
    const { ${nonPkCols.join(", ")} } = req.body;
    const ${primaryKey} = getRandomId();

    const sql = \`
        INSERT INTO ${tableName} (${[primaryKey, ...nonPkCols].join(", ")})
        VALUES (${[primaryKey, ...nonPkCols].map(() => "?").join(", ")})
    \`;

    const result = await execute({
        sql,
        params: [${[primaryKey, ...nonPkCols].join(", ")}]
    });

    res.json({ data: result, error: null });
}

async function update${capitalize(tableName)}(req, res) {
    const { ${primaryKey} } = req.params;
    const { ${nonPkCols.join(", ")} } = req.body;

    const sql = \`
        UPDATE ${tableName}
        SET ${nonPkCols.map(c => `${c} = ?`).join(", ")}
        WHERE ${primaryKey} = ?
    \`;

    const result = await execute({
        sql,
        params: [${[...nonPkCols, primaryKey].join(", ")}]
    });

    res.json({ data: result, error: null });
}

async function delete${capitalize(tableName)}(req, res) {
    const { ${primaryKey} } = req.params;

    const sql = "DELETE FROM ${tableName} WHERE ${primaryKey} = ?";
    const result = await execute({ sql, params: [${primaryKey}] });

    res.json({ data: result, error: null });
}

router.get("/", get${capitalize(tableName)}, paginationMiddleware);
router.post("/", add${capitalize(tableName)});
router.put("/:${primaryKey}", update${capitalize(tableName)});
router.delete("/:${primaryKey}", delete${capitalize(tableName)});

module.exports = router;

`;
}

module.exports = {
    generateApi
}