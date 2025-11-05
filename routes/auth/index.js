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

  const p_error = result.rows[0]?.p_error;

  if (p_error) {
    return res.status(400).json({ error: p_error, data: null });
  }

  res.status(201).json({ error: null, data: null });
}

async function logIn(req, res) {
  const { username, password } = req.body;

  const users = await execute({ sql: "SELECT * FROM users" });
  const user = users.rows.find((u) => u.username === username);

  if (!user) return res.status(400).json({ message: "User not exist!" });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(400).json({ message: "Password incorrect!" });

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ data: { token }, error: null });
}

function getUserByToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(200).json({ error: "No token provided", data: null });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(200).json({ error: "Invalid or expired token", data: null });
    }

    return res.status(200).json({ error: null, data: { user: user } })
  });
}

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/getuserbytoken", getUserByToken);

module.exports = router;
