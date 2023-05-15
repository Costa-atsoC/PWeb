const mysql = require("mysql");

const db = mysql.createConnection({
  connectionLimit: 1,
  host: 'localhost',
  user: 'root',
  database: 'pweb',
  multipleStatements: true,
  dateStrings: true,
});

db.connect(function (err) {
  if (err) throw err;
});

module.exports = {db};