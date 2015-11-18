#!/bin/bash
#Skript für internen gebrauch (setzt lokale Node Installation vorraus) 
# Erstellt einen neuen Mongo Container und startet anschließend den nodeserver mit der index.js
docker pull mongo
docker run -d -p 27017:27017 mongo
node src/index.js 
