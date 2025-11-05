const express = require("express");
const { executeProcedure } = require("../../database/executeProcedure.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const {
  paginationMiddleware,
} = require("../../middleware/paginationMiddleware.js");
const { verifyToken } = require("../../middleware/verifyToken.js");

const router = express.Router();

// -------------------- GET WORDS --------------------
async function getWords(req, res, next) {
  try {
    const { word } = req.query;
    const user_id = req.user?.id || req.query.user_id || null;

    const result = await executeProcedure("prc_crud_words", [
      { name: "p_id", value: null },
      { name: "p_word", type: "CURSOR", value: word },
      { name: "p_user_id", value: user_id },
      { name: "p_action", value: "READ" },
      { name: "p_rows", type: "CURSOR", value: "p_rows" },
      { name: "p_error", type: "p_error", value: null },
    ]);

    if (result.p_error) {
      res.locals.error = result.p_error;
      res.locals.data = [];
    } else {
      res.locals.error = null;
      res.locals.data = result.p_rows;
    }

    next();
  } catch (err) {
    console.error("❌ getWords error:", err);
    res.locals.data = [];
    res.locals.error = err.message;
    next();
  }
}

// -------------------- ADD WORD --------------------
async function addWord(req, res) {
  try {
    const { word } = req.body;
    const user_id = req.user?.id || req.body.user_id || null;
    const id = getRandomId();

    const { p_error } = await executeProcedure("elp.prc_crud_words", [
      id, // p_id
      word, // p_word
      user_id, // p_user_id
      "CREATE", // p_action
    ]);

    if (p_error) {
      return res.status(400).json({ error: p_error, data: null });
    }

    res.json({ error: null, data: { id, word } });
  } catch (err) {
    console.error("❌ addWord error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- UPDATE WORD --------------------
async function updateWord(req, res) {
  try {
    const { id } = req.params;
    const { word } = req.body;
    const user_id = req.user?.id || req.body.user_id || null;

    const { p_error } = await executeProcedure("elp.prc_crud_words", [
      id, // p_id
      word, // p_word
      user_id, // p_user_id
      "UPDATE", // p_action
    ]);

    if (p_error) {
      return res.status(400).json({ error: p_error, data: null });
    }

    res.json({ error: null, data: { id, word } });
  } catch (err) {
    console.error("❌ updateWord error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- DELETE WORD --------------------
async function deleteWord(req, res) {
  try {
    const { id } = req.params;
    const user_id = req.user?.id || req.body.user_id || null;

    const { p_error } = await executeProcedure("elp.prc_crud_words", [
      id, // p_id
      null, // p_word
      user_id, // p_user_id
      "DELETE", // p_action
    ]);

    if (p_error) {
      return res.status(400).json({ error: p_error, data: null });
    }

    res.json({ error: null, data: { id } });
  } catch (err) {
    console.error("❌ deleteWord error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- ROUTES --------------------
router.get("/", verifyToken, getWords, paginationMiddleware);
router.post("/", verifyToken, addWord);
router.put("/:id", verifyToken, updateWord);
router.delete("/:id", verifyToken, deleteWord);

module.exports = router;
