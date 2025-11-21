const express = require("express");
const { executeSelect, execute } = require("../../database/execute");
const { getRandomId } = require("../../utils/getRandomId");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getConsts } = require("../../redis/getConsts");

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
    parseInt(getConsts("HASH_SALT_LENGTH"))
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

  if (!user)
    return res.status(400).json({ error: "User not exist!", data: null });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid)
    return res.status(400).json({ error: "Password incorrect!", data: null });

  const token = jwt.sign({ username }, getConsts("JWT_SECRET"), {
    expiresIn: getConsts("JWT_EXPIRES_IN"),
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: getConsts("ENVIRONMENT") == "PRODUCTION" ? true : false,
    sameSite: "Strict",
    maxAge: getConsts("JWT_MAX_AGE"),
  });

  res.json({ data: null, error: null });
}

async function me(req, res, next) {
  try {
    const token = req.cookies.token; // read token from cookie

    if (!token) {
      return res.status(200).json({ error: "No token provided", data: null });
    }

    const jwtSecret = await getConsts("JWT_SECRET");

    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err || !decoded) {
        return res
          .status(200)
          .json({ error: "Invalid or expired token", data: null });
      }

      // decoded contains: { username, iat, exp }
      return res.status(200).json({
        error: null,
        data: { user: decoded },
      });
    });
  } catch (err) {
    return res.status(200).json({ error: err.message, data: null });
  }
}

async function logOut(req, res) {
  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(200)
      .json({ error: "No token detected to delete!", data: null });
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: getConsts("ENVIRONMENT") === "PRODUCTION",
    sameSite: "Strict",
  });

  res.status(200).json({ error: null, data: null });
}

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);
router.get("/me", me);

module.exports = router;
