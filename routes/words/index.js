const express = require("express");
const { executeSelect, execute } = require("../../database/execute.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js")

const router = express.Router();

async function getWords(req, res, next) {
  try {
    const { word } = req.query;

    let sql = "SELECT * FROM WORDS";
    const params = [];

    if (word) {
      sql += " WHERE word LIKE ?";
      params.push(`%${word}%`);  // Add wildcards around the parameter
    }

    sql += " ORDER BY CAST(id AS UNSIGNED) desc";

    const result = await executeSelect({ sql, params });

    res.locals.data = result;
    next();
  } catch (err) {
    res.locals.error = err.message;
    next();
  }
}

async function addWord(req, res, next) {
    const { word } = req.body;
    const id = getRandomId();
    const sql = "INSERT INTO WORDS (id, word) VALUES (?, ?)";
    const result = await execute({ sql: sql, params: [id, word]})
    res.json({ data: result, error: null }); 
}

async function updateWord(req, res, next) {
    const { id } = req.params;
    const { word } = req.body;
    const sql = "UPDATE WORDS SET word = ? WHERE id = ?";
    const result = await execute({ sql: sql, params: [word, id]})
    res.json({ data: result, error: null }); 
}

async function deleteWord(req, res, next) {
    const { id } = req.params;
    const sql = "DELETE FROM WORDS WHERE id = ?";
    const result = await execute({ sql: sql, params: [id]})
    res.json({ data: result, error: null }); 
}

router.get("/", getWords, paginationMiddleware);

router.post("/", addWord);

router.put("/:id", updateWord);

router.delete("/:id", deleteWord);

module.exports = router;
