const { getConnection } = require("./getConnection.js")

async function executeSelect({ sql, params = [] }) {
    const db = await getConnection();
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

async function execute({ sql, params = [] }) {
    const db = await getConnection();
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) reject(err);
            else resolve({ lastID: this.lastID, changes: this.changes });
        });
    });
}

module.exports = {
    executeSelect,
    execute,
};