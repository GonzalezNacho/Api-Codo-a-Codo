const mySql = require('mysql2');
require('dotenv').config()

const connection = mySql.createConnection(
    {
        host : process.env.DB_HOST,
        user: process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database: process.env.DB
    });


    connection.connect((err) => 
    {
        if(err) {
            console.error("ERROR conectando a la base de datos", err);
            return;
        }
        console.log("Conectado EXITOSAMENTE a la base de datos");
    });


module.exports = connection;