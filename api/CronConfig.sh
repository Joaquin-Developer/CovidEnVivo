#!/bin/bash

# script para configuración del CRON en un servidor
echo "0 23 * * * root node src/ScrappingGetInfo.js" >> /etc/crontab
