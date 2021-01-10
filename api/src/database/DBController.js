/**
 * ONLINE DATABASE Connection
 */

require("dotenv").config();
const mysql = require("mysql");

// Connection params:
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_DATABASE_USER,
    password: process.env.MYSQL_DATABASE_PASSWORD,
    database: process.env.MYSQL_DATABASE_NAME
});

connection.connect(function(error) {
    if (error) throw error;
    console.log("MYSQL-DB Connected!")
});

connection.query("SELECT * FROM example", function (error, result, fields) {
    if (error) throw error;

    for (let elem of result) {
        console.log(`El nombre es ${elem.name} y su mensaje fué ${elem.message}`)
    }

});


/**
 * MongoBD online database connection:
 * Debido a problemas con su implementación,
 * decidí cambiar a mysql
 */
// const mongodb = require("mongodb");
// const mongoose = require("mongoose");

// const MongoClient = mongodb.MongoClient;
// const urlDatabase = "http://den1.mongo1.gear.host:27001/covidsrappingapi";

//mongodb.Db

// MongoClient.connect(urlDatabase)
//     .then(db => console.log("Database is connected!"))
//     .catch(err => console.error(err));

// let MongoClient = mongodb.MongoClient;
// const url = "";

// MongoClient.connect(urlDatabase, { uri_decode_auth: true }, function(err, db) {
//   if (err) throw err;
//   console.log("Connected to " + url + " database!");
//   db.close();
// });

