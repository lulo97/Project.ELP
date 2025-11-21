const jwt = require("jsonwebtoken");
const { getConsts } = require("../redis/getConsts");

async function getUsernameFromToken(token) {
    const decoded = jwt.verify(token, getConsts("JWT_SECRET"));
    return decoded.username || null;
}

module.exports = {
  getUsernameFromToken,
};
