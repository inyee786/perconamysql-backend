var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : `${process.argv[2]}`,
  port     :  '3306',
  user     : 'root',
  password : `${process.argv[3]}`,
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  connection.query("CREATE DATABASE if not exists maya", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});

module.exports = connection;