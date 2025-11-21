const { executeSelect } = require("../database/execute");

let consts = null;

async function initConstsNotVisible() {
  const result = await executeSelect({
    sql: "SELECT * FROM CONSTS WHERE visible = false",
    params: [],
  });

  consts = result;

  console.log("Init consts with visible = false!, records length =", result.length)
}

/**
Input: key

Output: value of a row in CONSTS table

Example: getConsts("APPLICATION_NAME") = "ELP"
*/
function getConsts(key) {
  if (!key || key.length == "") {
    throw Error("Key must not null");
  }

  if (!consts) {
    throw Error("Consts with visible = false is not initilizated!")
  }

  
  const output = consts.find(ele => ele.key == key);

  if ([null, undefined, ""].includes(output)) {
    throw Error("Error when find record in CONSTS table with key =", key);
  }

  return output.value;
}

module.exports = {
  getConsts,
  initConstsNotVisible,
};
