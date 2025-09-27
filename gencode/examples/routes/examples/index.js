const express = require("express");
const { executeSelect, execute } = require("../../database/execute.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js");

const router = express.Router();

async function getExamples(req, res, next) {
    const { examples, id, word, part_of_speech, example } = req.query;

    let sql = "SELECT * FROM examples";
    const params = [];
    const conditions = [];

    if (examples) {
        conditions.push("examples = ?");
        params.push(examples);
    }
    if (id) {
        conditions.push("id = ?");
        params.push(id);
    }
    if (word) {
        conditions.push("word = ?");
        params.push(word);
    }
    if (part_of_speech) {
        conditions.push("part_of_speech = ?");
        params.push(part_of_speech);
    }
    if (example) {
        conditions.push("example = ?");
        params.push(example);
    }

    if (conditions.length > 0) {
        sql += " WHERE " + conditions.join(" AND ");
    }

    const result = await executeSelect({ sql, params });
    res.locals.data = result;
    res.locals.error = null;
    next();
}

async function addExamples(req, res) {
    const { examples, word, part_of_speech, example } = req.body;
    const id = getRandomId();

    const sql = `
        INSERT INTO examples (id, examples, word, part_of_speech, example)
        VALUES (?, ?, ?, ?, ?)
    `;

    const result = await execute({
        sql,
        params: [id, examples, word, part_of_speech, example]
    });

    res.json({ data: result, error: null });
}

async function updateExamples(req, res) {
    const { id } = req.params;
    const { examples, word, part_of_speech, example } = req.body;

    const sql = `
        UPDATE examples
        SET examples = ?, word = ?, part_of_speech = ?, example = ?
        WHERE id = ?
    `;

    const result = await execute({
        sql,
        params: [examples, word, part_of_speech, example, id]
    });

    res.json({ data: result, error: null });
}

async function deleteExamples(req, res) {
    const { id } = req.params;

    const sql = "DELETE FROM examples WHERE id = ?";
    const result = await execute({ sql, params: [id] });

    res.json({ data: result, error: null });
}

router.get("/", getExamples, paginationMiddleware);
router.post("/", addExamples);
router.put("/:id", updateExamples);
router.delete("/:id", deleteExamples);

module.exports = router;

