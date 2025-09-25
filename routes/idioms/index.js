const express = require("express");
const { executeSelect, execute } = require("../../database/execute.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js")

const router = express.Router();

async function getIdioms(req, res, next) {
  try {
    const { idioms } = req.query;

    let sql = "SELECT * FROM IDIOMS";
    const params = [];

    if (idioms) {
      sql += " WHERE idioms = ?";
      params.push(idioms);
    }

    const result = await executeSelect({ sql, params });

    res.locals.data = result;
    next();
  } catch (err) {
    res.locals.error = err.message;
    next();
  }
}

async function addIdioms(req, res, next) {
    const { idiom, meaning, example } = req.body;
    const id = getRandomId();
    const sql = "INSERT INTO IDIOMS (id, idiom, meaning, example) VALUES (?, ?, ?, ?)";
    const result = await execute({ sql: sql, params: [id, idiom, meaning, example]})
    res.json({ data: result, error: null }); 
}

async function updateIdioms(req, res, next) {
    const { id } = req.params;
    const { idiom, meaning, example } = req.body;
    const sql = "UPDATE IDIOMS SET idiom = ?, meaning = ?, example = ? WHERE id = ?";
    const result = await execute({ sql: sql, params: [idiom, meaning, example, id]})
    res.json({ data: result, error: null }); 
}

async function deleteIdioms(req, res, next) {
    const { id } = req.params;
    const sql = "DELETE FROM IDIOMS WHERE id = ?";
    const result = await execute({ sql: sql, params: [id]})
    res.json({ data: result, error: null }); 
}

router.get("/", getIdioms, paginationMiddleware);

router.post("/", addIdioms);

router.put("/:id", updateIdioms);

router.delete("/:id", deleteIdioms);

module.exports = router;
