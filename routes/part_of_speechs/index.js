const express = require("express");
const { executeSelect } = require("../../database/execute.js");

const router = express.Router();

async function getPartOfSpeechs(req, res, next) {

    const { word } = req.query;

    let sql = `SELECT * FROM PART_OF_SPEECHS`;
    let params = []

    if (word) {
        sql = `
            SELECT DISTINCT pos.*
            FROM PART_OF_SPEECHS pos
            JOIN MEANINGS m on m.part_of_speech = pos.id
            WHERE m.word = $1
        `

        params.push(word);
    }

    const result = await executeSelect({ sql: sql, params: params });

    res.json({ data: result, error: null });
};

router.get("/", getPartOfSpeechs);

module.exports = router;
