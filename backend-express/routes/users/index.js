const express = require("express");
const { executeProcedure } = require("../../database/executeProcedure.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const {
  paginationMiddleware,
} = require("../../middleware/paginationMiddleware.js");
const { verifyToken } = require("../../middleware/verifyToken.js");
const { getUsernameFromToken } = require("../../utils/getUsernameFromToken.js");

const router = express.Router();

// -------------------- GET USERS --------------------
async function getUsers(req, res, next) {
  try {
    const { username } = req.query;
    const login_username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_users", [
      { name: "p_id", type: "text", value: null },
      { name: "p_username", type: "text", value: username || null },
      { name: "p_email", type: "text", value: null },
      { name: "p_password_hash", type: "text", value: null },
      { name: "p_full_name", type: "text", value: null },
      { name: "p_is_active", type: "boolean", value: null },
      { name: "p_login_username", type: "text", value: login_username },
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
    console.error("getUsers error:", err);
    res.locals.data = [];
    res.locals.error = err.message;
    next();
  }
}

// -------------------- DELETE USER --------------------
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const login_username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_users", [
      { name: "p_id", type: "text", value: id },
      { name: "p_username", type: "text", value: null },
      { name: "p_email", type: "text", value: null },
      { name: "p_password_hash", type: "text", value: null },
      { name: "p_full_name", type: "text", value: null },
      { name: "p_is_active", type: "boolean", value: null },
      { name: "p_login_username", type: "text", value: login_username },
      { name: "p_action", type: "text", value: "DELETE" },
      { name: "p_rows", type: "CURSOR", value: null },
      { name: "p_error", type: "text", value: null },
      { name: "p_json_params", type: "text", value: null },
    ]);

    if (result.p_error) {
      return res.status(400).json({ error: result.p_error, data: null });
    }

    return res.json({ error: null, data: { id } });
  } catch (err) {
    console.error("deleteUser error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
}

// -------------------- ROUTES --------------------
router.get("/", verifyToken, getUsers, paginationMiddleware);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
