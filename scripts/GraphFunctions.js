/**
 * grafica.html functions
 * By Joaquin-Parrilla
 * Edited on 2020/12/17.-
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
    /**
     * la idea es que al cargar la página ya se genere la
     * gráfica (con el item seleccionado por defecto)
     */
});


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


