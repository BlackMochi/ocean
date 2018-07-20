var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "mochi",
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
