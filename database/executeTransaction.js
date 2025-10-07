const { getConnection } = require("./getConnection");

function runAsync(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

function execAsync(db, sql) {
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => (err ? reject(err) : resolve()));
  });
}

/**
 * Execute an array of statements inside one transaction.
 * Each statement: { sql: string, params?: array }
 *
 * @param {{statements: Array<{sql:string, params?:any[]}>}} opts
 */
async function executeTransaction({ statements } = {}) {
  if (!Array.isArray(statements) || statements.length === 0) {
    throw new Error("executeTransaction: statements must be a non-empty array");
  }

  const db = await getConnection();

  try {
    await execAsync(db, "BEGIN TRANSACTION");

    // Execute statements sequentially to preserve order & errors
    for (const st of statements) {
      if (!st || typeof st.sql !== "string") {
        throw new Error("executeTransaction: each statement must be an object with a sql string");
      }
      const params = Array.isArray(st.params) ? st.params : [];
      await runAsync(db, st.sql, params);
    }

    await execAsync(db, "COMMIT");
  } catch (err) {
    // try rollback, but keep original error if rollback also fails
    try {
      await execAsync(db, "ROLLBACK");
    } catch (rbErr) {
      // optionally log rbErr
    }
    throw err;
  } finally {

  }
}

module.exports = { executeTransaction };
