const express = require("express");
const { executeSelect, execute } = require("../../database/execute.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js");

const router = express.Router();

async function getSpeakings(req, res, next) {
    const { id, question, answer } = req.query;

    let sql = "SELECT * FROM speakings";
    const params = [];
    const conditions = [];

    if (id) {
        conditions.push("id = ?");
        params.push(id);
    }
    if (question) {
        conditions.push("question = ?");
        params.push(question);
    }
    if (answer) {
        conditions.push("answer = ?");
        params.push(answer);
    }

    if (conditions.length > 0) {
        sql += " WHERE " + conditions.join(" AND ");
    }

    const result = await executeSelect({ sql, params });
    res.locals.data = result;
    res.locals.error = null;
    next();
}

async function addSpeakings(req, res) {
    const { question, answer } = req.body;
    const id = getRandomId();

    const sql = `
        INSERT INTO speakings (id, question, answer)
        VALUES (?, ?, ?)
    `;

    const result = await execute({
        sql,
        params: [id, question, answer]
    });

    res.json({ data: result, error: null });
}

async function updateSpeakings(req, res) {
    const { id } = req.params;
    const { question, answer } = req.body;

    const sql = `
        UPDATE speakings
        SET question = ?, answer = ?
        WHERE id = ?
    `;

    const result = await execute({
        sql,
        params: [question, answer, id]
    });

    res.json({ data: result, error: null });
}

async function deleteSpeakings(req, res) {
    const { id } = req.params;

    const sql = "DELETE FROM speakings WHERE id = ?";
    const result = await execute({ sql, params: [id] });

    res.json({ data: result, error: null });
}

router.get("/", getSpeakings, paginationMiddleware);
router.post("/", addSpeakings);
router.put("/:id", updateSpeakings);
router.delete("/:id", deleteSpeakings);

module.exports = router;

