const { getUsernameFromToken } = require("../utils/getUsernameFromToken");

async function verifyAdmin(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "No token provided", data: null });
  }

  const username = await getUsernameFromToken(req.headers["authorization"]);

  if (username.toLowerCase() != 'admin') {
    return res
        .status(403)
        .json({ error: "Only admin allowed!", data: null });
  }

  next();
}

module.exports = {
    verifyAdmin
};
