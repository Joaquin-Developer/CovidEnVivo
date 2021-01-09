
const express = require("express");
const router = express.Router();


router.get("/", function(req, res) {
    const data = {
        data: "mensaje", 
        content: "Hola, esto es una petición GET!"
    }
    res.json(data);
});

router.post("/api/send", function(req, res) {

    if (req.body.data && req.body.message) {
        const data = req.body.data;
        const mensaje = req.body.message;
        const respuesta = {
            mensaje1: "Formulario recibido correctamente!!",
            mensaje2: `Tu dato es: ${data} y tu mensaje fué: ${mensaje}`
        };
        res.json(respuesta);
    } else {
        // si no se encuentra body.data o body.message:
        res.json({ "Error:": "NO se pudo procesar la petición porque faltaron datos." });
    }

});

router.get("*", function(req, res) {
    res.status(404).send("<h1>404 - Not Found</h1><hr><p>Ruta inválida</p>");
});


// exports my routes:
module.exports = router;
