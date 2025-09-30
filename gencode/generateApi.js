const { toPascalCase } = require("./utils.js");

function generateApi(sql) {
  const tableMatch = sql.match(/CREATE TABLE\s+"?(\w+)"?/i);
  if (!tableMatch) throw new Error("Table name not found in SQL");
  const tableName = tableMatch[1];

  const insideParens = sql.match(/\(([\s\S]*)\)/)[1];
  const columnMatches = [...insideParens.matchAll(/"(\w+)"\s+([\w()]+)/g)];
  const columns = columnMatches.map(m => m[1]);

  const pkMatch = sql.match(/PRIMARY KEY\s*\("(\w+)"\)/i);
  const primaryKey = pkMatch ? pkMatch[1] : columns[0];
  const nonPkCols = columns.filter(c => c !== primaryKey);

  const PascalName = toPascalCase(tableName);

  return `const express = require("express");
const { executeSelect, execute } = require("../../database/execute.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js");

const router = express.Router();

// GET: Read with filters + pagination
async function get${PascalName}(req, res, next) {
  try {
    const { ${columns.join(", ")}, pageIndex, pageSize } = req.query;

    let sql = "SELECT * FROM ${tableName}";
    const params = [];
    const conditions = [];

${columns.map(c => 
`    if (${c}) {
      conditions.push("${c} LIKE ?");
      params.push('%' + ${c} + '%');
    }`).join("\n")}

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    const result = await executeSelect({ sql, params });
    res.locals.data = result;
    res.locals.error = null;
    next();
  } catch (error) {
    next(error);
  }
}

// POST: Create
async function add${PascalName}(req, res) {
  try {
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
  } catch (error) {
    res.status(500).json({ data: null, error: error.message });
  }
}

// PUT: Update
async function update${PascalName}(req, res) {
  try {
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
  } catch (error) {
    res.status(500).json({ data: null, error: error.message });
  }
}

// DELETE
async function delete${PascalName}(req, res) {
  try {
    const { ${primaryKey} } = req.params;

    const sql = "DELETE FROM ${tableName} WHERE ${primaryKey} = ?";
    const result = await execute({ sql, params: [${primaryKey}] });

    res.json({ data: result, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: error.message });
  }
}

// Routes
router.get("/", get${PascalName}, paginationMiddleware);
router.post("/", add${PascalName});
router.put("/:${primaryKey}", update${PascalName});
router.delete("/:${primaryKey}", delete${PascalName});

module.exports = router;
`;
}

module.exports = {
  generateApi
};
