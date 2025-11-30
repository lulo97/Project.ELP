const express = require("express");
const { executeProcedure } = require("../../database/executeProcedure.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js");
const { verifyToken } = require("../../middleware/verifyToken.js");
const { getUsernameFromToken } = require("../../utils/getUsernameFromToken.js");

const router = express.Router();

// -------------------- GET SOURCE TRANSLATES --------------------
async function getSourceTranslates(req, res, next) {
  try {
    const { source_id } = req.query;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_source_translates", [
      { name: "p_id", type: "text", value: null },
      { name: "p_chunks", type: "text", value: null },
      { name: "p_source_id", type: "text", value: source_id || null },
      { name: "p_username", type: "text", value: username },
      { name: "p_action", type: "text", value: "READ" },
      { name: "p_rows", type: "CURSOR", value: "cursor_" + getRandomId() },
      { name: "p_error", type: "text", value: null },
      { name: "p_json_params", type: "text", value: null },
    ]);

    if (result.p_error) {
      res.locals.error = result.p_error;
      res.locals.data = [];
    } else {
      res.locals.error = null;
      res.locals.data = result.p_rows || [];
    }

    next();
  } catch (err) {
    console.error("getSourceTranslates error:", err);
    res.locals.data = [];
    res.locals.error = err.message;
    next();
  }
}

// -------------------- CREATE / REPLACE SOURCE TRANSLATES --------------------
async function saveSourceTranslates(req, res) {
  try {
    const { source_id, chunks } = req.body; // chunks = array of { id, chunk, translate }
    const username = await getUsernameFromToken(req.cookies?.token);

    if (!Array.isArray(chunks)) {
      return res.status(400).json({ error: "chunks must be an array", data: null });
    }

    const _chunks = [ ...chunks ].map(ele => {
        ele.id = getRandomId();
        return ele;
    })

    const result = await executeProcedure("prc_crud_source_translates", [
      { name: "p_id", type: "text", value: null },
      { name: "p_chunks", type: "text", value: JSON.stringify(_chunks) },
      { name: "p_source_id", type: "text", value: source_id },
      { name: "p_username", type: "text", value: username },
      { name: "p_action", type: "text", value: "CREATE" },
      { name: "p_rows", type: "CURSOR", value: "cursor_" + getRandomId() },
      { name: "p_error", type: "text", value: null },
      { name: "p_json_params", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    res.json({
      error: null,
      data:  result.p_rows[0],
    });
  } catch (err) {
    console.error("saveSourceTranslates error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- ROUTES --------------------
router.get("/", verifyToken, getSourceTranslates);
router.post("/", verifyToken, saveSourceTranslates);

module.exports = router;
