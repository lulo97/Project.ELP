const { getConnection } = require("../../../redis/getConnection");
const { executeProcedure } = require("../../../database/executeProcedure")
const { getRandomId } = require("../../../utils/getRandomId");

async function getPrompt(task_name) {
  const client = await getConnection();

  let result_redis = await client.get("CONSTS");

  result_redis = JSON.parse(result_redis);

  const model_name = result_redis.find((ele) => ele.key == "MODEL_NAME").value;

  const result = await executeProcedure("prc_crud_prompts", [
    { name: "p_id", type: "text", value: null },
    { name: "p_task_name", type: "text", value: task_name }, // added
    { name: "p_prompt", type: "text", value: null },
    { name: "p_model_name", type: "text", value: model_name },
    { name: "p_description", type: "text", value: null },
    { name: "p_action", type: "text", value: "READ" },
    { name: "p_rows", type: "CURSOR", value: "cursor_" + getRandomId() },
    { name: "p_error", type: "text", value: null },
    { name: "p_json_params", type: "text", value: null },
  ]);

  if (result.p_error) {
    throw Error(result.p_error);
  }

  const prompt = result.p_rows[0].prompt;

  return prompt;
}

module.exports = { getPrompt };
