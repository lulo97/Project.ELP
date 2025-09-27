const express = require("express");
const { executeSelect, execute } = require("../../database/execute.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js");

const router = express.Router();

async function getSpeakingScores(req, res, next) {
    const { id, speaking_id, question_score, answer_score, question_listened, answer_listened } = req.query;

    let sql = "SELECT * FROM speaking_scores";
    const params = [];
    const conditions = [];

    if (id) {
        conditions.push("id = ?");
        params.push(id);
    }
    if (speaking_id) {
        conditions.push("speaking_id = ?");
        params.push(speaking_id);
    }
    if (question_score) {
        conditions.push("question_score = ?");
        params.push(question_score);
    }
    if (answer_score) {
        conditions.push("answer_score = ?");
        params.push(answer_score);
    }
    if (question_listened) {
        conditions.push("question_listened = ?");
        params.push(question_listened);
    }
    if (answer_listened) {
        conditions.push("answer_listened = ?");
        params.push(answer_listened);
    }

    if (conditions.length > 0) {
        sql += " WHERE " + conditions.join(" AND ");
    }

    const result = await executeSelect({ sql, params });
    res.locals.data = result;
    res.locals.error = null;
    next();
}

async function addSpeakingScores(req, res) {
    const { speaking_id, question_score, answer_score, question_listened, answer_listened } = req.body;
    const id = getRandomId();

    const sql = `
        INSERT INTO speaking_scores (id, speaking_id, question_score, answer_score, question_listened, answer_listened)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const result = await execute({
        sql,
        params: [id, speaking_id, question_score, answer_score, question_listened, answer_listened]
    });

    res.json({ data: result, error: null });
}

async function updateSpeakingScores(req, res) {
    const { id } = req.params;
    const { speaking_id, question_score, answer_score, question_listened, answer_listened } = req.body;

    const sql = `
        UPDATE speaking_scores
        SET speaking_id = ?, question_score = ?, answer_score = ?, question_listened = ?, answer_listened = ?
        WHERE id = ?
    `;

    const result = await execute({
        sql,
        params: [speaking_id, question_score, answer_score, question_listened, answer_listened, id]
    });

    res.json({ data: result, error: null });
}

async function deleteSpeakingScores(req, res) {
    const { id } = req.params;

    const sql = "DELETE FROM speaking_scores WHERE id = ?";
    const result = await execute({ sql, params: [id] });

    res.json({ data: result, error: null });
}

router.get("/", getSpeakingScores, paginationMiddleware);
router.post("/", addSpeakingScores);
router.put("/:id", updateSpeakingScores);
router.delete("/:id", deleteSpeakingScores);

module.exports = router;

