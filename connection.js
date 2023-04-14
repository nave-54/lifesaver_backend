const mysql = require('mysql');
const connection = mysql.createConnection({
    host : "lifesaverdb.cghcx7losy2e.ap-south-1.rds.amazonaws.com",
    user : "admin",
    password : "BabuSudha",
    database : "blood"
});
connection.connect()
module.exports=connection; 