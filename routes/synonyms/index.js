const express = require("express");
const { executeSelect, execute } = require("../../database/execute.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js");

const router = express.Router();

// GET: Read with filters + pagination
async function getSynonyms(req, res, next) {
  try {
    const { id, word, synomym, note, pageIndex, pageSize } = req.query;

    let sql = "SELECT * FROM synonyms";
    const params = [];
    const conditions = [];

    if (id) {
      conditions.push("id LIKE ?");
      params.push('%' + id + '%');
    }
    if (word) {
      conditions.push("word LIKE ?");
      params.push('%' + word + '%');
    }
    if (synomym) {
      conditions.push("synomym LIKE ?");
      params.push('%' + synomym + '%');
    }
    if (note) {
      conditions.push("note LIKE ?");
      params.push('%' + note + '%');
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    sql += " ORDER BY CAST(id AS UNSIGNED) desc";
    const result = await executeSelect({ sql, params });
    res.locals.data = result;
    res.locals.error = null;
    next();
  } catch (error) {
    next(error);
  }
}

// POST: Create
async function addSynonyms(req, res) {
  try {
    const { word, synomym, note } = req.body;
    const id = getRandomId();

    const sql = `
      INSERT INTO synonyms (id, word, synomym, note)
      VALUES (?, ?, ?, ?)
    `;

    const result = await execute({
      sql,
      params: [id, word, synomym, note]
    });

    res.json({ data: result, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: error.message });
  }
}

// PUT: Update
async function updateSynonyms(req, res) {
  try {
    const { id } = req.params;
    const { word, synomym, note } = req.body;

    const sql = `
      UPDATE synonyms
      SET word = ?, synomym = ?, note = ?
      WHERE id = ?
    `;

    const result = await execute({
      sql,
      params: [word, synomym, note, id]
    });

    res.json({ data: result, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: error.message });
  }
}

// DELETE
async function deleteSynonyms(req, res) {
  try {
    const { id } = req.params;

    const sql = "DELETE FROM synonyms WHERE id = ?";
    const result = await execute({ sql, params: [id] });

    res.json({ data: result, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: error.message });
  }
}

// Routes
router.get("/", getSynonyms, paginationMiddleware);
router.post("/", addSynonyms);
router.put("/:id", updateSynonyms);
router.delete("/:id", deleteSynonyms);

module.exports = router;
