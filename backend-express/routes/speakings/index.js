const express = require("express");
const { executeProcedure } = require("../../database/executeProcedure.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js");
const { verifyToken } = require("../../middleware/verifyToken.js");
const { getUsernameFromToken } = require("../../utils/getUsernameFromToken.js");

const router = express.Router();

/* ================================================
   GET SPEAKINGS
================================================ */
async function getSpeakings(req, res, next) {
  try {
    const { id, question, answer } = req.query;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_speakings", [
      { name: "p_id", type: "text", value: id || null },
      { name: "p_question", type: "text", value: question || null },
      { name: "p_answer", type: "text", value: answer || null },
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
    console.error("getSpeakings error:", err);
    res.locals.data = [];
    res.locals.error = err.message;
    next();
  }
}

/* ================================================
   CREATE SPEAKING
================================================ */
async function addSpeakings(req, res) {
  try {
    const { question, answer } = req.body;
    const username = await getUsernameFromToken(req.cookies?.token);
    const id = getRandomId();

    const result = await executeProcedure("prc_crud_speakings", [
      { name: "p_id", type: "text", value: id },
      { name: "p_question", type: "text", value: question },
      { name: "p_answer", type: "text", value: answer },
      { name: "p_username", type: "text", value: username },
      { name: "p_action", type: "text", value: "CREATE" },
      { name: "p_rows", type: "CURSOR", value: "cursor_" + getRandomId() },
      { name: "p_error", type: "text", value: null },
      { name: "p_json_params", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    const data = result.p_rows[0];
    res.json({ error: null, data });

  } catch (err) {
    console.error("addSpeakings error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

/* ================================================
   UPDATE SPEAKING
================================================ */
async function updateSpeakings(req, res) {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_speakings", [
      { name: "p_id", type: "text", value: id },
      { name: "p_question", type: "text", value: question },
      { name: "p_answer", type: "text", value: answer },
      { name: "p_username", type: "text", value: username },
      { name: "p_action", type: "text", value: "UPDATE" },
      { name: "p_rows", type: "CURSOR", value: null },
      { name: "p_error", type: "text", value: null },
      { name: "p_json_params", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    res.json({ error: null, data: { id, question, answer } });

  } catch (err) {
    console.error("updateSpeakings error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

/* ================================================
   DELETE SPEAKING
================================================ */
async function deleteSpeakings(req, res) {
  try {
    const { id } = req.params;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_speakings", [
      { name: "p_id", type: "text", value: id },
      { name: "p_question", type: "text", value: null },
      { name: "p_answer", type: "text", value: null },
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
    console.error("deleteSpeakings error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

/* ================================================
   ROUTES
================================================ */
router.get("/", verifyToken, getSpeakings, paginationMiddleware);
router.post("/", verifyToken, addSpeakings);
router.put("/:id", verifyToken, updateSpeakings);
router.delete("/:id", verifyToken, deleteSpeakings);

module.exports = router;
