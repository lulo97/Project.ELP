const express = require("express");
const { executeProcedure } = require("../../database/executeProcedure.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js");
const { verifyToken } = require("../../middleware/verifyToken.js");
const { getUsernameFromToken } = require("../../utils/getUsernameFromToken.js");

const router = express.Router();

// -------------------- GET MEANINGS --------------------
async function getMeanings(req, res, next) {
  try {
    const { meaning, word, part_of_speech, where_options } = req.query;
    const username = await getUsernameFromToken(req.headers["authorization"]);

    let p_json_params = null;
    if (where_options) {
      p_json_params = where_options; // should be a JSON string like '[{"field":"word","comparison_operation":"="}]'
    }

    const result = await executeProcedure("prc_crud_meanings", [
      { name: "p_id", type: "text", value: null },
      { name: "p_meaning", type: "text", value: meaning || null },
      { name: "p_word", type: "text", value: word || null },
      { name: "p_part_of_speech", type: "text", value: part_of_speech || null },
      { name: "p_username", type: "text", value: username },
      { name: "p_action", type: "text", value: "READ" },
      { name: "p_rows", type: "CURSOR", value: "cursor_" + getRandomId() },
      { name: "p_error", type: "text", value: null },
      { name: "p_json_params", type: "text", value: p_json_params },
    ]);

    if (result.p_error) {
      res.locals.error = result.p_error;
      res.locals.data = [];
    } else {
      res.locals.error = null;
      res.locals.data = result.p_rows || [];
    }

    console.log(result.p_rows)

    next();
  } catch (err) {
    console.error("❌ getMeanings error:", err);
    res.locals.error = err.message;
    res.locals.data = [];
    next();
  }
}

// -------------------- ADD MEANING --------------------
async function addMeaning(req, res) {
  try {
    const { meaning, word, part_of_speech } = req.body;
    const username = await getUsernameFromToken(req.headers["authorization"]);
    const id = getRandomId();

    const result = await executeProcedure("prc_crud_meanings", [
      { name: "p_id", type: "text", value: id },
      { name: "p_meaning", type: "text", value: meaning },
      { name: "p_word", type: "text", value: word },
      { name: "p_part_of_speech", type: "text", value: part_of_speech },
      { name: "p_username", type: "text", value: username },
      { name: "p_action", type: "text", value: "CREATE" },
      { name: "p_rows", type: "CURSOR", value: null },
      { name: "p_error", type: "text", value: null },
      { name: "p_json_params", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    res.json({ error: null, data: { id, meaning, word, part_of_speech } });
  } catch (err) {
    console.error("❌ addMeaning error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- UPDATE MEANING --------------------
async function updateMeaning(req, res) {
  try {
    const { id } = req.params;
    const { meaning, word, part_of_speech } = req.body;
    const username = await getUsernameFromToken(req.headers["authorization"]);

    const result = await executeProcedure("prc_crud_meanings", [
      { name: "p_id", type: "text", value: id },
      { name: "p_meaning", type: "text", value: meaning },
      { name: "p_word", type: "text", value: word },
      { name: "p_part_of_speech", type: "text", value: part_of_speech },
      { name: "p_username", type: "text", value: username },
      { name: "p_action", type: "text", value: "UPDATE" },
      { name: "p_rows", type: "CURSOR", value: null },
      { name: "p_error", type: "text", value: null },
      { name: "p_json_params", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    res.json({ error: null, data: { id, meaning, word, part_of_speech } });
  } catch (err) {
    console.error("❌ updateMeaning error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- DELETE MEANING --------------------
async function deleteMeaning(req, res) {
  try {
    const { id } = req.params;
    const username = await getUsernameFromToken(req.headers["authorization"]);

    const result = await executeProcedure("prc_crud_meanings", [
      { name: "p_id", type: "text", value: id },
      { name: "p_meaning", type: "text", value: null },
      { name: "p_word", type: "text", value: null },
      { name: "p_part_of_speech", type: "text", value: null },
      { name: "p_username", type: "text", value: username },
      { name: "p_action", type: "text", value: "DELETE" },
      { name: "p_rows", type: "CURSOR", value: null },
      { name: "p_error", type: "text", value: null },
      { name: "p_json_params", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    res.json({ error: null, data: { id } });
  } catch (err) {
    console.error("❌ deleteMeaning error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- ROUTES --------------------
router.get("/", verifyToken, getMeanings, paginationMiddleware);
router.post("/", verifyToken, addMeaning);
router.put("/:id", verifyToken, updateMeaning);
router.delete("/:id", verifyToken, deleteMeaning);

module.exports = router;
