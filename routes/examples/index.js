const express = require("express");
const { executeSelect, execute } = require("../../database/execute.js");
const { getRandomId } = require("../../utils/getRandomId.js");

const router = express.Router();

async function getExamples(req, res, next) {
    const { example, word } = req.query;

    let sql = "SELECT * FROM EXAMPLES";
    const params = [];
    const conditions = [];

    if (example) {
        conditions.push("example = ?");
        params.push(example);
    }

    if (word) {
        conditions.push("word = ?");
        params.push(word);
    }

    if (conditions.length > 0) {
        sql += " WHERE " + conditions.join(" AND ");
    }

    const result = await executeSelect({ sql, params });

    res.json({ data: result, error: null });
};

async function addExample(req, res, next) {
    const { example, word, part_of_speech } = req.body;
    const id = getRandomId();
    const sql = "INSERT INTO EXAMPLES (id, example, word, part_of_speech) VALUES (?, ?, ?, ?)";
    const result = await execute({ sql: sql, params: [id, example, word, part_of_speech] })
    res.json({ data: result, error: null });
}

async function updateExample(req, res, next) {
    const { id } = req.params;
    const { example, word, part_of_speech } = req.body;
    const sql = "UPDATE EXAMPLES SET example = ?, word = ?, part_of_speech = ? WHERE id = ?";
    const result = await execute({ sql: sql, params: [example, word, part_of_speech, id] })
    res.json({ data: result, error: null });
}

async function deleteExample(req, res, next) {
    const { id } = req.params;
    const sql = "DELETE FROM EXAMPLES WHERE id = ?";
    const result = await execute({ sql: sql, params: [id] })
    res.json({ data: result, error: null });
}

router.get("/", getExamples);

router.post("/", addExample);

router.put("/:id", updateExample);

router.delete("/:id", deleteExample);

module.exports = router;
