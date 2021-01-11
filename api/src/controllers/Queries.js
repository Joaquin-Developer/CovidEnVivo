
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

    // primero verificar los datos que obtengo del cliente...
    /**
     * Falta Hacer esta parte...
     */

    
    const dt = new Date();
    const actualDate = `${dt.getUTCFullYear()}-${dt.getMonth() + 1}-${dt.getUTCDate()}`;

    const sqlQuery = `insert into cases_data (id, nameCountry, dateCases, recovered, confirmed, deaths)`
        + `values (null, '${body.country}', '${actualDate}', ${body.recovered}, ${body.confirmed}, ${body.deaths})`;

    connection.query(sqlQuery, (error, result, fields) => {
        if (error) throw error;
        else res.send("Datos ingresados correctamente!");
    });
}


module.exports = queries;
