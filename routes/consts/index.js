const { verifyAdmin } = require("../../middleware/verifyAdmin");

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

    res.json({ error: null, data: { id, word, part_of_speech, example } });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

router.put("/", verifyToken, verifyAdmin, updateConsts);

module.exports = router;
