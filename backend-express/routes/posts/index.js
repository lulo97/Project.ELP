const express = require("express");
const { executeProcedure } = require("../../database/executeProcedure.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js");
const { verifyToken } = require("../../middleware/verifyToken.js");
const { getUsernameFromToken } = require("../../utils/getUsernameFromToken.js");

const router = express.Router();

// -------------------- GET POSTS --------------------
async function getPosts(req, res, next) {
  try {
    const { title } = req.query;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_posts", [
      { name: "p_id", type: "text", value: null },
      { name: "p_title", type: "text", value: title || null },
      { name: "p_content", type: "text", value: null },
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
    console.error("getPosts error:", err);
    res.locals.data = [];
    res.locals.error = err.message;
    next();
  }
}

// -------------------- ADD POST --------------------
async function addPost(req, res) {
  try {
    const { title, content } = req.body;
    const username = await getUsernameFromToken(req.cookies?.token);
    const id = getRandomId();

    const result = await executeProcedure("prc_crud_posts", [
      { name: "p_id", type: "text", value: id },
      { name: "p_title", type: "text", value: title },
      { name: "p_content", type: "text", value: content },
      { name: "p_username", type: "text", value: username },
      { name: "p_action", type: "text", value: "CREATE" },
      { name: "p_rows", type: "CURSOR", value: null },
      { name: "p_error", type: "text", value: null },
      { name: "p_json_params", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    res.json({ error: null, data: { id, title, content } });
  } catch (err) {
    console.error("addPost error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- UPDATE POST --------------------
async function updatePost(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_posts", [
      { name: "p_id", type: "text", value: id },
      { name: "p_title", type: "text", value: title },
      { name: "p_content", type: "text", value: content },
      { name: "p_username", type: "text", value: username },
      { name: "p_action", type: "text", value: "UPDATE" },
      { name: "p_rows", type: "CURSOR", value: null },
      { name: "p_error", type: "text", value: null },
      { name: "p_json_params", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    res.json({ error: null, data: { id, title, content } });
  } catch (err) {
    console.error("updatePost error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- DELETE POST --------------------
async function deletePost(req, res) {
  try {
    const { id } = req.params;
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_posts", [
      { name: "p_id", type: "text", value: id },
      { name: "p_title", type: "text", value: null },
      { name: "p_content", type: "text", value: null },
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
    console.error("deletePost error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- ROUTES --------------------
router.get("/", verifyToken, getPosts, paginationMiddleware);
router.post("/", verifyToken, addPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

module.exports = router;
