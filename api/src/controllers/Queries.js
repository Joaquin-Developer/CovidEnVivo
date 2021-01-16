
const connection = require("./DBController");
const queries = {};

queries.getLastRecordByCountry = (req, res) => {
    const sqlQuery = "select nameCountry, dateCases, confirmed, recovered, deaths "
        + "from cases_data where nameCountry = '" + req.body.country + "'"
        + "and id = (select max(id) from cases_data)";

    connection.query(sqlQuery, (error, result, fields) => {
        if (error) throw error;
        if (result[0] === undefined) {
            console.log("No hay datos en la bd");
            res.send("Ho hay datos en la bd");
        } else {
            let fecha = new Date(result[0].dateCases);
            res.json({
                nameCountry: result[0].nameCountry,
                dateCases: `Fecha: ${fecha.getUTCDate()}/${fecha.getMonth() + 1}/${fecha.getUTCFullYear()}`,
                confirmed: result[0].confirmed,
                recovered: result[0].recovered,
                deaths: result[0].deaths
            });
        }
    });
};

queries.getAllRecordByCountry = function(req, res) {
    const sqlQuery = `select * from cases_data where nameCountry = '${req.body.country}'`;

    connection.query(sqlQuery, (error, result, fields) => {
        if (error) throw error;
        if (result.length === 0) res.send("Ho hay datos en la bd");
        else res.json(result);
    });
}

queries.insertRecordByCountry = (req, res) => {

    if (req.body.country && req.body.recovered && req.body.confirmed && req.body.deaths) {
        if ((! isNaN(req.body.country)) && isNaN(req.body.confirmed) 
            && isNaN(req.body.recovered) && isNaN(req.body.deaths)) {
            res.json({
                message: "Error: Los datos están en formatos invalidos",
                message2: "Los datos deben ser enteros y los nombres de países no pueden contener números"
            });    
        } else {
            // todo ok:
            const dt = new Date();
            const actualDate = `${dt.getUTCFullYear()}-${dt.getMonth() + 1}-${dt.getUTCDate()}`;

            if (! verifyNoRecordsSameDay(req.body.country, actualDate)) // si no hay registros en la bd
            {    
                const sqlQuery = `insert into cases_data (id, nameCountry, dateCases, recovered, confirmed, deaths)`
                    + `values (null, '${req.body.country}', '${actualDate}', ${req.body.recovered}, 
                    ${req.body.confirmed}, ${req.body.deaths})`;
        
                connection.query(sqlQuery, (error, result, fields) => {
                    if (error) throw error;
                    res.json({ message: "Datos ingresados correctamente!" });
                });
            } else {
                res.json({ message: "Error: ya existe un registro de este país con la misma fecha" });
            }
        
        }
    } else {
        res.json({ message: "Error: Datos incompletos!" });
    }

}

function verifyNoRecordsSameDay(dt, nameCountry) {
    // retorna true si ya existe un registro en la base de datos con
    // la misma fecha que se intenta registrar de un país
    return true;
}

module.exports = queries;
