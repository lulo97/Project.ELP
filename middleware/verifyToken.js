const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "No token provided", data: null });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
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
    verifyToken
};
