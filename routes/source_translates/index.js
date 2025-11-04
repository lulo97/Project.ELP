const express = require("express");
const { executeSelect, execute } = require("../../database/execute.js");
const { executeTransaction } = require("../../database/execute.js")
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js");

const router = express.Router();

// GET: Read with filters + pagination
async function getSourceTranslates(req, res, next) {
    try {
        const { source_id } = req.query;

        let sql = "SELECT * FROM source_translates WHERE source_id = ?";

        const result = await executeSelect({ sql, params: [source_id] });
        res.locals.data = result;
        res.locals.error = null;
        next();
    } catch (error) {
        console.log("Error:", error)
        next(error);
    }
}

// POST: Create
async function addSourceTranslates(req, res) {
    try {
        const { source_id, translatedChunks } = req.body;

        if (!source_id) return res.status(400).json({ data: null, error: "source_id required" });
        if (!Array.isArray(translatedChunks)) return res.status(400).json({ data: null, error: "translatedChunks must be an array" });

        const statements = [];

        statements.push({ sql: "DELETE FROM source_translates WHERE source_id = ?", params: [source_id] });

        if (translatedChunks.length > 0) {
            const placeholders = translatedChunks.map(() => "(?, ?, ?, ?)").join(", ");
            
            const insertSql = `INSERT INTO source_translates (id, chunk, translate, source_id) VALUES ${placeholders}`;

            const params = [];
            for (const c of translatedChunks) {
                params.push(getRandomId(), c.chunk ?? "", c.translate ?? "", source_id);
            }

            statements.push({ sql: insertSql, params });
        }

        await executeTransaction({ statements });

        return res.status(201).json({ data: null, error: null });
    } catch (err) {
        return res.status(500).json({ data: null, error: err.message || "Internal server error" });
    }
}

// Routes
router.get("/", getSourceTranslates, paginationMiddleware);
router.post("/", addSourceTranslates);

module.exports = router;