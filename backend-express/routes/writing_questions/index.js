const express = require("express");
const { executeProcedure } = require("../../database/executeProcedure.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js");
const { verifyToken } = require("../../middleware/verifyToken.js");
const { getUsernameFromToken } = require("../../utils/getUsernameFromToken.js");

const router = express.Router();

// -------------------- GET WRITING QUESTIONS --------------------
async function getWritingQuestions(req, res, next) {
  try {
    const { question } = req.query;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_writing_questions", [
      { name: "p_id", type: "text", value: null },
      { name: "p_question", type: "text", value: question || null },
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
    console.error("getWritingQuestions error:", err);
    res.locals.data = [];
    res.locals.error = err.message;
    next();
  }
}

// -------------------- ADD WRITING QUESTION --------------------
async function addWritingQuestion(req, res) {
  try {
    const { question } = req.body;
    const username = await getUsernameFromToken(req.cookies?.token);
    const id = getRandomId();

    const result = await executeProcedure("prc_crud_writing_questions", [
      { name: "p_id", type: "text", value: id },
      { name: "p_question", type: "text", value: question },
      { name: "p_action", type: "text", value: "CREATE" },
      { name: "p_username", type: "text", value: username || null },
      { name: "p_rows", type: "CURSOR", value: "cursor_" + getRandomId() },
      { name: "p_error", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    const data = (result.p_rows && result.p_rows[0]) || null;
    res.json({ error: null, data });
  } catch (err) {
    console.error("addWritingQuestion error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- UPDATE WRITING QUESTION --------------------
async function updateWritingQuestion(req, res) {
  try {
    const { id } = req.params;
    const { question } = req.body;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_writing_questions", [
      { name: "p_id", type: "text", value: id },
      { name: "p_question", type: "text", value: question },
      { name: "p_action", type: "text", value: "UPDATE" },
      { name: "p_username", type: "text", value: username || null },
      { name: "p_rows", type: "CURSOR", value: "cursor_" + getRandomId() },
      { name: "p_error", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    const data = (result.p_rows && result.p_rows[0]) || { id, question };
    res.json({ error: null, data });
  } catch (err) {
    console.error("updateWritingQuestion error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- DELETE WRITING QUESTION --------------------
async function deleteWritingQuestion(req, res) {
  try {
    const { id } = req.params;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_writing_questions", [
      { name: "p_id", type: "text", value: id },
      { name: "p_question", type: "text", value: null },
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
    console.error("deleteWritingQuestion error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- ROUTES --------------------
router.get("/", verifyToken, getWritingQuestions, paginationMiddleware);
router.post("/", verifyToken, addWritingQuestion);
router.put("/:id", verifyToken, updateWritingQuestion);
router.delete("/:id", verifyToken, deleteWritingQuestion);

module.exports = router;
