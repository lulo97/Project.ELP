const express = require("express");
const { executeSelect } = require("../../database/execute.js");

const router = express.Router();

async function getTodos(req, res, next) {
    const sql = "SELECT * FROM TODOS";
    const result = await executeSelect({ sql: sql })
    res.json({ data: result, error: null }); 
};

router.get("/", getTodos);

// router.post("/", auth, createTodo);
// router.put("/:id", auth, updateTodo);
// router.delete("/:id", auth, deleteTodo);

module.exports = router;
