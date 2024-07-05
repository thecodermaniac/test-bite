const { Pool } = require("pg");

const pool = new Pool({
  user: "userbite",
  password: "123456789",
  host: "postgresql-177673-0.cloudclusters.net",
  port: 19278, // default Postgres port
  database: "biteproj",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
