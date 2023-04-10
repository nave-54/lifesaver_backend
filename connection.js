const mysql = require('mysql');
const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "BabuSudha03",
    database : "db"
});
connection.connect()
console.log("Connection establish")
module.exports=connection;