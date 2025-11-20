const { verifyAdmin } = require("../../middleware/verifyAdmin");
const express = require("express");
const { executeProcedure } = require("../../database/executeProcedure.js");
const { verifyToken } = require("../../middleware/verifyToken.js");
const { getUsernameFromToken } = require("../../utils/getUsernameFromToken.js");
const { getConnection } = require("../../redis/getConnection");
const { initData } = require("../../redis/initData");

const router = express.Router();

async function updateConsts(req, res) {
  try {
    const { key, value } = req.body;
    const username = await getUsernameFromToken(req.headers["authorization"]);

    const result = await executeProcedure("prc_crud_consts", [
      { name: "p_key", type: "text", value: key },
      { name: "p_value", type: "text", value: value },
      { name: "p_username", type: "text", value: username },
      { name: "p_action", type: "text", value: "UPDATE" },
      { name: "p_rows", type: "CURSOR", value: null },
      { name: "p_error", type: "text", value: null },
      { name: "p_json_params", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    const client = await getConnection();
    await client.FLUSHALL();
    await initData();

    res.json({ error: null, data: null });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

router.put("/", verifyToken, verifyAdmin, updateConsts);

module.exports = router;
