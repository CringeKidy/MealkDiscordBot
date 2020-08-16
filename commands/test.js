exports.run = (client, message, args) => {
    var mysql = require('mysql');

    var connection = mysql.createConnection({
    host     : "botdb.cwrcqfforgpg.ap-southeast-2.rds.amazonaws.com",
    user     : "admin",
    password : "password",
    database : "botdb",
    port     : 3306
    });

    connection.connect(function(err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }

    console.log("Contected");
    });

    connection.query("SELECT * FROM Users WHERE name = 'test' ", function(err,result){
        console.log(result)
    })

    connection.end();
}   