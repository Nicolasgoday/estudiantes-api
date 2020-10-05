### Api Estudiantes


1. Descargar dependencias:

         npm install
         npm install request
         npm install html-pdf

2. Correr servicio:

         node app.js

## Docker local:

1. Api y MySQL:

         docker-compose up -d

2. Solo MySQL:

         docker-compose -f mysql.yml up -d


## Migraciones 

1. Con MySQL Import:

         node migraciones.js

1. Con Sequilize:

         sequelize db:migrate

https://bezkoder.com/node-js-express-sequelize-mysql/         