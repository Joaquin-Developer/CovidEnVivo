#!/bin/bash

# Este script se programará en un "servidor" (con el sercivio CRON/CRONTAB)
# para que todos los días a la misma horas ejecute node
# y realice el scrapping, guardando los datos en una bd online

# npm run start
node src/ScrappingGetInfo.js

