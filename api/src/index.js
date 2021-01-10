
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// settings:
app.set("port", process.env.PORT || 6300);
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

// db connection
require("./database/DBController");

// middlewares:
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes:
app.use(require("./routes/index"));

// listening the server:
app.listen(app.get("port"), function() {
    console.log("Server on port ", app.get("port"));
});

