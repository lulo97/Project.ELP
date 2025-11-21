const jwt = require("jsonwebtoken");
const { getConsts } = require("../redis/getConsts");

function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "No token provided", data: null });
  }

  jwt.verify(token, getConsts("JWT_SECRET"), (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Invalid or expired token", data: null });
    }

    // Attach decoded token payload (e.g., username) to the request
    req.user = decoded;
    next();
  });
}

module.exports = {
  verifyToken,
};
