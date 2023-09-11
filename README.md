# Talalytics Schrauben Dashboard


Erstellung eines Analytics Dashboards für den Verkauf von Schrauben und deren Hersteller.

## Inhaltsverzeichnis


- [Installation](#installation)

- [Verwendung](#verwendung)

- [Start](#start)


## Installation


Nachfolgend findest du die einzelnen Schritte um die nötigen Programme zu installieren, damit die Webseite auch über den Port 3000 laufen kann.


```shell

$ npm install

```



## Verwendung

Local muss in dem Ordner noch eine secrets.js erstellt werden und in diese muss folgender Code.
Dieser Link ist der Zugriff auf die MongoDB Datenbank.

```shell

$ export const dbUrl = "NAMEDERURLDERDATENBANKMITPASSWORTUNDUSERNAME"

```

## Start

Mit der app.js wird der Server gestartet und das Dashboard ist über localhost:3000 erreichbar.

```shell

$ node app.js

```
# SchraubenProjekt
