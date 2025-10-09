const express = require("express");
const { executeSelect, execute } = require("../../database/execute.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js")

const router = express.Router();

async function getWritingQuestions(req, res, next) {
  try {
    const { question } = req.query;

    let sql = "SELECT * FROM WRITING_QUESTIONS";
    const params = [];

    if (question) {
      sql += " WHERE question = ?";
      params.push(question);
    }


  sql += " ORDER BY CAST(id AS UNSIGNED) desc";
  const result = await executeSelect({ sql, params });

    res.locals.data = result;
    next();
  } catch (err) {
    console.error(err)
    res.locals.error = err.message;
    next();
  }
}

async function addWritingQuestion(req, res, next) {
    const { question } = req.body;
    const id = getRandomId();
    const sql = "INSERT INTO WRITING_QUESTIONS (id, question) VALUES (?, ?)";
    const result = await execute({ sql: sql, params: [id, question]})
    res.json({ data: result, error: null }); 
}

async function updateWritingQuestion(req, res, next) {
    const { id } = req.params;
    const { question } = req.body;
    const sql = "UPDATE WRITING_QUESTIONS SET question = ? WHERE id = ?";
    const result = await execute({ sql: sql, params: [question, id]})
    res.json({ data: result, error: null }); 
}

async function deleteWritingQuestion(req, res, next) {
    const { id } = req.params;
    const sql = "DELETE FROM WRITING_QUESTIONS WHERE id = ?";
    const result = await execute({ sql: sql, params: [id]})
    res.json({ data: result, error: null }); 
}

router.get("/", getWritingQuestions, paginationMiddleware);

router.post("/", addWritingQuestion);

router.put("/:id", updateWritingQuestion);

router.delete("/:id", deleteWritingQuestion);

module.exports = router;
