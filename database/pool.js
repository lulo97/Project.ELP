const pkg = require("pg");
const { Pool } = pkg;

const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "mydb",
  password: "admin123",
  port: 5432,
  options: "-c search_path=elp" //Set default schema = elp
});

module.exports = {
  pool,
};
