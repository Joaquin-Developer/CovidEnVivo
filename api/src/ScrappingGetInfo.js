/**
 * Web_Scrapping para obtener datos actualizados del msp (solo para datos de Uruguay)
 * Voy a obtener datos del covid de la página del gobierno.
 * Actualizado: 16-enero-2021
 */

const puppeteer = require("puppeteer");
const fetch = require("node-fetch");

(async () => {
    try {
        // con headless: false será visible la ventana del navegador.
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0); 
        //await page.goto("https://www.gub.uy/ministerio-salud-publica/tematica/coronavirus");
        await page.goto("https://www.google.com/");
        await page.click(".gLFyf");
        await page.keyboard.type("datos de covid en uruguay");
        await page.keyboard.press("Enter");
        await page.waitForTimeout(5000);

        const data = await page.evaluate(() => {

            const allCasesDiv = document.getElementsByClassName("m7B03")[0];
            const recoveredCasesDiv = document.getElementsByClassName("m7B03")[1];
            const deathsCasesDiv = document.getElementsByClassName("m7B03")[2];
            let allCases = allCasesDiv.childNodes[0].childNodes[0].textContent;
            let recoveredCases = recoveredCasesDiv.childNodes[0].childNodes[0].textContent;
            let deathsCases = deathsCasesDiv.childNodes[0].childNodes[0].textContent;

            return {
                country: "Uruguay",
                confirmed: allCases,
                recovered: recoveredCases,
                deaths: deathsCases
            };
            /**
             * Nota: debo quitar los "." de los numeros
             * también las comas de cada campo
             */

        });
        console.log(data);

        await browser.close();  // al final, cerramos el navegador
        /**
         * Mandamos los datos a la API, y la misma se encarga de guardarlos en la bd
         */
        const request = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        let response = await fetch("http://127.0.0.1:6300/api/insertrecord", request);

        if (response.ok) {
            let resp = await response.json();
            console.log(resp.message);
        } else {
            throw new Error(response.statusText);
        }

    } catch(error) {
        console.log(error);
    }
    
})();
