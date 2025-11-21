const { pool } = require("./pool.js");

//Execute select query
async function executeSelect({ sql, params = [] }) {
  if (!sql) {
    throw Error("Sql is null!");
  }
  const client = await pool.connect();
  try {
    const result = await client.query(sql, params);
    return result.rows;
  } catch (error) {
    console.error("SELECT query error:", error);
    throw error;
  } finally {
    client.release();
  }
}

//Execute DML query
async function execute({ sql, params = [] }) {
  if (!sql) {
    throw Error("Sql is null!");
  }
  const client = await pool.connect();
  try {
    const result = await client.query(sql, params);
    return {
      rows: result.rows,
      rowCount: result.rowCount,
      command: result.command,
    };
  } catch (error) {
    console.error("DML query error:", error);
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Executes a list of SQL commands inside a transaction.
 * @param {Array<{sql: string, params?: any[]}>} queries
 * @returns {Promise<Array>} results for each query
 */
async function executeTransaction(queries = []) {
  const client = await pool.connect();
  const results = [];

  try {
    await client.query("BEGIN");

    for (const { sql, params = [] } of queries) {
      const result = await client.query(sql, params);
      results.push({
        command: result.command,
        rowCount: result.rowCount,
        rows: result.rows,
      });
    }

    await client.query("COMMIT");
    return results;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Transaction rolled back due to error:", error.message);
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  execute,
  executeSelect,
  executeTransaction,
};
