const express = require("express");
const { executeProcedure } = require("../../database/executeProcedure.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js");
const { verifyToken } = require("../../middleware/verifyToken.js");
const { getUsernameFromToken } = require("../../utils/getUsernameFromToken.js");

const router = express.Router();

// -------------------- GET IDIOMS --------------------
async function getIdioms(req, res, next) {
  try {
    const { idiom } = req.query;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_idioms", [
      { name: "p_id", type: "text", value: null },
      { name: "p_idiom", type: "text", value: idiom || null },
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
    console.error("getIdioms error:", err);
    res.locals.data = [];
    res.locals.error = err.message;
    next();
  }
}

// -------------------- ADD IDIOM --------------------
async function addIdiom(req, res) {
  try {
    const { idiom, meaning, example } = req.body;
    const username = await getUsernameFromToken(req.cookies?.token);
    const id = getRandomId();

    const result = await executeProcedure("prc_crud_idioms", [
      { name: "p_id", type: "text", value: id },
      { name: "p_idiom", type: "text", value: idiom },
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

    res.json({ error: null, data: { id, idiom, meaning, example } });
  } catch (err) {
    console.error("addIdiom error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- UPDATE IDIOM --------------------
async function updateIdiom(req, res) {
  try {
    const { id } = req.params;
    const { idiom, meaning, example } = req.body;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_idioms", [
      { name: "p_id", type: "text", value: id },
      { name: "p_idiom", type: "text", value: idiom },
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

    res.json({ error: null, data: { id, idiom, meaning, example } });
  } catch (err) {
    console.error("updateIdiom error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- DELETE IDIOM --------------------
async function deleteIdiom(req, res) {
  try {
    const { id } = req.params;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_idioms", [
      { name: "p_id", type: "text", value: id },
      { name: "p_idiom", type: "text", value: null },
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
    console.error("deleteIdiom error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- ROUTES --------------------
router.get("/", verifyToken, getIdioms, paginationMiddleware);
router.post("/", verifyToken, addIdiom);
router.put("/:id", verifyToken, updateIdiom);
router.delete("/:id", verifyToken, deleteIdiom);

module.exports = router;
