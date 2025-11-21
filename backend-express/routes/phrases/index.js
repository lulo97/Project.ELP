const express = require("express");
const { executeProcedure } = require("../../database/executeProcedure.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js");
const { verifyToken } = require("../../middleware/verifyToken.js");
const { getUsernameFromToken } = require("../../utils/getUsernameFromToken.js");

const router = express.Router();

// -------------------- GET PHRASES --------------------
async function getPhrases(req, res, next) {
  try {
    const { phrase } = req.query;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_phrases", [
      { name: "p_id", type: "text", value: null },
      { name: "p_phrase", type: "text", value: phrase || null },
      { name: "p_meaning", type: "text", value: null },
      { name: "p_example", type: "text", value: null },
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
    console.error("getPhrases error:", err);
    res.locals.data = [];
    res.locals.error = err.message;
    next();
  }
}

// -------------------- ADD PHRASE --------------------
async function addPhrase(req, res) {
  try {
    const { phrase, meaning, example } = req.body;
    const username = await getUsernameFromToken(req.cookies?.token);
    const id = getRandomId();

    const result = await executeProcedure("prc_crud_phrases", [
      { name: "p_id", type: "text", value: id },
      { name: "p_phrase", type: "text", value: phrase },
      { name: "p_meaning", type: "text", value: meaning },
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

    res.json({ error: null, data: { id, phrase, meaning, example } });
  } catch (err) {
    console.error("addPhrase error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- UPDATE PHRASE --------------------
async function updatePhrase(req, res) {
  try {
    const { id } = req.params;
    const { phrase, meaning, example } = req.body;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_phrases", [
      { name: "p_id", type: "text", value: id },
      { name: "p_phrase", type: "text", value: phrase },
      { name: "p_meaning", type: "text", value: meaning },
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

    res.json({ error: null, data: { id, phrase, meaning, example } });
  } catch (err) {
    console.error("updatePhrase error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- DELETE PHRASE --------------------
async function deletePhrase(req, res) {
  try {
    const { id } = req.params;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_phrases", [
      { name: "p_id", type: "text", value: id },
      { name: "p_phrase", type: "text", value: null },
      { name: "p_meaning", type: "text", value: null },
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
    console.error("deletePhrase error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- ROUTES --------------------
router.get("/", verifyToken, getPhrases, paginationMiddleware);
router.post("/", verifyToken, addPhrase);
router.put("/:id", verifyToken, updatePhrase);
router.delete("/:id", verifyToken, deletePhrase);

module.exports = router;
