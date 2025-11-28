const crypto = require('crypto');

function getRandomUUID() {
    return crypto.randomUUID();
}

module.exports = {
    getRandomUUID
};