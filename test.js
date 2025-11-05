const { executeProcedure } = require("./database/executeProcedure.js");

async function main() {
  const out = await executeProcedure("prc_test", [
    { name: "p_id", type: "text", value: "123" },
    { name: "p_rows", type: "CURSOR", value: "cur_rows" },
    { name: "p_error", type: "text", value: null },
  ]);

  console.log(out);
}

main();
