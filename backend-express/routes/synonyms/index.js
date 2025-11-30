const express = require("express");
const { executeProcedure } = require("../../database/executeProcedure.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js");
const { verifyToken } = require("../../middleware/verifyToken.js");
const { getUsernameFromToken } = require("../../utils/getUsernameFromToken.js");

const router = express.Router();

// -------------------- GET SYNONYMS --------------------
async function getSynonyms(req, res, next) {
  try {
    const { word } = req.query;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_synonyms", [
      { name: "p_id", type: "text", value: null },
      { name: "p_word", type: "text", value: word || null },
      { name: "p_synonym", type: "text", value: null },
      { name: "p_note", type: "text", value: null },
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
    console.error("getSynonyms error:", err);
    res.locals.data = [];
    res.locals.error = err.message;
    next();
  }
}

// -------------------- ADD SYNONYM --------------------
async function addSynonym(req, res) {
  try {
    const { word, synonym, note } = req.body;
    const username = await getUsernameFromToken(req.cookies?.token);
    const id = getRandomId();

    const result = await executeProcedure("prc_crud_synonyms", [
      { name: "p_id", type: "text", value: id },
      { name: "p_word", type: "text", value: word },
      { name: "p_synonym", type: "text", value: synonym },
      { name: "p_note", type: "text", value: note },
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
    console.error("addSynonym error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- UPDATE SYNONYM --------------------
async function updateSynonym(req, res) {
  try {
    const { id } = req.params;
    const { word, synonym, note } = req.body;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_synonyms", [
      { name: "p_id", type: "text", value: id },
      { name: "p_word", type: "text", value: word },
      { name: "p_synonym", type: "text", value: synonym },
      { name: "p_note", type: "text", value: note },
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
    console.error("updateSynonym error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- DELETE SYNONYM --------------------
async function deleteSynonym(req, res) {
  try {
    const { id } = req.params;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_synonyms", [
      { name: "p_id", type: "text", value: id },
      { name: "p_word", type: "text", value: null },
      { name: "p_synonym", type: "text", value: null },
      { name: "p_note", type: "text", value: null },
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
    console.error("deleteSynonym error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- ROUTES --------------------
router.get("/", verifyToken, getSynonyms, paginationMiddleware);
router.post("/", verifyToken, addSynonym);
router.put("/:id", verifyToken, updateSynonym);
router.delete("/:id", verifyToken, deleteSynonym);

module.exports = router;
