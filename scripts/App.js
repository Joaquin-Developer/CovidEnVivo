/**
 * index.html functions
 * By Joaquin-Parrilla
 */

document.getElementById("verGrafica").addEventListener("click", function() {
    alert("Función fuera de servicio por el momento...");
});

document.getElementById("btnShowData").addEventListener("click", function(event) {
    event.preventDefault();
    showData();
});

async function showData() {
    const table = document.querySelector('#dataTable'); //html element
    let selectElem = document.getElementById("country");    // html element
    let countryName = selectElem.options[selectElem.selectedIndex].text; // text value

    const recuperados = await getActualNumbers("recovered", countryName);
    const confirmados = await getActualNumbers("confirmed", countryName);
    const muertos = await getActualNumbers("deaths", countryName);
    const cursando = confirmados - (muertos + recuperados);

    table.innerHTML = `
        <table id="DTtable" class="DTtable" border="1">
            <thead>
                <tr>
                    <th colspan="4">Casos en ${countryName} a la fecha ${getTodayDate()} </th>
                </tr>
                <tr>
                    <th>CONFIRMADOS</th>
                    <th>RECUPERADOS</th>
                    <th>MUERTES</th>
                    <th>CURSANDO ENFERMEDAD</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${confirmados}</td>
                    <td>${recuperados}</td>
                    <td>${muertos}</td>
                    <td>${cursando}</td>
                </tr>
            </tbody>
        </table>
        <br>
        <table id="DTtable" class="DTtable" border="1">
            <thead>
                <tr>
                    <th colspan="3">Comparación con el registro del dia de ayer.</th>
                </tr>
                <tr>
                    <th>Nuevos casos:</th>
                    <th>Nuevos recuperados:</th>
                    <th>Nuevas muertes:</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${confirmados - (await getYesterdayNumbers("confirmed", countryName))}</td>
                    <td>${recuperados - (await getYesterdayNumbers("recovered", countryName))}</td>
                    <td>${muertos - (await getYesterdayNumbers("deaths", countryName))}</td>
                </tr>
            </tbody>
        </table>
        <br>
    `;
    table.style.display = "block"; // por último, mostramos la tabla una vez este cargada
}

async function getData(dato, pais) {
    const response = fetch("https://api.covid19api.com/total/country/" + pais + "/status/" + dato);
    const data = await (await response).json();
    return data;
}

async function getActualNumbers(dataType, countryName) {
    const actualData = await getData(dataType, countryName);
    return actualData[actualData.length - 1].Cases;
}

async function getYesterdayNumbers(dataType, countryName) {
    const yestData = await getData(dataType, countryName);
    return (yestData[yestData.length - 2].Cases);

}

function getTodayDate(){
    const date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    if(dd < 10){
        dd = '0' + dd;
    }
    if(mm < 10){
        mm = '0' + mm;
    }

    return dd + '/' + mm + '/' + date.getFullYear();
}

