const pkg = require("pg");
const { Pool } = pkg;

const pool = new Pool({
  user: "admin",
  host: process.env.POSTGRESQL_HOST || "localhost",
  database: "mydb",
  password: "admin123",
  port: process.env.POSTGRESQL_PORT || 5432,
  options: "-c search_path=elp" //Set default schema = elp
});

module.exports = {
  pool,
};
