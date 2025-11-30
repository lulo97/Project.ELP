const express = require("express");
const { executeProcedure } = require("../../database/executeProcedure.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js");
const { verifyToken } = require("../../middleware/verifyToken.js");
const { getUsernameFromToken } = require("../../utils/getUsernameFromToken.js");

const router = express.Router();

/* ================================================
   GET SPEAKING SCORES
================================================ */
async function getSpeakingScores(req, res, next) {
  try {
    const { id, speaking_id, score, text_listened, text } = req.query;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_speaking_scores", [
      { name: "p_id", type: "text", value: id || null },
      { name: "p_speaking_id", type: "text", value: speaking_id || null },
      { name: "p_score", type: "text", value: score || null },
      { name: "p_text_listened", type: "text", value: text_listened || null },
      { name: "p_text", type: "text", value: text || null },
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
    console.error("getSpeakingScores error:", err);
    res.locals.data = [];
    res.locals.error = err.message;
    next();
  }
}

/* ================================================
   ADD SPEAKING SCORE
================================================ */
async function addSpeakingScore(req, res) {
  try {
    const { speaking_id, score, text_listened, text } = req.body;
    const username = await getUsernameFromToken(req.cookies?.token);
    const id = getRandomId();

    const result = await executeProcedure("prc_crud_speaking_scores", [
      { name: "p_id", type: "text", value: id },
      { name: "p_speaking_id", type: "text", value: speaking_id },
      { name: "p_score", type: "text", value: score || null },
      { name: "p_text_listened", type: "text", value: text_listened || null },
      { name: "p_text", type: "text", value: text || null },
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
    console.error("addSpeakingScore error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

/* ================================================
   UPDATE SPEAKING SCORE
================================================ */
async function updateSpeakingScore(req, res) {
  try {
    const { id } = req.params;
    const { speaking_id, score, text_listened, text } = req.body;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_speaking_scores", [
      { name: "p_id", type: "text", value: id },
      { name: "p_speaking_id", type: "text", value: speaking_id },
      { name: "p_score", type: "text", value: score || null },
      { name: "p_text_listened", type: "text", value: text_listened || null },
      { name: "p_text", type: "text", value: text || null },
      { name: "p_username", type: "text", value: username },
      { name: "p_action", type: "text", value: "UPDATE" },
      { name: "p_rows", type: "CURSOR", value: null },
      { name: "p_error", type: "text", value: null },
      { name: "p_json_params", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    res.json({
      error: null,
      data: { id, speaking_id, score, text_listened, text },
    });

  } catch (err) {
    console.error("updateSpeakingScore error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

/* ================================================
   DELETE SPEAKING SCORE
================================================ */
async function deleteSpeakingScore(req, res) {
  try {
    const { id } = req.params;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_speaking_scores", [
      { name: "p_id", type: "text", value: id },
      { name: "p_speaking_id", type: "text", value: null },
      { name: "p_score", type: "text", value: null },
      { name: "p_text_listened", type: "text", value: null },
      { name: "p_text", type: "text", value: null },
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
    console.error("deleteSpeakingScore error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

/* ================================================
   ROUTES
================================================ */
router.get("/", verifyToken, getSpeakingScores, paginationMiddleware);
router.post("/", verifyToken, addSpeakingScore);
router.put("/:id", verifyToken, updateSpeakingScore);
router.delete("/:id", verifyToken, deleteSpeakingScore);

module.exports = router;
