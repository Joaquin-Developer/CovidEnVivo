
const express = require("express");
const router = express.Router();
const ExampleClass = require("../models/ExampleClass");

router.get("/", getHelpPage);
router.get("/api", getHelpPage);
router.get("/api/help", getHelpPage);

function getHelpPage(request, response) {
    const example = new ExampleClass("Joaquin", 18);    // instancia de clase externa
    const data = {
        data: example.name, 
        content: example.toString()
    }
    response.json(data);
}

router.post("/api/send", function(request, response) {

    if (request.body.data && request.body.message) {
        const data = request.body.data;
        const mensaje = request.body.message;
        const respuesta = {
            mensaje1: "Formulario recibido correctamente!!",
            mensaje2: `Tu dato es: ${data} y tu mensaje fué: ${mensaje}`
        };
        response.json(respuesta);
    } else {
        // si no se encuentra body.data o body.message:
        response.json({ "Error:": "NO se pudo procesar la petición porque faltaron datos." });
    }

});

router.get("*", function(req, res) {
    res.status(404).send("<h1>404 - Not Found</h1><hr><p>Ruta inválida</p>");
});


// exports my routes:
module.exports = router;
