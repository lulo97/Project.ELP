const express = require("express");
const { executeSelect } = require("../../database/execute.js");

const router = express.Router();

async function get(req, res, next) {
    let sql = `
        SELECT
            m.word,
            pos.id AS pos_id,
            pos.name AS pos_name,
            m.meaning,
            json_group_array(e.example) AS examples
        FROM PART_OF_SPEECHS pos
        JOIN MEANINGS m
            ON m.part_of_speech = pos.id
        JOIN examples e
            ON e.word = m.word
        AND e.part_of_speech = pos.id
        GROUP BY m.word, pos.id, pos.name, m.meaning
        ORDER BY m.word ASC, pos.id ASC;
    `;

    let params = []

    let result = await executeSelect({ sql: sql, params: params });

    result = result.map(ele => ({
        ...ele,
        examples: JSON.parse(ele.examples)
    }))

    res.json({ data: result, error: null });
};

router.get("/", get);

module.exports = router;
