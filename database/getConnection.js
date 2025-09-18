const sqlite3 = require("sqlite3").verbose();
const path = require("path");

//Singleton
let db = null;

function getConnection() {
  if (!db) {
    const dbPath = path.resolve(__dirname, "./database.sqlite");
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error("❌ Error connecting to database:", err.message);
      } else {
        console.log("✅ Connected to SQLite database:", dbPath);
      }
    });
  }
  return db;
}

module.exports = {
  getConnection
}