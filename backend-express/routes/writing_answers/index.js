const express = require("express");
const { executeProcedure } = require("../../database/executeProcedure.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js");
const { verifyToken } = require("../../middleware/verifyToken.js");
const { getUsernameFromToken } = require("../../utils/getUsernameFromToken.js");

const router = express.Router();

// -------------------- GET WRITING ANSWERS --------------------
async function getWritingAnswers(req, res, next) {
  try {
    const { question_id } = req.query;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_writing_answers", [
      { name: "p_id", type: "text", value: null },
      { name: "p_question_id", type: "text", value: question_id || null },
      { name: "p_answer", type: "text", value: null },
      { name: "p_review", type: "text", value: null },
      { name: "p_action", type: "text", value: "READ" },
      { name: "p_username", type: "text", value: username || null },
      { name: "p_rows", type: "CURSOR", value: "cursor_" + getRandomId() },
      { name: "p_error", type: "text", value: null },
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
    console.error("getWritingAnswers error:", err);
    res.locals.data = [];
    res.locals.error = err.message;
    next();
  }
}

// -------------------- ADD WRITING ANSWER --------------------
async function addWritingAnswer(req, res) {
  try {
    const { question_id, answer, review } = req.body;
    const username = await getUsernameFromToken(req.cookies?.token);
    const id = getRandomId();

    const result = await executeProcedure("prc_crud_writing_answers", [
      { name: "p_id", type: "text", value: id },
      { name: "p_question_id", type: "text", value: question_id },
      { name: "p_answer", type: "text", value: answer },
      { name: "p_review", type: "text", value: review },
      { name: "p_action", type: "text", value: "CREATE" },
      { name: "p_username", type: "text", value: username || null },
      { name: "p_rows", type: "CURSOR", value: "cursor_" + getRandomId() },
      { name: "p_error", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    // return the created row (procedure opens cursor for the inserted id)
    const data = (result.p_rows && result.p_rows[0]) || null;
    res.json({ error: null, data });
  } catch (err) {
    console.error("addWritingAnswer error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- UPDATE WRITING ANSWER --------------------
async function updateWritingAnswer(req, res) {
  try {
    const { id } = req.params;
    const { question_id, answer, review } = req.body;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_writing_answers", [
      { name: "p_id", type: "text", value: id },
      { name: "p_question_id", type: "text", value: question_id },
      { name: "p_answer", type: "text", value: answer },
      { name: "p_review", type: "text", value: review },
      { name: "p_action", type: "text", value: "UPDATE" },
      { name: "p_username", type: "text", value: username || null },
      { name: "p_rows", type: "CURSOR", value: "cursor_" + getRandomId() },
      { name: "p_error", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    const data = (result.p_rows && result.p_rows[0]) || { id, question_id, answer, review };
    res.json({ error: null, data });
  } catch (err) {
    console.error("updateWritingAnswer error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- DELETE WRITING ANSWER --------------------
async function deleteWritingAnswer(req, res) {
  try {
    const { id } = req.params;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_writing_answers", [
      { name: "p_id", type: "text", value: id },
      { name: "p_question_id", type: "text", value: null },
      { name: "p_answer", type: "text", value: null },
      { name: "p_review", type: "text", value: null },
      { name: "p_action", type: "text", value: "DELETE" },
      { name: "p_username", type: "text", value: username || null },
      { name: "p_rows", type: "CURSOR", value: null },
      { name: "p_error", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    res.json({ error: null, data: { id } });
  } catch (err) {
    console.error("deleteWritingAnswer error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- ROUTES --------------------
router.get("/", verifyToken, getWritingAnswers, paginationMiddleware);
router.post("/", verifyToken, addWritingAnswer);
router.put("/:id", verifyToken, updateWritingAnswer);
router.delete("/:id", verifyToken, deleteWritingAnswer);

module.exports = router;
