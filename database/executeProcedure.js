const { pool } = require("./pool.js");

/**
const out = await executeProcedure("prc_test", [
    { name: "p_id", type: "text", value: "123" },
    { name: "p_rows", type: "CURSOR", value: "cur_rows" },
    { name: "p_error", type: "text", value: null },
]);
*/
async function executeProcedure(
  procedureName,
  params = [
    {
      name: "",
      type: "",
      value: "",
    },
  ]
) {
  if (!procedureName) throw new Error("Procedure name is required");

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const placeholders = params.map((_, i) => `$${i + 1}`).join(", ");

    const callQuery = `CALL ${procedureName}(${placeholders});`;

    const result = await client.query(callQuery, params.map(ele => ele.value));

    const output = {};

    async function processCursorOutput(p_cursor_name) {
      let p_rows = [];
      try {
        const result = await client.query(`FETCH ALL FROM ${p_cursor_name};`);
        p_rows = result.rows;
        await client.query(`CLOSE ${p_cursor_name};`);
      } catch (error) {
        console.log(error)
        p_rows = [];
      }
      return p_rows;
    }

    for (const [key, value] of Object.entries(result.rows[0])) {
      const type = params.find((p) => p.name == key).type;

      if (type == "CURSOR") {
        output[key] = await processCursorOutput(value);
      } else {
        output[key] = value;
      }
    }

    await client.query("COMMIT");

    return output;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(`❌ Procedure ${procedureName} call error:`, error);
    return {};
  } finally {
    client.release();
  }
}

module.exports = {
  executeProcedure,
};
