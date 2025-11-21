const express = require("express");
const { executeSelect, execute } = require("../../database/execute.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js")

const router = express.Router();

async function getWritingAnswers(req, res, next) {
  try {
    const { question } = req.query;

    let sql = `
SELECT 
  wa.* 
FROM WRITING_ANSWERS wa 
JOIN WRITING_QUESTIONS wq ON wa.question_id = wq.id
`;
    const params = [];

    if (question) {
      sql += " WHERE wq.question = ?";
      params.push(question);
    }


  sql += " ORDER BY CAST(wa.id AS UNSIGNED) asc";
  const result = await executeSelect({ sql, params });

    res.locals.data = result;
    next();
  } catch (err) {
    console.error(err)
    res.locals.error = err.message;
    next();
  }
}

async function addWritingAnswer(req, res, next) {
  const { question_id, answer, review } = req.body;
  const id = getRandomId();
  const sql = "INSERT INTO WRITING_ANSWERS (id, question_id, answer, review) VALUES (?, ?, ?, ?)";
  const result = await execute({ sql: sql, params: [id, question_id, answer, review] })
  res.json({ data: result, error: null });
}

async function updateWritingAnswer(req, res, next) {
  const { id } = req.params;
  const { question_id, answer, review } = req.body;
  const sql = "UPDATE WRITING_ANSWERS SET question_id = ?, answer = ?, review = ? WHERE id = ?";
  const result = await execute({ sql: sql, params: [question_id, answer, review, id] })
  res.json({ data: result, error: null });
}

async function deleteWritingAnswer(req, res, next) {
  const { id } = req.params;
  const sql = "DELETE FROM WRITING_ANSWERS WHERE id = ?";
  const result = await execute({ sql: sql, params: [id] })
  res.json({ data: result, error: null });
}

router.get("/", getWritingAnswers, paginationMiddleware);

router.post("/", addWritingAnswer);

router.put("/:id", updateWritingAnswer);

router.delete("/:id", deleteWritingAnswer);

module.exports = router;
