const jwt = require("jsonwebtoken");
const { getConsts } = require("../redis/getConsts");

async function getUsernameFromToken(token) {
    const decoded = jwt.verify(token, getConsts("JWT_SECRET"));
    if (decoded.unique_name) return decoded.unique_name;
    return decoded.username || null;
}

module.exports = {
  getUsernameFromToken,
};
