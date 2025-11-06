const jwt = require('jsonwebtoken');

async function getUsernameFromToken(token) {
  try {
    const token_extracted = token.split(" ")[1]
    const decoded = jwt.verify(token_extracted, process.env.JWT_SECRET);

    // Assuming the payload includes `username`
    return decoded.username || null;
  } catch (error) {
    console.error('Invalid token:', error.message, ", input token = ", token);
    return null;
  }
}

module.exports = {
  getUsernameFromToken
};
