const express = require("express");
const { executeSelect, execute } = require("../../database/execute");
const { getRandomId } = require("../../utils/getRandomId");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

async function signUp(req, res) {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is null!", data: null });
  }

  if (!password) {
    return res.status(400).json({ error: "Password is null!", data: null });
  }

  const password_hash = await bcrypt.hash(
    password,
    parseInt(process.env.HASH_SALT_LENGTH)
  );

  const result = await execute({
    sql: "CALL prc_signup($1, $2, $3, NULL)",
    params: [getRandomId(), username, password_hash],
  });

  console.log(result)

  const p_error = result.rows[0]?.p_error;

  if (p_error) {
    return res.status(400).json({ error: p_error, data: null });
  }

  res.status(201).json({ error: null, data: null });
}

function logIn(req, res) {}

function logOut(req, res) {}

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);

module.exports = router;
