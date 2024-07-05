const { Pool } = require("pg");

console.log(String(process.env.DBUSER));

const pool = new Pool({
  user: String(process.env.DBUSER),
  password: String(process.env.DBPASS),
  host: String(process.env.DBHOST),
  port: String(process.env.DBPORT),
  database: String(process.env.DATABASE),
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
