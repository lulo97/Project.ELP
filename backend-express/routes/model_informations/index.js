const express = require("express");
const { executeProcedure } = require("../../database/executeProcedure.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const {
  paginationMiddleware,
} = require("../../middleware/paginationMiddleware.js");
const { verifyToken } = require("../../middleware/verifyToken.js");
const { verifyAdmin } = require("../../middleware/verifyAdmin.js");
const { getUsernameFromToken } = require("../../utils/getUsernameFromToken.js");

const router = express.Router();

async function getModelInformations(req, res, next) {
  try {
    const username = await getUsernameFromToken(req.cookies?.token);

    const result = await executeProcedure("prc_crud_model_informations", [
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
    console.error("error:", err);
    res.locals.error = err.message;
    res.locals.data = [];
    next();
  }
}

// -------------------- ROUTES --------------------
router.get(
  "/",
  verifyToken,
  verifyAdmin,
  getModelInformations,
  paginationMiddleware
);

module.exports = router;
