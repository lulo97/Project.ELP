const express = require("express");
const { executeSelect } = require("../../database/execute.js");

const router = express.Router();

async function getPartOfSpeechs(req, res, next) {

    let sql = "SELECT * FROM PART_OF_SPEECHS";

    const result = await executeSelect({ sql });

    res.json({ data: result, error: null });
};

router.get("/", getPartOfSpeechs);

module.exports = router;
