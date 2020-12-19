/**
 * grafica.html functions
 * By Joaquin-Parrilla
 * Edited on 2020/12/18.-
 */

const selectElem = document.getElementById("country");    // país seleccionado

selectElem.addEventListener("change", function() {
    getCountry();
});

function getCountry() {
    const countryName = selectElem.options[selectElem.selectedIndex].text; // text value
    console.log("nombre: " + countryName);
}

addEventListener("load", async function() {
    await addOptionsInCountrySelect();
    getCountry();
    drawChart();
    /**
     * la idea es que al cargar la página ya se genere la
     * gráfica (con el item seleccionado por defecto)
     */
});

// cada vez que se modifiquen dimensiones de la pantalla, se deberá 
// modificar dimenciónes de la gráfica:
addEventListener("resize", function(event) {
    drawChart();
});

function drawChart() {
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        series: [
            [1, 1, 1, 3, 4, 5, 6, 8, 9, 10, 11, 14, 18, 21, 30]
        ]
    };
    // obtenemos dimensiónes de la pantalla, para establecer tamaño de gráfica acorde
    const height = (window.innerHeight - 250);
    const width = (window.innerWidth - 100);

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

async function renderData() {

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


