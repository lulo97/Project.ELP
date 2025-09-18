const express = require("express");
const { executeSelect, execute } = require("../../database/execute.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js")

const router = express.Router();

async function getSources(req, res, next) {
    const { name } = req.query;

    let sql = "SELECT id, name, source FROM SOURCES";
    const params = [];

    if (name) {
        sql += " WHERE name = ?";
        params.push(name);
    }

    const result = await executeSelect({ sql, params });

    res.locals.data = result;
    res.locals.error = null;

    next();
};

async function addSource(req, res, next) {
    const { name, source } = req.body;
    const id = getRandomId();
    const sql = "INSERT INTO SOURCES (id, name, source) VALUES (?, ?, ?)";
    const result = await execute({ sql: sql, params: [id, name, source] })
    res.json({ data: result, error: null });
}

async function updateSource(req, res, next) {
    const { id } = req.params;
    const { name, source } = req.body;
    const sql = "UPDATE SOURCES SET name = ?, source = ? WHERE id = ?";
    const result = await execute({ sql: sql, params: [name, source, id] })
    res.json({ data: result, error: null });
}

async function deleteSource(req, res, next) {
    const { id } = req.params;
    const sql = "DELETE FROM SOURCES WHERE id = ?";
    const result = await execute({ sql: sql, params: [id] })
    res.json({ data: result, error: null });
}

router.get("/", getSources, paginationMiddleware);

router.post("/", addSource);

router.put("/:id", updateSource);

router.delete("/:id", deleteSource);

module.exports = router;
