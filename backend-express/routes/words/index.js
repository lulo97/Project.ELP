const express = require("express");
const { executeProcedure } = require("../../database/executeProcedure.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const {
  paginationMiddleware,
} = require("../../middleware/paginationMiddleware.js");
const { verifyToken } = require("../../middleware/verifyToken.js");
const { getUsernameFromToken } = require("../../utils/getUsernameFromToken.js");

const router = express.Router();

// -------------------- GET WORDS --------------------
async function getWords(req, res, next) {
  try {
    const { word, where_options } = req.query;
    const username = await getUsernameFromToken(req.cookies?.token);

    //[{"field":"word","comparison_operation":"="}]
    const p_json_params = where_options ? JSON.stringify(where_options) : "";

    const result = await executeProcedure("prc_crud_words", [
      { name: "p_id", type: "text", value: null },
      { name: "p_word", type: "text", value: word || null },
      { name: "p_username", type: "text", value: username },
      { name: "p_action", type: "text", value: "READ" },
      { name: "p_rows", type: "CURSOR", value: "cursor_" + getRandomId() },
      { name: "p_error", type: "text", value: null },
      { name: "p_json_params", type: "text", value: p_json_params || null },
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
    console.error("getWords error:", err);
    res.locals.data = [];
    res.locals.error = err.message;
    next();
  }
}

// -------------------- ADD WORD --------------------
async function addWord(req, res) {
  try {
    const { word } = req.body;
    const username = await getUsernameFromToken(req.cookies?.token);
    const id = getRandomId();

    const result = await executeProcedure("prc_crud_words", [
      { name: "p_id", type: "text", value: id },
      { name: "p_word", type: "text", value: word },
      { name: "p_username", type: "text", value: username },
      { name: "p_action", type: "text", value: "CREATE" },
      { name: "p_rows", type: "CURSOR", value: "cursor_" + getRandomId() },
      { name: "p_error", type: "text", value: null },
      { name: "p_json_params", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    res.json({ error: null, data: result.p_rows[0] });
  } catch (err) {
    console.error("addWord error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- UPDATE WORD --------------------
async function updateWord(req, res) {
  try {
    const { id } = req.params;
    const { word } = req.body;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_words", [
      { name: "p_id", type: "text", value: id },
      { name: "p_word", type: "text", value: word },
      { name: "p_username", type: "text", value: username },
      { name: "p_action", type: "text", value: "UPDATE" },
      { name: "p_rows", type: "CURSOR", value: "cursor_" + getRandomId() },
      { name: "p_error", type: "text", value: null },
      { name: "p_json_params", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    res.json({ error: null, data: result.p_rows[0] });
  } catch (err) {
    console.error("updateWord error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- DELETE WORD --------------------
async function deleteWord(req, res) {
  try {
    const { id } = req.params;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_words", [
      { name: "p_id", type: "text", value: id },
      { name: "p_word", type: "text", value: null },
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
    console.error("deleteWord error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- ROUTES --------------------
router.get("/", verifyToken, getWords, paginationMiddleware);
router.post("/", verifyToken, addWord);
router.put("/:id", verifyToken, updateWord);
router.delete("/:id", verifyToken, deleteWord);

module.exports = router;
