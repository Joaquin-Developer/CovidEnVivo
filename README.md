# Covid En Vivo

Aplicación para visualizar las estadístias del covid-19 en todo el mundo.

- Incluye un servicio de Web-Scrapping para obtener datos actualizados de la página del ministerio de salud (sólo para Uruguay)
- Para el resto de países:
	- Se extraen datos de la API: [covid19api](https://api.covid19api.com)
- Los datos de casos recuperados, muertes, y personas cursando la enfermedad se visualiza en forma de tabla.
- Se puede visualizar una gráfica para hacer seguimiento de la evolución de casos activos en cada país

## Requisitos para servidor (Scrapping):
- Npm (6.14.4), node (10.19.0) instalados

### Úso del scrapping:
- En `~/CovidEnVivo/web_scrapping_data_uy` ejecutar el script `./AutomatedScrapping.sh` o `npm run start`
- En caso de automatizar el servicio con el servicio CRONTAB, puede ejecutar el siguiente script: `./CronConfig.sh`

### Utilizar la aplicación a nivel de usuario:
- Dirigirse a [joaquin-parrilla.github.io/CovidEnVivo](https://joaquin-parrilla.github.io/CovidEnVivo)

