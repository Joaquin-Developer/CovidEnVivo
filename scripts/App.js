/**
 * index.html functions
 * By Joaquin-Parrilla
 * Edited on 2020/12/17.-
 */

// document.getElementById("verGrafica").addEventListener("click", function() {
//     alert("Función fuera de servicio por el momento...");
// });

addEventListener("load", function() {
    
    addOptionsInCountrySelect();
    // alert("NOTA: Se rompió el link de jQuery. Esto implica que algunas " 
    //     + "funcionalidades como la barra desplegable no se puedan usar :(");

});

document.getElementById("btnShowData").addEventListener("click", function(event) {
    event.preventDefault();
    showProgressLoadTable();
    fillDataTable();
    fillTableDiferences();
});

async function fillDataTable() {

    let selectElem = document.getElementById("country");    // país seleccionado
    let countryName = selectElem.options[selectElem.selectedIndex].text; // text value
    // Datos a mostrar:
    const recuperados = await getActualNumbers("recovered", countryName);
    const confirmados = await getActualNumbers("confirmed", countryName);
    const muertos = await getActualNumbers("deaths", countryName);
    const cursando = confirmados - (muertos + recuperados);

    const thead = document.getElementById("theadDatatable");
    const tbody = document.getElementById("tbodyDatatable");

    while (thead.firstChild) {  // elimino todos los childrens del thead
        thead.removeChild(thead.firstChild); 
    }

    while (tbody.firstChild) {  // elimino todos los childrens del tbody
        tbody.removeChild(tbody.firstChild); 
    }
    // luego, agrego nuevos elementos en thead y tbody:
    const trDataInfo = document.createElement("TR");
    const trEncabezado = document.createElement("TR");
    
    const informacion = document.createElement("TH");
    informacion.setAttribute("colspan", "4");
    informacion.appendChild(document.createTextNode(`Casos en ${countryName} a la fecha ${getTodayDate()}`));
    trDataInfo.appendChild(informacion);

    const thConfirmados = document.createElement("TH");
    thConfirmados.setAttribute("scope", "col");
    thConfirmados.appendChild(document.createTextNode("CONFIRMADOS"));
    const thReuperados = document.createElement("TH");
    thReuperados.setAttribute("scope", "col");
    thReuperados.appendChild(document.createTextNode("RECUPERADOS"));
    const thMuertes = document.createElement("TH");
    thMuertes.setAttribute("scope", "col");
    thMuertes.appendChild(document.createTextNode("MUERTES"));
    const thCursando = document.createElement("TH");
    thCursando.setAttribute("scope", "col");
    thCursando.appendChild(document.createTextNode("CURSANDO ENFERMEDAD"));

    trEncabezado.appendChild(thConfirmados);
    trEncabezado.appendChild(thReuperados);
    trEncabezado.appendChild(thMuertes);
    trEncabezado.appendChild(thCursando);

    thead.appendChild(trDataInfo);
    thead.appendChild(trEncabezado);

    // elementos de tbody:
    const trBody = document.createElement("TR");
    const tdConfirmados = document.createElement("TD");
    const tdRecuperados = document.createElement("TD");
    const tdMuertos = document.createElement("TD");
    const tdCursando = document.createElement("TD");

    tdConfirmados.appendChild(document.createTextNode(`${confirmados}`));
    tdRecuperados.appendChild(document.createTextNode(`${recuperados}`));
    tdMuertos.appendChild(document.createTextNode(`${muertos}`));
    tdCursando.appendChild(document.createTextNode(`${cursando}`));

    trBody.appendChild(tdConfirmados);
    trBody.appendChild(tdRecuperados);
    trBody.appendChild(tdMuertos);
    trBody.appendChild(tdCursando);

    tbody.appendChild(trBody);
}

async function fillTableDiferences() {
    // tabla con los datos de diferencias con el día anterior
    const selectElem = document.getElementById("country");    // país seleccionado
    const countryName = selectElem.options[selectElem.selectedIndex].text; // text value
    // Datos a mostrar:
    const recuperados = await getActualNumbers("recovered", countryName);
    const confirmados = await getActualNumbers("confirmed", countryName);
    const muertos = await getActualNumbers("deaths", countryName);
    const cursando = confirmados - (muertos + recuperados);

    document.getElementById("tableDiferences").innerHTML = `
        <table class="DTtable" border="1">
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
    `;
    hideProgressLoadTable();    // ocultamos el html-progress
}

function showProgressLoadTable() {
    document.getElementById("progressLoadTable").style.display = "block";
}

function hideProgressLoadTable() {
    document.getElementById("progressLoadTable").style.display = "none";
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

// agregar nombres de todos los países al select del html
async function addOptionsInCountrySelect() {
    try {
        // const response = await fetch("https://api.covid19api.com/countries");
        const response = await fetch("https://restcountries.eu/rest/v2/all");
        const data = await (await response).json();
        const countries = [];

        data.forEach(elem => {
            console.log(elem);
            countries.push(elem.name);   // agrego al array el nombre de el país.
        });
        // ordeno alfabéticamente (según unicode)los elementos del array:
        countries.sort();

        const selectElem = document.getElementById("country");
        let cont = 1;

        countries.forEach(element => {
            const optionElem = document.createElement("OPTION");
            optionElem.appendChild(document.createTextNode(element));
            optionElem.setAttribute("value", `${cont}`);
            cont++;
            if (element === "Uruguay") {
                optionElem.setAttribute("selected", "selected");
            }
            selectElem.appendChild(optionElem);
        });
        
    } catch (ex) {
        console.error(ex);
        alert("Se produjo un error al cargar los datos de los países");
        location.reload();
    }

}
