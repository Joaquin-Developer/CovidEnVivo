
const express = require("express");
const router = express.Router();

// create my routes:

router.get("/", function(req, res) {
    const data = {
        data: "mensaje", 
        content: "Hola, esto es una petición GET!"
    }
    res.json(data);
});


// router.get("*", function(req, res) {
//     res.send("404 not found");
// });

// exports my routes:
module.exports = router;
