
const connection = require("./DBController");
const queries = {};

queries.getLastRecordByCountry = (req, res) => {
    // const nameCountry = "EXAMPLE_1";
    const sqlQuery = "select nameCountry, dateCases, confirmed, recovered, deaths "
        + "from cases_data where nameCountry = '" + req.body.country + "' order by id desc limit 1";

    connection.query(sqlQuery, (error, result, fields) => {
        if (error) throw error;
        if (result[0] === undefined) {
            console.log("No hay datos en la bd");
            res.send("Ho hay datos en la bd");
        } else {
            let fecha = new Date(result[0].dateCases);
            console.log(`Fecha: ${fecha.getUTCDate()}/${fecha.getMonth() + 1}/${fecha.getUTCFullYear()}`);
            console.log("result:" + result[0]);
            res.json(result[0]);
        }
    });
};

module.exports = queries;
