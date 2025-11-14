const express = require("express");
const { executeProcedure } = require("../../database/executeProcedure.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js");
const { verifyToken } = require("../../middleware/verifyToken.js");
const { getUsernameFromToken } = require("../../utils/getUsernameFromToken.js");

const router = express.Router();

// -------------------- GET EXAMPLES --------------------
async function getExamples(req, res, next) {
  try {
    const { example, word } = req.query;
    const username = await getUsernameFromToken(req.headers["authorization"]);

    const result = await executeProcedure("prc_crud_examples", [
      { name: "p_id", type: "text", value: null },
      { name: "p_word", type: "text", value: word || null },
      { name: "p_part_of_speech", type: "text", value: null },
      { name: "p_example", type: "text", value: example || null },
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
    console.error("getExamples error:", err);
    res.locals.data = [];
    res.locals.error = err.message;
    next();
  }
}

// -------------------- ADD EXAMPLE --------------------
async function addExample(req, res) {
  try {
    const { word, part_of_speech, example } = req.body;
    const username = await getUsernameFromToken(req.headers["authorization"]);
    const id = getRandomId();

    const result = await executeProcedure("prc_crud_examples", [
      { name: "p_id", type: "text", value: id },
      { name: "p_word", type: "text", value: word },
      { name: "p_part_of_speech", type: "text", value: part_of_speech },
      { name: "p_example", type: "text", value: example },
      { name: "p_username", type: "text", value: username },
      { name: "p_action", type: "text", value: "CREATE" },
      { name: "p_rows", type: "CURSOR", value: null },
      { name: "p_error", type: "text", value: null },
      { name: "p_json_params", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    res.json({ error: null, data: { id, word, part_of_speech, example } });
  } catch (err) {
    console.error("addExample error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- UPDATE EXAMPLE --------------------
async function updateExample(req, res) {
  try {
    const { id } = req.params;
    const { word, part_of_speech, example } = req.body;
    const username = await getUsernameFromToken(req.headers["authorization"]);

    const result = await executeProcedure("prc_crud_examples", [
      { name: "p_id", type: "text", value: id },
      { name: "p_word", type: "text", value: word },
      { name: "p_part_of_speech", type: "text", value: part_of_speech },
      { name: "p_example", type: "text", value: example },
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
    console.error("updateExample error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- DELETE EXAMPLE --------------------
async function deleteExample(req, res) {
  try {
    const { id } = req.params;
    const username = await getUsernameFromToken(req.headers["authorization"]);

    const result = await executeProcedure("prc_crud_examples", [
      { name: "p_id", type: "text", value: id },
      { name: "p_word", type: "text", value: null },
      { name: "p_part_of_speech", type: "text", value: null },
      { name: "p_example", type: "text", value: null },
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
    console.error("deleteExample error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- ROUTES --------------------
router.get("/", verifyToken, getExamples, paginationMiddleware);
router.post("/", verifyToken, addExample);
router.put("/:id", verifyToken, updateExample);
router.delete("/:id", verifyToken, deleteExample);

module.exports = router;
