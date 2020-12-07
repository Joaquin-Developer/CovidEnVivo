/**
 * index.html functions
 * By Joaquin-Parrilla
 */

document.getElementById("verGrafica").addEventListener("click", function() {
    alert("Función fuera de servicio por el momento...");
});

document.getElementById("btnShowData").addEventListener("click", function(event) {
    event.preventDefault();
    fillDataTable();
    // fillTableDiferences();
    //showData();
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

}

async function showData() {
    let selectElem = document.getElementById("country");    // html element
    let countryName = selectElem.options[selectElem.selectedIndex].text; // text value

    const recuperados = await getActualNumbers("recovered", countryName);
    const confirmados = await getActualNumbers("confirmed", countryName);
    const muertos = await getActualNumbers("deaths", countryName);
    const cursando = confirmados - (muertos + recuperados);

    // Show elements in HTML:
    const tbody = document.getElementById("tbodyDatatable");
    const tr = document.createElement("TR");
    const tdConfirmados = document.createElement("TD");
    const tdRecuperados = document.createElement("TD");
    const tdMuertos = document.createElement("TD");
    const tdCursando = document.createElement("TD");
    const trDataInfo = document.getElementById("trDataInfo");

    tdConfirmados.appendChild(document.createTextNode(`${confirmados}`));
    tdRecuperados.appendChild(document.createTextNode(`${recuperados}`));
    tdMuertos.appendChild(document.createTextNode(`${muertos}`));
    tdCursando.appendChild(document.createTextNode(`${cursando}`));

    // elimino el único child del elemento encabezado:
    trDataInfo.removeChild(trDataInfo.firstChild);
    // luego agrego el nuevo child:
    // const informacion = document.createElement("TH");
    // informacion.setAttribute("colspan", "4");
    // informacion.appendChild(document.createTextNode(`Casos en ${countryName} a la fecha ${getTodayDate()}`));
    // trDataInfo.appendChild(informacion);

    tr.appendChild(tdConfirmados);
    tr.appendChild(tdRecuperados);
    tr.appendChild(tdMuertos);
    tr.appendChild(tdCursando);

    while (tbody.firstChild) {  // elimino todos los childs del body
        tbody.removeChild(tbody.firstChild); 
    }

    tbody.appendChild(tr);

    // tabla con los datos de diferencias con el día anterior:
    const divTableDierence = document.getElementById("tableDiferences");
    // divTableDierence.innerHTML = `
    //     <br>
    //     <table class="DTtable" border="1">
    //         <thead>
    //             <tr>
    //                 <th colspan="3">Comparación con el registro del dia de ayer.</th>
    //             </tr>
    //             <tr>
    //                 <th>Nuevos casos:</th>
    //                 <th>Nuevos recuperados:</th>
    //                 <th>Nuevas muertes:</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             <tr>
    //                 <td>${confirmados - (await getYesterdayNumbers("confirmed", countryName))}</td>
    //                 <td>${recuperados - (await getYesterdayNumbers("recovered", countryName))}</td>
    //                 <td>${muertos - (await getYesterdayNumbers("deaths", countryName))}</td>
    //             </tr>
    //         </tbody>
    //     </table>
    //     <br>
    // `;

    document.getElementById("dataTable").style.display = "block";

}

async function fillTableDiferences() {

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

