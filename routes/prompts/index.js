const express = require("express");
const { executeProcedure } = require("../../database/executeProcedure.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const {
  paginationMiddleware,
} = require("../../middleware/paginationMiddleware.js");
const { verifyToken } = require("../../middleware/verifyToken.js");
const { verifyAdmin } = require("../../middleware/verifyAdmin.js");

const router = express.Router();

// -------------------- GET PROMPTS --------------------
async function getPrompts(req, res, next) {
  try {
    const { prompt, model_name, description, active } = req.query;

    const result = await executeProcedure("prc_crud_prompts", [
      { name: "p_id", type: "text", value: null },
      { name: "p_prompt", type: "text", value: prompt },
      { name: "p_model_name", type: "text", value: model_name },
      { name: "p_description", type: "text", value: description },
      { name: "p_active", type: "text", value: active },
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
    console.error("getPrompts error:", err);
    res.locals.data = [];
    res.locals.error = err.message;
    next();
  }
}

// -------------------- ADD PROMPT --------------------
async function addPrompt(req, res) {
  try {
    const { prompt, model_name, description, active } = req.body;
    const id = getRandomId();

    const result = await executeProcedure("prc_crud_prompts", [
      { name: "p_id", type: "text", value: id },
      { name: "p_prompt", type: "text", value: prompt },
      { name: "p_model_name", type: "text", value: model_name },
      { name: "p_description", type: "text", value: description },
      { name: "p_active", type: "text", value: active },
      { name: "p_action", type: "text", value: "CREATE" },
      { name: "p_rows", type: "CURSOR", value: null },
      { name: "p_error", type: "text", value: null },
      { name: "p_json_params", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    res.json({ error: null, data: { id, prompt } });
  } catch (err) {
    console.error("addPrompt error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- UPDATE PROMPT --------------------
async function updatePrompt(req, res) {
  try {
    const { id } = req.params;
    const { prompt, model_name, description, active } = req.body;

    const result = await executeProcedure("prc_crud_prompts", [
      { name: "p_id", type: "text", value: id },
      { name: "p_prompt", type: "text", value: prompt },
      { name: "p_model_name", type: "text", value: model_name },
      { name: "p_description", type: "text", value: description },
      { name: "p_active", type: "text", value: active },
      { name: "p_action", type: "text", value: "UPDATE" },
      { name: "p_rows", type: "CURSOR", value: null },
      { name: "p_error", type: "text", value: null },
      { name: "p_json_params", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    res.json({ error: null, data: { id, prompt } });
  } catch (err) {
    console.error("updatePrompt error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- DELETE PROMPT --------------------
async function deletePrompt(req, res) {
  try {
    const { id } = req.params;

    const result = await executeProcedure("prc_crud_prompts", [
      { name: "p_id", type: "text", value: id },
      { name: "p_prompt", type: "text", value: null },
      { name: "p_model_name", type: "text", value: null },
      { name: "p_description", type: "text", value: null },
      { name: "p_active", type: "text", value: null },
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
    console.error("deletePrompt error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- ROUTES --------------------
router.get("/", verifyToken, verifyAdmin, getPrompts, paginationMiddleware);
router.post("/", verifyToken, verifyAdmin, addPrompt);
router.put("/:id", verifyToken, verifyAdmin, updatePrompt);
router.delete("/:id", verifyToken, verifyAdmin, deletePrompt);

module.exports = router;
