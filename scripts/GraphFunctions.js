/**
 * grafica.html functions
 * By Joaquin-Parrilla
 * Edited on 2020/12/18.-
 */

const selectElem = document.getElementById("country");    // país seleccionado

selectElem.addEventListener("change", function() {
    drawChart();
});

addEventListener("load", async function() {
    await addOptionsInCountrySelect();
    drawChart();
});

// cada vez que se modifiquen dimensiones de la pantalla, se deberá 
// modificar dimenciónes de la gráfica:
addEventListener("resize", function(event) {
    drawChart();
});

async function drawChart() {

    const info = await getConfirmedCases();
    let seriesConfirmed = [];
    let labelConfirmed = [];

    for (let i = 0; i < info.length; i++) {
        
        if (info[i].Cases === 0) {
            continue;
        }
        // agregamos (en caso que no sea 0), el nro de casos confirmados al array
        seriesConfirmed.push(info[i].Cases);

        const fecha = new Date(info[i].Date);
        const label = fecha.getUTCDate() + "/" + (fecha.getUTCMonth() + 1) + "/" + fecha.getUTCFullYear();
        // vamos a mostrar la 1° fecha, y luego todos los 1ros de cada mes
        if (labelConfirmed.length === 0 || fecha.getUTCDate() === 1) {
            labelConfirmed.push(label);
        } else {
            labelConfirmed.push("");
        }
    }

    const data = {
        labels: labelConfirmed, //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "", "", "1"],
        series: [
            seriesConfirmed
        ]
    };
    // obtenemos dimensiónes de la pantalla, para establecer tamaño de gráfica acorde
    let height;
    if (isNotMobile()) {
        height = (window.innerHeight - 250);
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        // width: width,
        height: height,
        showPoint: false,
        // Disable line smoothing
        lineSmooth: true,
        // X-Axis specific configuration
        axisX: {
            onlyInteger: true,
            showGrid: true,
            showLabel: true,
            stacked: true,
            gridLines: { display: false }
        },
        // Y-Axis specific configuration
        axisY: {
            // Lets offset the chart a bit from the labels
            offset: 60,
            gridLines: { display: true }
        },
        stretch: true

    };
    // chart object, recibe la data y object con parametros de configuración
    new Chartist.Line('.ct-chart', data, options);
}

async function getConfirmedCases() {
    try {
        const response = await fetch("https://api.covid19api.com/total/country/" + getSelectedCountry() + "/status/confirmed");
        const data = await (await response).json();
        return data;
    } catch (exception) {
        console.error(exception);
        alert("Se produjo un error al obtener los datos de la API");
        location.reload();
    }
}

function isNotMobile() {
    return ! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function getSelectedCountry() { // retorna país seleccionado en html <select>
    return selectElem.options[selectElem.selectedIndex].text; 
}

// agregar nombres de todos los países al select del html
async function addOptionsInCountrySelect() {
    try {
        const response = await fetch("https://api.covid19api.com/countries");
        const data = await (await response).json();
        const countries = [];

        // agrego al array el nombre de el país:
        data.forEach(elem => countries.push(elem.Country));
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


