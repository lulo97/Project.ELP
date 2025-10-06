const express = require("express");
const { executeSelect, execute } = require("../../database/execute.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js");

const router = express.Router();

// GET: Read with filters + pagination
async function getPosts(req, res, next) {
  try {
    const { id, title, content, pageIndex, pageSize } = req.query;

    let sql = "SELECT * FROM posts";
    const params = [];
    const conditions = [];

    if (id) {
      conditions.push("id LIKE ?");
      params.push('%' + id + '%');
    }
    if (title) {
      conditions.push("title LIKE ?");
      params.push('%' + title + '%');
    }
    if (content) {
      conditions.push("content LIKE ?");
      params.push('%' + content + '%');
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
async function addPosts(req, res) {
  try {
    const { title, content } = req.body;
    const id = getRandomId();

    const sql = `
      INSERT INTO posts (id, title, content)
      VALUES (?, ?, ?)
    `;

    const result = await execute({
      sql,
      params: [id, title, content]
    });

    res.json({ data: result, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: error.message });
  }
}

// PUT: Update
async function updatePosts(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const sql = `
      UPDATE posts
      SET title = ?, content = ?
      WHERE id = ?
    `;

    const result = await execute({
      sql,
      params: [title, content, id]
    });

    res.json({ data: result, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: error.message });
  }
}

// DELETE
async function deletePosts(req, res) {
  try {
    const { id } = req.params;

    const sql = "DELETE FROM posts WHERE id = ?";
    const result = await execute({ sql, params: [id] });

    res.json({ data: result, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: error.message });
  }
}

// Routes
router.get("/", getPosts, paginationMiddleware);
router.post("/", addPosts);
router.put("/:id", updatePosts);
router.delete("/:id", deletePosts);

module.exports = router;
