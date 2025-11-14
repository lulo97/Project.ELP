const express = require("express");
const { executeProcedure } = require("../../database/executeProcedure.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const {
  paginationMiddleware,
} = require("../../middleware/paginationMiddleware.js");
const { verifyToken } = require("../../middleware/verifyToken.js");
const { getUsernameFromToken } = require("../../utils/getUsernameFromToken.js");

const router = express.Router();

// -------------------- GET POSTS --------------------
async function getReadData(req, res, next) {
  try {
    const { source_id } = req.query;
    const username = await getUsernameFromToken(req.headers["authorization"]);

    const result = await executeProcedure("prc_get_read_data", [
      { name: "p_source_id", type: "text", value: source_id },
      { name: "p_username", type: "text", value: username },
      { name: "p_rows", type: "CURSOR", value: "cursor_" + getRandomId() },
      { name: "p_error", type: "text", value: null },
    ]);

    let output = { error: null, data: null };

    if (result.p_error) {
      output.error = result.p_error;
      output.data = [];
    } else {
      output.error = null;
      output.data = result.p_rows[0].result || [];

      //Construct source row for UI logic
      output.data.source_row = {
        ...output.data.sources[0],
      };
      delete output.data.sources;

      //Replace all null with []
      for (const [key, value] of Object.entries(output.data)) {
        if (value === null) {
          output.data[key] = [];
        }
      }
    }

    return res.json(output);
  } catch (err) {
    console.error("error:", err);
    output.data = [];
    output.error = err.message;
    return res.json(output);
  }
}

// -------------------- ROUTES --------------------
router.get("/", verifyToken, getReadData);

module.exports = router;
