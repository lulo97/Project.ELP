const { executeSelect } = require("../database/execute");
const { getConnection } = require("./getConnection");

async function initData() {
  const client = await getConnection();

  try {
    const existing = await client.get("CONSTS");

    if (existing !== null) {
      console.log("Redis data already initialized: " + JSON.parse(existing).map(ele => ele.key));
      return;
    }

    const result = await executeSelect({ sql: "SELECT * FROM CONSTS WHERE VISIBLE = true" });

    if ([null, undefined].includes(result) || result.length == 0) {
      throw Error("Error when select CONSTS table!");
    }

    await client.set("CONSTS", JSON.stringify(result));

    console.log("Initialized Redis data successfully!");
  } catch (err) {
    console.error("Failed to initialize Redis data:", err);
  }
}

module.exports = {
  initData,
};
