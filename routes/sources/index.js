const express = require("express");
const { executeProcedure } = require("../../database/executeProcedure.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js");
const { verifyToken } = require("../../middleware/verifyToken.js");
const { getUsernameFromToken } = require("../../utils/getUsernameFromToken.js");

const router = express.Router();

// -------------------- GET SOURCES --------------------
async function getSources(req, res, next) {
  try {
    const { name, source } = req.query;
    const username = await getUsernameFromToken(req.headers["authorization"]);

    const result = await executeProcedure("prc_crud_sources", [
      { name: "p_id", type: "text", value: null },
      { name: "p_source", type: "text", value: source || null },
      { name: "p_name", type: "text", value: name || null },
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
    console.error("getSources error:", err);
    res.locals.data = [];
    res.locals.error = err.message;
    next();
  }
}

// -------------------- ADD SOURCE --------------------
async function addSource(req, res) {
  try {
    const { name, source, note } = req.body;
    const username = await getUsernameFromToken(req.headers["authorization"]);
    const id = getRandomId();

    const result = await executeProcedure("prc_crud_sources", [
      { name: "p_id", type: "text", value: id },
      { name: "p_source", type: "text", value: source },
      { name: "p_name", type: "text", value: name },
      { name: "p_note", type: "text", value: note || null },
      { name: "p_username", type: "text", value: username },
      { name: "p_action", type: "text", value: "CREATE" },
      { name: "p_rows", type: "CURSOR", value: null },
      { name: "p_error", type: "text", value: null },
      { name: "p_json_params", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    res.json({ error: null, data: { id, name, source, note } });
  } catch (err) {
    console.error("addSource error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- UPDATE SOURCE --------------------
async function updateSource(req, res) {
  try {
    const { id } = req.params;
    const { name, source, note } = req.body;
    const username = await getUsernameFromToken(req.headers["authorization"]);

    const result = await executeProcedure("prc_crud_sources", [
      { name: "p_id", type: "text", value: id },
      { name: "p_source", type: "text", value: source },
      { name: "p_name", type: "text", value: name },
      { name: "p_note", type: "text", value: note || null },
      { name: "p_username", type: "text", value: username },
      { name: "p_action", type: "text", value: "UPDATE" },
      { name: "p_rows", type: "CURSOR", value: null },
      { name: "p_error", type: "text", value: null },
      { name: "p_json_params", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    res.json({ error: null, data: { id, name, source, note } });
  } catch (err) {
    console.error("updateSource error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- DELETE SOURCE --------------------
async function deleteSource(req, res) {
  try {
    const { id } = req.params;
    const username = await getUsernameFromToken(req.headers["authorization"]);

    const result = await executeProcedure("prc_crud_sources", [
      { name: "p_id", type: "text", value: id },
      { name: "p_source", type: "text", value: null },
      { name: "p_name", type: "text", value: null },
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
    console.error("deleteSource error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- ROUTES --------------------
router.get("/", verifyToken, getSources, paginationMiddleware);
router.post("/", verifyToken, addSource);
router.put("/:id", verifyToken, updateSource);
router.delete("/:id", verifyToken, deleteSource);

module.exports = router;
