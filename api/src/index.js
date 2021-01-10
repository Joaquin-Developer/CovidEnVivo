
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// settings:
app.set("port", process.env.PORT || 6300);
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

// db connection
require("./database/DBController");


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

// implementar ...

// middlewares:
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes:
app.use(require("./routes/index"));

// listening the server:
app.listen(app.get("port"), function() {
    console.log("Server on port ", app.get("port"));
});

