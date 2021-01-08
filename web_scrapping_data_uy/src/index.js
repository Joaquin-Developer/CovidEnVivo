/**
 * Mi primer Web_Scrapping básico con JavaScript :)
 * Voy a obtener datos del covid de la página del gobierno.
 * 5 de enero de 2021.-
 */

const puppeteer = require("puppeteer");

(async () => {
    try {
        // con headless: false será visible la ventana del navegador.
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0); 
    
        await page.goto("https://www.gub.uy/ministerio-salud-publica/tematica/coronavirus");
        //await page.screenshot({ path: "foto.jpg" });  // captura de pantalla
        await page.click(".Media a");
        // await page.waitFor(10000); ya no se utiliza :(
        await page.waitForSelector("[data-off-canvas-main-canvas]");
        await page.waitForTimeout(5000);

        const data = await page.evaluate(() => {
            return document.getElementsByClassName("Page-description")[0].childNodes[0].textContent;
        });

        console.log(data);
    
        await browser.close();  // al final, cerramos el navegador
    } catch(error) {
        console.log(error);
    }
    
})();