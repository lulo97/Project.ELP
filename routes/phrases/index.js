const express = require("express");
const { executeSelect, execute } = require("../../database/execute.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js")

const router = express.Router();

async function getPhrases(req, res, next) {
  try {
    const { phrases } = req.query;

    let sql = "SELECT * FROM PHRASES";
    const params = [];

    if (phrases) {
      sql += " WHERE phrases = ?";
      params.push(phrases);
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

async function addPhrases(req, res, next) {
    const { phrase, meaning, example } = req.body;
    const id = getRandomId();
    const sql = "INSERT INTO PHRASES (id, phrase, meaning, example) VALUES (?, ?, ?, ?)";
    const result = await execute({ sql: sql, params: [id, phrase, meaning, example]})
    res.json({ data: result, error: null }); 
}

async function updatePhrases(req, res, next) {
    const { id } = req.params;
    const { phrase, meaning, example } = req.body;
    const sql = "UPDATE PHRASES SET phrase = ?, meaning = ?, example = ? WHERE id = ?";
    const result = await execute({ sql: sql, params: [phrase, meaning, example, id]})
    res.json({ data: result, error: null }); 
}

async function deletePhrases(req, res, next) {
    const { id } = req.params;
    const sql = "DELETE FROM PHRASES WHERE id = ?";
    const result = await execute({ sql: sql, params: [id]})
    res.json({ data: result, error: null }); 
}

router.get("/", getPhrases, paginationMiddleware);

router.post("/", addPhrases);

router.put("/:id", updatePhrases);

router.delete("/:id", deletePhrases);

module.exports = router;
