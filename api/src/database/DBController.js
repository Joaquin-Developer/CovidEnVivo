/**
 * MongoDB Connection
 */

require("dotenv").config();
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const stringConnection = process.env.DATABASE_URL;

mongoose.connect(stringConnection, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
