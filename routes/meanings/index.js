const express = require("express");
const { executeSelect, execute } = require("../../database/execute.js");
const { getRandomId } = require("../../utils/getRandomId.js");

const router = express.Router();

async function getMeanings(req, res, next) {
    const { meaning, word } = req.query;

    let sql = "SELECT * FROM MEANINGS";
    const params = [];
    const conditions = [];

    if (meaning) {
        conditions.push("meaning = ?");
        params.push(meaning);
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

async function addMeaning(req, res, next) {
    const { meaning, word, part_of_speech } = req.body;
    const id = getRandomId();
    const sql = "INSERT INTO MEANINGS (id, meaning, word, part_of_speech) VALUES (?, ?, ?, ?)";
    const result = await execute({ sql: sql, params: [id, meaning, word, part_of_speech] })
    res.json({ data: result, error: null });
}

async function updateMeaning(req, res, next) {
    const { id } = req.params;
    const { meaning, word, part_of_speech } = req.body;
    const sql = "UPDATE MEANINGS SET meaning = ?, word = ?, part_of_speech = ? WHERE id = ?";
    const result = await execute({ sql: sql, params: [meaning, word, part_of_speech, id] })
    res.json({ data: result, error: null });
}

async function deleteMeaning(req, res, next) {
    const { id } = req.params;
    const sql = "DELETE FROM MEANINGS WHERE id = ?";
    const result = await execute({ sql: sql, params: [id] })
    res.json({ data: result, error: null });
}

router.get("/", getMeanings);

router.post("/", addMeaning);

router.put("/:id", updateMeaning);

router.delete("/:id", deleteMeaning);

module.exports = router;
